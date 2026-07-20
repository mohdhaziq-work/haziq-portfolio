import { NextRequest, NextResponse } from 'next/server'
import { sendProjectUpdateEmail, sendProjectDeliveredEmail } from '@/lib/email/service'

/**
 * POST /api/email/update
 * Sends a project update email to a client
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
    const body = await request.json()
    const { email, clientName, projectName, status, progress, message, projectUrl } = body

    if (!email || !clientName || !projectName || !status) {
      return NextResponse.json(
        { error: 'Email, clientName, projectName, and status are required' },
        { status: 400 }
      )
    }

    let result

    if (status === 'delivered') {
      result = await sendProjectDeliveredEmail(email, {
        clientName,
        projectName,
        projectUrl,
      })
    } else {
      result = await sendProjectUpdateEmail(email, {
        clientName,
        projectName,
        status,
        progress: progress || 0,
        message,
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
