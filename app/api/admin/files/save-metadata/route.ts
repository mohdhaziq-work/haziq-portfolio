import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { createFile } from '@/lib/firebase/adminFiles'

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { fileName, originalName, fileType, fileSize, folder, tags, downloadUrl, githubPath } = body

    if (!fileName || !originalName || !downloadUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Parse tags
    const tagList = tags ? (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : tags) : []

    // Save metadata to Firestore
    const fileId = await createFile({
      name: fileName,
      originalName: originalName,
      type: fileType || 'other',
      mimeType: '',
      size: fileSize || 0,
      githubPath: githubPath || '',
      downloadUrl,
      folder: folder || 'other',
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
        originalName,
        type: fileType,
        size: fileSize,
        downloadUrl,
        folder,
        tags: tagList,
      },
    })
  } catch (err) {
    console.error('Save metadata error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
