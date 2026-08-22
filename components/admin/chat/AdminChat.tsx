'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { getAuthToken } from '@/lib/auth/clientAuth'
import Markdown from './Markdown'

interface Session {
  id: string
  title: string
  isPinned: boolean
  isArchived: boolean
}

interface Message {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

const COMMANDS = [
  { cmd: '/help', desc: 'Show all commands' },
  { cmd: '/new', desc: 'Start a new conversation' },
  { cmd: '/clear', desc: 'Clear current conversation' },
  { cmd: '/rename <title>', desc: 'Rename this conversation' },
  { cmd: '/prompt <text>', desc: 'Set a custom system prompt for this chat' },
]

// --- Tiny SVG icons (no emojis) ---
const IconPlus = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
const IconPencil = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
const IconPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1z"/></svg>
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
const IconSend = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>
const IconChevL = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
const IconChevR = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>

function makeTitle(text: string): string {
  // First meaningful words of the first message -> conversation title
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > 42 ? clean.slice(0, 42) + '…' : clean || 'New Conversation'
}

export default function AdminChat() {
  const { isAdmin } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')
  const [showCommands, setShowCommands] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // refs to avoid stale closures during streaming
  const activeIdRef = useRef<string | null>(null)
  const messagesRef = useRef<Message[]>([])
  useEffect(() => { activeIdRef.current = activeId }, [activeId])
  useEffect(() => { messagesRef.current = messages }, [messages])

  const api = useCallback(async (url: string, opts: RequestInit = {}) => {
    const token = await getAuthToken()
    return fetch(url, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(opts.headers || {}),
      },
    })
  }, [])

  const loadSessions = useCallback(async () => {
    try {
      const res = await api('/api/admin/chat/sessions')
      const data = await res.json()
      setSessions(data.sessions || [])
    } catch {}
  }, [api])

  useEffect(() => { loadSessions() }, [loadSessions])

  // Load messages ONLY when switching sessions (not during a running stream)
  const loadMessages = useCallback(async (id: string) => {
    try {
      const res = await api(`/api/admin/chat/sessions/${id}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch {}
  }, [api])

  useEffect(() => {
    if (!activeId) return
    loadMessages(activeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, streaming])

  const newChat = async () => {
    try {
      const res = await api('/api/admin/chat/sessions', { method: 'POST', body: JSON.stringify({}) })
      const data = await res.json()
      setActiveId(data.id)
      setMessages([])
      loadSessions()
    } catch {}
  }

  const rename = async (id: string, title: string) => {
    await api(`/api/admin/chat/sessions/${id}`, { method: 'PATCH', body: JSON.stringify({ title }) })
    setRenamingId(null)
    loadSessions()
  }

  const togglePin = async (id: string, isPinned: boolean) => {
    await api(`/api/admin/chat/sessions/${id}`, { method: 'PATCH', body: JSON.stringify({ isPinned: !isPinned }) })
    loadSessions()
  }

  const delChat = async (id: string) => {
    if (!confirm('Delete this conversation?')) return
    await api(`/api/admin/chat/sessions/${id}`, { method: 'DELETE' })
    if (activeIdRef.current === id) { setActiveId(null); setMessages([]) }
    loadSessions()
  }

  const clearChat = () => {
    if (!confirm('Clear all messages in this conversation?')) return
    setMessages([])
  }

  // Handle slash commands locally
  const handleCommand = (text: string): boolean => {
    const lower = text.toLowerCase().trim()
    if (lower === '/help') {
      setMessages((m) => [...m, { role: 'assistant', content: '## Commands\n' + COMMANDS.map((c) => `- **${c.cmd}** — ${c.desc}`).join('\n') + '\n\nTip: Type `/` to see commands.' }])
      return true
    }
    if (lower === '/new') { newChat(); return true }
    if (lower === '/clear') { clearChat(); return true }
    if (lower.startsWith('/rename ')) {
      const title = text.slice(8).trim()
      const id = activeIdRef.current
      if (id && title) rename(id, title)
      return true
    }
    if (lower.startsWith('/prompt ')) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Custom prompt is set on the server via NVIDIA_MODEL/env. You can use /rename and /clear.' }])
      return true
    }
    return false
  }

  const send = async () => {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    setShowCommands(false)

    if (text.startsWith('/')) {
      const handled = handleCommand(text)
      if (handled) return
    }

    const currentId = activeIdRef.current
    // Optimistically add user message
    const userMsg: Message = { role: 'user', content: text }
    const withUser = [...messagesRef.current, userMsg]
    setMessages(withUser)

    setStreaming(true)
    try {
      const token = await getAuthToken()
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ chatId: currentId, content: text, stream: true }),
      })

      if (!res.body) throw new Error('No stream')

      const chatId = res.headers.get('X-Chat-Id')

      // If this created a new session, set it as active (but don't reload messages mid-stream)
      if (chatId && chatId !== activeIdRef.current) {
        activeIdRef.current = chatId
        setActiveId(chatId)
        // auto-title from first message
        api(`/api/admin/chat/sessions/${chatId}`, { method: 'PATCH', body: JSON.stringify({ title: makeTitle(text) }) }).then(() => loadSessions())
      }

      // Append a placeholder assistant message (keep order: user then assistant)
      setMessages((m) => [...m, { role: 'assistant', content: '' }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      let empty = true

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        if (chunk) {
          empty = false
          acc += chunk
          // update LAST message only (the assistant placeholder)
          setMessages((m) => {
            const copy = [...m]
            if (copy.length) copy[copy.length - 1] = { role: 'assistant', content: acc }
            return copy
          })
        }
      }

      if (empty) {
        setMessages((m) => {
          const copy = [...m]
          if (copy.length && copy[copy.length - 1].content === '') {
            copy[copy.length - 1] = { role: 'assistant', content: 'No response generated.' }
          }
          return copy
        })
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error. Please try again.' }])
    } finally {
      setStreaming(false)
      loadSessions()
    }
  }

  const sortedSessions = [...sessions].sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1))

  if (!isAdmin) return null

  return (
    <div className="flex h-[100vh] w-full bg-white overflow-hidden">
      {/* ===== Sidebar ===== */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} border-r border-border flex flex-col bg-[#f9fafb] transition-all duration-200 overflow-hidden flex-shrink-0`}>
        <div className="p-3 border-b border-border">
          <button
            onClick={newChat}
            className="w-full py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors flex items-center justify-center gap-2"
          >
            <IconPlus /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sortedSessions.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`group rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 ${activeId === s.id ? 'bg-accent text-white' : 'hover:bg-gray-100'}`}
            >
              <div className="flex-1 min-w-0">
                {renamingId === s.id ? (
                  <input
                    autoFocus
                    value={renameVal}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setRenameVal(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') rename(s.id, renameVal); if (e.key === 'Escape') setRenamingId(null) }}
                    className="w-full bg-white border border-accent rounded px-1.5 py-0.5 text-xs"
                  />
                ) : (
                  <p className="text-xs font-medium truncate">{s.title}</p>
                )}
              </div>
              {s.isPinned && <IconPin />}
              <div className="hidden group-hover:flex gap-0.5" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { setRenamingId(s.id); setRenameVal(s.title) }} title="Rename" className="p-1 hover:opacity-70"><IconPencil /></button>
                <button onClick={() => togglePin(s.id, s.isPinned)} title={s.isPinned ? 'Unpin' : 'Pin'} className="p-1 hover:opacity-70"><IconPin /></button>
                <button onClick={() => delChat(s.id)} title="Delete" className="p-1 hover:opacity-70"><IconTrash /></button>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="text-xs text-text-tertiary text-center py-6">No conversations yet</p>
          )}
        </div>
        <div className="p-3 border-t border-border text-center">
          <span className="text-[10px] text-text-tertiary">HaziqBot · Admin only</span>
        </div>
      </aside>

      {/* ===== Main Chat ===== */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:bg-gray-100" aria-label="Toggle sidebar">
              {sidebarOpen ? <IconChevL /> : <IconChevR />}
            </button>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-primary">HaziqBot</h2>
              <p className="text-[11px] text-text-tertiary">NVIDIA NIM · Markdown enabled</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowCommands(!showCommands)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-xs font-semibold text-text-secondary hover:bg-gray-200">/ Commands</button>
            {activeId && <button onClick={clearChat} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100">Clear</button>}
          </div>
        </div>

        {/* Command palette */}
        {showCommands && (
          <div className="border-b border-border bg-[#fafafa] px-5 py-3">
            <p className="text-[10px] text-text-tertiary uppercase font-semibold mb-2">Slash Commands</p>
            <div className="flex flex-wrap gap-2">
              {COMMANDS.map((c) => (
                <button key={c.cmd} onClick={() => { setInput(c.cmd + ' '); setShowCommands(false) }} className="px-3 py-1.5 rounded-lg bg-white border border-border text-xs hover:border-accent" title={c.desc}>
                  <code className="text-accent font-semibold">{c.cmd}</code>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white">
          {messages.length === 0 && !streaming && (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </div>
              <h3 className="text-base font-bold text-text-primary mb-1">What can I help you with?</h3>
              <p className="text-xs text-text-tertiary mb-6 max-w-md mx-auto">Ask about client replies, content, coding, business strategy, or type <code className="text-accent">/</code> for commands.</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                {['Write a client reply for a wedding photographer', 'Create an Instagram post idea', 'Help me debug this code', 'Plan my weekly content'].map((q) => (
                  <button key={q} onClick={() => setInput(q)} className="px-3 py-2 rounded-xl bg-gray-50 border border-border text-xs text-text-secondary hover:border-accent hover:text-accent">{q}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${m.role === 'user' ? 'bg-accent text-white rounded-br-md' : 'bg-gray-50 border border-border rounded-bl-md text-text-primary'}`}>
                {m.role === 'user' ? (
                  <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                ) : m.content ? (
                  <Markdown content={m.content} />
                ) : (
                  <div className="flex gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setShowCommands(e.target.value === '/') }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } if (e.key === 'Escape') setShowCommands(false) }}
              placeholder={streaming ? 'HaziqBot is responding...' : 'Ask HaziqBot anything...  (Enter to send, Shift+Enter for new line)'}
              rows={2}
              disabled={streaming}
              className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none text-sm disabled:opacity-60"
            />
            <button onClick={send} disabled={streaming || !input.trim()} className="px-5 py-2 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark disabled:opacity-40 flex items-center gap-2 self-end">
              <IconSend />
            </button>
          </div>
          <p className="text-[10px] text-text-tertiary mt-1.5 flex items-center gap-1">Powered by NVIDIA NIM · Type <code className="text-accent">/</code> for commands</p>
        </div>
      </div>
    </div>
  )
}
