import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmedEmail } from '@/lib/email/service'
import { getBearerToken, requireAdmin, isValidEmail, escapeHtml } from '@/lib/auth/serverAuth'

/**
 * POST /api/email/order-confirmed
 * Sends an order-confirmed email when a client's project order is placed.
 * Protected: admin only.
 */
export async function POST(request: NextRequest) {
  try {
    const token = getBearerToken(request)
    const authError = await requireAdmin(token)
    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 })
    }

    const body = await request.json()
    const { email, clientName, projectName, projectType, budget, deliveryDate } = body

    if (!email || !clientName || !projectName) {
      return NextResponse.json(
        { error: 'email, clientName, and projectName are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const result = await sendOrderConfirmedEmail(email, {
      clientName: escapeHtml(clientName),
      projectName: escapeHtml(projectName),
      projectType: escapeHtml(projectType || 'custom'),
      budget: escapeHtml(budget || ''),
      deliveryDate: escapeHtml(deliveryDate || ''),
    })

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Order confirmed email sent' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Order confirmed email route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
