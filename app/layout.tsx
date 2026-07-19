import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import UserPanel from '@/components/layout/UserPanel'
import LoginPopup from '@/components/auth/LoginPopup'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { TutorialProvider } from '@/lib/tutorial/TutorialContext'
import TourOverlay from '@/lib/tutorial/TourOverlay'

const SITE_URL = 'https://mohdhaziq-portfolio.onrender.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mohd Haziq — Web Developer',
    template: '%s — Mohd Haziq',
  },
  description: 'Mohd Haziq is a Web Developer who builds high-converting, professional websites for businesses. View live projects, services, and get a free website mockup.',
  keywords: [
    'Mohd Haziq',
    'Mohd Haziq Portfolio',
    'Haziq Portfolio',
    'Haziq Web Developer',
    'Mohd Haziq Web Developer',
    'Website Designer',
    'Portfolio Website',
    'Freelance Web Developer',
    'Next.js Developer',
    'React Developer',
    'Website for Business',
    'Website Design',
    'Haziq',
    'Mohd Haziq Website',
    'Web Developer India',
    'Professional Website Builder',
  ],
  authors: [{ name: 'Mohd Haziq', url: SITE_URL }],
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
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Mohd Haziq — Web Developer',
    description: 'Mohd Haziq builds professional websites for businesses. Modern, fast, affordable. View live projects and get a free mockup.',
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Mohd Haziq',
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 192,
        height: 192,
        alt: 'Mohd Haziq',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mohd Haziq — Web Developer',
    description: 'Mohd Haziq builds professional websites for businesses. View live projects and get a free mockup.',
    images: ['/apple-touch-icon.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  applicationName: 'Mohd Haziq',
}

// JSON-LD Structured Data for Google Rich Results
// Google uses WebSite schema "name" as the site name in search results
// This overrides any server header like X-Powered-By: Render
const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohd Haziq',
  url: SITE_URL,
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

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mohd Haziq',
  alternateName: ['Haziq Portfolio', 'Mohd Haziq Portfolio', 'Haziq'],
  url: SITE_URL,
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
        <link rel="canonical" href={SITE_URL} />
        <meta name="google-site-verification" content="Et3XMWbEu-1uWfsnyk2cvSOXHkmBkS2RzG8bjI00D9k" />
        <meta name="theme-color" content="#1a73e8" />
        <meta name="apple-mobile-web-app-title" content="Mohd Haziq" />
        <meta name="application-name" content="Mohd Haziq" />
        {/* Override any server-provided site name */}
        <meta name="author" content="Mohd Haziq" />
        <meta name="owner" content="Mohd Haziq" />
        <meta property="og:site_name" content="Mohd Haziq" />
        <meta property="og:title" content="Mohd Haziq — Web Developer" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
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
