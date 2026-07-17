'use client'

import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { TUTORIALS } from '@/components/tutorials/tutorials-data'
import Link from 'next/link'

export default function TutorialsPreview() {
  const featuredTutorials = TUTORIALS.slice(0, 3)

  return (
    <Section id="tutorials" background="white">
      <div className="text-center mb-16">
        <AnimatedText as="span" className="section-overline">Video Guides</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          See How It <span className="text-accent">Works</span>
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          Watch step-by-step video guides of the real website. Learn everything from contacting to tracking your project.
        </AnimatedText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredTutorials.map((tutorial, index) => (
          <AnimatedText as="div" key={tutorial.id} delay={index * 150}>
            <Link href="/tutorials" className="block surface-card p-0 overflow-hidden group hover:-translate-y-1">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-surface-2 overflow-hidden">
                <img
                  src={tutorial.steps[0].screenshotUrl}
                  alt={tutorial.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {tutorial.duration}
                </span>
                <div className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full ${tutorial.color}`} />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-text-primary text-body-md mb-1.5 group-hover:text-accent transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-body-sm text-text-secondary line-clamp-2">
                  {tutorial.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-caption text-text-tertiary">{tutorial.steps.length} steps</span>
                  <span className="text-accent text-caption font-medium">
                    Watch
                    <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" className="inline ml-0.5"><path d="m9 18 6-6-6-6" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          </AnimatedText>
        ))}
      </div>

      <AnimatedText as="div" delay={500} className="text-center mt-12">
        <Link href="/tutorials" className="btn-outline px-8 py-3">
          View All Guides
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
        </Link>
      </AnimatedText>
    </Section>
  )
}
