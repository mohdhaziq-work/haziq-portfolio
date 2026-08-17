'use client'

import { useState } from 'react'
import { FAQ } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" background="white">
      <div className="text-center mb-14">
        <AnimatedText as="span" className="section-overline">FAQ</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          Frequently Asked <span className="text-accent">Questions</span>
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          Everything you need to know before getting started. Still have a question? Just DM me.
        </AnimatedText>
      </div>

      <div className="max-w-3xl mx-auto space-y-4" data-tour="faq">
        {FAQ.map((item, index) => {
          const isOpen = open === index
          return (
            <div
              key={item.question}
              className={`elevated-card overflow-hidden transition-all duration-200 ${isOpen ? 'border-accent/30' : ''}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-text-primary text-body-md">{item.question}</span>
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  className={`text-accent flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 -mt-1 text-body-sm text-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-10">
        <AnimatedText as="div" delay={300}>
          <button onClick={() => openInstagramDM('Hi Haziq! I have a question about your services.')} className="btn-outline px-8 py-3 text-body-md">
            Ask a Question
          </button>
        </AnimatedText>
      </div>
    </Section>
  )
}
