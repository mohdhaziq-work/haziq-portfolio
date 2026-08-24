import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getFiles, getStorageStats } from '@/lib/firebase/adminFiles'

export async function GET(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const folder = searchParams.get('folder') || undefined
    const type = searchParams.get('type') || undefined
    const starred = searchParams.get('starred') === 'true'
    const search = searchParams.get('search') || undefined
    const limit = parseInt(searchParams.get('limit') || '100')
    const stats = searchParams.get('stats') === 'true'

    if (stats) {
      const storageStats = await getStorageStats()
      return NextResponse.json({ stats: storageStats })
    }

    const files = await getFiles({ folder, type, starred, search, limit })
    return NextResponse.json({ files })
  } catch (err) {
    console.error('Files list error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
