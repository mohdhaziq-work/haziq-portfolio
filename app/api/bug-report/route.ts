import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, rateLimitResponse } from '@/lib/rateLimit'

/**
 * Bug Report API
 * 
 * POST /api/bug-report — Submit a bug report (public, rate-limited)
 * 
 * Saves to Firestore if configured, otherwise just acknowledges.
 */

export async function POST(request: NextRequest) {
  // Rate limiting — 5 reports per minute per IP
  const ip = getClientIp(request)
  const rateLimitErr = rateLimitResponse(ip, 5)
  if (rateLimitErr) return rateLimitErr

  try {
    const body = await request.json()
    const { type, title, description, email, url, userAgent } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Try to save to Firestore
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
      
      // Save bug report to Firestore
      const docRef = await db.collection('bugReports').add({
        type: type || 'bug',
        title: title.trim(),
        description: description.trim(),
        email: email?.trim() || 'Not provided',
        url: url || 'Unknown',
        userAgent: userAgent || 'Unknown',
        ip: ip,
        status: 'open', // open, investigating, resolved
        createdAt: new Date().toISOString(),
        resolvedAt: null,
        adminNotes: '',
      })

      console.log(`Bug report saved: ${docRef.id} - ${title}`)

      return NextResponse.json({
        success: true,
        id: docRef.id,
        message: 'Bug report submitted successfully',
      })
    } catch (firestoreError) {
      // If Firestore fails, still acknowledge the report
      console.error('Firestore error:', firestoreError)
      
      return NextResponse.json({
        success: true,
        message: 'Bug report received. Thank you for your feedback!',
      })
    }
  } catch (error) {
    console.error('Bug report error:', error)
    return NextResponse.json(
      { error: 'Failed to submit bug report' },
      { status: 500 }
    )
  }
}
