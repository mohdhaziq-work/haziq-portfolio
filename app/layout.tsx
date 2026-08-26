import type { Metadata } from 'next'
import './globals.css'
import LayoutShell from '@/components/layout/LayoutShell'
import AIAssistant from '@/components/AIAssistant'
import CookieConsent from '@/components/CookieConsent'

// ===== BOTH DOMAINS FOR GOOGLE INDEXING =====
const PRIMARY_URL = 'https://mohdhaziq-portfolio.onrender.com'
const SECONDARY_URL = 'https://mohdhaziq-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_URL),
  title: {
    default: 'Mohd Haziq - Web Developer | Professional Website Designer India',
    template: '%s | Mohd Haziq Portfolio',
  },
  description: 'Mohd Haziq is a professional Web Developer from Lucknow, India who builds high-converting websites for businesses. Restaurant websites, coaching websites, gym websites, and custom business websites. Affordable, fast, mobile-friendly. Get a free mockup today.',
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
    'Web Developer Lucknow',
    'Web Developer Uttar Pradesh',
  ],
  authors: [{ name: 'Mohd Haziq', url: PRIMARY_URL }],
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
    title: 'Mohd Haziq - Web Developer | Professional Website Designer India',
    description: 'Mohd Haziq builds high-converting websites for businesses. Restaurant, coaching, gym, and custom websites. Affordable, fast, mobile-friendly. Get a free mockup.',
    type: 'website',
    locale: 'en_IN',
    url: PRIMARY_URL,
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
    title: 'Mohd Haziq - Web Developer',
    description: 'Mohd Haziq builds professional websites for businesses. Get a free mockup today.',
    images: ['/apple-touch-icon.png'],
  },
  alternates: {
    canonical: PRIMARY_URL,
  },
  applicationName: 'Mohd Haziq',
  category: 'Web Development',
}

// ===== AEO - ANSWER ENGINE OPTIMIZATION =====
// FAQ Schema - helps AI answer common questions
const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Mohd Haziq?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mohd Haziq is a professional Web Developer from Lucknow, Uttar Pradesh, India. He builds high-converting, modern websites for businesses including restaurants, coaching centers, gyms, and custom business websites using Next.js, React, and Tailwind CSS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost from Mohd Haziq?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website development by Mohd Haziq starts at ₹2,500 for a Starter single-page website, ₹6,000 for a Business multi-page website, and ₹12,000 for a Premium full-stack web application.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of websites does Mohd Haziq build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mohd Haziq builds restaurant websites, gym websites, coaching center websites, business landing pages, e-commerce websites, and custom web applications using Next.js, React, and Tailwind CSS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast will my website be ready?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Delivery is fast: Starter websites are ready in about 3 days, Business websites in about 7 days, and Premium web applications in about 14 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Mohd Haziq offer a free mockup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Mohd Haziq offers a free website mockup with no commitment and no risk. You can see a design of your homepage before deciding to work together.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Mohd Haziq build a website for a local business in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Mohd Haziq specializes in websites for local Indian businesses including restaurants, gyms, coaching centers, and service businesses. He is based in Lucknow, Uttar Pradesh and works with businesses across India.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my website work on mobile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, every website Mohd Haziq builds is fully mobile-responsive and looks great on phones, tablets, and desktops.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Mohd Haziq use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mohd Haziq uses modern web technologies including Next.js, React, Tailwind CSS, JavaScript, TypeScript, Node.js, and PostgreSQL. He builds fast, secure, and scalable websites.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Mohd Haziq located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mohd Haziq is based in Lucknow, Uttar Pradesh, India. He works with clients across India and internationally.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Mohd Haziq?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can contact Mohd Haziq through his portfolio website at mohdhaziq-portfolio.vercel.app, via email, or through his Instagram @haziq.built.',
      },
    },
  ],
}

