import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Mohd Haziq Portfolio',
  description: 'View live website projects built by Mohd Haziq. Restaurant, coaching, and gym websites — each with unique design, animations, and real functionality. See the live demos.',
  openGraph: {
    title: 'Projects — Mohd Haziq Portfolio',
    description: 'View live website projects built by Mohd Haziq. Restaurant, coaching, and gym websites with unique design and real functionality.',
    url: 'https://mohdhaziq-portfolio.onrender.com/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
