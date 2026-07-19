import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects by Mohd Haziq',
  description: 'View live website projects built by Mohd Haziq. Restaurant, coaching, and gym websites with unique design and real functionality. Mohd Haziq Portfolio projects showcase.',
  openGraph: {
    title: 'Projects — Mohd Haziq Portfolio',
    description: 'Live website projects built by Mohd Haziq. Restaurant, coaching, and gym demos.',
    url: 'https://mohdhaziq-portfolio.onrender.com/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
