/**
 * API Route: Videos / Reels
 *
 * GET  (public)  — list all videos (fresh from Firestore)
 * POST (secret)  — add a video directly (AI / server-side, protected by ADMIN_API_SECRET)
 *                  This lets created reels go DIRECTLY into the admin panel.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getVideos } from '@/lib/firebase/firestore'
import { adminDb, isAdminConfigured } from '@/lib/firebase/admin'

// Force dynamic: always fetch fresh Firestore data (never cache at build time)
export const dynamic = 'force-dynamic'
export const revalidate = 0

// ----- URL parser (same logic as firestore.ts) -----
type VideoPlatform = 'youtube' | 'instagram' | 'other'

function parseVideoUrl(url: string): { platform: VideoPlatform; embedUrl: string; thumbnail: string } {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    const videoId = ytMatch[1]
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    }
  }
  const igMatch = url.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/)
  if (igMatch) {
    const shortcode = igMatch[1]
    return {
      platform: 'instagram',
      embedUrl: `https://www.instagram.com/reel/${shortcode}/embed/`,
      thumbnail: '',
    }
  }
  return { platform: 'other', embedUrl: url, thumbnail: '' }
}

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

// =====================================================
// POST: Add a video DIRECTLY to Firestore (AI / server)
// Protected by ADMIN_API_SECRET (env var on Render)
// =====================================================
export async function POST(req: NextRequest) {
  try {
    // --- Auth check: secret token ---
    const secret = process.env.ADMIN_API_SECRET
    const providedSecret =
      req.headers.get('x-admin-secret') ||
      req.nextUrl.searchParams.get('secret') ||
      ''

    if (!secret) {
      return NextResponse.json(
        { error: 'ADMIN_API_SECRET not configured. Set it in Render environment.' },
        { status: 500 }
      )
    }
    if (providedSecret !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // --- Admin SDK configured? ---
    if (!isAdminConfigured || !adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin not configured. Set FIREBASE_SERVICE_ACCOUNT in Render environment.' },
        { status: 500 }
      )
    }

    // --- Parse body ---
    const body = await req.json()
    const { url, title, description } = body as { url: string; title: string; description: string }

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing required field: url' }, { status: 400 })
    }

    // --- Detect platform + build embed URL ---
    const parsed = parseVideoUrl(url)

    // --- Write to Firestore 'videos' collection ---
    const docRef = await adminDb.collection('videos').add({
      url,
      platform: parsed.platform,
      embedUrl: parsed.embedUrl,
      thumbnail: parsed.thumbnail,
      title: title || '',
      description: description || '',
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: `Video added directly to admin panel (${parsed.platform})`,
      video: {
        id: docRef.id,
        url,
        platform: parsed.platform,
        embedUrl: parsed.embedUrl,
        thumbnail: parsed.thumbnail,
        title: title || '',
        description: description || '',
      },
    })
  } catch (error) {
    console.error('Add video error:', error)
    return NextResponse.json(
      { error: 'Failed to add video', details: String(error) },
      { status: 500 }
    )
  }
}
