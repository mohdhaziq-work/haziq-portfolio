import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getStorageStats } from '@/lib/firebase/adminFiles'

export async function GET(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const stats = await getStorageStats()
    return NextResponse.json({ stats })
  } catch (err) {
    console.error('Storage stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
