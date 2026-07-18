import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Pricing — Mohd Haziq',
  description: 'Professional website development services by Mohd Haziq. Starter at Rs 2,500, Business at Rs 6,000, Premium at Rs 12,000. Free mockup available. No hidden fees.',
  openGraph: {
    title: 'Services & Pricing — Mohd Haziq',
    description: 'Professional website development services by Mohd Haziq. Starter Rs 2,500, Business Rs 6,000, Premium Rs 12,000. Free mockup available.',
    url: 'https://mohdhaziq-portfolio.onrender.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
