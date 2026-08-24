import { NextResponse } from 'next/server'

// Direct download route - no auth required
// This allows downloading files from GitHub Releases directly
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const fileId = searchParams.get('id')
    const url = searchParams.get('url')

    if (url) {
      // Direct URL redirect
      return NextResponse.redirect(url)
    }

    if (fileId) {
      // Get file from Firestore and redirect to download URL
      // For now, return a helpful message
      return NextResponse.json({
        message: 'Use ?url= parameter for direct download',
        example: '/api/download?url=https://github.com/.../releases/download/...'
      })
    }

    return NextResponse.json({ error: 'Missing url or id parameter' }, { status: 400 })
  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
