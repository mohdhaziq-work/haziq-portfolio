'use client'

import { SITE } from '@/lib/constants'
import AnimatedText from '@/components/ui/AnimatedText'
import { openInstagramDM } from '@/lib/instagram'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden" data-tour="hero-section">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lavender/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <AnimatedText as="span" delay={0} className="section-overline">
              Available for projects
            </AnimatedText>
            <AnimatedText as="h1" delay={100} className="text-display-xl md:text-display-xl text-text-primary mb-6 text-balance">
              I build websites that{' '}
              <span className="text-accent">bring customers</span> to your door.
            </AnimatedText>
            {/* SEO: Hidden semantic description for search engines */}
            <p className="sr-only">
              Mohd Haziq Portfolio — Professional Web Developer building high-converting websites for businesses.
              Hire Mohd Haziq for your next website project. View portfolio, projects, and services.
            </p>
            <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary max-w-xl mb-10 leading-relaxed">
              {SITE.age}-year-old Web Developer. I build modern, fast, and high-converting websites 
              that help local businesses grow digitally and bring in more customers.
            </AnimatedText>
            <AnimatedText as="div" delay={300} className="flex flex-col sm:flex-row gap-4">
              <a href="/projects" className="btn-primary px-8 py-4 text-body-md">
                View My Work
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </a>
              <button
                onClick={() => openInstagramDM()}
                className="btn-outline px-8 py-4 text-body-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
                DM Me on Instagram
              </button>
            </AnimatedText>
            <AnimatedText as="p" delay={400} className="mt-8 text-caption text-text-tertiary flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              Currently available for new projects
            </AnimatedText>
          </div>
          <AnimatedText as="div" delay={300} className="hidden lg:block">
            <div className="relative">
              <div className="elevated-card p-0 overflow-hidden aspect-[4/3] placeholder-image">
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-accent"><path d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"/></svg>
                  </div>
                  <p className="text-text-tertiary text-body-sm">Your photo here</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 surface-card p-4 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success font-bold text-sm">3+</div>
                <div>
                  <p className="font-semibold text-text-primary text-body-sm">Projects</p>
                  <p className="text-caption text-text-tertiary">Live & Deployed</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 surface-card p-4 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-body-sm">Fast Delivery</p>
                  <p className="text-caption text-text-tertiary">3-14 Days</p>
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
