import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Guides',
  description: 'Watch step-by-step video guides showing how to contact, request a website, choose a plan, and track your project progress on Mohd Haziq\'s portfolio.',
}

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
