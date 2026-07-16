'use client'

import { PROJECTS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Portfolio</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            All <span className="text-accent">Projects</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Each project is built with a specific business goal — converting visitors into customers.
          </AnimatedText>
        </div>
      </Section>

      {/* Projects Detail */}
      {PROJECTS.map((project, index) => (
        <Section key={project.id} id={project.id} background={index % 2 === 0 ? 'surface' : 'white'}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Visual */}
            <AnimatedText as="div" delay={0} className={index % 2 !== 0 ? 'lg:order-2' : ''}>
              <div
                className="elevated-card p-0 overflow-hidden aspect-video"
                style={{ backgroundColor: project.bgColor }}
              >
                <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <span className="font-bold text-4xl tracking-tight" style={{ color: project.accent }}>
                      {project.title}
                    </span>
                    <p className="text-body-sm mt-2 opacity-50" style={{ color: project.accent }}>
                      Screenshot placeholder
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedText>

            {/* Content */}
            <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
              <AnimatedText as="span" delay={100} className="chip chip-active mb-4">{project.category}</AnimatedText>
              <AnimatedText as="h2" delay={200} className="text-display-sm text-text-primary mb-4">
                {project.title}
              </AnimatedText>
              <AnimatedText as="p" delay={300} className="text-body-lg text-text-secondary leading-relaxed mb-8">
                {project.longDescription}
              </AnimatedText>

              {/* Features */}
              <AnimatedText as="div" delay={350}>
                <h4 className="font-semibold text-text-primary mb-4 text-body-md">Key Features:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-body-sm text-text-secondary">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-success flex-shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </AnimatedText>

              {/* Tech Stack */}
              <AnimatedText as="div" delay={400} className="mb-8">
                <h4 className="font-semibold text-text-primary mb-3 text-body-md">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
                </div>
              </AnimatedText>

              {/* Links */}
              <AnimatedText as="div" delay={450} className="flex gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3"
                >
                  Visit Live Site
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="m10 14 11-11"/></svg>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-6 py-3"
                >
                  View Source
                </a>
              </AnimatedText>
            </div>
          </div>
        </Section>
      ))}

      {/* CTA */}
      <Section background="surface">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedText as="h2" className="text-display-sm text-text-primary mb-4">
            Like what you see?
          </AnimatedText>
          <AnimatedText as="p" delay={100} className="text-body-lg text-text-secondary mb-8">
            Let&apos;s build something amazing for your business too.
          </AnimatedText>
          <AnimatedText as="div" delay={200}>
            <button onClick={() => openInstagramDM()} className="btn-primary px-10 py-4">
              Start a Project
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </AnimatedText>
        </div>
      </Section>
    </div>
  )
}
