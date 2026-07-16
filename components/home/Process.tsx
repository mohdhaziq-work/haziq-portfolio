'use client'

import { PROCESS_STEPS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

export default function Process() {
  return (
    <Section background="white">
      <div className="text-center mb-16">
        <AnimatedText as="span" className="section-overline">How It Works</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          Simple 4-Step <span className="text-accent">Process</span>
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          From first conversation to live website — here&apos;s how we work together.
        </AnimatedText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-border" />

        {PROCESS_STEPS.map((step, index) => (
          <AnimatedText as="div" key={step.step} delay={index * 150} className="text-center relative">
            <div className="w-24 h-24 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-6 relative z-10">
              <span className="text-display-sm text-accent font-bold">{step.step}</span>
            </div>
            <h3 className="text-headline text-text-primary mb-3">{step.title}</h3>
            <p className="text-body-sm text-text-secondary leading-relaxed">{step.description}</p>
          </AnimatedText>
        ))}
      </div>

      <AnimatedText as="div" delay={600} className="text-center mt-16">
        <button
          onClick={() => openInstagramDM()}
          className="btn-primary px-10 py-4 text-body-md"
        >
          Start Your Project
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </AnimatedText>
    </Section>
  )
}
