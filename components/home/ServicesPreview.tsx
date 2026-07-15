'use client'

import { SERVICES, SOCIAL } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Link from 'next/link'

export default function ServicesPreview() {
  return (
    <Section id="services" background="surface">
      {/* Header */}
      <div className="text-center mb-16">
        <AnimatedText as="span" className="section-overline">Services</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          What I <span className="text-accent">Offer</span>
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          Professional solutions for every business size. No fluff, just results.
        </AnimatedText>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((plan, index) => (
          <AnimatedText as="div" key={plan.id} delay={index * 150}>
            <div className={`elevated-card p-8 flex flex-col h-full relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}>
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-5 py-1 rounded-full text-caption font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}>
                {plan.icon === 'rocket' && <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>}
                {plan.icon === 'briefcase' && <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                {plan.icon === 'crown' && <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z"/><path d="M5 16h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Z"/></svg>}
              </div>

              {/* Name */}
              <h3 className="text-headline text-text-primary mb-2">{plan.name}</h3>
              <p className="text-body-sm text-text-secondary mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-display-sm text-text-primary">{plan.price}</span>
                <span className="text-body-sm text-text-tertiary ml-1">/ {plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-body-sm text-text-secondary">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-success flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-full font-semibold text-body-sm transition-all duration-200 text-center ${
                  plan.popular
                    ? 'bg-accent text-white hover:bg-accent-hover shadow-chip'
                    : 'bg-accent-light text-accent hover:bg-accent-surface'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </AnimatedText>
        ))}
      </div>

      {/* View All */}
      <AnimatedText as="div" delay={500} className="text-center mt-12">
        <Link href="/services" className="btn-outline px-8 py-3">
          Compare All Plans
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </AnimatedText>
    </Section>
  )
}
