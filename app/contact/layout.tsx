import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Mohd Haziq — Hire a Web Developer | Free Mockup',
  description: 'Contact Mohd Haziq for professional website development. DM on Instagram or use the contact form. Get a free website mockup for your business — restaurant, coaching, gym, or any business. Mohd Haziq Web Developer.',
  keywords: ['Contact Mohd Haziq', 'Hire Web Developer', 'Free Website Mockup', 'Website Developer Contact', 'Mohd Haziq Web Developer', 'Get a Website Made', 'Business Website Inquiry'],
  openGraph: {
    title: 'Contact Mohd Haziq — Web Developer',
    description: 'Contact Mohd Haziq for your next website project. Free mockup available.',
    url: 'https://mohdhaziq-portfolio.onrender.com/contact',
  },
  alternates: {
    canonical: 'https://mohdhaziq-portfolio.onrender.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
