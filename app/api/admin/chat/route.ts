import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'
import { addChatMessage, createChatSession, getChatMessages } from '@/lib/firebase/adminChat'

const NIM_BASE = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'
const NIM_API_KEY = process.env.NVIDIA_API_KEY || ''
const MODEL = process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b'

const SYSTEM_BODY = `You are HaziqBot, private assistant for Mohd Haziq's web dev business. Help with client replies, content, coding, project management. Be practical and use markdown.`

export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { chatId, content } = body

    if (!content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
    }

    // If no chatId, create a new session
    let sessionId = chatId
    if (!sessionId) {
      sessionId = await createChatSession()
      if (!sessionId) {
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
      }
    }

    // Save user message
    await addChatMessage(sessionId, 'user', content)

    // Load history for context
    const history = await getChatMessages(sessionId)
    const aiHistory = history
      .slice(-20)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))

    if (!NIM_API_KEY) {
      const msg = 'HaziqBot is not configured yet. Set NVIDIA_API_KEY in env to enable the AI.'
      await addChatMessage(sessionId, 'assistant', msg)
      return NextResponse.json({ chatId: sessionId, reply: msg })
    }

    const payload = {
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_BODY },
        ...aiHistory,
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 1200,
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
      const msg = 'Sorry, I hit an issue with the AI service. Please try again.'
      await addChatMessage(sessionId, 'assistant', msg)
      return NextResponse.json({ chatId: sessionId, reply: msg })
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() || 'No response.'
    await addChatMessage(sessionId, 'assistant', reply)

    return NextResponse.json({ chatId: sessionId, reply })
  } catch (err) {
    console.error('Admin chat error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
