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

    let downloadUrl = ''

    // For images: Use ImgBB (FREE, fast, CDN)
    if (fileType === 'image') {
      const imgbbKey = process.env.IMGBB_API_KEY
      
      if (imgbbKey) {
        // Upload to ImgBB
        const arrayBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        
        const imgbbForm = new FormData()
        imgbbForm.append('key', imgbbKey)
        imgbbForm.append('image', base64)
        imgbbForm.append('name', fileName)

        const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: imgbbForm,
        })

        const imgbbData = await imgbbRes.json()
        
        if (imgbbData.success) {
          downloadUrl = imgbbData.data.url
        } else {
          console.error('ImgBB upload failed:', imgbbData)
          // Fallback to data URL for small images
          if (file.size < 5 * 1024 * 1024) { // < 5MB
            const base64Data = `data:${file.type};base64,${base64}`
            downloadUrl = base64Data
          } else {
            return NextResponse.json({ error: 'Image upload failed. Add IMGBB_API_KEY to env.' }, { status: 500 })
          }
        }
      } else {
        // No ImgBB key - use data URL for small images (< 2MB)
        if (file.size < 2 * 1024 * 1024) {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString('base64')
          downloadUrl = `data:${file.type};base64,${base64}`
        } else {
          return NextResponse.json({ 
            error: 'For image uploads, add IMGBB_API_KEY to Vercel env. Get free key at imgbb.com/api',
            help: 'Go to https://api.imgbb.com/ → Get free API key → Add to Vercel as IMGBB_API_KEY'
          }, { status: 500 })
        }
      }
    } else {
      // For non-images: Use data URL for small files, or GitHub for large files
      if (file.size < 2 * 1024 * 1024) { // < 2MB
        const arrayBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        downloadUrl = `data:${file.type};base64,${base64}`
      } else {
        // Try GitHub for larger files
        const githubToken = process.env.GITHUB_TOKEN
        const repoOwner = 'mohdhaziq-work'
        const repoName = 'admin-files'

        if (githubToken) {
          // Create repo if needed
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
                private: false, // Public for direct URLs
                auto_init: true,
              }),
            })
          }

          // Upload to GitHub
          const arrayBuffer = await file.arrayBuffer()
          const base64Content = Buffer.from(arrayBuffer).toString('base64')
          const githubPath = `${fileFolder}/${fileName}`

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

          if (uploadResponse.ok) {
            downloadUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${githubPath}`
          } else {
            return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
          }
        } else {
          return NextResponse.json({ 
            error: 'File too large for free storage. Add GITHUB_TOKEN to env.',
            help: 'Go to https://github.com/settings/tokens → Generate token → Add to Vercel as GITHUB_TOKEN'
          }, { status: 500 })
        }
      }
    }

    // Parse tags
    const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

    // Save metadata to Firestore
    const fileId = await createFile({
      name: fileName,
      originalName: file.name,
      type: fileType as any,
      mimeType: file.type,
      size: file.size,
      githubPath: `admin-files/${fileFolder}/${fileName}`,
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
