export const SITE = {
  name: 'Mohd Haziq',
  title: 'Mohd Haziq — AI-Powered Web Developer',
  description: 'Building high-converting, AI-powered websites for local businesses. Modern, fast, and designed to grow your business digitally.',
  url: 'https://haziq.dev',
  city: 'Sultanpur',
  state: 'Uttar Pradesh',
  country: 'India',
  age: 16,
  tagline: 'Code. Create. Convert.',
} as const

export const SOCIAL = {
  github: 'https://github.com/mohdhaziq-work',
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/in/',
  email: 'mailto:contact@haziq.dev',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const PROJECTS = [
  {
    id: 'spice-garden',
    title: 'Spice Garden',
    category: 'Restaurant',
    description: 'A luxury dining experience reimagined for the web. Royal Awadhi cuisine meets modern design with a gold-black aesthetic, digital menu, and seamless reservation system.',
    longDescription: 'Spice Garden is a premium restaurant website built to convert hungry visitors into paying customers. Featuring a royal gold-and-black theme, an interactive digital menu with Veg/Non-Veg filters, auto-rotating testimonials, and a smart newsletter system. Every element is designed to make the user feel the luxury before they even walk through the door.',
    techStack: ['Tailwind CSS', 'AOS Animations', 'Vanilla JS', 'Google Fonts'],
    features: ['Digital Menu with Filters', 'Testimonial Slider', 'Newsletter Integration', 'Multi-Page Layout', 'SEO Optimized', 'Mobile Responsive'],
    liveUrl: 'https://mohdhaziq-work.github.io/spice-garden-restaurant/',
    githubUrl: 'https://github.com/mohdhaziq-work/spice-garden-restaurant',
    thumbnail: '',
    accent: '#d4af37',
    bgColor: '#0c0a09',
  },
  {
    id: 'success-academy',
    title: 'Success Academy',
    category: 'Education',
    description: 'An enterprise-grade educational portal with student dashboards, admin management, and a multi-step admission system. Trust through technology.',
    longDescription: 'Success Academy redefines how coaching centers present themselves online. It features a complete student portal with login system, multi-step admission form, admin dashboard for managing students and requests, and a LocalStorage-based CRUD database. The design follows enterprise SaaS patterns to build instant credibility.',
    techStack: ['Alpine.js', 'Tailwind CSS', 'LocalStorage DB', 'CSS Architecture'],
    features: ['Multi-Step Admission Form', 'Student/Admin Login Portal', 'CRUD Database System', 'Role-Based Dashboard', 'Enterprise CSS System', 'Progressive UX'],
    liveUrl: 'https://mohdhaziq-work.github.io/success-academy-coaching/',
    githubUrl: 'https://github.com/mohdhaziq-work/success-academy-coaching',
    thumbnail: '',
    accent: '#2563eb',
    bgColor: '#f8fafc',
  },
  {
    id: 'power-fitness',
    title: 'Power Fitness',
    category: 'Fitness',
    description: 'An aggressive, high-energy gym website with neon-dark aesthetics, BMI calculator, membership pricing, and a member console. Designed to convert.',
    longDescription: 'Power Fitness is built around one goal: conversion. The neon-red-on-black design creates urgency and excitement. It features a functional BMI calculator, three-tier membership pricing, a member dashboard console, and component-based architecture with dynamic sidebar injection. Every pixel is optimized to turn visitors into members.',
    techStack: ['Alpine.js', 'Component Architecture', 'Tailwind CSS', 'Custom Design System'],
    features: ['BMI Calculator Tool', '3-Tier Pricing System', 'Member Dashboard Console', 'Component Injection System', 'Glassmorphism Sidebar', 'Neon Dark Theme'],
    liveUrl: 'https://mohdhaziq-work.github.io/power-fitness-gym/',
    githubUrl: 'https://github.com/mohdhaziq-work/power-fitness-gym',
    thumbnail: '',
    accent: '#ff3e3e',
    bgColor: '#000000',
  },
] as const

export const SERVICES = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹2,500',
    period: 'one-time',
    description: 'A clean, professional landing page to get your business online.',
    icon: 'rocket',
    features: [
      'Single Page Design',
      'Mobile Responsive',
      'Instagram DM Integration',
      'Basic SEO Setup',
      '1 Revision Round',
      '3-Day Delivery',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹6,000',
    period: 'one-time',
    description: 'A complete multi-page website with SEO, forms, and professional animations.',
    icon: 'briefcase',
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
    cta: 'Most Popular',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹12,000',
    period: 'one-time',
    description: 'A full-stack web application with database, dashboards, and custom tools.',
    icon: 'crown',
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
    cta: 'Go Premium',
  },
] as const

export const STATS = [
  { value: '3+', label: 'Live Projects' },
  { value: '100%', label: 'AI-Powered' },
  { value: '3+', label: 'Niches Covered' },
  { value: '₹2.5K', label: 'Starting At' },
] as const

export const SKILLS = [
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Alpine.js'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'Figma', 'Glassmorphism', 'Dark Mode', 'Micro-Animations'] },
  { category: 'Tools & AI', items: ['v0.dev', 'Lovable', 'Cursor', 'GitHub', 'Canva', 'Vercel', 'Firebase'] },
  { category: 'Backend', items: ['Node.js', 'Next.js API', 'Firebase Firestore', 'LocalStorage DB', 'REST APIs'] },
] as const

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We discuss your business, goals, target audience, and what you need from your website.',
    icon: 'message-circle',
  },
  {
    step: 2,
    title: 'Design & Prototype',
    description: 'I create a custom design mockup for your approval. Free of charge, no commitment.',
    icon: 'palette',
  },
  {
    step: 3,
    title: 'Development',
    description: 'Your website gets built with modern tech, smooth animations, and mobile-first approach.',
    icon: 'code',
  },
  {
    step: 4,
    title: 'Launch & Support',
    description: 'We go live! Plus, I provide post-launch support to make sure everything runs smoothly.',
    icon: 'rocket',
  },
] as const
