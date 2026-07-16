import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Mohd Haziq — Web Developer',
    template: '%s | Mohd Haziq',
  },
  description: 'Building high-converting, professional websites for local businesses in Sultanpur and beyond. Modern, fast, and designed to grow your business digitally.',
  keywords: 'Web Developer, Website Design, Local Business Growth, Portfolio, Sultanpur, Next.js Developer, Freelancer',
  openGraph: {
    title: 'Mohd Haziq — Web Developer',
    description: 'Building high-converting, professional websites for local businesses. Modern, fast, and designed to grow your business digitally.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
