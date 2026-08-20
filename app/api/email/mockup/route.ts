import { NextRequest, NextResponse } from 'next/server'
import { sendMockupRequestEmail } from '@/lib/email/service'
import { getBearerToken, requireAuth, isValidEmail, escapeHtml } from '@/lib/auth/serverAuth'

/**
 * POST /api/email/mockup
 * Sends a mockup-request confirmation email to a client who requested a free mockup.
 * Protected: any signed-in user, emailing their own address.
 */
export async function POST(request: NextRequest) {
  try {
    const token = getBearerToken(request)
    const authError = await requireAuth(token)
    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 })
    }

    const body = await request.json()
    const { email, clientName, businessName, clientId } = body

    if (!email || !clientName || !clientId) {
      return NextResponse.json(
        { error: 'email, clientName, and clientId are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const result = await sendMockupRequestEmail(email, {
      clientName: escapeHtml(clientName),
      businessName: escapeHtml(businessName || 'your business'),
      clientId: escapeHtml(clientId),
    })

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Mockup request email sent' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Mockup email route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
