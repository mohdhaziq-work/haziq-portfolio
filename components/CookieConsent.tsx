'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent')
    if (!hasConsented) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => setShowConsent(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Cookie Icon */}
          <div className="flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="9" r="1" fill="#f59e0b" />
              <circle cx="15" cy="8" r="1" fill="#f59e0b" />
              <circle cx="10" cy="14" r="1" fill="#f59e0b" />
              <circle cx="16" cy="13" r="1" fill="#f59e0b" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-title text-text-primary mb-1">We use cookies</h3>
            <p className="text-body-sm text-text-secondary">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. 
              By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
              <a href="/privacy-policy" className="text-accent hover:underline ml-1">Learn more</a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-body-sm text-text-secondary hover:text-text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-body-sm text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
