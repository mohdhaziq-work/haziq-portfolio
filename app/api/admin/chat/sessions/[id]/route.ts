import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getMessages, updateSession, deleteSession } from '@/lib/firebase/adminChatServer'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    const messages = await getMessages(params.id)
    return NextResponse.json({ messages })
  } catch {
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    const body = await req.json()
    const data: { title?: string; isPinned?: boolean; isArchived?: boolean } = {}
    if (typeof body.title === 'string') data.title = body.title
    if (typeof body.isPinned === 'boolean') data.isPinned = body.isPinned
    if (typeof body.isArchived === 'boolean') data.isArchived = body.isArchived
    await updateSession(params.id, data)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    await deleteSession(params.id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 })
  }
}
