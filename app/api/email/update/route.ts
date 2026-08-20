import { NextRequest, NextResponse } from 'next/server'
import { sendProjectUpdateEmail, sendProjectDeliveredEmail } from '@/lib/email/service'
import { getBearerToken, requireAdmin, escapeHtml, isValidEmail } from '@/lib/auth/serverAuth'

/**
 * POST /api/email/update
 * Sends a project update email to a client.
 * Protected: admin only (mohdhaziq1962@gmail.com).
 *
 * Body: { 
 *   email: string, 
 *   clientName: string, 
 *   projectName: string, 
 *   status: string, 
 *   progress: number, 
 *   message?: string,
 *   projectUrl?: string
 * }
 * 
 * If status === 'delivered', sends the delivered email template instead
 */
export async function POST(request: NextRequest) {
  try {
    // Auth guard — admin only
    const token = getBearerToken(request)
    const authError = await requireAdmin(token)
    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 })
    }

    const body = await request.json()
    const { email, clientName, projectName, status, progress, message, projectUrl } = body

    if (!email || !clientName || !projectName || !status) {
      return NextResponse.json(
        { error: 'Email, clientName, projectName, and status are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Sanitize user-controlled values (XSS protection)
    const safeClientName = escapeHtml(clientName)
    const safeProjectName = escapeHtml(projectName)
    const safeMessage = escapeHtml(message)
    const safeProjectUrl = escapeHtml(projectUrl)

    let result

    if (status === 'delivered') {
      result = await sendProjectDeliveredEmail(email, {
        clientName: safeClientName,
        projectName: safeProjectName,
        projectUrl: safeProjectUrl,
      })
    } else {
      result = await sendProjectUpdateEmail(email, {
        clientName: safeClientName,
        projectName: safeProjectName,
        status: escapeHtml(status),
        progress: Number(progress) || 0,
        message: safeMessage,
      })
    }

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Email sent' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Update email route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
