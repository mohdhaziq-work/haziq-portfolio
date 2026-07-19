import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Mohd Haziq',
  description: 'Mohd Haziq is a professional Web Developer who builds high-converting websites for businesses. Skills in Next.js, React, Tailwind CSS. Hire Mohd Haziq for your next website project.',
  openGraph: {
    title: 'About Mohd Haziq — Web Developer',
    description: 'Mohd Haziq builds professional websites for businesses. Hire for your next project.',
    url: 'https://mohdhaziq-portfolio.onrender.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
