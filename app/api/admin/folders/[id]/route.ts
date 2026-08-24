import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { updateFolder, deleteFolder } from '@/lib/firebase/adminFiles'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, icon, color } = body

    const updateData: any = {}
    if (name) updateData.name = name
    if (icon) updateData.icon = icon
    if (color) updateData.color = color

    const success = await updateFolder(params.id, updateData)
    return NextResponse.json({ success })
  } catch (err) {
    console.error('Update folder error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const success = await deleteFolder(params.id)
    return NextResponse.json({ success })
  } catch (err) {
    console.error('Delete folder error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
