import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getChatSessions, createChatSession } from '@/lib/firebase/adminChat'

export async function GET(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    const sessions = await getChatSessions()
    return NextResponse.json({ sessions })
  } catch (e) {
    console.error('get sessions error:', e)
    return NextResponse.json({ error: 'Failed to load sessions' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    const body = await req.json()
    const title = body?.title || 'New Conversation'
    const id = await createChatSession(title)
    if (!id) return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    return NextResponse.json({ id })
  } catch (e) {
    console.error('create session error:', e)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