// ===== GEO - GENERATIVE ENGINE OPTIMIZATION =====
// WebSite Schema - Google Site Name + Sitelinks Search Box
const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mohd Haziq Portfolio',
  alternateName: ['Haziq Portfolio', 'Mohd Haziq Portfolio', 'Mohd Haziq Web Developer', 'Haziq Web Developer'],
  url: PRIMARY_URL,
  description: 'Professional web development portfolio of Mohd Haziq. View live projects, services, and get a free website mockup.',
  author: {
    '@type': 'Person',
    name: 'Mohd Haziq',
  },
  publisher: {
    '@type': 'Person',
    name: 'Mohd Haziq',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${PRIMARY_URL}/designs?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

// ===== LLMO - LARGE LANGUAGE MODEL OPTIMIZATION =====
// Person Schema - Google Knowledge Panel
const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohd Haziq',
  alternateName: ['Haziq', 'Mohammad Haziq', 'Haziq Web Developer', 'Mohd Haziq Developer'],
  url: PRIMARY_URL,
  jobTitle: 'Web Developer',
  description: 'Mohd Haziq is a professional Web Developer from Lucknow, India who builds high-converting, modern websites for businesses. Specializing in restaurant, coaching, and gym websites using Next.js, React, and Tailwind CSS.',
  image: `${PRIMARY_URL}/apple-touch-icon.png`,
  sameAs: [
    'https://www.instagram.com/haziq.built',
    'https://github.com/mohdhaziq-work',
    SECONDARY_URL,
  ],
  knowsAbout: ['Web Development', 'Website Design', 'Next.js', 'React', 'Frontend Development', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Node.js', 'PostgreSQL', 'UI/UX Design'],
  worksFor: {
    '@type': 'Organization',
    name: 'Mohd Haziq Freelance',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Web Developer',
    occupationalCategory: '15-1254.00',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Self-Taught Developer',
  },
}

// ===== ALSEO - AI-LINKED SEO =====
// ProfessionalService Schema - Local Business ranking
const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mohd Haziq Web Development',
  alternateName: ['Haziq Web Development', 'Mohd Haziq Freelance', 'Haziq Built'],
  url: PRIMARY_URL,
  description: 'Professional web development services by Mohd Haziq. Building high-converting websites for restaurants, coaching centers, gyms, and businesses in India.',
  priceRange: '₹₹',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '37',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Muto\'s Studio' },
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      reviewBody: 'Haziq built us a beautiful wedding photography website. Fast, professional, and brought us new enquiries.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Wings of Fire' },
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      reviewBody: 'Great website for our rooftop restaurant. Clean design, easy booking, more table reservations.',
    },
  ],
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

// ===== E-E-A-T - EXPERIENCE, EXPERTISE, AUTHORITATIVENESS, TRUSTWORTHINESS =====
// Organization Schema
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mohd Haziq Web Development',
  url: PRIMARY_URL,
  logo: `${PRIMARY_URL}/apple-touch-icon.png`,
  description: 'Professional web development services by Mohd Haziq. Building high-converting websites for businesses in India.',
  founder: {
    '@type': 'Person',
    name: 'Mohd Haziq',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.instagram.com/haziq.built',
    'https://github.com/mohdhaziq-work',
  ],
}

// BreadcrumbList Schema
const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: PRIMARY_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: `${PRIMARY_URL}/about`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Services',
      item: `${PRIMARY_URL}/services`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Projects',
      item: `${PRIMARY_URL}/projects`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contact',
      item: `${PRIMARY_URL}/contact`,
    },
  ],
}

// HowTo Schema - for services page
const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get a Website from Mohd Haziq',
  description: 'Step-by-step process to get a professional website built by Mohd Haziq.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Request Free Mockup',
      text: 'Contact Mohd Haziq through the portfolio website and request a free website mockup. Share your business details and requirements.',
    },
    {
      '@type': 'HowToStep',
      name: 'Review Design',
      text: 'Review the custom website design mockup. Provide feedback and request changes until you are satisfied with the design.',
    },
    {
      '@type': 'HowToStep',
      name: 'Development',
      text: 'Once the design is approved, Mohd Haziq will build your website using modern technologies like Next.js, React, and Tailwind CSS.',
    },
    {
      '@type': 'HowToStep',
      name: 'Launch',
      text: 'After testing and final approval, your website goes live. Mohd Haziq provides support and maintenance.',
    },
  ],
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
        <link rel="canonical" href={PRIMARY_URL} />
        <meta name="google-site-verification" content="7wOZkZNq9Zr6DLFPZ8Vwuz1kCQr3MU8fNy_Jq6oH7_8" />
        <meta name="theme-color" content="#1a73e8" />
        <meta name="apple-mobile-web-app-title" content="Mohd Haziq" />
        <meta name="application-name" content="Mohd Haziq" />
        <meta name="author" content="Mohd Haziq" />
        <meta name="owner" content="Mohd Haziq" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta property="og:site_name" content="Mohd Haziq Portfolio" />
        <meta property="og:title" content="Mohd Haziq - Web Developer" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        {/* Critical: Tell Google this site name is "Mohd Haziq Portfolio" NOT "Render" */}
        <meta name="sitename" content="Mohd Haziq" />
        <meta name="hostname" content="mohdhaziq-portfolio.onrender.com" />
        {/* AI Bot Tags */}
        <meta name="ai-content-declaration" content="human-authored" />
        <meta name="content-origin" content="original" />
        {/* JSON-LD Structured Data - AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        {/* JSON-LD Structured Data - GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        {/* JSON-LD Structured Data - LLMO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        {/* JSON-LD Structured Data - ALSEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        {/* JSON-LD Structured Data - E-E-A-T */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <LayoutShell>{children}</LayoutShell>
        <AIAssistant />
        <CookieConsent />
      </body>
    </html>
  )
}
