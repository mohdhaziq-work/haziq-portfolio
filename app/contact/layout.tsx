import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Mohd Haziq',
  description: 'Contact Mohd Haziq for professional website development. DM on Instagram or use the contact form. Get a free website mockup for your business. Mohd Haziq Web Developer.',
  openGraph: {
    title: 'Contact Mohd Haziq — Web Developer',
    description: 'Contact Mohd Haziq for your next website project. Free mockup available.',
    url: 'https://mohdhaziq-portfolio.onrender.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
