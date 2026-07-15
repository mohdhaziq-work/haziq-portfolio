'use client'

import Hero from '@/components/home/Hero'
import ProjectShowcase from '@/components/home/ProjectShowcase'
import ServicesPreview from '@/components/home/ServicesPreview'
import Stats from '@/components/home/Stats'
import Process from '@/components/home/Process'
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
      <Process />
      <CTA />
    </>
  )
}
