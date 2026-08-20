import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email/service'
import { getBearerToken, requireAuth, isValidEmail } from '@/lib/auth/serverAuth'

/**
 * POST /api/email/welcome
 * Sends a welcome email to a newly signed-up client.
 * Protected: caller must be signed in and emailing their own address.
 */
export async function POST(request: NextRequest) {
  try {
    // Auth guard — require a valid signed-in user
    const token = getBearerToken(request)
    const authError = await requireAuth(token)
    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 })
    }

    const body = await request.json()
    const { email, name } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const result = await sendWelcomeEmail(email, name)

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Welcome email sent' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Welcome email route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
