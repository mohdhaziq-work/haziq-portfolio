'use client'

import { PROJECTS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Link from 'next/link'

export default function ProjectShowcase() {
  return (
    <Section id="work" background="white">
      {/* Header */}
      <div className="text-center mb-16">
        <AnimatedText as="span" className="section-overline">Portfolio</AnimatedText>
        <AnimatedText as="h2" delay={100} className="text-display-md text-text-primary mb-4">
          Proof of <span className="text-accent">Work</span>
        </AnimatedText>
        <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mx-auto">
          Real projects built for real businesses. Each one designed to convert.
        </AnimatedText>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <AnimatedText as="div" key={project.id} delay={index * 150}>
            <div className="elevated-card p-0 overflow-hidden group h-full flex flex-col">
              {/* Thumbnail */}
              <div
                className="h-56 relative overflow-hidden"
                style={{ backgroundColor: project.bgColor }}
              >
                {/* Placeholder or actual thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-bold text-2xl tracking-tight"
                    style={{ color: project.accent }}
                  >
                    {project.title}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 bg-white text-text-primary px-6 py-3 rounded-full font-semibold text-body-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    Visit Live Site →
                  </a>
                </div>

                {/* Category Chip */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-caption font-semibold text-white" style={{ backgroundColor: project.accent }}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-headline text-text-primary mb-2">{project.title}</h3>
                <p className="text-body-sm text-text-secondary mb-4 leading-relaxed flex-1">{project.description}</p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="chip text-caption py-1 px-3">{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-border-light">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm font-semibold text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
                  >
                    Live Demo
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="m10 14 11-11"/></svg>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm font-semibold text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1"
                  >
                    Source
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedText>
        ))}
      </div>

      {/* View All CTA */}
      <AnimatedText as="div" delay={500} className="text-center mt-12">
        <Link href="/projects" className="btn-secondary px-8 py-3">
          View All Projects
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </AnimatedText>
    </Section>
  )
}
