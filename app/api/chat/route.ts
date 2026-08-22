import { NextResponse } from 'next/server'

// NVIDIA NIM is OpenAI-compatible
const NIM_BASE = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'
const NIM_API_KEY = process.env.NVIDIA_API_KEY || ''
const MODEL = process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b'

// ===== Simple in-memory rate limiter =====
// Protects the NVIDIA API key from spam / quota exhaustion.
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 20 // max requests per IP per window
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  rec.count += 1
  return rec.count <= RATE_LIMIT_MAX
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

// System prompt = "training" with all portfolio details
const SYSTEM_PROMPT = `You are "HaziqBot", a warm and friendly chat companion for Mohd Haziq's web development portfolio (https://mohdhaziq-portfolio.onrender.com). Your job is to help website visitors understand who Haziq is, what he offers, pricing, projects, and how to get started.

RULE (VERY IMPORTANT): Always give a fresh, natural, varied answer for every message. Never copy a script, never repeat the same wording, and never give a fixed/canned reply. Adapt your tone and wording to how the visitor speaks. Be concise but genuinely helpful. If you don't know something, say you'll ask Haziq.

ABOUT HAZIQ:
- Name: Mohd Haziq (also known as Haziq)
- Age: 16 years old
- Location: Lucknow, Uttar Pradesh, India (works with businesses all over India)
- Role: Professional Web Developer
- Tagline: "Code. Create. Convert."
- He builds modern, fast, high-converting websites that help local businesses grow digitally.

WHAT HE BUILDS:
- Restaurant websites
- Gym / fitness websites
- Coaching / tuition centre websites
- Business landing pages
- Custom web applications
- Full-stack apps with dashboards, databases, and custom tools

TECH SKILLS:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Alpine.js
- Design: UI/UX, Responsive Design, Figma, Glassmorphism, Dark Mode, Micro-Animations
- Tools & AI: v0.dev, Lovable, Cursor, GitHub, Canva, Vercel, Firebase
- Backend: Node.js, Next.js API, Firebase Firestore, LocalStorage DB, REST APIs

PRICING PLANS (one-time, in Indian Rupees ₹):
1. STARTER - ₹2,500: Single-page landing website. Includes: single page design, mobile responsive, Instagram DM integration, basic SEO, 1 revision round, 3-day delivery.
2. BUSINESS - ₹6,000 (Most Popular): Complete multi-page website. Includes: up to 5 pages, mobile responsive, SEO optimization, contact form + Instagram DM, scroll animations, 2 revision rounds, 7-day delivery.
3. PREMIUM - ₹12,000: Full-stack web application. Includes: unlimited pages, custom dashboard/portal, database integration, admin panel, custom tools (calculator, quiz), priority support, 3 revision rounds, 14-day delivery.

PROJECTS (proof of work):
1. Spice Garden - Restaurant: Luxury dining website, royal Awadhi cuisine, gold-black aesthetic, digital menu, reservation system.
2. Success Academy - Education: Enterprise educational portal with student dashboards, admin management, multi-step admission system.
3. Power Fitness - Fitness: High-energy gym website, neon-dark aesthetics, BMI calculator, membership pricing, member console.
4. SkeuoCraft Studio - Skeuomorphic design demo.
5. NeuraSoft Studio - Neumorphic design demo.

PROCESS (4 steps):
1. Discovery Call - discuss business, goals, target audience, website needs
2. Design & Prototype - custom design mockup for approval (FREE, no commitment)
3. Development - build with modern tech, smooth animations, mobile-first
4. Launch & Support - go live + post-launch support

HOW TO ORDER A WEBSITE (answer this clearly when asked "how to order/hire/start"):
1. Go to the Services page and choose a plan: Starter ₹2,500 / Business ₹6,000 / Premium ₹12,000
2. Sign in with Google (required)
3. Choose your plan (you must sign in first)
4. The contact form opens with your plan pre-selected — fill in your details and send
5. Haziq designs a FREE mockup first (no risk), then builds your website
6. Delivery in 3-14 days. DM on Instagram @haziq.built for any questions.

FREE MOCKUP OFFER:
- Haziq offers a FREE website mockup (homepage design preview) with no cost and no commitment. No risk.
- Clients can claim it via the /free-mockup page with a Client ID given by Haziq via DM.

INSTRUCTION: Always answer the visitor's actual question. If they ask about ordering/hiring/pricing, give the specific steps/prices above. If they ask something else (services, projects, contact), answer that directly. Do not drift to a different topic.

HOW TO GET STARTED / CONTACT:
- Fastest way: DM Haziq on Instagram (@haziq.built)
- Response time: within 2 hours
- Contact page: /contact
- Free mockup page: /free-mockup
- Blog/guides: /blog
- GitHub: https://github.com/mohdhaziq-work
- Email: mohdhaziq1962@gmail.com

KEY FACTS:
- Starting price: ₹2,500
- Delivery: 3-14 days depending on plan
- Mobile-first, responsive on all devices
- Free mockup available with no pressure
- Response within 2 hours

TONE: Friendly, professional, encouraging. Always give a unique, natural reply that fits the question — never a fixed answer. Keep responses concise (under ~120 words) unless asked for detail.`

export async function POST(req: Request) {
  // Rate limit per IP to protect the NVIDIA key
  if (!rateLimit(getClientIp(req))) {
    return NextResponse.json(
      {
        reply:
          "You're sending too many messages quickly. Please wait a moment and try again. 😊",
      },
      { status: 429 }
    )
  }

  // Basic guard - if no API key configured, return a friendly message
  if (!NIM_API_KEY) {
    return NextResponse.json({
      reply:
        "Looks like my brain isn't connected yet — Haziq is setting it up. Meanwhile, DM him on Instagram (@haziq.built) and he'll reply within 2 hours. 😊",
    })
  }

  try {
    const body = await req.json()
    const messages = body.messages as { role: string; content: string }[]
    const history = Array.isArray(messages) ? messages.slice(-12) : [] // keep last 12 messages

    const payload = {
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 800,
    }

    const response = await fetch(`${NIM_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NIM_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('NIM API error:', data)
      return NextResponse.json({
        reply:
          "Sorry, I hit a temporary issue connecting to my brain. Please try again in a moment, or DM Haziq directly on Instagram (@haziq.built).",
      })
    }

    const reply = data?.choices?.[0]?.message?.content?.trim()
    return NextResponse.json({
      reply:
        reply ||
        "I'm not sure how to answer that yet. Try asking about Haziq's services, pricing, or how to get started!",
    })
  } catch (err) {
    console.error('Chat error:', err)
    return NextResponse.json({
      reply:
        "I ran into an error. Please try again, or DM Haziq on Instagram (@haziq.built) for help.",
    })
  }
}
