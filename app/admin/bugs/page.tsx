'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'

interface BugReport {
  id: string
  type: string
  title: string
  description: string
  email: string
  url: string
  userAgent: string
  status: string
  createdAt: string
  resolvedAt: string | null
  adminNotes: string
}

export default function AdminBugsPage() {
  const { user, isAdmin, loading } = useAuth()
  const [bugs, setBugs] = useState<BugReport[]>([])
  const [loadingBugs, setLoadingBugs] = useState(true)
  const [filter, setFilter] = useState<'all' | 'open' | 'investigating' | 'resolved'>('all')
  const [selectedBug, setSelectedBug] = useState<BugReport | null>(null)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (isAdmin) {
      fetchBugs()
    }
  }, [isAdmin])

  const fetchBugs = async () => {
    try {
      setLoadingBugs(true)
      const token = await user?.getIdToken()
      const res = await fetch('/api/admin/bugs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.bugs) {
        setBugs(data.bugs)
      }
    } catch (error) {
      console.error('Failed to fetch bugs:', error)
    } finally {
      setLoadingBugs(false)
    }
  }

  const updateBugStatus = async (bugId: string, status: string) => {
    try {
      const token = await user?.getIdToken()
      await fetch(`/api/admin/bugs/${bugId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminNotes: notes }),
      })
      fetchBugs()
      setSelectedBug(null)
      setNotes('')
    } catch (error) {
      console.error('Failed to update bug:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Access Denied</h1>
          <p className="text-text-secondary">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    )
  }

  const filteredBugs = filter === 'all' ? bugs : bugs.filter(b => b.status === filter)

  const statusColors: Record<string, string> = {
    open: 'bg-red-100 text-red-700',
    investigating: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
  }

  const typeIcons: Record<string, string> = {
    bug: '🐛',
    feature: '💡',
    feedback: '💬',
    other: '📝',
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Bug Reports & Feedback</h1>
          <p className="text-text-secondary">View and manage user-submitted bug reports and feedback.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-text-primary">{bugs.length}</div>
            <div className="text-sm text-text-secondary">Total Reports</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-red-600">{bugs.filter(b => b.status === 'open').length}</div>
            <div className="text-sm text-text-secondary">Open</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-yellow-600">{bugs.filter(b => b.status === 'investigating').length}</div>
            <div className="text-sm text-text-secondary">Investigating</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-green-600">{bugs.filter(b => b.status === 'resolved').length}</div>
            <div className="text-sm text-text-secondary">Resolved</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'open', 'investigating', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-accent text-white'
                  : 'bg-white text-text-secondary hover:bg-gray-100 border border-border'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && ` (${bugs.filter(b => b.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Bug List */}
        {loadingBugs ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredBugs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary mx-auto mb-4">
              <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <p className="text-text-secondary">No {filter !== 'all' ? filter : ''} bug reports found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBugs.map((bug) => (
              <div
                key={bug.id}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedBug(bug)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{typeIcons[bug.type] || '📝'}</span>
                      <h3 className="font-semibold text-text-primary">{bug.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[bug.status]}`}>
                        {bug.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-2">{bug.description}</p>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary">
                      <span>Type: {bug.type}</span>
                      {bug.email !== 'Not provided' && <span>Email: {bug.email}</span>}
                      <span>{new Date(bug.createdAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-text-tertiary flex-shrink-0">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bug Detail Modal */}
        {selectedBug && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedBug(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <button
                onClick={() => setSelectedBug(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{typeIcons[selectedBug.type] || '📝'}</span>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{selectedBug.title}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedBug.status]}`}>
                    {selectedBug.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Description</label>
                  <p className="mt-1 text-text-primary bg-surface p-3 rounded-lg">{selectedBug.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Type</label>
                    <p className="mt-1 text-text-primary">{selectedBug.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Email</label>
                    <p className="mt-1 text-text-primary">{selectedBug.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Page URL</label>
                    <p className="mt-1 text-text-primary text-xs break-all">{selectedBug.url}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Submitted</label>
                    <p className="mt-1 text-text-primary">{new Date(selectedBug.createdAt).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary">Admin Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this bug..."
                    className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateBugStatus(selectedBug.id, 'investigating')}
                    className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Mark Investigating
                  </button>
                  <button
                    onClick={() => updateBugStatus(selectedBug.id, 'resolved')}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
