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
  if (mimeType.includes('document') || mimeType.includes('sheet') || mimeType.includes('presentation') || mimeType.includes('text')) return 'document'
  return 'other'
}

// Get folder from file type
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
    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string
    const tags = formData.get('tags') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file size (100 MB max)
    const maxSize = 100 * 1024 * 1024 // 100 MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Max 100 MB.' }, { status: 400 })
    }

    // Detect file type
    const fileType = getFileType(file.type, file.name)
    const fileFolder = folder || getFolder(fileType)

    // Generate unique filename
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).slice(2, 8)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `${timestamp}_${randomId}_${safeName}`

    // GitHub path
    const githubPath = `${fileFolder}/${fileName}`

    // Convert file to base64 for GitHub API
    const arrayBuffer = await file.arrayBuffer()
    const base64Content = Buffer.from(arrayBuffer).toString('base64')

    // Upload to GitHub
    const githubToken = process.env.GITHUB_TOKEN
    const repoOwner = 'mohdhaziq-work'
    const repoName = 'admin-files'

    if (!githubToken) {
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
    }

    // Create repo if it doesn't exist (first time)
    const repoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (repoResponse.status === 404) {
      // Create the repo
      const createRepoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          description: 'Admin File Storage for Haziq Portfolio',
          private: true,
          auto_init: true,
        }),
      })

      if (!createRepoResponse.ok) {
        const error = await createRepoResponse.text()
        console.error('Failed to create repo:', error)
        return NextResponse.json({ error: 'Failed to create storage repo' }, { status: 500 })
      }
    }

    // Upload file to GitHub
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
          message: `Upload: ${file.name}`,
          content: base64Content,
        }),
      }
    )

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text()
      console.error('GitHub upload failed:', error)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    const uploadData = await uploadResponse.json()
    const downloadUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${githubPath}`

    // Parse tags
    const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

    // Save metadata to Firestore
    const fileId = await createFile({
      name: fileName,
      originalName: file.name,
      type: fileType as any,
      mimeType: file.type,
      size: file.size,
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
        name: fileName,
        originalName: file.name,
        type: fileType,
        size: file.size,
        downloadUrl,
        folder: fileFolder,
        tags: tagList,
      },
    })
  } catch (err) {
    console.error('File upload error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
