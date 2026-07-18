/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                    PORTFOLIO CONFIGURATION                   ║
 * ║                                                              ║
 * ║  [!] IS FILE MEIN SAB KUCH CHANGE HOTA HAI!                 ║
 * ║  [!] YE EK HI FILE HAI -- BAAKI SAB YAHAN SE READ KARTA HAI║
 * ║  [!] BAS ISME VALUES DALO, PURI SITE UPDATE HO JAYEGI      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ============================================================
// PERSONAL INFORMATION (Apni Details Yahan Daalo)
// ============================================================
export const PERSONAL = {
  firstName: 'Mohd',
  lastName: 'Haziq',
  fullName: 'Mohd Haziq',
  age: 16,
  dateOfBirth: '', // Format: YYYY-MM-DD (e.g., '2009-05-15')

  // Address
  city: '',
  state: '',
  country: 'India',
  pincode: '',

  // Professional
  title: 'Web Developer',
  tagline: 'Code. Create. Convert.',
  bio: 'I build modern, fast, and high-converting websites that help businesses grow digitally. Clean code, sharp design, real results.',

  // Full Story (About Page ke liye)
  story: `While others were scrolling reels, I started mastering web development to build professional websites for local businesses. I combine modern tech skills with a deep understanding of what businesses need to grow. My goal isn't just to make websites — it's to create digital tools that bring you more customers.`,

  // Philosophy (About Page ke liye)
  philosophy: `Every line of code I write has one purpose: to help your business grow. Whether it's a restaurant that needs more reservations, a coaching center that wants more admissions, or a gym that needs more members — I design with conversion in mind.`,
} as const

// ============================================================
// IMAGES (Apni Photos Ke Links Yahan Daalo)
// ============================================================
export const IMAGES = {
  /**
   * PROFILE PHOTO:
   * - Apni ek achhi photo upload karo ImgBB.com par
   * - Ya PostImages.org par
   * - Ya apni hosting par
   * - Direct link paste karo
   * 
   * Example: 'https://i.ibb.co/xxxxx/my-photo.jpg'
   */
  profilePhoto: '',

  /**
   * HERO SECTION PHOTO (Home Page Right Side):
   * - Ek professional photo ya illustration
   */
  heroPhoto: '',

  /**
   * OG IMAGE (Jab kisi ko link bhejoge toh ye dikhega):
   * - 1200x630 size recommended
   */
  ogImage: '',

  /**
   * FAVICON (Browser Tab Icon):
   * - 32x32 ya 64x64 .ico ya .png
   */
  favicon: '/favicon.ico',

  /**
   * PROJECT THUMBNAILS:
   * - Har project ke liye ek screenshot
   * - Upload karo ImgBB.com par aur link daalo
   */
  projectThumbnails: {
    spiceGarden: '/projects/spice-garden.png',
    successAcademy: '/projects/success-academy.png',
    powerFitness: '/projects/power-fitness.png',
  },
} as const

// ============================================================
// SOCIAL MEDIA & CONTACT LINKS
// ============================================================
export const SOCIAL_LINKS = {
  /**
   * INSTAGRAM (Primary Contact Method):
   * Format: 'https://instagram.com/YOUR_USERNAME'
   * Example: 'https://instagram.com/mohdhaziq.dev'
   */
  instagram: 'https://www.instagram.com/haziq.built',

  /**
   * GITHUB:
   * Format: 'https://github.com/YOUR_USERNAME'
   */
  github: 'https://github.com/mohdhaziq-work',

  /**
   * LINKEDIN:
   * Format: 'https://linkedin.com/in/YOUR_USERNAME'
   */
  linkedin: '',

  /**
   * EMAIL:
   * Format: 'mailto:your@email.com'
   */
  email: 'mailto:mohdhaziq1962@gmail.com',

  /**
   * TWITTER / X (Optional):
   * Format: 'https://x.com/YOUR_USERNAME'
   * Leave empty '' if not using
   */
  twitter: '',

  /**
   * YOUTUBE (Optional):
   * Format: 'https://youtube.com/@YOUR_CHANNEL'
   * Leave empty '' if not using
   */
  youtube: '',

  /**
   * PORTFOLIO WEBSITE (Optional):
   * Format: 'https://yourdomain.com'
   */
  website: 'https://mohdhaziq-portfolio.onrender.com',
} as const

// ============================================================
// CONTACT & AVAILABILITY
// ============================================================
export const CONTACT = {
  /**
   * INSTAGRAM DM LINK (Sabse Important!):
   * Ye link "DM Me" button par lagega
   * Format: 'https://instagram.com/YOUR_USERNAME'
   */
  primaryContact: SOCIAL_LINKS.instagram,

  /**
   * RESPONSE TIME:
   * Client ko kitna time lagega reply mein
   */
  responseTime: 'Within 2 hours',
  workingHours: '9 AM - 10 PM IST',
  workingDays: 'Mon - Sat',

  /**
   * AVAILABILITY STATUS:
   * true = Available, false = Not Available
   */
  isAvailable: true,

  /**
   * CUSTOM DM MESSAGE:
   * Jab client Instagram DM kare toh pre-filled message
   */
  dmMessage: 'Hi Haziq! I visited your portfolio and want to discuss a website project for my business.',

  /**
   * CONTACT EMAIL:
   */
  contactEmail: 'mohdhaziq1962@gmail.com'
} as const

