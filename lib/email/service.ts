/**
 * Email Service - Welcome Email + Project Update Emails
 * Uses Resend API (free tier: 100 emails/day)
 * 
 * Setup:
 * 1. Go to https://resend.com and create free account
 * 2. Add your domain OR use onboarding domain for testing
 * 3. Create API key at https://resend.com/api-keys
 * 4. Set RESEND_API_KEY in Render Dashboard environment variables
 */

import { Resend } from 'resend'

// Lazy init - prevents build-time crash when API key is absent
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || '')
  }
  return _resend
}

const SITE_URL = 'https://mohdhaziq-portfolio.onrender.com'
const LOGO_URL = `${SITE_URL}/logo-haziq.svg`
const INSTAGRAM_URL = 'https://www.instagram.com/haziq.built'
const FROM_EMAIL = 'Mohd Haziq <onboarding@resend.dev>'

// ==================== SHARED STYLES ====================

const BASE_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa; color: #1a1a2e; line-height: 1.6; }
  .ew { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .hd { background: linear-gradient(135deg, #1a73e8, #1557b0); padding: 40px 32px; text-align: center; }
  .hd img { width: 80px; height: 80px; border-radius: 20px; margin-bottom: 16px; }
  .hd h1 { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
  .hd p { color: #a8c7fa; font-size: 14px; margin-top: 4px; }
  .ct { padding: 32px; }
  .gr { font-size: 18px; font-weight: 600; color: #1a1a2e; margin-bottom: 12px; }
  .bt { font-size: 15px; color: #4a4a6a; margin-bottom: 20px; line-height: 1.7; }
  .hb { background: linear-gradient(135deg, #e8f0fe, #f0f4ff); border-left: 4px solid #1a73e8; border-radius: 0 12px 12px 0; padding: 20px 24px; margin: 24px 0; }
  .hb h3 { font-size: 15px; font-weight: 600; color: #1a73e8; margin-bottom: 8px; }
  .hb ul { list-style: none; padding: 0; }
  .hb li { font-size: 14px; color: #4a4a6a; padding: 4px 0; padding-left: 20px; position: relative; }
  .hb li::before { content: ''; position: absolute; left: 0; top: 12px; width: 8px; height: 8px; background: #1a73e8; border-radius: 50%; }
  .cb { display: inline-block; background: linear-gradient(135deg, #1a73e8, #1557b0); color: #ffffff !important; text-decoration: none; padding: 14px 36px; border-radius: 12px; font-size: 15px; font-weight: 600; margin: 20px 0; }
  .dv { height: 1px; background: #e8ecf2; margin: 24px 0; }
  .ft { background: #f8f9fc; padding: 24px 32px; text-align: center; border-top: 1px solid #e8ecf2; }
  .ft p { font-size: 13px; color: #8a8aaa; margin: 4px 0; }
  .ft a { color: #1a73e8; text-decoration: none; }
  .sl { margin-top: 12px; }
  .sl a { display: inline-block; margin: 0 8px; color: #1a73e8; font-size: 13px; text-decoration: none; font-weight: 500; }
`

const FOOTER_HTML = `
  <div class="ft">
    <p style="font-weight: 600; color: #1a1a2e;">Mohd Haziq</p>
    <p>Web Developer &bull; Building Websites That Work</p>
    <div class="sl">
      <a href="${INSTAGRAM_URL}">Instagram</a>
      <a href="${SITE_URL}">Portfolio</a>
      <a href="mailto:mohdhaziq1962@gmail.com">Email</a>
    </div>
  </div>
`

// ==================== WELCOME EMAIL ====================

function getWelcomeEmailHTML(name: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to Mohd Haziq</title></head>
<body style="background-color:#f5f7fa;padding:20px;">
<div class="ew">
  <div class="hd">
    <img src="${LOGO_URL}" alt="Mohd Haziq Logo" />
    <h1>Welcome, ${name}!</h1>
    <p>Mohd Haziq &mdash; Web Developer</p>
  </div>
  <div class="ct">
    <p class="gr">Hey ${name}, glad to have you here!</p>
    <p class="bt">Thanks for signing up on my portfolio. Your account is now active and you can track your projects, view progress updates, and communicate directly through the portal.</p>
    <div class="hb">
      <h3>What you can do now:</h3>
      <ul>
        <li>Track your project progress in real time</li>
        <li>Submit new project requests directly</li>
        <li>View delivery dates and updates from my end</li>
        <li>Get notified when your project status changes</li>
      </ul>
    </div>
    <p class="bt">Got an idea for a website? I would love to hear about it. Whether it is a restaurant, coaching center, gym, or any business &mdash; I build websites that bring customers to your door.</p>
    <div style="text-align:center;">
      <a href="${SITE_URL}" class="cb">Visit My Portfolio</a>
    </div>
    <div class="dv"></div>
    <p class="bt" style="font-size:14px;">The fastest way to reach me is through Instagram DM. I usually reply within 2 hours during working hours (9 AM - 10 PM IST).</p>
    <div style="text-align:center;margin-top:12px;">
      <a href="${INSTAGRAM_URL}" style="display:inline-block;background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;">DM on Instagram</a>
    </div>
  </div>
  ${FOOTER_HTML}
  <p style="text-align:center;font-size:12px;color:#b0b0c0;padding:0 32px 20px;">You received this email because you signed up at mohdhaziq-portfolio.onrender.com</p>
</div>
<style>${BASE_STYLES}</style>
</body></html>`
}

// ==================== PROJECT UPDATE EMAIL ====================

function getProjectUpdateHTML(data: {
  clientName: string
  projectName: string
  status: string
  progress: number
  message: string
}): string {
  const statusColors: Record<string, string> = {
    'inquiry': '#6b7280', 'discussion': '#8b5cf6', 'confirmed': '#f59e0b',
    'in-progress': '#3b82f6', 'review': '#f97316', 'delivered': '#10b981', 'cancelled': '#ef4444',
  }
  const sc = statusColors[data.status] || '#1a73e8'
  const statusLabel = data.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Project Update &mdash; Mohd Haziq</title></head>
<body style="background-color:#f5f7fa;padding:20px;">
<div class="ew">
  <div class="hd">
    <img src="${LOGO_URL}" alt="Mohd Haziq Logo" />
    <h1>Project Update</h1>
    <p>Mohd Haziq &mdash; Web Developer</p>
  </div>
  <div class="ct">
    <p class="gr">Hi ${data.clientName},</p>
    <p class="bt">Your project has been updated. Here are the latest details:</p>
    <div class="hb">
      <h3>${data.projectName}</h3>
      <ul>
        <li><strong>Status:</strong> <span style="color:${sc};font-weight:600;">${statusLabel}</span></li>
        <li><strong>Progress:</strong> ${data.progress}%</li>
      </ul>
      <div style="background:#e2e8f0;border-radius:8px;height:10px;margin-top:10px;overflow:hidden;">
        <div style="background:linear-gradient(90deg,#1a73e8,#1557b0);height:100%;width:${data.progress}%;border-radius:8px;"></div>
      </div>
    </div>
    ${data.message ? `<p class="bt">${data.message}</p>` : ''}
    <div style="text-align:center;">
      <a href="${SITE_URL}" class="cb">View Your Project</a>
    </div>
  </div>
  ${FOOTER_HTML}
  <p style="text-align:center;font-size:12px;color:#b0b0c0;padding:0 32px 20px;">You received this email because you have a project with Mohd Haziq.</p>
</div>
<style>${BASE_STYLES}</style>
</body></html>`
}

// ==================== PROJECT DELIVERED EMAIL ====================

function getProjectDeliveredHTML(data: {
  clientName: string
  projectName: string
  projectUrl?: string
}): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Website is Ready! &mdash; Mohd Haziq</title></head>
<body style="background-color:#f5f7fa;padding:20px;">
<div class="ew">
  <div class="hd" style="background:linear-gradient(135deg,#10b981,#059669);">
    <img src="${LOGO_URL}" alt="Mohd Haziq Logo" />
    <h1>Your Website is Ready!</h1>
    <p>Mohd Haziq &mdash; Web Developer</p>
  </div>
  <div class="ct">
    <p class="gr">Hey ${data.clientName}, great news!</p>
    <p class="bt">Your website <strong>${data.projectName}</strong> has been delivered! It is live and ready to bring customers to your business.</p>
    <div class="hb" style="border-left-color:#10b981;background:linear-gradient(135deg,#ecfdf5,#f0fdf4);">
      <h3 style="color:#10b981;">What is included:</h3>
      <ul>
        <li style="color:#4a4a6a;">Professional, mobile-friendly design</li>
        <li style="color:#4a4a6a;">Fast loading and SEO optimized</li>
        <li style="color:#4a4a6a;">Contact form and Instagram integration</li>
        <li style="color:#4a4a6a;">Fully deployed and live on the internet</li>
      </ul>
    </div>
    ${data.projectUrl ? `<div style="text-align:center;"><a href="${data.projectUrl}" class="cb" style="background:linear-gradient(135deg,#10b981,#059669);">Visit Your Website</a></div>` : ''}
    <div class="dv"></div>
    <p class="bt" style="font-size:14px;">Need any changes or have questions? Just DM me on Instagram &mdash; I am always here to help.</p>
    <div style="text-align:center;margin-top:12px;">
      <a href="${INSTAGRAM_URL}" style="display:inline-block;background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;">DM on Instagram</a>
    </div>
  </div>
  ${FOOTER_HTML}
  <p style="text-align:center;font-size:12px;color:#b0b0c0;padding:0 32px 20px;">You received this email because your project was delivered by Mohd Haziq.</p>
</div>
<style>${BASE_STYLES}</style>
</body></html>`
}

// ==================== SEND FUNCTIONS ====================

export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not set - skipping welcome email')
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Welcome to Mohd Haziq — Your Account is Active',
      html: getWelcomeEmailHTML(name),
    })
    if (error) {
      console.error('[Email] Welcome error:', error)
      return { success: false, error: error.message }
    }
    console.log('[Email] Welcome sent to:', email, 'ID:', data?.id)
    return { success: true }
  } catch (err) {
    console.error('[Email] Welcome exception:', err)
    return { success: false, error: String(err) }
  }
}

export async function sendProjectUpdateEmail(
  email: string,
  data: {
    clientName: string
    projectName: string
    status: string
    progress: number
    message?: string
  }
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not set - skipping update email')
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }
  try {
    const statusLabel = data.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Project Update: ${data.projectName} — ${statusLabel}`,
      html: getProjectUpdateHTML({ ...data, message: data.message || '' }),
    })
    if (error) {
      console.error('[Email] Update error:', error)
      return { success: false, error: error.message }
    }
    console.log('[Email] Update sent to:', email, 'ID:', result?.id)
    return { success: true }
  } catch (err) {
    console.error('[Email] Update exception:', err)
    return { success: false, error: String(err) }
  }
}

export async function sendProjectDeliveredEmail(
  email: string,
  data: {
    clientName: string
    projectName: string
    projectUrl?: string
  }
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not set - skipping delivered email')
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Your Website is Ready! — ${data.projectName}`,
      html: getProjectDeliveredHTML(data),
    })
    if (error) {
      console.error('[Email] Delivered error:', error)
      return { success: false, error: error.message }
    }
    console.log('[Email] Delivered sent to:', email, 'ID:', result?.id)
    return { success: true }
  } catch (err) {
    console.error('[Email] Delivered exception:', err)
    return { success: false, error: String(err) }
  }
}
