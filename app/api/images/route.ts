/**
 * API Route: Get Uploaded Images
 * Protected: requires a signed-in user. Returns uploaded image URLs from Firestore.
 */
import { NextResponse } from 'next/server'
import { getUploadedImages } from '@/lib/firebase/firestore'
import { getBearerToken, requireAuth } from '@/lib/auth/serverAuth'

// Force dynamic: always fetch fresh Firestore data (never cache at build time)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  // Auth guard — must be a signed-in user
  const token = getBearerToken(request)
  const authError = await requireAuth(token)
  if (authError) {
    return NextResponse.json({ error: authError, count: 0, images: [] }, { status: 401 })
  }

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