// ============================================================
// DATABASE CONFIGURATION (Firebase)
// ============================================================
export const DATABASE = {
  /**
   * FIREBASE CONFIG:
   * console.firebase.google.com se ye values lo
   * Agar Firebase use nahi kar rahe toh sab blank chhod do
   */
  firebase: {
    apiKey: '',  // ⚠️ Add in Render Env: NEXT_PUBLIC_FIREBASE_API_KEY
    authDomain: '',  // ⚠️ Set in Render Env: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = mohdhaziq-portfolio.onrender.com
    projectId: '',  // ⚠️ Add in Render Env: NEXT_PUBLIC_FIREBASE_PROJECT_ID
    storageBucket: '',  // ⚠️ Add in Render Env: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    messagingSenderId: '',  // ⚠️ Add in Render Env: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    appId: '',  // ⚠️ Add in Render Env: NEXT_PUBLIC_FIREBASE_APP_ID
    measurementId: '', // Optional
  },

  /**
   * FIRESTORE COLLECTIONS:
   * Agar Firebase use kar rahe ho toh collection names
   */
  collections: {
    contacts: 'contacts',        // Contact form submissions
    projects: 'projects',        // Project data
    testimonials: 'testimonials', // Client reviews
    analytics: 'analytics',      // Visitor tracking
  },

  /**
   * CONTACT FORM STORAGE:
   * 'firebase' = Firebase Firestore mein save hoga
   * 'email' = Email par aayega
   * 'alert' = Simple alert (default, no backend)
   */
  contactFormStorage: 'alert' as 'firebase' | 'email' | 'alert',

  /**
   * EMAIL CONFIG (If using email):
   * Only needed if contactFormStorage = 'email'
   */
  email: {
    service: '',    // e.g., 'gmail'
    username: '',   // Your email
    password: '',   // App password (NOT your real password)
    toEmail: '',    // Where to receive contact form emails
  },
} as const

// ============================================================
// WEBSITE & SEO
// ============================================================
export const WEBSITE = {
  /**
   * SITE URL:
   * Render ya Vercel par deploy ke baad ye update karo
   */
  url: 'https://mohdhaziq-portfolio.onrender.com',

  /**
   * SEO TITLE:
   * Browser tab mein ye dikhega
   */
  title: 'Mohd Haziq — Web Developer',

  /**
   * SEO DESCRIPTION:
   * Google search mein ye dikhega
   */
  description: 'Building high-converting, professional websites for businesses. Modern, fast, and designed to grow your business digitally.',

  /**
   * SEO KEYWORDS:
   * Google search optimization ke liye
   */
  keywords: [
    'Web Developer',
    'Website Design',
    'Local Business Growth',
    'Portfolio',
    'Next.js Developer',
    'Freelancer',
    'Frontend Developer',
    'Mobile Friendly',
  ],

  /**
   * GOOGLE ANALYTICS (Optional):
   * Format: 'G-XXXXXXXXXX'
   * Leave empty '' if not using
   */
  googleAnalyticsId: '',

  /**
   * GOOGLE SEARCH CONSOLE (Optional):
   * Leave empty '' if not using
   */
  googleSearchConsoleId: '',
} as const

// ============================================================
// PRICING (Services Page)
// ============================================================
export const PRICING = {
  /**
   * CURRENCY SYMBOL:
   */
  currency: '₹',

  /**
   * PLANS:
   * Price, features sab yahan change karo
   */
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '2,500',
      description: 'A clean, professional landing page to get your business online.',
      features: [
        'Single Page Design',
        'Mobile Responsive',
        'Instagram DM Integration',
        'Basic SEO Setup',
        '1 Revision Round',
        '3-Day Delivery',
      ],
      popular: false,
    },
    {
      id: 'business',
      name: 'Business',
      price: '6,000',
      description: 'A complete multi-page website with SEO, forms, and professional animations.',
      features: [
        'Up to 5 Pages',
        'Mobile Responsive',
        'SEO Optimization',
        'Contact Form + Instagram DM',
        'Scroll Animations',
        '2 Revision Rounds',
        '7-Day Delivery',
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '12,000',
      description: 'A full-stack web application with database, dashboards, and custom tools.',
      features: [
        'Unlimited Pages',
        'Custom Dashboard/Portal',
        'Database Integration',
        'Admin Panel',
        'Custom Tools (Calculator, Quiz)',
        'Priority Support',
        '3 Revision Rounds',
        '14-Day Delivery',
      ],
      popular: false,
    },
  ],
} as const

// ============================================================
// THEME & APPEARANCE (Advanced)
// ============================================================
export const THEME = {
  /**
   * PRIMARY COLOR (Accent):
   * Buttons, links, highlights
   */
  accentColor: '#1a73e8',

  /**
   * FONT:
   * 'inter' = Google-style clean
   * 'plus-jakarta' = Modern rounded
   */
  fontFamily: 'inter',

  /**
   * ANIMATIONS:
   * true = Enable, false = Disable
   */
  enableAnimations: true,

  /**
   * SCROLL PROGRESS BAR:
   */
  showScrollProgress: true,
} as const

// ============================================================
// FAQ (Contact Page)
// ============================================================
export const FAQ = [
  {
    question: 'Do you offer a free mockup?',
    answer: 'Yes! I create a free homepage mockup for your business. If you like it, we move forward. No pressure at all.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'Starter: 3 days. Business: 7 days. Premium: 14 days. Timelines are clear and guaranteed.',
  },
  {
    question: 'What if I need changes after delivery?',
    answer: 'Each plan includes revision rounds. Starter: 1 round, Business: 2 rounds, Premium: 3 rounds.',
  },
  {
    question: 'Will my website work on mobile?',
    answer: 'Absolutely. Every website I build is mobile-first and responsive on all devices.',
  },
  {
    question: 'How do I get started?',
    answer: "Simply DM me on Instagram. Tell me about your business, and I'll take it from there!",
  },
] as const
