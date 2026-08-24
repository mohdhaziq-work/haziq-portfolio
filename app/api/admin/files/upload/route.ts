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

// Lazy firebase-admin init for storage
let _admin: any = null
function getAdmin(): any {
  if (_admin) return _admin
  try {
    const admin = require('firebase-admin')
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    if (!serviceAccount) return null
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccount)),
      })
    }
    _admin = admin
    return _admin
  } catch (e) {
    console.error('[upload] Firebase Admin init failed:', e)
    return null
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

    // Firebase Storage path
    const storagePath = `admin-files/${fileFolder}/${fileName}`

    // Get Firebase Storage bucket
    const admin = getAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 500 })
    }

    const bucket = admin.storage().bucket()
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // Upload to Firebase Storage
    const fileRef = bucket.file(storagePath)
    await fileRef.save(fileBuffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          uploadedBy: 'admin',
          folder: fileFolder,
        },
      },
    })

    // Make file publicly accessible
    await fileRef.makePublic()

    // Get public URL
    const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`

    // Parse tags
    const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

    // Save metadata to Firestore
    const fileId = await createFile({
      name: fileName,
      originalName: file.name,
      type: fileType as any,
      mimeType: file.type,
      size: file.size,
      githubPath: storagePath,
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
