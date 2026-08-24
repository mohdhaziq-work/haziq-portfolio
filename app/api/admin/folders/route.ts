import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { getFolders, createFolder } from '@/lib/firebase/adminFiles'

export async function GET(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const folders = await getFolders()
    return NextResponse.json({ folders })
  } catch (err) {
    console.error('Folders list error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, icon, color } = body

    if (!name) {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 })
    }

    const folderId = await createFolder({
      name,
      icon: icon || '📁',
      color: color || '#6366f1',
    })

    if (!folderId) {
      return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 })
    }

    return NextResponse.json({ success: true, folderId })
  } catch (err) {
    console.error('Create folder error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
