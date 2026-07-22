/**
 * API Route: Upload Image to ImgBB
 * Reads API key from: IMGBB_API_KEY or NEXT_PUBLIC_IMGBB_API_KEY env vars
 * Also accepts apiKey in form data as fallback
 */
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Try multiple sources for the API key
    const imgbbApiKey =
      process.env.IMGBB_API_KEY ||
      process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
      (formData.get('apiKey') as string) ||
      ''

    if (!imgbbApiKey) {
      return NextResponse.json({
        error: 'ImgBB API key not found. Please set IMGBB_API_KEY in Render Dashboard > Environment.',
        debug: {
          IMGBB_API_KEY: process.env.IMGBB_API_KEY ? 'SET' : 'NOT SET',
          NEXT_PUBLIC_IMGBB_API_KEY: process.env.NEXT_PUBLIC_IMGBB_API_KEY ? 'SET' : 'NOT SET',
        }
      }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')

    // Upload to ImgBB
    const imgbbFormData = new FormData()
    imgbbFormData.append('key', imgbbApiKey)
    imgbbFormData.append('image', base64)
    imgbbFormData.append('name', file.name.replace(/\.[^/.]+$/, '') || 'upload')

    const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbFormData,
    })

    const imgbbText = await imgbbRes.text()

    if (!imgbbRes.ok) {
      console.error('ImgBB upload failed:', imgbbRes.status, imgbbText)
      return NextResponse.json({
        error: `ImgBB rejected the upload (status ${imgbbRes.status}). Check if your API key is valid.`,
        details: imgbbText.substring(0, 500),
        debug: {
          apiKeyLength: imgbbApiKey.length,
          apiKeyPrefix: imgbbApiKey.substring(0, 6) + '...',
          fileSize: file.size,
          fileType: file.type,
        }
      }, { status: 500 })
    }

    let imgbbData: any
    try {
      imgbbData = JSON.parse(imgbbText)
    } catch {
      return NextResponse.json({
        error: 'ImgBB returned invalid JSON',
        details: imgbbText.substring(0, 500)
      }, { status: 500 })
    }

    const imageUrl = imgbbData.data?.url
    const thumbUrl = imgbbData.data?.thumb?.url || imgbbData.data?.display_url
    const deleteUrl = imgbbData.data?.delete_url

    if (!imageUrl) {
      return NextResponse.json({
        error: 'ImgBB returned no URL',
        details: JSON.stringify(imgbbData).substring(0, 500)
      }, { status: 500 })
    }

    return NextResponse.json({
      url: imageUrl,
      thumb: thumbUrl || imageUrl,
      deleteUrl: deleteUrl || '',
      originalName: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      error: 'Upload failed',
      details: String(error)
    }, { status: 500 })
  }
}
