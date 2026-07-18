import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Mohd Haziq',
  description: 'Contact Mohd Haziq for professional website development. Submit your project details or DM on Instagram for a free mockup. Response within 2 hours.',
  openGraph: {
    title: 'Contact — Mohd Haziq',
    description: 'Contact Mohd Haziq for professional website development. Free mockup available. Response within 2 hours.',
    url: 'https://mohdhaziq-portfolio.onrender.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
