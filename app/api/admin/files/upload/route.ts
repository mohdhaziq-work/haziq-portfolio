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
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Max 100 MB.' }, { status: 400 })
    }

    // For files > 4MB, use direct GitHub upload (bypass Vercel body limit)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'FILE_TOO_LARGE_FOR_SERVER',
        message: 'File is too large for server upload. Use direct upload.',
        size: file.size,
        useDirectUpload: true
      }, { status: 413 })
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

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // For images: Try ImgBB first
    if (fileType === 'image') {
      const imgbbKey = process.env.IMGBB_API_KEY
      
      if (imgbbKey) {
        try {
          const imgbbForm = new URLSearchParams()
          imgbbForm.append('key', imgbbKey)
          imgbbForm.append('image', base64)

          const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: imgbbForm,
          })

          const imgbbData = await imgbbRes.json()
          
          if (imgbbData.success) {
            downloadUrl = imgbbData.data.url
          } else {
            downloadUrl = `data:${file.type};base64,${base64}`
          }
        } catch {
          downloadUrl = `data:${file.type};base64,${base64}`
        }
      } else {
        downloadUrl = `data:${file.type};base64,${base64}`
      }
    } else {
      // For non-images < 4MB: Use data URL
      downloadUrl = `data:${file.type};base64,${base64}`
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
