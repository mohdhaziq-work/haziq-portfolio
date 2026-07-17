'use client'

import { useAuth } from '@/lib/auth/AuthContext'

export default function LoginPopup() {
  const { showLoginPopup, setShowLoginPopup, signInWithGoogle, loading } = useAuth()

  if (!showLoginPopup) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setShowLoginPopup(false)}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8"
        style={{ animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Close button */}
        <button
          onClick={() => setShowLoginPopup(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-accent">
            <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-headline text-text-primary text-center mb-2">Login Required</h2>
        <p className="text-body-sm text-text-secondary text-center mb-6">
          Sign in with Google to continue. This helps us track your project and keep you updated.
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-border rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-text-primary font-medium text-body-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        {/* Footer */}
        <p className="text-center text-[11px] text-text-tertiary mt-4 leading-relaxed">
          By signing in, you agree to our terms. We only use your email to track your project.
        </p>
      </div>

      {/* Animations handled via globals.css */}
    </div>
  )
}
