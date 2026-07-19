import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services by Mohd Haziq',
  description: 'Website design and development services by Mohd Haziq. Starter, Business, and Premium plans. Professional, mobile-friendly, SEO-optimized websites for businesses. Get a free mockup.',
  openGraph: {
    title: 'Services — Mohd Haziq Web Developer',
    description: 'Professional website design services by Mohd Haziq. Get a free mockup for your business.',
    url: 'https://mohdhaziq-portfolio.onrender.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
