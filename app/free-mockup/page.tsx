'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'
import { useAuth } from '@/lib/auth/AuthContext'

export default function FreeMockupPage() {
  const { user, requireLogin } = useAuth()
  const [clientId, setClientId] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [instagramHandle, setInstagramHandle] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setFeedback('')

    // Must login first before entering client_id
    if (!requireLogin()) {
      setFeedback('Please sign in with Google first to claim your free mockup.')
      return
    }

    if (!clientId.trim()) {
      setFeedback('Please enter your Client ID.')
      return
    }

    setSubmitting(true)
    try {
      const { submitClientMockup } = await import('@/lib/firebase/firestore')
      const result = await submitClientMockup({
        clientId: clientId.trim().toUpperCase(),
        clientEmail: user?.email || '',
        businessName,
        instagramHandle,
        message,
      })

      if (result.success && result.instagramDmUrl) {
        setFeedback('Thank you! Your mockup request is noted. Opening Instagram DM to confirm with Haziq...')
        window.location.href = result.instagramDmUrl
      } else {
        setFeedback(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setFeedback('Thank you! Redirecting to Instagram DM...')
      openInstagramDM()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-24">
      <Section background="white" padding="small">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedText as="span" className="section-overline">Free Mockup</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            Claim Your <span className="text-accent">Free Mockup</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Not sure if a website is right for you? I&apos;ll design a free mockup of your homepage first.
            If you love it, we work together. No pressure, no risk.
          </AnimatedText>
        </div>
      </Section>

      <Section background="surface">
        <div className="max-w-2xl mx-auto">
          <AnimatedText as="div">
            <div className="elevated-card p-8 md:p-10">
              <h2 className="text-headline text-text-primary mb-2">Enter Your Client ID</h2>
              <p className="text-body-sm text-text-secondary mb-8">
                You received a unique Client ID from Haziq via DM. Enter it below to claim your free mockup.
              </p>

              {/* Login state notice */}
              <div className="mb-6 flex items-center gap-3 p-3 rounded-lg border border-accent/15 bg-accent-light/40" data-tour="login-state">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent flex-shrink-0">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <p className="text-xs text-text-secondary">
                  {user ? (
                    <><span className="text-accent font-semibold">Signed in as {user.email}</span>. You can now enter your Client ID.</>
                  ) : (
                    <>You&apos;ll be asked to <span className="text-accent font-semibold">sign in with Google</span> before entering your Client ID.</>
                  )}
                </p>
              </div>

              <form className="space-y-5" data-tour="mockup-form" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Client ID *</label>
                  <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                    placeholder="e.g. MS-XXXXXX"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business name"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Instagram Handle</label>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="@yourbusiness"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Tell me about your business</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="What does your business do? What kind of look do you like?"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none disabled:opacity-50"
                  />
                </div>

                {feedback && (
                  <div className="p-3 rounded-lg border border-accent/20 bg-accent-light/40 text-sm text-text-secondary">
                    {feedback}
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full py-4 justify-center text-body-md disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Claim Free Mockup
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                    </>
                  )}
                </button>
                <p className="text-center text-caption text-text-tertiary">
                  After submitting, you&apos;ll be redirected to Instagram DM to confirm with Haziq directly.
                </p>
              </form>
            </div>
          </AnimatedText>
        </div>
      </Section>
    </div>
  )
}
