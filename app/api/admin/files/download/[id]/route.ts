import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getFile, incrementDownload } from '@/lib/firebase/adminFiles'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const file = await getFile(params.id)
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Increment download count
    await incrementDownload(params.id)

    // Return download URL
    return NextResponse.json({
      success: true,
      downloadUrl: file.downloadUrl,
      fileName: file.originalName,
    })
  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
