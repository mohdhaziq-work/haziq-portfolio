'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'
import { useAuth } from '@/lib/auth/AuthContext'
import { resolveBusinessFromClientId, CLIENT_BUSINESSES, type ClientBusiness } from '@/lib/client-registry'
import MockupRenderer from '@/components/mockups/MockupRenderer'

export default function FreeMockupPage() {
  const { user, requireLogin } = useAuth()
  const [clientId, setClientId] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [claimResult, setClaimResult] = useState<ClientBusiness | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setFeedback('')
    setNotFound(false)

    // Must login first before entering client_id
    if (!requireLogin()) {
      setFeedback('Please sign in with Google first to claim your free mockup.')
      return
    }

    if (!clientId.trim()) {
      setFeedback('Please enter your Client ID.')
      return
    }

    // Resolve which business this Client ID belongs to
    const business = resolveBusinessFromClientId(clientId)
    if (!business) {
      setNotFound(true)
      setFeedback('This Client ID could not be found. Please double-check the ID you received via DM, or message Haziq.')
      return
    }

    setSubmitting(true)
    try {
      // Save the claim to Firestore
      const { submitClientMockup } = await import('@/lib/firebase/firestore')
      await submitClientMockup({
        clientId: clientId.trim().toUpperCase(),
        clientEmail: user?.email || '',
        businessName,
      })

      // Send a mockup-request confirmation email to the client
      try {
        const token = await user?.getIdToken()
        if (token && user?.email) {
          await fetch('/api/email/mockup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: user.email,
              clientName: user.displayName || user.email.split('@')[0],
              businessName,
              clientId: clientId.trim().toUpperCase(),
            }),
          })
        }
      } catch (emailErr) {
        console.error('[Mockup] Email send failed:', emailErr)
      }

      // Show this business's mockup
      setClaimResult(business)
    } catch {
      // Even if Firestore fails, show the mockup
      setClaimResult(business)
    } finally {
      setSubmitting(false)
    }
  }

  // ---- STEP 2: Mockup revealed ----
  if (claimResult) {
    return (
      <div className="pt-24 pb-16">
        <Section background="white" padding="small">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="34" height="34" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-success">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <AnimatedText as="span" className="section-overline">Free Mockup Ready</AnimatedText>
            <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-4">
              Here&apos;s your free mockup, <span className="text-accent">{businessName || claimResult.name}</span>!
            </AnimatedText>
            <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary mb-2">
              This is a preview of a website design concept for <strong className="text-text-primary">{claimResult.name}</strong>.
            </AnimatedText>
            <AnimatedText as="p" delay={250} className="text-body-md text-text-secondary mb-8">
              Like what you see? Let&apos;s turn this into your real website. Message me on Instagram and I&apos;ll walk you through it.
            </AnimatedText>
          </div>
        </Section>

        <Section background="surface">
          <div className="max-w-4xl mx-auto">
            <MockupRenderer businessId={claimResult.id} />

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openInstagramDM(`Hi Haziq! I just saw my free mockup for ${claimResult.name} (Client ID: ${clientId.trim().toUpperCase()}). I love it, let's build my website!`)}
                className="btn-primary px-8 py-4 text-body-md"
              >
                I Love It — Let&apos;s Build It!
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <button
                onClick={() => { setClaimResult(null); setClientId(''); setBusinessName(''); }}
                className="btn-outline px-8 py-4 text-body-md"
              >
                Claim Another Client
              </button>
            </div>
            <p className="text-center text-caption text-text-tertiary mt-4">
              This is a design concept. The final website will be fully responsive with your real photos, menu, and contact details.
            </p>
          </div>
        </Section>
      </div>
    )
  }

  // ---- STEP 1: Claim form ----
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
                You received a unique Client ID from Haziq via DM. Enter it below to see your free website mockup.
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
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    placeholder="Your business name"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all disabled:opacity-50"
                  />
                </div>

                {feedback && (
                  <div className={`p-3 rounded-lg border text-sm ${notFound ? 'border-red-300 bg-red-50 text-red-700' : 'border-accent/20 bg-accent-light/40 text-text-secondary'}`}>
                    {feedback}
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full py-4 justify-center text-body-md disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      Claim My Free Mockup
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                    </>
                  )}
                </button>
                <p className="text-center text-caption text-text-tertiary">
                  After submitting, your free website mockup will appear right here.
                </p>
              </form>
            </div>
          </AnimatedText>

          {/* Note about linked businesses */}
          <AnimatedText as="div" delay={150} className="mt-6">
            <div className="elevated-card p-5 text-center">
              <p className="text-caption text-text-tertiary mb-3">
                Free mockups are available for these businesses:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {CLIENT_BUSINESSES.map((b) => (
                  <span key={b.id} className="inline-block px-3 py-1.5 rounded-full bg-accent-light text-accent text-xs font-semibold">
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedText>
        </div>
      </Section>
    </div>
  )
}
