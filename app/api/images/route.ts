/**
 * API Route: Get Uploaded Images (Public - for viewing)
 * Returns all uploaded image URLs from Firestore
 * Used by AI assistant to view admin-uploaded images
 */
import { NextResponse } from 'next/server'
import { getUploadedImages } from '@/lib/firebase/firestore'

export async function GET() {
  try {
    const images = await getUploadedImages()
    return NextResponse.json({ 
      count: images.length,
      images: images.map(img => ({
        id: img.id,
        url: img.url,
        thumb: img.thumb,
        label: img.label,
        category: img.category,
        originalName: img.originalName,
        createdAt: img.createdAt?.toISOString?.() || null,
      }))
    })
  } catch (error) {
    console.error('Fetch images error:', error)
    return NextResponse.json({ error: 'Failed to fetch images', count: 0, images: [] }, { status: 500 })
  }
}
