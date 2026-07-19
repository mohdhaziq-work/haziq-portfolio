import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Mohd Haziq | Website Development Plans & Pricing',
  description: 'Website development services by Mohd Haziq. Starter plan at Rs 2,500, Business plan at Rs 6,000, Premium plan at Rs 12,000. Professional, mobile-friendly, SEO-optimized websites for businesses. Get a free mockup.',
  keywords: ['Mohd Haziq Services', 'Website Development Plans', 'Hire Web Developer', 'Affordable Website', 'Business Website Cost', 'Website Pricing India', 'Custom Website Development', 'Mohd Haziq Web Developer'],
  openGraph: {
    title: 'Services — Mohd Haziq Web Developer',
    description: 'Professional website development services. Get a free mockup for your business.',
    url: 'https://mohdhaziq-portfolio.onrender.com/services',
  },
  alternates: {
    canonical: 'https://mohdhaziq-portfolio.onrender.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
