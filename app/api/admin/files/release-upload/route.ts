import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { createFile } from '@/lib/firebase/adminFiles'

// File type detection
function getFileType(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase() || ''
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) return 'image'
  if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(ext)) return 'video'
  if (ext === 'pdf') return 'pdf'
  if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext)) return 'archive'
  if (['apk', 'xapk', 'aab'].includes(ext)) return 'apk'
  if (['md', 'markdown', 'txt', 'doc', 'docx', 'rtf'].includes(ext)) return 'document'
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

// This route receives the file as FormData and uploads to GitHub Releases
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

    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const repoOwner = 'mohdhaziq-work'
    const repoName = 'admin-files'
    const fileType = getFileType(file.name)
    const fileFolder = folder || getFolder(fileType)
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).slice(2, 8)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueName = `${timestamp}_${randomId}_${safeName}`

    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    }

    // Step 1: Get or create release
    let releaseId = ''
    let releaseTag = 'files'

    // Try to get existing release
    const releasesRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/releases/tags/${releaseTag}`,
      { headers }
    )

    if (releasesRes.ok) {
      const releaseData = await releasesRes.json()
      releaseId = releaseData.id
    } else {
      // Create new release
      const createReleaseRes = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/releases`,
        {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tag_name: releaseTag,
            name: 'File Storage',
            body: 'Admin file storage release',
            draft: false,
            prerelease: false,
          }),
        }
      )

      if (createReleaseRes.ok) {
        const releaseData = await createReleaseRes.json()
        releaseId = releaseData.id
      } else {
        const errorText = await createReleaseRes.text()
        console.error('Failed to create release:', errorText)
        return NextResponse.json({ error: 'Failed to create release' }, { status: 500 })
      }
    }

    // Step 2: Upload file as release asset
    // GitHub uploads endpoint: https://uploads.github.com/repos/{owner}/{repo}/releases/{release_id}/assets
    const arrayBuffer = await file.arrayBuffer()
    
    const uploadRes = await fetch(
      `https://uploads.github.com/repos/${repoOwner}/${repoName}/releases/${releaseId}/assets?name=${encodeURIComponent(uniqueName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${githubToken}`,
          'Content-Type': 'application/octet-stream',
          Accept: 'application/vnd.github.v3+json',
        },
        body: arrayBuffer,
      }
    )

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text()
      console.error('Failed to upload asset:', errorText)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    const assetData = await uploadRes.json()
    const downloadUrl = assetData.browser_download_url

    // Parse tags
    const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

    // Save metadata to Firestore
    const fileId = await createFile({
      name: uniqueName,
      originalName: file.name,
      type: fileType as any,
      mimeType: file.type,
      size: file.size,
      githubPath: `releases/${releaseTag}/${uniqueName}`,
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
        originalName: file.name,
        type: fileType,
        size: file.size,
        downloadUrl,
        folder: fileFolder,
        tags: tagList,
      },
    })
  } catch (err) {
    console.error('Release upload error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
