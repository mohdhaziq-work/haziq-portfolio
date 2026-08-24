import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { createFile } from '@/lib/firebase/adminFiles'

// File type detection
function getFileType(mimeType: string, name: string): string {
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

    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    }

    // Create repo if needed (public for direct URLs)
    try {
      const repoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
        headers: { Authorization: `token ${githubToken}`, Accept: 'application/vnd.github.v3+json' },
      })

      if (repoResponse.status === 404) {
        await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers,
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

    // Use GitHub Blob API for large files (supports up to 100MB)
    // Step 1: Create a blob
    const blobResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/blobs`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: base64Content,
          encoding: 'base64',
        }),
      }
    )

    if (!blobResponse.ok) {
      const errorText = await blobResponse.text()
      console.error('Blob creation failed:', errorText)
      return NextResponse.json({ error: 'Failed to create blob', details: errorText }, { status: 500 })
    }

    const blobData = await blobResponse.json()
    const blobSha = blobData.sha

    // Step 2: Get the current commit SHA
    const refResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      { headers }
    )

    let commitSha = ''
    let treeSha = ''

    if (refResponse.ok) {
      const refData = await refResponse.json()
      commitSha = refData.object.sha

      // Get the tree SHA from the commit
      const commitResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/commits/${commitSha}`,
        { headers }
      )

      if (commitResponse.ok) {
        const commitData = await commitResponse.json()
        treeSha = commitData.tree.sha
      }
    }

    // Step 3: Create a new tree with the file
    const treeResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          base_tree: treeSha,
          tree: [
            {
              path: githubPath,
              mode: '100644',
              type: 'blob',
              sha: blobSha,
            },
          ],
        }),
      }
    )

    if (!treeResponse.ok) {
      const errorText = await treeResponse.text()
      console.error('Tree creation failed:', errorText)
      return NextResponse.json({ error: 'Failed to create tree', details: errorText }, { status: 500 })
    }

    const treeData = await treeResponse.json()
    const newTreeSha = treeData.sha

    // Step 4: Create a commit
    const newCommitResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/commits`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: `Upload: ${fileName}`,
          tree: newTreeSha,
          parents: [commitSha],
        }),
      }
    )

    if (!newCommitResponse.ok) {
      const errorText = await newCommitResponse.text()
      console.error('Commit creation failed:', errorText)
      return NextResponse.json({ error: 'Failed to create commit', details: errorText }, { status: 500 })
    }

    const newCommitData = await newCommitResponse.json()
    const newCommitSha = newCommitData.sha

    // Step 5: Update the reference
    const updateRefResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          sha: newCommitSha,
          force: true,
        }),
      }
    )

    if (!updateRefResponse.ok) {
      const errorText = await updateRefResponse.text()
      console.error('Ref update failed:', errorText)
      return NextResponse.json({ error: 'Failed to update ref', details: errorText }, { status: 500 })
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
