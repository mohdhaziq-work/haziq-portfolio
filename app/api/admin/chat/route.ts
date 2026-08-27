import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { createSession, addMessage, getMessages, type ChatAttachment } from '@/lib/firebase/adminChatServer'
import { nimChat, nimChatStream } from '@/lib/ai/nim'
import { getRepoContext, getRepoFile, getRepoTree } from '@/lib/ai/githubTool'

const SYSTEM_BODY = `You are "HaziqBot", a powerful, professional AI assistant for Mohd Haziq — a 16-year-old web developer in Sultanpur, India who builds websites for local businesses (restaurants, gyms, coaching centres) starting at ₹2,500.

IMPORTANT INSTRUCTION: Carefully READ the user's question and answer EXACTLY what they asked. Do not drift to a different topic. Identify the question type and respond accordingly:

1. ORDERING / HIRE / PROCESS question (e.g. "how to order", "how to hire", "how to get a website", "how to start") → Explain the exact process step by step:
   - Step 1: Go to Services page and choose a plan (Starter ₹2,500 / Business ₹6,000 / Premium ₹12,000)
   - Step 2: Sign in with Google
   - Step 3: Choose your plan (login required first)
   - Step 4: Fill contact form — plan is pre-selected
   - Step 5: You get a free mockup first (no risk), then development
   - Delivery 3-14 days, DM on Instagram @haziq.built

2. PRICING / PLAN question → Give the 3 plans clearly: Starter ₹2,500 (1 page, 3 days), Business ₹6,000 (5 pages, SEO, 7 days), Premium ₹12,000 (full-stack, 14 days). Mention free mockup + 3-14 day delivery.

3. CODING / DEBUG question → Provide complete, copy-pasteable code with comments. Help with Next.js, React, TypeScript, Tailwind, Firebase.

4. CONTENT question (post idea, caption, reel script, hashtags) → Write ready-to-use Instagram content for @haziq.built.

5. CLIENT REPLY question → Write a ready-to-send professional reply/email/DM.

6. BUSINESS question (strategy, onboarding, project management) → Practical actionable advice.

7. PORTFOLIO question → Answer using facts: services, pricing, projects (Spice Garden restaurant, Success Academy education, Power Fitness gym, SkeuoCraft, NeuraSoft), Instagram @haziq.built, free mockup, 3-14 day delivery.

RULES:
- Use Markdown: **bold**, headings, bullet lists, code blocks (with language), tables where useful
- Be practical, specific, ready-to-use
- Be honest if unsure
- Concise and well-organized
- ALWAYS answer the user's actual question — if unsure what they mean, ask a quick clarifying question`

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { chatId, content, stream = false, attachments = [] } = body

    if (!content && attachments.length === 0) {
      return NextResponse.json({ error: 'Message content or attachment is required' }, { status: 400 })
    }

    let sessionId = chatId
    if (!sessionId) {
      sessionId = await createSession()
      if (!sessionId) {
        return NextResponse.json({ error: 'Failed to create session. Check FIREBASE_SERVICE_ACCOUNT env.' }, { status: 500 })
      }
    }

    const safeAttachments: ChatAttachment[] = Array.isArray(attachments)
      ? attachments.filter((a: any) => a && a.url && a.type).map((a: any) => ({ type: a.type, url: a.url, name: a.name || 'file', size: a.size, mime: a.mime }))
      : []

    await addMessage(sessionId, 'user', content || '', safeAttachments)

    // ===== GITHUB TOOL (MCP-like) =====
    const lower = (content || '').toLowerCase()
    let toolResult: string | null = null
    if (lower.startsWith('/repo') || lower.startsWith('/github') || lower.includes('github repo')) {
      if (lower.includes('/repo tree') || lower.includes('structure')) {
        toolResult = await getRepoTree()
      } else if (lower.startsWith('/repo file ') || lower.includes('read ')) {
        const path = lower.replace(/^.*?\/(repo file|file)\s+/i, '').trim() || 'README.md'
        toolResult = await getRepoFile(path)
      } else {
        toolResult = await getRepoContext()
      }
    }
    if (toolResult) {
      await addMessage(sessionId, 'assistant', toolResult)
      return NextResponse.json({ chatId: sessionId, reply: toolResult, isTool: true })
    }

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
