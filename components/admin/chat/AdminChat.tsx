'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { getAuthToken } from '@/lib/auth/clientAuth'
import Markdown from './Markdown'

interface Session {
  id: string
  title: string
  isPinned: boolean
}

interface Message {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

export default function AdminChat() {
  const { user, isAdmin } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

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
      if (!activeId && data.sessions?.length) {
        setActiveId(data.sessions[0].id)
      }
    } catch {}
  }, [api, activeId])

  useEffect(() => {
    loadSessions()
  }, [loadSessions])

  useEffect(() => {
    if (!activeId) return
    const loadMessages = async () => {
      try {
        const res = await api(`/api/admin/chat/sessions/${activeId}`)
        const data = await res.json()
        setMessages(data.messages || [])
      } catch {}
    }
    loadMessages()
  }, [activeId, api])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  const newChat = async () => {
    try {
      const res = await api('/api/admin/chat/sessions', { method: 'POST', body: JSON.stringify({}) })
      const data = await res.json()
      setActiveId(data.id)
      setMessages([])
      loadSessions()
    } catch {}
  }

  const selectChat = (id: string) => setActiveId(id)

  const rename = async (id: string) => {
    await api(`/api/admin/chat/sessions/${id}`, { method: 'PATCH', body: JSON.stringify({ title: renameVal }) })
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
    if (activeId === id) {
      setActiveId(null)
      setMessages([])
    }
    loadSessions()
  }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setLoading(true)
    try {
      const res = await api('/api/admin/chat', {
        method: 'POST',
        body: JSON.stringify({ chatId: activeId, content: text }),
      })
      const data = await res.json()
      if (data.chatId && !activeId) {
        setActiveId(data.chatId)
        loadSessions()
      }
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'No response.' }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error. Please try again.' }])
    } finally {
      setLoading(false)
      loadSessions()
    }
  }

  const sortedSessions = [...sessions].sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1))

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[500px] rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col bg-[#f9fafb]">
        <div className="p-3 border-b border-border">
          <button
            onClick={newChat}
            className="w-full py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors"
          >
            + New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sortedSessions.map((s) => (
            <div
              key={s.id}
              onClick={() => selectChat(s.id)}
              className={`group rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 ${
                activeId === s.id ? 'bg-accent text-white' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex-1 min-w-0">
                {renamingId === s.id ? (
                  <input
                    autoFocus
                    value={renameVal}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setRenameVal(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') rename(s.id); if (e.key === 'Escape') setRenamingId(null) }}
                    className="w-full bg-white border border-accent rounded px-1.5 py-0.5 text-xs"
                  />
                ) : (
                  <p className="text-xs font-medium truncate">{s.title}</p>
                )}
              </div>
              {s.isPinned && <span className="text-xs">📌</span>}
              <div className="hidden group-hover:flex gap-1" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { setRenamingId(s.id); setRenameVal(s.title) }} className="text-[10px] p-0.5 hover:opacity-70">✏️</button>
                <button onClick={() => togglePin(s.id, s.isPinned)} className="text-[10px] p-0.5 hover:opacity-70">{s.isPinned ? '📌' : '📍'}</button>
                <button onClick={() => delChat(s.id)} className="text-[10px] p-0.5 hover:opacity-70">🗑️</button>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="text-xs text-text-tertiary text-center py-6">No conversations yet</p>
          )}
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex-1 flex flex-col">
        {/* header */}
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-text-primary">AI Assistant</h2>
            <p className="text-[11px] text-text-tertiary">HaziqBot · admin only</p>
          </div>
          {activeId && (
            <span className="text-[10px] text-text-tertiary">Session active</span>
          )}
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white">
          {messages.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </div>
              <p className="text-sm text-text-secondary font-medium mb-1">Start a new conversation</p>
              <p className="text-xs text-text-tertiary">Ask about client replies, content, code, or business ideas</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  m.role === 'user'
                    ? 'bg-accent text-white rounded-br-md'
                    : 'bg-gray-50 border border-border rounded-bl-md text-text-primary'
                }`}
              >
                {m.role === 'user' ? m.content : <Markdown content={m.content} />}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-border px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder="Ask HaziqBot anything... (Enter to send, Shift+Enter for new line)"
              rows={2}
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none text-sm"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-5 py-2 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark disabled:opacity-40 flex items-center gap-2"
            >
              Send
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
          <p className="text-[10px] text-text-tertiary mt-1.5">Powered by NVIDIA NIM · Conversations saved in Firestore</p>
        </div>
      </div>
    </div>
  )
}
