import { NextRequest, NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'

/**
 * Admin Bug Reports API
 * 
 * GET /api/admin/bugs — Get all bug reports (admin only)
 */

export async function GET(request: NextRequest) {
  const token = getBearerToken(request)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
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
    
    // Get all bug reports, ordered by creation date (newest first)
    const snapshot = await db.collection('bugReports')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()

    const bugs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ bugs })
  } catch (error) {
    console.error('Failed to fetch bug reports:', error)
    return NextResponse.json({ bugs: [] })
  }
}
