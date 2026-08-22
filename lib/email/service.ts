/**
 * Email Service - Complete professional email system
 * Uses Gmail SMTP via Nodemailer
 *
 * Templates:
 *  - Welcome (new signup)
 *  - Welcome Back (returning login)
 *  - Order Confirmed (project placed)
 *  - Project Status Update (inquiry, discussion, confirmed, in-progress, review, delivered, cancelled)
 *  - Project Delivered (website live)
 *  - Mockup Request Received (free mockup)
 */

import nodemailer from 'nodemailer'
import { Resend } from 'resend'
import { escapeHtml } from '@/lib/auth/serverAuth'

// Site URL - use the deployed domain (Vercel)
const SITE_URL = process.env.SITE_URL || 'https://mohdhaziq-portfolio.vercel.app'
const LOGO_URL = `${SITE_URL}/logo-haziq.svg`
const INSTAGRAM_URL = 'https://www.instagram.com/haziq.built'
const FROM_EMAIL = '"Mohd Haziq" <mohdhaziq1962@gmail.com>'
const RESEND_FROM = process.env.RESEND_FROM || 'Mohd Haziq <onboarding@resend.dev>' // verified Resend sender

// Lazy Resend client (preferred - better inbox delivery than Gmail SMTP)
let _resend: Resend | null = null
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!_resend) _resend = new Resend(key)
  return _resend
}

// Lazy Gmail SMTP transporter (fallback if Resend not configured)
let _transporter: nodemailer.Transporter | null = null
function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    })
  }
  return _transporter
}

function emailIsConfigured(): boolean {
  // Prefer Gmail SMTP, fall back to Resend
  if (process.env.SMTP_USER && process.env.SMTP_PASS) return true
  return !!process.env.RESEND_API_KEY
}

// ==================== SEND HELPER ====================

interface SendOpts {
  to: string
  subject: string
  html: string
}

async function dispatch(opts: SendOpts): Promise<{ success: boolean; error?: string }> {
  // Standard headers that improve deliverability + compliance
  const headers = {
    'X-Entity-Ref-ID': Date.now().toString(),
    'List-Unsubscribe': `<mailto:mohdhaziq1962@gmail.com?subject=unsubscribe>`,
    'X-Mailer': 'HaziqPortfolio',
  }

  // 1) Prefer Gmail SMTP (personal sender from own Gmail -> best free inbox delivery)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await getTransporter().sendMail({
        from: FROM_EMAIL,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        headers,
      })
      return { success: true }
    } catch (err) {
      console.error('[Email] Gmail SMTP failed:', err)
    }
  }

  // 2) Fallback: Resend (if Gmail SMTP not configured)
  const resend = getResend()
  if (resend) {
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
      })
      return { success: true }
    } catch (err) {
      console.error('[Email] Resend failed:', err)
      return { success: false, error: String(err) }
    }
  }

  return { success: false, error: 'No email provider configured (set SMTP_USER/SMTP_PASS or RESEND_API_KEY)' }
}

// ==================== SHARED STYLES & LAYOUT ====================

