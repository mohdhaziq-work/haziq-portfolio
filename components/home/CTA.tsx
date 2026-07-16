'use client'

import { SITE } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

export default function CTA() {
  return (
    <Section background="surface" padding="large">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedText as="div" delay={0} className="mb-8">
          <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-accent"><path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
          </div>
        </AnimatedText>

        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-6">
          Want a <span className="text-accent">FREE Mockup</span>?
        </AnimatedText>

        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
          Not sure if a website is right for you? I&apos;ll design a <strong className="text-text-primary">free mockup</strong> of your 
          homepage first. If you love it, we work together. <strong className="text-accent">No pressure, no risk.</strong>
        </AnimatedText>

        <AnimatedText as="div" delay={300} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openInstagramDM('Hi Haziq! I would like a FREE mockup for my business website.')}
            className="btn-primary px-10 py-4 text-body-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
            Request Free Mockup
          </button>
          <a href="/contact" className="btn-outline px-10 py-4 text-body-md">
            View Contact Options
          </a>
        </AnimatedText>

        <AnimatedText as="p" delay={400} className="mt-8 text-caption text-text-tertiary">
          🔒 No commitment required • Response within 2 hours
        </AnimatedText>
      </div>
    </Section>
  )
}
