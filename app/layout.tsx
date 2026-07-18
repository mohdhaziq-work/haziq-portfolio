import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import UserPanel from '@/components/layout/UserPanel'
import LoginPopup from '@/components/auth/LoginPopup'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { TutorialProvider } from '@/lib/tutorial/TutorialContext'
import TourOverlay from '@/lib/tutorial/TourOverlay'

export const metadata: Metadata = {
  title: {
    default: 'Mohd Haziq — Web Developer',
    template: '%s | Mohd Haziq',
  },
  description: 'Building high-converting, professional websites for businesses. Modern, fast, and designed to grow your business digitally.',
  keywords: 'Web Developer, Website Design, Local Business Growth, Portfolio, Next.js Developer, Freelancer',
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <AuthProvider>
          <TutorialProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <UserPanel />
            <LoginPopup />
            <TourOverlay />
          </TutorialProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
