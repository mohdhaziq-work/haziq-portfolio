/**
 * Shared NVIDIA NIM helper for all AI features.
 * Handles both instruct and reasoning models robustly.
 */

const NIM_BASE = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'
const NIM_API_KEY = process.env.NVIDIA_API_KEY || ''
const MODEL = process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b'

export interface NIMResponse {
  ok: boolean
  content: string
  reasoning?: string
  error?: string
  status?: number
}

/**
 * Extract final content from a NIM chat completion.
 * Reasoning models put the answer in `reasoning_content`; instruct models use `content`.
 */
function extractReply(data: any): { content: string; reasoning?: string } {
  const choice = data?.choices?.[0]
  const msg = choice?.message
  const content = msg?.content || ''
  const reasoning = msg?.reasoning_content || ''
  // Some models use `reasoning_content` for the actual answer
  const finalContent = content.trim() || reasoning.trim() || ''
  return { content: finalContent, reasoning: reasoning || undefined }
}

/**
 * Call NVIDIA NIM chat completions (non-streaming).
 */
export async function nimChat(
  messages: { role: string; content: string }[],
  opts: { temperature?: number; maxTokens?: number } = {}
): Promise<NIMResponse> {
  if (!NIM_API_KEY) {
    return { ok: false, content: '', error: 'NVIDIA_API_KEY not configured' }
  }

  const payload: any = {
    model: MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    top_p: 0.9,
    max_tokens: opts.maxTokens ?? 1200,
  }

  // Enable thinking for reasoning models (nemotron-3-*)
  if (MODEL.includes('nemotron')) {
    payload.chat_template_kwargs = { enable_thinking: true }
  }

  try {
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
      console.error('[NIM] API error:', data)
      return {
        ok: false,
        content: '',
        error: data?.error?.message || `NIM API error (${response.status})`,
        status: response.status,
      }
    }

    const { content, reasoning } = extractReply(data)
    return { ok: true, content, reasoning }
  } catch (err) {
    console.error('[NIM] Fetch error:', err)
    return { ok: false, content: '', error: String(err) }
  }
}

/**
 * Streaming call to NVIDIA NIM. Returns a ReadableStream of text chunks.
 */
export async function nimChatStream(
  messages: { role: string; content: string }[],
  opts: { temperature?: number; maxTokens?: number } = {}
): Promise<ReadableStream<Uint8Array>> {
  const payload: any = {
    model: MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    top_p: 0.9,
    max_tokens: opts.maxTokens ?? 1200,
    stream: true,
  }
  if (MODEL.includes('nemotron')) {
    payload.chat_template_kwargs = { enable_thinking: true }
  }

  const response = await fetch(`${NIM_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${NIM_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok || !response.body) {
    const err = await response.text().catch(() => '')
    console.error('[NIM] Stream error:', err)
    throw new Error('NIM streaming failed')
  }

  // Transform SSE stream into plain text chunks
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  const reader = response.body.getReader()

  return new ReadableStream({
    async start(controller) {
      let buffer = ''
      const flushLine = () => {
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const payload = trimmed.slice(5).trim()
          if (payload === '[DONE]') return
          try {
            const json = JSON.parse(payload)
            const delta =
              json.choices?.[0]?.delta?.content ||
              json.choices?.[0]?.delta?.reasoning_content ||
              ''
            if (delta) {
              controller.enqueue(encoder.encode(delta))
            }
          } catch {
            // ignore malformed
          }
        }
      }
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          flushLine()
        }
        buffer += decoder.decode()
        flushLine()
      } catch (err) {
        console.error('[NIM] Stream read error:', err)
      } finally {
        controller.close()
      }
    },
  })
}
