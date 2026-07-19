import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Mohd Haziq Portfolio | Live Website Demos',
  description: 'View live website projects built by Mohd Haziq. Restaurant website, coaching center website, gym website — each with unique design, animations, and real functionality. Mohd Haziq Web Developer portfolio projects.',
  keywords: ['Mohd Haziq Projects', 'Haziq Portfolio Projects', 'Restaurant Website', 'Coaching Website', 'Gym Website', 'Web Developer Portfolio', 'Live Website Demos', 'Mohd Haziq Web Developer'],
  openGraph: {
    title: 'Projects — Mohd Haziq Web Developer Portfolio',
    description: 'Live website projects by Mohd Haziq. Restaurant, coaching, and gym websites.',
    url: 'https://mohdhaziq-portfolio.onrender.com/projects',
  },
  alternates: {
    canonical: 'https://mohdhaziq-portfolio.onrender.com/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
