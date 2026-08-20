'use client'

import { useState } from 'react'
import { getAuthToken } from '@/lib/auth/clientAuth'

/**
 * Admin email diagnostic tool.
 * Fetches an auth token and calls /api/email/test so the admin can
 * confirm the email system works (SMTP configured + test email delivered).
 */
export default function EmailTest() {
  const [status, setStatus] = useState<any>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runStatus = async () => {
    setLoading(true)
    setError('')
    setStatus(null)
    try {
      const token = await getAuthToken()
      if (!token) throw new Error('Not signed in — please log in first.')
      const res = await fetch('/api/email/test', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setStatus(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const sendTest = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const token = await getAuthToken()
      if (!token) throw new Error('Not signed in — please log in first.')
      const res = await fetch('/api/email/test', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={runStatus}
          disabled={loading}
          className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark disabled:opacity-50"
        >
          {loading ? 'Checking...' : '1. Check Email System'}
        </button>
        <button
          onClick={sendTest}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : '2. Send All Test Emails'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {status && (
        <div className="bg-white border border-border rounded-xl p-4 space-y-2">
          <p className="text-[10px] text-accent uppercase font-semibold">Email System Status</p>
          <div className="grid grid-cols-1 gap-1.5 text-xs">
            <Row k="SMTP Configured" v={status.smtpConfigured ? '✅ Yes' : '❌ No'} />
            <Row k="SMTP User" v={status.smtpUser || '(empty)'} />
            <Row k="SMTP Pass Set" v={status.smtpPassSet ? '✅ Yes' : '❌ No'} />
            <Row k="Firebase Admin Set" v={status.firebaseServiceAccountSet ? '✅ Yes' : '❌ No'} />
          </div>
          {!status.smtpConfigured && (
            <p className="text-[11px] text-red-600 bg-red-50 rounded-lg p-2.5 mt-1">
              SMTP configured nahi hai. Vercel env me <b>SMTP_USER</b> + <b>SMTP_PASS</b> (Gmail app password) daalo aur redeploy karo.
            </p>
          )}
        </div>
      )}

      {result && (
        <div className="bg-white border border-border rounded-xl p-4 space-y-2">
          <p className="text-[10px] text-green-600 uppercase font-semibold">Test Emails Result</p>
          <p className="text-xs text-text-secondary">
            Sent to: <b>{result.to}</b> — sab email templates bhej diye gaye hain. Inbox + spam check karo.
          </p>
          {result.results && (
            <div className="space-y-1.5">
              {Object.entries(result.results).map(([key, ok]) => (
                <div key={key} className="flex justify-between items-center py-1 border-b border-border/50 last:border-0">
                  <span className="text-xs text-text-tertiary capitalize">{key.replace(/-/g, ' ')}</span>
                  <span className={`text-xs font-semibold ${ok ? 'text-green-600' : 'text-red-600'}`}>
                    {ok ? '✅ Sent' : '❌ ' + (result.errors?.[key] || 'Failed')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-border/50 last:border-0">
      <span className="text-text-tertiary">{k}</span>
      <span className="font-medium text-text-primary">{v}</span>
    </div>
  )
}
