import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Mohd Haziq — Web Developer, Website Builder',
  description: 'About Mohd Haziq — a professional Web Developer who builds high-converting business websites. Self-taught developer specializing in Next.js, React, Tailwind CSS. Hire Mohd Haziq for restaurant, coaching, gym, and business websites.',
  keywords: ['About Mohd Haziq', 'Mohd Haziq Web Developer', 'Haziq Developer', 'Hire Mohd Haziq', 'Freelance Web Developer', 'Next.js Developer', 'React Developer'],
  openGraph: {
    title: 'About Mohd Haziq — Web Developer',
    description: 'About Mohd Haziq — professional Web Developer building business websites.',
    url: 'https://mohdhaziq-portfolio.onrender.com/about',
  },
  alternates: {
    canonical: 'https://mohdhaziq-portfolio.onrender.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
