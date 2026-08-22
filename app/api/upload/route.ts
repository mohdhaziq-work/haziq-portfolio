/**
 * API Route: Upload Image
 * Protected: any signed-in user can upload (clients + admin).
 * Restricts allowed file types and size to prevent dangerous uploads.
 * Primary: ImgBB API (free image hosting)
 * Fallback: Returns base64 data URL if ImgBB is down
 */
import { NextRequest, NextResponse } from 'next/server'
import { getBearerToken, requireAuth } from '@/lib/auth/serverAuth'

// Allow common image + document types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
  'image/bmp',
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/json',
  'application/javascript',
  'text/javascript',
  'text/css',
  'application/xml',
  'text/html',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
]

// Max file size: 10 MB
const MAX_SIZE = 10 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    // Auth guard — must be a signed-in user
    const token = getBearerToken(req)
    const authError = await requireAuth(token)
    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Restrict file type (prevent dangerous uploads)
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type not allowed: ${file.type || 'unknown'}` },
        { status: 400 }
      )
    }

    // Restrict file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 5 MB.' },
        { status: 400 }
      )
    }

    // Use server-side key ONLY (never accept a client-supplied apiKey)
    const imgbbApiKey =
      process.env.IMGBB_API_KEY ||
      process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
      ''

    if (imgbbApiKey) {
      try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')

        const imgbbFormData = new FormData()
        imgbbFormData.append('key', imgbbApiKey)
        imgbbFormData.append('image', base64)
        imgbbFormData.append('name', file.name.replace(/\.[^/.]+$/, '') || 'upload')

        const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: imgbbFormData,
        })

        if (imgbbRes.ok) {
          const imgbbData = await imgbbRes.json()
          const imageUrl = imgbbData.data?.url
          const thumbUrl = imgbbData.data?.thumb?.url || imgbbData.data?.display_url
          const deleteUrl = imgbbData.data?.delete_url

          if (imageUrl) {
            return NextResponse.json({
              url: imageUrl,
              thumb: thumbUrl || imageUrl,
              deleteUrl: deleteUrl || '',
              originalName: file.name,
              size: file.size,
              type: file.type,
              source: 'imgbb',
            })
          }
        }
        // ImgBB failed, fall through to base64
        console.log('ImgBB upload failed, using base64 fallback')
      } catch (imgbbErr) {
        console.log('ImgBB error, using base64 fallback:', String(imgbbErr))
      }
    }

    // Fallback: Convert to base64 data URL (works without any external service)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    return NextResponse.json({
      url: dataUrl,
      thumb: dataUrl,
      deleteUrl: '',
      originalName: file.name,
      size: file.size,
      type: file.type,
      source: 'base64',
      warning: 'ImgBB unavailable - image stored as base64. Images may not display in emails.',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
