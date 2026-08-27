import { NextRequest, NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'

/**
 * Admin Bug Report Update API
 * 
 * PATCH /api/admin/bugs/[id] — Update bug report status (admin only)
 */

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = getBearerToken(request)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const { id } = params
    const body = await request.json()
    const { status, adminNotes } = body

    // Validate status
    const validStatuses = ['open', 'investigating', 'resolved']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: open, investigating, or resolved' },
        { status: 400 }
      )
    }

    const { getFirestore } = await import('firebase-admin/firestore')
    const { initializeApp, getApps, cert } = await import('firebase-admin/app')

    // Initialize Firebase Admin if not already initialized
    if (getApps().length === 0) {
      const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      if (serviceAccount) {
        initializeApp({
          credential: cert(JSON.parse(serviceAccount)),
        })
      }
    }

    const db = getFirestore()
    
    // Update bug report
    const updateData: any = {}
    if (status) updateData.status = status
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes
    if (status === 'resolved') updateData.resolvedAt = new Date().toISOString()

    await db.collection('bugReports').doc(id).update(updateData)

    return NextResponse.json({ success: true, message: 'Bug report updated' })
  } catch (error) {
    console.error('Failed to update bug report:', error)
    return NextResponse.json(
      { error: 'Failed to update bug report' },
      { status: 500 }
    )
  }
}
