'use client'

import { SITE, SKILLS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <Section background="white" padding="small">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <AnimatedText as="div" delay={0}>
            <div className="elevated-card p-0 overflow-hidden aspect-square placeholder-image max-w-md mx-auto lg:mx-0">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center">
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-accent"><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>
                </div>
                <p className="text-text-tertiary text-body-sm">Your photo here</p>
              </div>
            </div>
          </AnimatedText>

          {/* Content */}
          <div>
            <AnimatedText as="span" className="section-overline">About Me</AnimatedText>
            <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
              The Young Hustler{' '}
              <span className="text-accent">Behind the Code</span>
            </AnimatedText>
            <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary leading-relaxed mb-6">
              Hi, I&apos;m <strong className="text-text-primary">{SITE.name}</strong>, a {SITE.age}-year-old developer from{' '}
              <strong className="text-text-primary">{SITE.city}, {SITE.state}</strong>. While others were scrolling reels, 
              I started mastering AI tools to build professional websites for local businesses.
            </AnimatedText>
            <AnimatedText as="p" delay={300} className="text-body-lg text-text-secondary leading-relaxed mb-8">
              I combine the speed of AI with a deep understanding of what local businesses need to grow. 
              My goal isn&apos;t just to make websites — it&apos;s to create digital tools that bring you more customers.
            </AnimatedText>

            <AnimatedText as="div" delay={400} className="flex gap-4">
              <button onClick={() => openInstagramDM()} className="btn-primary px-6 py-3">
                DM Me on Instagram
              </button>
              <a href="/projects" className="btn-outline px-6 py-3">
                View My Work
              </a>
            </AnimatedText>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section background="surface" id="skills">
        <div className="text-center mb-16">
          <AnimatedText as="span" className="section-overline">Expertise</AnimatedText>
          <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary">
            Skills & <span className="text-accent">Technologies</span>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map((category, index) => (
            <AnimatedText as="div" key={category.category} delay={index * 150}>
              <div className="elevated-card p-8">
                <h3 className="text-headline text-text-primary mb-6">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedText as="span" className="section-overline">Philosophy</AnimatedText>
          <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-8">
            &ldquo;I don&apos;t just build websites;{' '}
            <span className="text-accent">I build tools that bring you more customers.</span>&rdquo;
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary leading-relaxed">
            Every line of code I write has one purpose: to help your business grow. Whether it&apos;s a restaurant 
            that needs more reservations, a coaching center that wants more admissions, or a gym that needs more 
            members — I design with conversion in mind.
          </AnimatedText>
        </div>
      </Section>
    </div>
  )
}