const BASE_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6fb; color: #111827; line-height: 1.6; }
  .ew { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; }
  .hd { background: linear-gradient(135deg, #1a73e8, #0d47a1); padding: 28px 32px 24px; text-align: center; }
  .hd .brand { display: inline-block; width: 56px; height: 56px; border-radius: 50%; background: #ffffff; padding: 5px; margin-bottom: 12px; }
  .hd .brand img { width: 46px; height: 46px; border-radius: 50%; display: block; margin: 0 auto; }
  .hd h1 { color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
  .hd p { color: #c6daf8; font-size: 13px; margin-top: 3px; }
  .ct { padding: 28px 32px; }
  .gr { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 10px; }
  .bt { font-size: 15px; color: #4b5563; margin-bottom: 14px; line-height: 1.65; }
  .card { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 12px; padding: 18px 20px; margin: 16px 0; }
  .card h3 { font-size: 14px; font-weight: 700; color: #1a73e8; margin-bottom: 8px; }
  .card ul { list-style: none; padding: 0; }
  .card li { font-size: 14px; color: #4b5563; padding: 4px 0; }
  .status { display: inline-block; padding: 5px 14px; border-radius: 30px; font-size: 12px; font-weight: 700; color: #fff; margin: 4px 0; }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
  .row:last-child { border-bottom: none; }
  .row span:first-child { color: #6b7280; }
  .row span:last-child { color: #111827; font-weight: 600; }
  .cb { display: inline-block; background: #1a73e8; color: #ffffff !important; text-decoration: none; padding: 13px 34px; border-radius: 8px; font-size: 15px; font-weight: 600; margin: 14px 0; }
  .cb.green { background: #059669; }
  .dv { height: 1px; background: #f0f0f0; margin: 20px 0; }
  .ft { background: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #eef2f7; }
  .ft .f-logo { font-weight: 700; color: #111827; font-size: 14px; }
  .ft p { font-size: 12px; color: #6b7280; margin: 3px 0; }
  .ft a { color: #1a73e8; text-decoration: none; }
  .sl { margin-top: 10px; }
  .sl a { display: inline-block; margin: 0 8px; color: #1a73e8; font-size: 12px; text-decoration: none; font-weight: 600; }
  .reply { font-size: 11px; color: #9ca3af; text-align: center; padding: 12px 32px; line-height: 1.5; }
`

const FOOTER_HTML = `
  <div class="ft">
    <div class="f-logo">Mohd Haziq</div>
    <p>Web Developer &bull; Building Websites That Bring Customers</p>
    <div class="sl">
      <a href="${INSTAGRAM_URL}">Instagram</a>
      <a href="${SITE_URL}">Portfolio</a>
      <a href="mailto:mohdhaziq1962@gmail.com">Email</a>
    </div>
  </div>
`

function wrapper(title: string, hero: string, heroSub: string, body: string, heroBg?: string): string {
  const hdStyle = heroBg ? ` style="background:${heroBg};"` : ''
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)}</title></head>
<body style="background-color:#f4f6fb;padding:20px;">
<div class="ew">
  <div class="hd"${hdStyle}>
    <div class="brand"><img src="${LOGO_URL}" alt="Mohd Haziq Logo" /></div>
    <h1>${hero}</h1>
    <p>${heroSub}</p>
  </div>
  <div class="ct">
    ${body}
  </div>
  ${FOOTER_HTML}
  <p class="reply">You received this email from Mohd Haziq &bull; mohdhaziq1962@gmail.com<br/>You can reply directly to this email or DM on Instagram.</p>
</div>
<style>${BASE_STYLES}</style>
</body></html>`
}

// Status metadata for colored badges + titles
const STATUS_META: Record<string, { label: string; color: string; title: string; msg: string }> = {
  inquiry: {
    label: 'Inquiry Received', color: '#6b7280', title: 'Project Inquiry Received',
    msg: 'Thank you! I have received your project inquiry. I will review the details and get back to you within 2 hours to discuss your website.',
  },
  discussion: {
    label: 'Under Discussion', color: '#8b5cf6', title: 'We Are Discussing Your Project',
    msg: 'Great news — we are now discussing your project in detail. I will share a plan and any questions I have so we can shape the perfect website for you.',
  },
  confirmed: {
    label: 'Confirmed', color: '#f59e0b', title: 'Project Confirmed — Order Placed',
    msg: 'Your project is confirmed! Thank you for trusting me. I am preparing your project and will begin work soon. You can track progress anytime.',
  },
  'in-progress': {
    label: 'In Progress', color: '#2563eb', title: 'Project In Progress',
    msg: 'I am actively building your website right now. I will share progress updates here as your project takes shape.',
  },
  review: {
    label: 'Ready for Review', color: '#f97316', title: 'Your Website is Ready for Review',
    msg: 'Your website is ready for review! Please take a look and let me know your feedback so I can make it perfect for you.',
  },
  delivered: {
    label: 'Delivered', color: '#059669', title: 'Your Website is Live!',
    msg: 'Congratulations! Your website is complete and live. It is ready to bring customers to your business.',
  },
  cancelled: {
    label: 'Cancelled', color: '#dc2626', title: 'Project Update',
    msg: 'Your project has been cancelled. If you would like to discuss anything or restart, just reach out — I am happy to help.',
  },
}

// ==================== TEMPLATE: WELCOME ====================
function getWelcomeEmailHTML(name: string): string {
  const n = escapeHtml(name)
  const body = `
    <p class="gr">Hey ${n}, welcome aboard!</p>
    <p class="bt">Thanks for signing up on my portfolio. Your account is now active — you can track projects, submit requests, and stay updated on everything from your portal.</p>
    <div class="card">
      <h3>What you can do now:</h3>
      <ul>
        <li>Track your project progress in real time</li>
        <li>Submit new project requests directly</li>
        <li>See delivery dates and updates from me</li>
        <li>Get notified when your project status changes</li>
      </ul>
    </div>
    <p class="bt">Got a business idea? Whether it is a restaurant, gym, coaching centre, or any business — I build websites that bring customers to your door.</p>
    <div style="text-align:center;"><a href="${SITE_URL}" class="cb">Visit My Portfolio</a></div>
    <div class="dv"></div>
    <p class="bt" style="font-size:14px;">The fastest way to reach me is Instagram DM — I reply within 2 hours (9 AM - 10 PM IST).</p>
    <div style="text-align:center;"><a href="${INSTAGRAM_URL}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;">DM on Instagram</a></div>
  `
  return wrapper('Welcome to Mohd Haziq', 'Welcome, ' + n + '!', 'Mohd Haziq — Web Developer', body)
}

// ==================== TEMPLATE: WELCOME BACK ====================
function getWelcomeBackEmailHTML(name: string): string {
  const n = escapeHtml(name)
  const body = `
    <p class="gr">Welcome back, ${n}!</p>
    <p class="bt">It is great to see you again. Your account is ready — here is a quick look at what you can do.</p>
    <div class="card">
      <h3>Quick shortcuts:</h3>
      <ul>
        <li>Check your project status</li>
        <li>Start a new project</li>
        <li>Upload files for your project</li>
        <li>DM me directly for anything</li>
      </ul>
    </div>
    <div style="text-align:center;"><a href="${SITE_URL}" class="cb">Go to My Portal</a></div>
    <div class="dv"></div>
    <p class="bt" style="font-size:14px;">Need help with anything? I am always one DM away — usually reply within 2 hours.</p>
    <div style="text-align:center;"><a href="${INSTAGRAM_URL}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;">DM on Instagram</a></div>
  `
  return wrapper('Welcome Back, ' + n, 'Welcome back, ' + n + '!', 'Your project portal is ready', body)
}

// ==================== TEMPLATE: ORDER CONFIRMED ====================
function getOrderConfirmedEmailHTML(data: {
  clientName: string
  projectName: string
  projectType: string
  budget: string
  deliveryDate: string
}): string {
  const c = escapeHtml(data.clientName)
  const p = escapeHtml(data.projectName)
  const pt = escapeHtml(data.projectType)
  const b = escapeHtml(data.budget)
  const dd = escapeHtml(data.deliveryDate)
  const body = `
    <p class="gr">Order Confirmed</p>
    <p class="bt">Thank you, ${c}! Your order has been placed successfully. Here is a summary of your project:</p>
    <div class="card">
      <h3>Order Summary</h3>
      <div class="row"><span>Project</span><span>${p}</span></div>
      <div class="row"><span>Type</span><span>${pt}</span></div>
      <div class="row"><span>Budget</span><span>${b || 'TBD'}</span></div>
      <div class="row"><span>Delivery</span><span>${dd || 'To be confirmed'}</span></div>
    </div>
    <p class="bt">I am now preparing your project. You can track progress anytime from your portal.</p>
    <div style="text-align:center;"><a href="${SITE_URL}" class="cb">Track My Project</a></div>
  `
  return wrapper('Order Confirmed — ' + p, 'Order Confirmed', 'Your project is placed', body, 'linear-gradient(135deg,#10b981,#047857)')
}

// ==================== TEMPLATE: PROJECT STATUS UPDATE ====================
function getProjectUpdateEmailHTML(data: {
  clientName: string
  projectName: string
  status: string
  progress: number
  message: string
  deliveryDate?: string
}): string {
  const c = escapeHtml(data.clientName)
  const p = escapeHtml(data.projectName)
  const m = escapeHtml(data.message)
  const meta = STATUS_META[data.status] || STATUS_META.inquiry
  const sc = meta.color
  const label = meta.label
  const dd = escapeHtml(data.deliveryDate || '')
  const progressBar = `<div style="background:#e2e8f0;border-radius:8px;height:12px;margin-top:12px;overflow:hidden;"><div style="background:linear-gradient(90deg,#1a73e8,#0d47a1);height:100%;width:${Math.min(100, Math.max(0, data.progress))}%;border-radius:8px;"></div></div>`
  const body = `
    <p class="gr">Hi ${c},</p>
    <p class="bt">A quick update on your project <strong>${p}</strong>:</p>
    <div class="card">
      <h3>${escapeHtml(meta.title)}</h3>
      <div class="row"><span>Status</span><span><span class="status" style="background:${sc};">${label}</span></span></div>
      <div class="row"><span>Progress</span><span>${data.progress}%</span></div>
      ${dd ? `<div class="row"><span>Delivery Date</span><span>${dd}</span></div>` : ''}
      ${progressBar}
    </div>
    <p class="bt">${escapeHtml(meta.msg)}</p>
    ${m ? `<div class="card"><h3>Message from Haziq</h3><p>${m}</p></div>` : ''}
    <div style="text-align:center;"><a href="${SITE_URL}" class="cb">View Your Project</a></div>
  `
  return wrapper('Project Update: ' + p, 'Project Update', 'Mohd Haziq — Web Developer', body)
}

// ==================== TEMPLATE: PROJECT DELIVERED ====================
function getProjectDeliveredEmailHTML(data: {
  clientName: string
  projectName: string
  projectUrl?: string
}): string {
  const c = escapeHtml(data.clientName)
  const p = escapeHtml(data.projectName)
  const url = escapeHtml(data.projectUrl || '')
  const body = `
    <p class="gr">Your Website is Live</p>
    <p class="bt">Congratulations, ${c}! Your website <strong>${p}</strong> has been delivered and is now live on the internet.</p>
    <div class="card">
      <h3>What is included:</h3>
      <ul>
        <li>Professional, mobile-friendly design</li>
        <li>Fast loading and SEO optimized</li>
        <li>Contact form and Instagram integration</li>
        <li>Fully deployed and live</li>
      </ul>
    </div>
    ${url ? `<div style="text-align:center;"><a href="${url}" class="cb green">Visit Your Website</a></div>` : ''}
    <div class="dv"></div>
    <p class="bt" style="font-size:14px;">Need any changes or have questions? I am always here to help — just DM me on Instagram.</p>
    <div style="text-align:center;"><a href="${INSTAGRAM_URL}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;">DM on Instagram</a></div>
  `
  return wrapper('Your Website is Ready', 'Your Website is Live!', 'Mohd Haziq — Web Developer', body, 'linear-gradient(135deg,#10b981,#059669)')
}

// ==================== TEMPLATE: MOCKUP REQUEST ====================
function getMockupRequestEmailHTML(data: {
  clientName: string
  businessName: string
  clientId: string
}): string {
  const c = escapeHtml(data.clientName)
  const b = escapeHtml(data.businessName)
  const id = escapeHtml(data.clientId)
  const body = `
    <p class="gr">Free Mockup Request Received</p>
    <p class="bt">Hi ${c}, thank you! I have received your free mockup request for <strong>${b}</strong>.</p>
    <div class="card">
      <h3>Your Client ID</h3>
      <div class="row"><span>Client ID</span><span style="font-weight:700;color:#1a73e8;">${id}</span></div>
      <div class="row"><span>Business</span><span>${b}</span></div>
    </div>
    <p class="bt">I am now designing a homepage mockup for your business. I will share it with you soon — no cost, no commitment.</p>
    <p class="bt" style="font-size:14px;">Want to speed things up? DM me on Instagram and mention your Client ID.</p>
    <div style="text-align:center;"><a href="${INSTAGRAM_URL}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;">DM on Instagram</a></div>
  `
  return wrapper('Free Mockup Request', 'Mockup Request Received!', 'Mohd Haziq — Web Developer', body, 'linear-gradient(135deg,#8b5cf6,#6d28d9)')
}

// ==================== SEND FUNCTIONS ====================

export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  if (!emailIsConfigured()) {
    console.log('[Email] No provider configured - skipping welcome email')
    return { success: false, error: 'Email not configured' }
  }
  return dispatch({
    to: email,
    subject: 'Welcome to Mohd Haziq - Your Account is Active',
    html: getWelcomeEmailHTML(name),
  })
}

export async function sendWelcomeBackEmail(
  email: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  if (!emailIsConfigured()) return { success: false, error: 'Email not configured' }
  return dispatch({
    to: email,
    subject: `Welcome back, ${name}!`,
    html: getWelcomeBackEmailHTML(name),
  })
}

export async function sendOrderConfirmedEmail(
  email: string,
  data: {
    clientName: string
    projectName: string
    projectType: string
    budget: string
    deliveryDate: string
  }
): Promise<{ success: boolean; error?: string }> {
  if (!emailIsConfigured()) return { success: false, error: 'Email not configured' }
  return dispatch({
    to: email,
    subject: `Order Confirmed - ${data.projectName}`,
    html: getOrderConfirmedEmailHTML(data),
  })
}

export async function sendProjectUpdateEmail(
  email: string,
  data: {
    clientName: string
    projectName: string
    status: string
    progress: number
    message?: string
    deliveryDate?: string
  }
): Promise<{ success: boolean; error?: string }> {
  if (!emailIsConfigured()) return { success: false, error: 'Email not configured' }
  const meta = STATUS_META[data.status] || STATUS_META.inquiry
  return dispatch({
    to: email,
    subject: `Project Update: ${data.projectName} — ${meta.label}`,
    html: getProjectUpdateEmailHTML({ ...data, message: data.message || '' }),
  })
}

export async function sendProjectDeliveredEmail(
  email: string,
  data: { clientName: string; projectName: string; projectUrl?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!emailIsConfigured()) return { success: false, error: 'Email not configured' }
  return dispatch({
    to: email,
    subject: `Your Website is Ready! - ${data.projectName}`,
    html: getProjectDeliveredEmailHTML(data),
  })
}

export async function sendMockupRequestEmail(
  email: string,
  data: { clientName: string; businessName: string; clientId: string }
): Promise<{ success: boolean; error?: string }> {
  if (!emailIsConfigured()) return { success: false, error: 'Email not configured' }
  return dispatch({
    to: email,
    subject: 'Free Mockup Request - Confirmed',
    html: getMockupRequestEmailHTML(data),
  })
}
