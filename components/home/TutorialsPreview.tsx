'use client'

import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { TUTORIALS } from '@/lib/tutorial/data'
import { useTutorial, Language } from '@/lib/tutorial/TutorialContext'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function TutorialsPreview() {
  const { startTutorial, language } = useTutorial()
  const featuredTutorials = TUTORIALS.slice(0, 3)

  return (
    <Section id="tutorials" background="white">
      <div className="text-center mb-16">
        <AnimatedText as="span" className="section-overline">Interactive Guides</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          See How It <span className="text-accent">Works</span>
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          Live interactive tours on the real website. Elements get highlighted right where they are — no screenshots.
        </AnimatedText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredTutorials.map((tutorial, index) => (
          <AnimatedText as="div" key={tutorial.id} delay={index * 150}>
            <button
              onClick={() => startTutorial(tutorial)}
              className="block w-full text-left surface-card p-0 overflow-hidden group hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className={cn('relative aspect-[2/1] flex items-center justify-center overflow-hidden', tutorial.color)}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-3 left-3 w-14 h-14 border border-white rounded-full" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 border border-white rounded-lg rotate-12" />
                </div>
                <div className="relative z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {tutorial.steps.length} steps
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-text-primary text-body-md mb-1.5 group-hover:text-accent transition-colors">
                  {tutorial.title[language] || tutorial.title.en}
                </h3>
                <p className="text-body-sm text-text-secondary line-clamp-2">
                  {tutorial.description[language] || tutorial.description.en}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-accent text-caption font-medium">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    Start Tour
                  </span>
                </div>
              </div>
            </button>
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
