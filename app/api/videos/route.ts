/**
 * API Route: Get Videos (Public - for viewing)
 * Returns all video/reel URLs from Firestore
 * Used by AI assistant and website to view admin-added videos
 */
import { NextResponse } from 'next/server'
import { getVideos } from '@/lib/firebase/firestore'

// Force dynamic: always fetch fresh Firestore data (never cache at build time)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const videos = await getVideos()
    return NextResponse.json({ 
      count: videos.length,
      videos: videos.map(v => ({
        id: v.id,
        url: v.url,
        platform: v.platform,
        embedUrl: v.embedUrl,
        thumbnail: v.thumbnail,
        title: v.title,
        description: v.description,
        createdAt: v.createdAt?.toISOString?.() || null,
      }))
    })
  } catch (error) {
    console.error('Fetch videos error:', error)
    return NextResponse.json({ error: 'Failed to fetch videos', count: 0, videos: [] }, { status: 500 })
  }
}
