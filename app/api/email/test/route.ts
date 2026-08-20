import { NextRequest, NextResponse } from 'next/server'
import { getBearerToken, requireAdmin, verifyIdToken } from '@/lib/auth/serverAuth'
import { sendProjectUpdateEmail } from '@/lib/email/service'

/**
 * Email diagnostic endpoint (admin only).
 *
 * GET  /api/email/test  -> reports email-system state
 * POST /api/email/test  -> attempts to send a test email to the admin's own address
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
  const to = caller?.email || ''

  const result = await sendProjectUpdateEmail(to, {
    clientName: 'Haziq (self-test)',
    projectName: 'Email Test',
    status: 'confirmed',
    progress: 25,
    message: 'This is a test email to verify the email system is working.',
  })

  return NextResponse.json({ sent: result.success, to, error: result.error || null })
}
