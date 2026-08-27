'use client'

import { useAuth } from '@/lib/auth/AuthContext'
import Link from 'next/link'

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()

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
          <Link href="/" className="text-accent hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
          <p className="text-text-secondary">Welcome back, {user?.displayName || 'Admin'}!</p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Chat */}
          <Link href="/admin/chat" className="group">
            <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group-hover:border-accent/30">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">AI Chat Assistant</h2>
              <p className="text-sm text-text-secondary">Chat with HaziqBot for help with code, content, and website management.</p>
              <div className="mt-4 text-accent text-sm font-medium group-hover:underline">
                Open Chat →
              </div>
            </div>
          </Link>

          {/* Bug Reports */}
          <Link href="/admin/bugs" className="group">
            <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group-hover:border-accent/30">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-orange-500">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Bug Reports</h2>
              <p className="text-sm text-text-secondary">View and manage user-submitted bug reports and feedback.</p>
              <div className="mt-4 text-accent text-sm font-medium group-hover:underline">
                View Reports →
              </div>
            </div>
          </Link>

          {/* Email Test */}
          <Link href="/admin/email-test" className="group">
            <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group-hover:border-accent/30">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-blue-500">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Email Test</h2>
              <p className="text-sm text-text-secondary">Test email delivery and view email system status.</p>
              <div className="mt-4 text-accent text-sm font-medium group-hover:underline">
                Test Emails →
              </div>
            </div>
          </Link>

          {/* Image Studio */}
          <Link href="/admin/image-studio" className="group">
            <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all group-hover:border-accent/30">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-purple-500">
                  <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Image Studio</h2>
              <p className="text-sm text-text-secondary">Upload, edit, and manage images for your portfolio.</p>
              <div className="mt-4 text-accent text-sm font-medium group-hover:underline">
                Open Studio →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
