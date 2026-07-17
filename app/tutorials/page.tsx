'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import TutorialPlayer from '@/components/tutorials/TutorialPlayer'
import { TUTORIALS } from '@/components/tutorials/tutorials-data'
import type { Tutorial } from '@/components/tutorials/TutorialPlayer'

export default function TutorialsPage() {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null)

  const tutorialsMeta = {
    title: 'Video Guides | Mohd Haziq',
    description: 'Watch step-by-step video guides showing how to contact, request a website, choose a plan, and track your project progress.',
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Video Guides</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            See How <span className="text-accent">It Works</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Watch step-by-step video guides showing the real website. Learn how to contact, request a project, choose a plan, and track your progress.
          </AnimatedText>
        </div>
      </Section>

      {/* Tutorial Grid */}
      <Section background="surface">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TUTORIALS.map((tutorial, index) => (
            <AnimatedText as="div" key={tutorial.id} delay={index * 100}>
              <button
                onClick={() => setActiveTutorial(tutorial)}
                className="w-full text-left elevated-card p-0 overflow-hidden group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-surface-2 overflow-hidden">
                  <img
                    src={tutorial.steps[0].screenshotUrl}
                    alt={tutorial.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#1a73e8">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {tutorial.duration}
                  </span>
                  {/* Color Indicator */}
                  <div className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full ${tutorial.color}`} />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-text-primary text-headline mb-2 group-hover:text-accent transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-text-tertiary">
                      {tutorial.steps.length} steps
                    </span>
                    <span className="text-text-tertiary text-[10px]">|</span>
                    <span className="text-caption text-accent font-medium">
                      Watch Now
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" className="inline ml-1"><path d="m9 18 6-6-6-6" /></svg>
                    </span>
                  </div>
                </div>
              </button>
            </AnimatedText>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="white">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedText as="h2" className="text-display-md text-text-primary mb-4">
            Ready to <span className="text-accent">Get Started?</span>
          </AnimatedText>
          <AnimatedText as="p" delay={100} className="text-body-lg text-text-secondary mb-8">
            Now that you know how everything works, take the first step towards your new website.
          </AnimatedText>
          <AnimatedText as="div" delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-primary px-8 py-4 text-body-md">
              Start Your Project
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
            </a>
            <a href="/services" className="btn-outline px-8 py-4 text-body-md">
              View Plans
            </a>
          </AnimatedText>
        </div>
      </Section>

      {/* Tutorial Player Modal */}
      {activeTutorial && (
        <TutorialPlayer
          tutorial={activeTutorial}
          onClose={() => setActiveTutorial(null)}
        />
      )}
    </div>
  )
}
