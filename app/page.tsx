'use client'

import Hero from '@/components/home/Hero'
import ProjectShowcase from '@/components/home/ProjectShowcase'
import ServicesPreview from '@/components/home/ServicesPreview'
import Testimonials from '@/components/home/Testimonials'
import Stats from '@/components/home/Stats'
import Process from '@/components/home/Process'
import TutorialsPreview from '@/components/home/TutorialsPreview'
import FAQSection from '@/components/home/FAQSection'
import CTA from '@/components/home/CTA'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <Stats />
      <ProjectShowcase />
      <ServicesPreview />
      <Testimonials />
      <Process />
      <TutorialsPreview />
      <FAQSection />
      <CTA />
    </>
  )
}
