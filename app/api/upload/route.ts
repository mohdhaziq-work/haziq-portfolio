/**
 * API Route: Upload Image to ImgBB
 * Server-side route so ImgBB API key stays secure (not exposed to client)
 * Reads IMGBB_API_KEY from environment variables
 */
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Get API key from server-side env var OR from client-sent key
    const imgbbApiKey = process.env.IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_API_KEY || formData.get('apiKey') as string || ''

    if (!imgbbApiKey) {
      return NextResponse.json({ error: 'ImgBB API key not configured. Set IMGBB_API_KEY in Render env vars.' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')

    // Upload to ImgBB
    const imgbbFormData = new FormData()
    imgbbFormData.append('key', imgbbApiKey)
    imgbbFormData.append('image', base64)
    imgbbFormData.append('name', file.name.replace(/\.[^/.]+$/, ''))

    const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbFormData,
    })

    if (!imgbbRes.ok) {
      const errText = await imgbbRes.text()
      console.error('ImgBB upload failed:', errText)
      return NextResponse.json({ error: 'Image upload to ImgBB failed', details: errText }, { status: 500 })
    }

    const imgbbData = await imgbbRes.json()
    const imageUrl = imgbbData.data?.url
    const thumbUrl = imgbbData.data?.thumb?.url || imgbbData.data?.display_url
    const deleteUrl = imgbbData.data?.delete_url

    if (!imageUrl) {
      return NextResponse.json({ error: 'ImgBB returned no URL' }, { status: 500 })
    }

    return NextResponse.json({
      url: imageUrl,
      thumb: thumbUrl,
      deleteUrl: deleteUrl || '',
      originalName: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed', details: String(error) }, { status: 500 })
  }
}
