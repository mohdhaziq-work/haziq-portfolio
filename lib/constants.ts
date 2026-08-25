/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              AUTO-GENERATED FROM SITE-CONFIG                ║
 * ║                                                              ║
 * ║  ⚠️ IS FILE KO EDIT MAT KARO!                               ║
 * ║  ⚠️ SAB CHANGES 'config/site-config.ts' MEIN KARO           ║
 * ║  ⚠️ YE FILE CONFIG SE READ KARTA HAI                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import {
  PERSONAL,
  SOCIAL_LINKS,
  CONTACT,
  WEBSITE,
  PRICING,
  IMAGES,
  FAQ,
  TESTIMONIALS,
} from '@/config/site-config'

// ==================== SITE ====================
export const SITE = {
  name: PERSONAL.fullName,
  title: WEBSITE.title,
  description: WEBSITE.description,
  url: WEBSITE.url,
  city: PERSONAL.city,
  state: PERSONAL.state,
  country: PERSONAL.country,
  age: PERSONAL.age,
  tagline: PERSONAL.tagline,
} as const

// ==================== SOCIAL ====================
export const SOCIAL = {
  github: SOCIAL_LINKS.github,
  instagram: SOCIAL_LINKS.instagram,
  linkedin: SOCIAL_LINKS.linkedin,
  email: SOCIAL_LINKS.email,
  twitter: SOCIAL_LINKS.twitter,
  youtube: SOCIAL_LINKS.youtube,
} as const

// ==================== NAV ====================
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Designs', href: '/designs' },
  { label: 'Free Mockup', href: '/free-mockup' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'Contact', href: '/contact' },
] as const

// ==================== PROJECTS ====================
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
    thumbnail: IMAGES.projectThumbnails.spiceGarden,
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
    thumbnail: IMAGES.projectThumbnails.successAcademy,
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
    thumbnail: IMAGES.projectThumbnails.powerFitness,
    accent: '#ff3e3e',
    bgColor: '#000000',
  },
] as const

// ==================== SERVICES ====================
export const SERVICES = [
  {
    id: PRICING.plans[0].id,
    name: PRICING.plans[0].name,
    price: `${PRICING.currency}${PRICING.plans[0].price}`,
    period: 'one-time',
    description: PRICING.plans[0].description,
    icon: 'rocket' as const,
    features: [...PRICING.plans[0].features],
    popular: PRICING.plans[0].popular,
    cta: 'Get Started',
  },
  {
    id: PRICING.plans[1].id,
    name: PRICING.plans[1].name,
    price: `${PRICING.currency}${PRICING.plans[1].price}`,
    period: 'one-time',
    description: PRICING.plans[1].description,
    icon: 'briefcase' as const,
    features: [...PRICING.plans[1].features],
    popular: PRICING.plans[1].popular,
    cta: 'Most Popular',
  },
  {
    id: PRICING.plans[2].id,
    name: PRICING.plans[2].name,
    price: `${PRICING.currency}${PRICING.plans[2].price}`,
    period: 'one-time',
    description: PRICING.plans[2].description,
    icon: 'crown' as const,
    features: [...PRICING.plans[2].features],
    popular: PRICING.plans[2].popular,
    cta: 'Go Premium',
  },
] as const

// ==================== STATS ====================
export const STATS = [
  { value: '3+', label: 'Live Projects' },
  { value: '100%', label: 'Modern Tech' },
  { value: '3+', label: 'Niches Covered' },
  { value: '2hr', label: 'Response Time' },
] as const

// ==================== SKILLS ====================
export const SKILLS = [
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Alpine.js'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'Figma', 'Glassmorphism', 'Dark Mode', 'Micro-Animations'] },
  { category: 'Tools & AI', items: ['v0.dev', 'Lovable', 'Cursor', 'GitHub', 'Canva', 'Vercel', 'Firebase'] },
  { category: 'Backend', items: ['Node.js', 'Next.js API', 'Firebase Firestore', 'LocalStorage DB', 'REST APIs'] },
] as const

// ==================== PROCESS ====================
export const PROCESS_STEPS = [
  { step: 1, title: 'Discovery Call', description: 'We discuss your business, goals, target audience, and what you need from your website.', icon: 'message-circle' },
  { step: 2, title: 'Design & Prototype', description: 'I create a custom design mockup for your approval. Free of charge, no commitment.', icon: 'palette' },
  { step: 3, title: 'Development', description: 'Your website gets built with modern tech, smooth animations, and mobile-first approach.', icon: 'code' },
  { step: 4, title: 'Launch & Support', description: 'We go live! Plus, I provide post-launch support to make sure everything runs smoothly.', icon: 'rocket' },
] as const

// ==================== FAQ ====================
export { FAQ }

// ==================== TESTIMONIALS ====================
export { TESTIMONIALS }

// ==================== CONTACT ====================
export const CONTACT_INFO = {
  primaryContact: CONTACT.primaryContact,
  responseTime: CONTACT.responseTime,
  workingHours: CONTACT.workingHours,
  workingDays: CONTACT.workingDays,
  isAvailable: CONTACT.isAvailable,
  dmMessage: CONTACT.dmMessage,
  dmLink: `${CONTACT.primaryContact}?text=${encodeURIComponent(CONTACT.dmMessage)}`,
} as const

// ==================== IMAGES ====================
export { IMAGES }
