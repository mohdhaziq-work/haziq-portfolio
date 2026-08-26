'use client'

import { SITE, SERVICES, PROCESS_STEPS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Link from 'next/link'
import { openInstagramDM } from '@/lib/instagram'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'

export default function ServicesPage() {
  const { requireLogin } = useAuth()
  const router = useRouter()

  // Select a plan: require login first, then redirect to contact with plan preselected
  const handlePlanSelect = (planId: string) => {
    requireLogin(() => {
      router.push(`/contact?plan=${planId}`)
    })
  }

  return (
    <>
      {/* SEO: Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Web Development Services by Mohd Haziq',
            description: 'Professional website development services by Mohd Haziq. Starter, Business, and Premium plans.',
            itemListElement: SERVICES.map((plan, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Service',
                name: `${plan.name} Website by Mohd Haziq`,
                description: plan.description,
                offers: {
                  '@type': 'Offer',
                  price: plan.price.replace(/[^0-9]/g, ''),
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              },
            })),
          }),
        }}
      />
      {/* Page Content */}
      <div className="pt-24 pb-16">
        <Section id="services-hero">
          <div className="text-center mb-16">
            <AnimatedText as="span" className="section-overline">Services</AnimatedText>
            <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-4">
              Website Development by{' '}
              <span className="text-accent">Mohd Haziq</span>
            </AnimatedText>
            <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Professional websites for every business. Affordable, fast, mobile-friendly.
              Get a free mockup before you commit.
            </AnimatedText>
            {/* SEO: Hidden keyword content */}
            <p className="sr-only">
              Mohd Haziq offers professional web development services including restaurant websites,
              coaching center websites, gym websites, business landing pages, and custom web applications.
              Affordable website development starting at Rs 2,500. Hire Mohd Haziq Web Developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((plan, index) => (
              <AnimatedText as="div" key={plan.id} delay={index * 150}>
                <div 
                  className={`elevated-card p-8 flex flex-col h-full relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}
                  data-tour={`${plan.id}-plan`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-5 py-1 rounded-full text-caption font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}>
                    {plan.icon === 'rocket' && <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>}
                    {plan.icon === 'briefcase' && <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                    {plan.icon === 'crown' && <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z"/><path d="M5 16h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Z"/></svg>}
                  </div>

                  <h2 className="text-headline text-text-primary mb-2">{plan.name}</h2>
                  <p className="text-body-sm text-text-secondary mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <span className="text-display-sm text-text-primary">{plan.price}</span>
                    <span className="text-body-sm text-text-tertiary ml-1">/ {plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-body-sm text-text-secondary">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-success flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3.5 rounded-full font-semibold text-body-sm transition-all duration-200 text-center ${
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

        <Section id="process" background="surface" data-tour="process-section">
          <div className="text-center mb-16">
            <AnimatedText as="span" className="section-overline">Process</AnimatedText>
            <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
              How I <span className="text-accent">Work</span>
            </AnimatedText>
            <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
              Simple, transparent, and efficient. From idea to launch in days.
            </AnimatedText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <AnimatedText as="div" key={step.step} delay={index * 150}>
                <div className="elevated-card p-6 text-center h-full">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-body-sm font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-headline-sm text-text-primary mb-2">{step.title}</h3>
                  <p className="text-body-sm text-text-secondary">{step.description}</p>
                </div>
              </AnimatedText>
            ))}
          </div>
        </Section>

        <Section id="cta">
          <div className="elevated-card p-12 text-center max-w-2xl mx-auto">
            <AnimatedText as="h2" delay={100} className="text-display-sm text-text-primary mb-4">
              Ready to <span className="text-accent">get started</span>?
            </AnimatedText>
            <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary mb-8">
              Get a free mockup for your business website. No commitment needed.
            </AnimatedText>
            <AnimatedText as="div" delay={300} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openInstagramDM('Hi Haziq! I would like a free website mockup for my business.')}
                className="btn-primary px-8 py-4 text-body-md"
              >
                Get Free Mockup
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <Link href="/projects" className="btn-outline px-8 py-4 text-body-md">
                View My Work
              </Link>
            </AnimatedText>
          </div>
        </Section>
      </div>
    </>
  )
}
