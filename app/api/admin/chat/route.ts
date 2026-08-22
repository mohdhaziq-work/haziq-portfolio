import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { createSession, addMessage, getMessages } from '@/lib/firebase/adminChatServer'
import { nimChat, nimChatStream } from '@/lib/ai/nim'

const SYSTEM_BODY = `You are "HaziqBot", a powerful, professional AI assistant built for Mohd Haziq — a 16-year-old web developer in Lucknow, India who builds websites for local businesses (restaurants, gyms, coaching centres) starting at ₹2,500.

YOUR CAPABILITIES:
- Write professional client replies, emails, and Instagram messages
- Create content: captions, reels scripts, post ideas, hashtags
- Help with web development, coding, debugging (Next.js, React, TypeScript, Tailwind, Firebase)
- Project management, client onboarding, business strategy
- Answer questions about Haziq's services, pricing, and portfolio

RULES:
- Use Markdown formatting: **bold**, headings, bullet lists, code blocks (with language), tables where useful
- Be practical, specific, and ready-to-use (write emails/messages fully, ready to send)
- Be honest if unsure
- Keep answers well-organized and concise
- Always sound professional and helpful

If the user asks about portfolio details, refer to these facts:
- Services: Starter ₹2,500 / Business ₹6,000 / Premium ₹12,000
- Delivery: 3-14 days
- Free mockup offered
- Projects: Spice Garden (restaurant), Success Academy (education), Power Fitness (gym), SkeuoCraft, NeuraSoft
- Instagram: @haziq.built`

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { chatId, content, stream = false } = body

    if (!content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
    }

    let sessionId = chatId
    if (!sessionId) {
      sessionId = await createSession()
      if (!sessionId) {
        return NextResponse.json({ error: 'Failed to create session. Check FIREBASE_SERVICE_ACCOUNT env.' }, { status: 500 })
      }
    }

    await addMessage(sessionId, 'user', content)

    const history = await getMessages(sessionId)
    const aiHistory = history
      .slice(-20)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))

    const messages = [{ role: 'system', content: SYSTEM_BODY }, ...aiHistory]

    // ---- STREAMING ----
    if (stream) {
      const streamable = await nimChatStream(messages)
      let full = ''
      const transform = new TransformStream({
        async transform(chunk, controller) {
          full += new TextDecoder().decode(chunk)
          controller.enqueue(chunk)
        },
        async flush(controller) {
          if (full.trim()) await addMessage(sessionId, 'assistant', full.trim()).catch(() => {})
          controller.terminate()
        },
      })
      const output = streamable.pipeThrough(transform)
      return new Response(output, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Chat-Id': sessionId },
      })
    }

    // ---- NON-STREAMING ----
    const result = await nimChat(messages)
    if (!result.ok) {
      const msg = `Sorry, I hit an issue with the AI service: ${result.error || 'unknown error'}`
      await addMessage(sessionId, 'assistant', msg)
      return NextResponse.json({ chatId: sessionId, reply: msg })
    }

    const reply = result.content || 'No response generated.'
    await addMessage(sessionId, 'assistant', reply)
    return NextResponse.json({ chatId: sessionId, reply, reasoning: result.reasoning })
  } catch (err) {
    console.error('Admin chat error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
