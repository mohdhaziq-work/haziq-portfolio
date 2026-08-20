'use client'

import { useState, useRef, useEffect } from 'react'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const QUICK = [
  'Summarize today',
  'Help me write a client reply',
  'Give me a post idea',
  'How to onboard a client?',
]

export default function AdminAIChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        "Hey Haziq 👋 This is your private AI assistant in your admin panel. I can help you with replies, content, ideas, onboarding, and more. What do you need?",
    },
  ])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async (text?: string) => {
    const value = (text ?? input).trim()
    if (!value || loading) return
    const userMsg: Msg = { role: 'user', content: value }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error talking to AI. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl bg-white border border-border overflow-hidden flex flex-col h-[520px]">
      <div className="px-4 py-3 bg-accent text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">AI</div>
          <div>
            <div className="text-sm font-semibold">Private AI Assistant</div>
            <div className="text-[10px] text-white/80">Admin only · powered by your NVIDIA key</div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-surface">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-accent text-white rounded-br-sm'
                  : 'bg-white border border-border text-text-primary rounded-bl-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-border px-3.5 py-2 rounded-xl rounded-bl-sm flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-1 flex flex-wrap gap-1.5">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-[11px] bg-accent-light text-accent px-2.5 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        className="p-2.5 border-t border-border bg-white flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your assistant..."
          className="flex-1 px-3.5 py-2 rounded-full border border-border bg-surface text-xs focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  )
}
