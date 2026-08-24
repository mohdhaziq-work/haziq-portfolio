import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getFile, updateFile, deleteFile, toggleStar } from '@/lib/firebase/adminFiles'

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
    return NextResponse.json({ file })
  } catch (err) {
    console.error('Get file error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { action, name, folder, tags } = body

    if (action === 'star') {
      const success = await toggleStar(params.id)
      return NextResponse.json({ success })
    }

    // Update file metadata
    const updateData: any = {}
    if (name) updateData.name = name
    if (folder) updateData.folder = folder
    if (tags) updateData.tags = tags

    const success = await updateFile(params.id, updateData)
    return NextResponse.json({ success })
  } catch (err) {
    console.error('Update file error:', err)
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
    const success = await deleteFile(params.id)
    return NextResponse.json({ success })
  } catch (err) {
    console.error('Delete file error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
