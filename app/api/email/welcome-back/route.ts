import { getClientIp, rateLimitResponse } from '@/lib/rateLimit'
import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeBackEmail } from '@/lib/email/service'
import { getBearerToken, requireAuth, isValidEmail } from '@/lib/auth/serverAuth'

/**
 * POST /api/email/welcome-back
 * Sends a welcome-back email to a returning signed-up client.
 * Protected: caller must be signed in and emailing their own address.
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request)
    const rateLimitErr = rateLimitResponse(ip, 10)
    if (rateLimitErr) return rateLimitErr

    const token = getBearerToken(request)
    const authError = await requireAuth(token)
    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 })
    }

    const body = await request.json()
    const { email, name } = body

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const result = await sendWelcomeBackEmail(email, name)

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Welcome-back email sent' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Welcome-back email route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
