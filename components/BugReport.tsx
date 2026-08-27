'use client'

import { useState } from 'react'
import { trackEvent } from './GoogleAnalytics'

export default function BugReport() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    type: 'bug',
    title: '',
    description: '',
    email: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Track the bug report
      trackEvent.bugReport()

      // Send via email (using existing email infrastructure)
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `[${formData.type.toUpperCase()}] ${formData.title}`,
          message: `
Type: ${formData.type}
Title: ${formData.title}
Description: ${formData.description}
Email: ${formData.email || 'Not provided'}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
          `,
        }),
      })

      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFormData({ type: 'bug', title: '', description: '', email: '' })
      }, 2000)
    } catch (error) {
      console.error('Bug report error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Bug Report Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Report a bug"
        title="Report a bug or give feedback"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {submitted ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" fill="none" stroke="#10b981" viewBox="0 0 24 24" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-sm text-gray-600">Your report has been submitted. We&apos;ll look into it.</p>
              </div>
            ) : (
              /* Form */
              <>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="#f97316" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Report an Issue</h3>
                    <p className="text-xs text-gray-500">Help us improve the website</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="feedback">General Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description of the issue"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="What happened? What did you expect?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="For follow-up (optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
