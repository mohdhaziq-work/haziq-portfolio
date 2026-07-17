'use client'

import { SERVICES, PROCESS_STEPS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'
import { useAuth } from '@/lib/auth/AuthContext'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {
  const { user, requireLogin } = useAuth()
  const router = useRouter()

  const handleCTAClick = () => {
    // Require login first, then redirect to contact page
    if (!requireLogin(() => router.push('/contact'))) return
    router.push('/contact')
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Services</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            Professional <span className="text-accent">Solutions</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Transparent pricing, no hidden fees. Choose the plan that fits your business.
          </AnimatedText>
        </div>
      </Section>

      {/* Pricing */}
      <Section background="surface">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((plan, index) => (
            <AnimatedText as="div" key={plan.id} delay={index * 150}>
              <div className={`elevated-card p-10 flex flex-col h-full relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-5 py-1 rounded-full text-caption font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}>
                  {plan.icon === 'rocket' && <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/></svg>}
                  {plan.icon === 'briefcase' && <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                  {plan.icon === 'crown' && <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z"/><path d="M5 16h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Z"/></svg>}
                </div>

                <h3 className="text-display-sm text-text-primary mb-2">{plan.name}</h3>
                <p className="text-body-sm text-text-secondary mb-8">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-display-sm text-text-primary">{plan.price}</span>
                  <span className="text-body-sm text-text-tertiary ml-1">/ {plan.period}</span>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-body-sm text-text-secondary">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-success flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleCTAClick}
                  className={`w-full py-4 rounded-full font-semibold text-body-sm transition-all duration-200 text-center ${
                    plan.popular
                      ? 'bg-accent text-white hover:bg-accent-hover shadow-chip'
                      : 'bg-accent-light text-accent hover:bg-accent-surface'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section background="white">
        <div className="text-center mb-16">
          <AnimatedText as="span" className="section-overline">Process</AnimatedText>
          <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary">
            How We <span className="text-accent">Work Together</span>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <AnimatedText as="div" key={step.step} delay={index * 150}>
              <div className="elevated-card p-8 text-center h-full">
                <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-display-sm text-accent font-bold">{step.step}</span>
                </div>
                <h3 className="text-headline text-text-primary mb-3">{step.title}</h3>
                <p className="text-body-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>

      {/* FAQ-like Section */}
      <Section background="surface">
        <div className="max-w-3xl mx-auto">
          <AnimatedText as="h2" className="text-display-sm text-text-primary mb-10 text-center">
            Common <span className="text-accent">Questions</span>
          </AnimatedText>

          {[
            { q: 'Do you offer a free mockup?', a: 'Yes! I create a free homepage mockup for your business. If you like it, we move forward. No pressure at all.' },
            { q: 'How long does it take to build a website?', a: 'Starter: 3 days. Business: 7 days. Premium: 14 days. Timelines are clear and guaranteed.' },
            { q: 'What if I need changes after delivery?', a: 'Each plan includes revision rounds. Starter: 1 round, Business: 2 rounds, Premium: 3 rounds.' },
            { q: 'Will my website work on mobile?', a: 'Absolutely. Every website I build is mobile-first and responsive on all devices.' },
            { q: 'How do I get started?', a: "Simply sign in and submit your project details, or DM me on Instagram. I'll take it from there!" },
          ].map((faq, index) => (
            <AnimatedText as="div" key={index} delay={index * 100}>
              <div className="surface-card mb-4">
                <h4 className="font-semibold text-text-primary mb-2">{faq.q}</h4>
                <p className="text-body-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>
    </div>
  )
}
