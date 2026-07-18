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
    default: 'Mohd Haziq — Web Developer | Portfolio',
    template: '%s | Mohd Haziq',
  },
  description: 'Mohd Haziq is a Web Developer who builds high-converting, professional websites for businesses. Modern, fast, and designed to grow your business. View portfolio, projects, and services.',
  keywords: 'Mohd Haziq, Mohd Haziq Portfolio, Haziq Portfolio, Haziq Web Developer, Mohd Haziq Web Developer, Website Designer, Portfolio Website, Freelance Web Developer, Next.js Developer, React Developer, Website for Business, Website Design India',
  authors: [{ name: 'Mohd Haziq', url: 'https://mohdhaziq-portfolio.onrender.com' }],
  creator: 'Mohd Haziq',
  publisher: 'Mohd Haziq',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Mohd Haziq — Web Developer | Portfolio',
    description: 'Mohd Haziq builds high-converting, professional websites for businesses. Modern, fast, affordable. View live projects and get a free mockup.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://mohdhaziq-portfolio.onrender.com',
    siteName: 'Mohd Haziq Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohd Haziq — Web Developer | Portfolio',
    description: 'Mohd Haziq builds professional websites for businesses. View live projects and get a free mockup.',
  },
  alternates: {
    canonical: 'https://mohdhaziq-portfolio.onrender.com',
  },
}

// JSON-LD Structured Data for Google Rich Results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohd Haziq',
  url: 'https://mohdhaziq-portfolio.onrender.com',
  jobTitle: 'Web Developer',
  description: 'Mohd Haziq is a Web Developer who builds high-converting, professional websites for businesses.',
  sameAs: [
    'https://www.instagram.com/haziq.built',
    'https://github.com/mohdhaziq-work',
  ],
  knowsAbout: ['Web Development', 'Website Design', 'Next.js', 'React', 'Frontend Development'],
  worksFor: {
    '@type': 'Organization',
    name: 'Mohd Haziq Freelance',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mohd Haziq Portfolio',
  url: 'https://mohdhaziq-portfolio.onrender.com',
  description: 'Professional web development portfolio of Mohd Haziq. View live projects, services, and get a free mockup.',
  author: {
    '@type': 'Person',
    name: 'Mohd Haziq',
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
        <link rel="canonical" href="https://mohdhaziq-portfolio.onrender.com" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
