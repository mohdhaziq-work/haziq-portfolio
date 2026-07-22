/**
 * API Route: Upload Image
 * Primary: ImgBB API (free image hosting)
 * Fallback: Returns base64 data URL if ImgBB is down
 */
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Try ImgBB first
    const imgbbApiKey =
      process.env.IMGBB_API_KEY ||
      process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
      (formData.get('apiKey') as string) ||
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
    return NextResponse.json({
      error: 'Upload failed',
      details: String(error)
    }, { status: 500 })
  }
}
