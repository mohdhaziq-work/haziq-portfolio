'use client'

import { TESTIMONIALS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'

export default function Testimonials() {
  return (
    <Section id="testimonials" background="surface">
      <div className="text-center mb-14">
        <AnimatedText as="span" className="section-overline">Testimonials</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          What My <span className="text-accent">Clients</span> Say
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          Real feedback from businesses I&apos;ve built websites for.
        </AnimatedText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-tour="testimonials">
        {TESTIMONIALS.map((t, index) => (
          <AnimatedText as="div" key={t.name} delay={index * 150}>
            <div className="elevated-card p-8 h-full flex flex-col">
              <div className="text-accent text-lg mb-4 tracking-wider">
                {'★'.repeat(t.rating)}
              </div>
              <p className="text-body-md text-text-secondary leading-relaxed mb-6 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-text-primary">{t.name}</div>
                <div className="text-caption text-text-tertiary">{t.business}</div>
              </div>
            </div>
          </AnimatedText>
        ))}
      </div>
    </Section>
  )
}
