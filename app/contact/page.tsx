'use client'

import { SITE, SOCIAL } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Contact</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            Let&apos;s Build <span className="text-accent">Together</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Ready to take your business digital? Drop me a message and I&apos;ll get back to you within 2 hours.
          </AnimatedText>
        </div>
      </Section>

      {/* Contact Grid */}
      <Section background="surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedText as="div" delay={0}>
            <div className="elevated-card p-8 md:p-10">
              <h2 className="text-headline text-text-primary mb-2">Send a Message</h2>
              <p className="text-body-sm text-text-secondary mb-8">Fill out the form and I&apos;ll respond via Instagram DM.</p>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Thank you! I will reach out to you on Instagram soon.') }}>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Business Name</label>
                  <input
                    type="text"
                    placeholder="Your business name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Instagram Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="@yourusername"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">What do you need?</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all appearance-none">
                    <option value="">Select a service</option>
                    <option value="starter">Starter — ₹2,500</option>
                    <option value="business">Business — ₹6,000</option>
                    <option value="premium">Premium — ₹12,000</option>
                    <option value="custom">Custom Project</option>
                    <option value="free-mockup">Free Mockup First</option>
                  </select>
                </div>
                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">Tell me about your business</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What does your business do? What kind of website do you need?"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary text-body-md placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 justify-center text-body-md">
                  Send Message
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </form>
            </div>
          </AnimatedText>

          {/* Contact Info */}
          <div>
            <AnimatedText as="div" delay={100} className="mb-6">
              <div className="elevated-card p-8 flex items-start gap-5">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-accent"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Instagram DM</h3>
                  <p className="text-body-sm text-text-secondary mb-3">The fastest way to reach me. I reply within 2 hours.</p>
                  <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold text-body-sm hover:underline">
                    Send a DM →
                  </a>
                </div>
              </div>
            </AnimatedText>

            <AnimatedText as="div" delay={200} className="mb-6">
              <div className="elevated-card p-8 flex items-start gap-5">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Location</h3>
                  <p className="text-body-sm text-text-secondary">{SITE.city}, {SITE.state}, {SITE.country}</p>
                  <p className="text-caption text-text-tertiary mt-1">Available for remote work worldwide</p>
                </div>
              </div>
            </AnimatedText>

            <AnimatedText as="div" delay={300} className="mb-6">
              <div className="elevated-card p-8 flex items-start gap-5">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Response Time</h3>
                  <p className="text-body-sm text-text-secondary">Usually within 2 hours</p>
                  <p className="text-caption text-text-tertiary mt-1">9 AM - 10 PM IST, Mon-Sat</p>
                </div>
              </div>
            </AnimatedText>

            <AnimatedText as="div" delay={400}>
              <div className="elevated-card p-8 border-2 border-accent/20 bg-accent-light/30">
                <h3 className="font-semibold text-text-primary mb-2">🎁 Free Mockup Offer</h3>
                <p className="text-body-sm text-text-secondary mb-4">
                  Not sure yet? I&apos;ll design a free mockup of your website. If you love it, we work together. No risk.
                </p>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3 text-body-sm">
                  Request Free Mockup
                </a>
              </div>
            </AnimatedText>
          </div>
        </div>
      </Section>
    </div>
  )
}
