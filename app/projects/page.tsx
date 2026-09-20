'use client'

import { PROJECTS, DEMO_WEBSITES } from '@/lib/constants'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

type ProjectItem = {
  id: string
  title: string
  category: string
  description: string
  longDescription: string
  techStack: readonly string[]
  features: readonly string[]
  liveUrl: string
  githubUrl: string
  thumbnail: string
  accent: string
  bgColor: string
}

export default function ProjectsPage() {
  const projects: ProjectItem[] = PROJECTS.map(p => ({ ...p }))
  const demos: ProjectItem[] = DEMO_WEBSITES.map(p => ({ ...p }))

  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Portfolio</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            Mohd Haziq <span className="text-accent">Portfolio</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Real projects built for real businesses, plus demo websites showcasing different design styles.
          </AnimatedText>
        </div>
      </Section>

      {/* ===== REAL PROJECTS ===== */}
      <Section background="white" padding="small">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <AnimatedText as="span" className="section-overline">Live Projects</AnimatedText>
          <AnimatedText as="h2" delay={100} className="text-display-sm text-text-primary mb-4">
            Real <span className="text-accent">Projects</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-md text-text-secondary">
            Production-ready applications built for real users and businesses.
          </AnimatedText>
        </div>
      </Section>

      {/* Projects Detail */}
      {projects.map((project, index) => (
        <Section key={project.id} id={project.id} background={index % 2 === 0 ? 'surface' : 'white'}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Visual - Screenshot */}
            <AnimatedText as="div" delay={0} className={index % 2 !== 0 ? 'lg:order-2' : ''}>
              <div
                className="elevated-card p-0 overflow-hidden aspect-video group cursor-pointer"
                style={{ backgroundColor: project.bgColor }}
              >
                {project.thumbnail ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover min-h-[300px] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="bg-white text-text-primary px-5 py-2 rounded-full text-body-sm font-semibold flex items-center gap-2">
                        Visit Live Site
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="m10 14 11-11"/></svg>
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <span className="font-bold text-4xl tracking-tight" style={{ color: project.accent }}>
                        {project.title}
                      </span>
                    </div>
                  </div>
                )}
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

      {/* ===== DEMO WEBSITES ===== */}
      <Section background="white" padding="small">
        <div className="text-center max-w-2xl mx-auto mb-8 pt-8">
          <AnimatedText as="span" className="section-overline">Design Showcase</AnimatedText>
          <AnimatedText as="h2" delay={100} className="text-display-sm text-text-primary mb-4">
            Demo <span className="text-accent">Websites</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-md text-text-secondary">
            Showcasing different design styles and industries. These are demos of what I can build for your business.
          </AnimatedText>
        </div>
      </Section>

      {/* Demo Websites Grid */}
      <Section background="surface">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <AnimatedText key={demo.id} as="div" delay={index * 100}>
              <a
                href={demo.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="elevated-card p-0 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: demo.bgColor }}>
                    {demo.thumbnail ? (
                      <img
                        src={demo.thumbnail}
                        alt={`${demo.title} screenshot`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-bold text-2xl" style={{ color: demo.accent }}>
                          {demo.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full">
                          View Demo
                        </span>
                        <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full">
                          {demo.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="chip chip-active text-xs">{demo.category}</span>
                    </div>
                    <h3 className="font-bold text-text-primary text-lg mb-2">{demo.title}</h3>
                    <p className="text-body-sm text-text-secondary line-clamp-2 mb-4">{demo.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {demo.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-surface-2 rounded-full text-text-tertiary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </AnimatedText>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="white">
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