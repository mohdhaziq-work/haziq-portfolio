import type { Metadata } from 'next'
import './globals.css'
import LayoutShell from '@/components/layout/LayoutShell'

const SITE_URL = 'https://mohdhaziq-portfolio.onrender.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mohd Haziq Portfolio',
    template: '%s | Mohd Haziq Portfolio',
  },
  description: 'Mohd Haziq is a professional Web Developer who builds high-converting websites for businesses. Restaurant websites, coaching websites, gym websites, and custom business websites. Affordable, fast, mobile-friendly. Get a free mockup today.',
  keywords: [
    // Name variations - CRITICAL
    'Mohd Haziq',
    'Mohd Haziq Portfolio',
    'Mohd Haziq Web Developer',
    'Mohd Haziq Website',
    'Haziq',
    'Haziq Portfolio',
    'Haziq Web Developer',
    'Haziq Website',
    'Haziq Built',
    'haziq.built',
    'Mohammad Haziq',
    'Mohd Haziq Developer',
    // Service keywords
    'Web Developer',
    'Website Developer',
    'Website Designer',
    'Website Builder',
    'Freelance Web Developer',
    'Professional Website Developer',
    'Affordable Web Developer',
    'Custom Website Developer',
    'Business Website Developer',
    'Website for Business',
    'Website for Small Business',
    'Hire Web Developer',
    'Best Web Developer',
    'Top Web Developer',
    'Web Developer Near Me',
    // Tech keywords
    'Next.js Developer',
    'React Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Tailwind CSS Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    // Portfolio keywords
    'Web Developer Portfolio',
    'Website Developer Portfolio',
    'Frontend Developer Portfolio',
    'Web Development Portfolio',
    'Developer Portfolio Website',
    // Industry keywords
    'Restaurant Website Developer',
    'Coaching Website Developer',
    'Gym Website Developer',
    'Business Website Design',
    'Landing Page Developer',
    'E-commerce Website Developer',
    // Action keywords
    'Hire a Web Developer',
    'Build a Website',
    'Create a Website',
    'Design a Website',
    'Make a Website',
    'Get a Website Made',
    'Website Development Services',
    'Website Design Services',
    'Free Website Mockup',
    // Location keywords
    'Web Developer India',
    'Indian Web Developer',
    'Freelance Web Developer India',
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
    title: 'Mohd Haziq Portfolio',
    description: 'Mohd Haziq builds high-converting websites for businesses. Restaurant, coaching, gym, and custom websites. Affordable, fast, mobile-friendly. Get a free mockup.',
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Mohd Haziq Portfolio',
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 192,
        height: 192,
        alt: 'Mohd Haziq - Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mohd Haziq Portfolio',
    description: 'Mohd Haziq builds professional websites for businesses. Get a free mockup today.',
    images: ['/apple-touch-icon.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  applicationName: 'Mohd Haziq',
  category: 'Web Development',
}

// ===== COMPREHENSIVE JSON-LD SCHEMAS =====

// 1. Person Schema - Google Knowledge Panel
const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohd Haziq',
  alternateName: ['Haziq', 'Mohammad Haziq', 'Haziq Web Developer'],
  url: SITE_URL,
  jobTitle: 'Web Developer',
  description: 'Mohd Haziq is a professional Web Developer who builds high-converting, modern websites for businesses. Specializing in restaurant, coaching, and gym websites.',
  image: `${SITE_URL}/apple-touch-icon.png`,
  sameAs: [
    'https://www.instagram.com/haziq.built',
    'https://github.com/mohdhaziq-work',
  ],
  knowsAbout: ['Web Development', 'Website Design', 'Next.js', 'React', 'Frontend Development', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
  worksFor: {
    '@type': 'Organization',
    name: 'Mohd Haziq Freelance',
  },
  almaMater: {
    '@type': 'EducationalOrganization',
    name: 'Self-Taught Developer',
  },
}

// 2. WebSite Schema - Google Site Name + Sitelinks Search Box
const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mohd Haziq',
  alternateName: ['Haziq Portfolio', 'Mohd Haziq Portfolio', 'Mohd Haziq Web Developer', 'Haziq Web Developer'],
  url: SITE_URL,
  description: 'Professional web development portfolio of Mohd Haziq. View live projects, services, and get a free website mockup.',
  author: {
    '@type': 'Person',
    name: 'Mohd Haziq',
  },
  publisher: {
    '@type': 'Person',
    name: 'Mohd Haziq',
  },
}

// 3. ProfessionalService Schema - Local Business ranking
const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mohd Haziq Web Development',
  alternateName: ['Haziq Web Development', 'Mohd Haziq Freelance'],
  url: SITE_URL,
  description: 'Professional web development services by Mohd Haziq. Building high-converting websites for restaurants, coaching centers, gyms, and businesses.',
  priceRange: '₹₹',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: ['Web Development', 'Website Design', 'Frontend Development', 'Custom Website Development'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Starter Website',
          description: 'Single page professional website with mobile responsive design',
        },
        price: '2500',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Website',
          description: 'Multi-page website with SEO, forms, and animations',
        },
        price: '6000',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium Website',
          description: 'Full-stack web application with database, dashboards, and custom tools',
        },
        price: '12000',
        priceCurrency: 'INR',
      },
    ],
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
        <meta name="author" content="Mohd Haziq" />
        <meta name="owner" content="Mohd Haziq" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta property="og:site_name" content="Mohd Haziq Portfolio" />
        <meta property="og:title" content="Mohd Haziq Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        {/* Critical: Tell Google this site name is "Mohd Haziq Portfolio" NOT "Render" */}
        <meta name="sitename" content="Mohd Haziq" />
        <meta name="hostname" content="mohdhaziq-portfolio.onrender.com" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
