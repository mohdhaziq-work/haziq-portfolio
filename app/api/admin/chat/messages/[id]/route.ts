import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { updateMessage, deleteMessage } from '@/lib/firebase/adminChatServer'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    const body = await req.json()
    if (typeof body.content !== 'string') {
      return NextResponse.json({ error: 'content is required' }, { status: 400 })
    }
    await updateMessage(params.id, body.content)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) return NextResponse.json({ error: authError }, { status: 401 })
  try {
    await deleteMessage(params.id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
