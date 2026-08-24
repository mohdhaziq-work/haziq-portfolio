import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { createFile } from '@/lib/firebase/adminFiles'

// File type detection
function getFileType(mimeType: string, name: string): string {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType === 'application/pdf') return 'pdf'
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar') || mimeType.includes('gz')) return 'archive'
  if (name.endsWith('.apk') || name.endsWith('.xapk') || name.endsWith('.aab')) return 'apk'
  if (name.endsWith('.md') || name.endsWith('.markdown')) return 'document'
  if (mimeType.includes('document') || mimeType.includes('sheet') || mimeType.includes('presentation') || mimeType.includes('text')) return 'document'
  return 'other'
}

function getFolder(type: string): string {
  switch (type) {
    case 'apk': return 'apps'
    case 'image': return 'images'
    case 'video': return 'videos'
    case 'pdf':
    case 'document': return 'documents'
    case 'archive': return 'archives'
    default: return 'other'
  }
}

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { fileName, fileType, fileSize, folder, tags, base64Content } = body

    if (!fileName || !base64Content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const githubToken = process.env.GITHUB_TOKEN
    const repoOwner = 'mohdhaziq-work'
    const repoName = 'admin-files'

    if (!githubToken) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const detectedType = fileType || getFileType('', fileName)
    const fileFolder = folder || getFolder(detectedType)
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).slice(2, 8)
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueName = `${timestamp}_${randomId}_${safeName}`
    const githubPath = `${fileFolder}/${uniqueName}`

    // Create repo if needed (public for direct URLs)
    try {
      const repoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })

      if (repoResponse.status === 404) {
        await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: repoName,
            description: 'Admin File Storage',
            private: false,
            auto_init: true,
          }),
        })
      }
    } catch (e) {
      console.error('Repo check/create error:', e)
    }

    // Upload to GitHub
    const uploadResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Upload: ${fileName}`,
          content: base64Content,
        }),
      }
    )

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('GitHub upload failed:', errorText)
      return NextResponse.json({ error: 'GitHub upload failed', details: errorText }, { status: 500 })
    }

    const downloadUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${githubPath}`

    // Parse tags
    const tagList = tags ? (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : tags) : []

    // Save metadata to Firestore
    const fileId = await createFile({
      name: uniqueName,
      originalName: fileName,
      type: detectedType as any,
      mimeType: '',
      size: fileSize || 0,
      githubPath,
      downloadUrl,
      folder: fileFolder,
      tags: tagList,
    })

    if (!fileId) {
      return NextResponse.json({ error: 'Failed to save file metadata' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      file: {
        id: fileId,
        name: uniqueName,
        originalName: fileName,
        type: detectedType,
        size: fileSize,
        downloadUrl,
        folder: fileFolder,
        tags: tagList,
      },
    })
  } catch (err) {
    console.error('Direct upload error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
