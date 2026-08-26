import { getClientIp, rateLimitResponse } from '@/lib/rateLimit'
import { NextRequest, NextResponse } from 'next/server'
import { getBearerToken, requireAdmin, verifyIdToken, isValidEmail } from '@/lib/auth/serverAuth'
import {
  sendWelcomeEmail,
  sendWelcomeBackEmail,
  sendOrderConfirmedEmail,
  sendProjectUpdateEmail,
  sendProjectDeliveredEmail,
  sendMockupRequestEmail,
} from '@/lib/email/service'

/**
 * Email diagnostic endpoint (admin only).
 *
 * GET  /api/email/test              -> reports email-system state
 * POST /api/email/test              -> sends a set of test emails to the admin
 */
export async function GET(request: NextRequest) {
  const token = getBearerToken(request)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  const smtpUser = process.env.SMTP_USER || ''
  const smtpPass = process.env.SMTP_PASS || ''
  const svc = process.env.FIREBASE_SERVICE_ACCOUNT || ''

  return NextResponse.json({
    smtpConfigured: !!(smtpUser && smtpPass),
    smtpUser: smtpUser ? smtpUser.replace(/^(.{3}).*(@.*)$/, '$1***$2') : '(empty)',
    smtpPassSet: !!smtpPass,
    firebaseServiceAccountSet: !!svc,
    firebaseServiceAccountLength: svc.length,
    nvidiaApiKeySet: !!process.env.NVIDIA_API_KEY,
  })
}

export async function POST(request: NextRequest) {
  const token = getBearerToken(request)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  const caller = await verifyIdToken(token)
  // Allow admin to test delivery to an external address
  let body: any = {}
  try { body = await request.json() } catch {}
    // Rate limiting
    const ip = getClientIp(request)
    const rateLimitErr = rateLimitResponse(ip, 10)
    if (rateLimitErr) return rateLimitErr

  const to = (body.email && isValidEmail(body.email)) ? body.email : (caller?.email || '')
  const name = body.name || 'Haziq'

  // Send every email template as a test so the admin can see each design
  const results: Record<string, boolean> = {}
  const errors: Record<string, string> = {}

  async function run(key: string, fn: () => Promise<{ success: boolean; error?: string }>) {
    const r = await fn()
    results[key] = r.success
    if (r.error) errors[key] = r.error
  }

  await run('welcome', () => sendWelcomeEmail(to, name))
  await run('welcome-back', () => sendWelcomeBackEmail(to, name))
  await run('order-confirmed', () =>
    sendOrderConfirmedEmail(to, {
      clientName: name,
      projectName: 'Test Business Website',
      projectType: 'business',
      budget: '₹6,000',
      deliveryDate: '7 days',
    })
  )
  await run('project-update', () =>
    sendProjectUpdateEmail(to, {
      clientName: name,
      projectName: 'Test Business Website',
      status: 'in-progress',
      progress: 50,
      message: 'Your website is coming along great!',
      deliveryDate: '5 days',
    })
  )
  await run('delivered', () =>
    sendProjectDeliveredEmail(to, {
      clientName: name,
      projectName: 'Test Business Website',
      projectUrl: 'https://mohdhaziq-portfolio.vercel.app',
    })
  )
  await run('mockup', () =>
    sendMockupRequestEmail(to, {
      clientName: name,
      businessName: 'Test Business',
      clientId: 'MS-TEST123',
    })
  )

  return NextResponse.json({ sent: true, to, results, errors })
}
