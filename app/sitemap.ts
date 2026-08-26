import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Both domains for Google indexing
  const domains = [
    'https://mohdhaziq-portfolio.vercel.app',
    'https://mohdhaziq-portfolio.onrender.com',
  ]

  const pages = [
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/about', priority: 0.9, freq: 'weekly' as const },
    { path: '/projects', priority: 0.9, freq: 'weekly' as const },
    { path: '/services', priority: 0.9, freq: 'weekly' as const },
    { path: '/contact', priority: 0.8, freq: 'monthly' as const },
    { path: '/tutorials', priority: 0.7, freq: 'weekly' as const },
    { path: '/designs', priority: 0.9, freq: 'weekly' as const },
    // All29 design home pages
    { path: '/skeuomorphism', priority: 0.8, freq: 'monthly' as const },
    { path: '/neomorphism', priority: 0.8, freq: 'monthly' as const },
    { path: '/pixel-art', priority: 0.8, freq: 'monthly' as const },
    { path: '/glassmorphism', priority: 0.8, freq: 'monthly' as const },
    { path: '/brutalism', priority: 0.8, freq: 'monthly' as const },
    { path: '/cyberpunk', priority: 0.8, freq: 'monthly' as const },
    { path: '/minimalism', priority: 0.8, freq: 'monthly' as const },
    { path: '/retro', priority: 0.8, freq: 'monthly' as const },
    { path: '/gradient-mesh', priority: 0.8, freq: 'monthly' as const },
    { path: '/dark-mode', priority: 0.8, freq: 'monthly' as const },
    { path: '/flat-design', priority: 0.8, freq: 'monthly' as const },
    { path: '/material-design', priority: 0.8, freq: 'monthly' as const },
    { path: '/aurora', priority: 0.8, freq: 'monthly' as const },
    { path: '/isometric', priority: 0.8, freq: 'monthly' as const },
    { path: '/typography', priority: 0.8, freq: 'monthly' as const },
    { path: '/illustration', priority: 0.8, freq: 'monthly' as const },
    { path: '/parallax', priority: 0.8, freq: 'monthly' as const },
    { path: '/split-screen', priority: 0.8, freq: 'monthly' as const },
    { path: '/monochrome', priority: 0.8, freq: 'monthly' as const },
    { path: '/organic', priority: 0.8, freq: 'monthly' as const },
    { path: '/futuristic', priority: 0.8, freq: 'monthly' as const },
    { path: '/handwritten', priority: 0.8, freq: 'monthly' as const },
    { path: '/geometric', priority: 0.8, freq: 'monthly' as const },
    { path: '/cinematic', priority: 0.8, freq: 'monthly' as const },
    { path: '/watercolor', priority: 0.8, freq: 'monthly' as const },
    { path: '/neon-glow', priority: 0.8, freq: 'monthly' as const },
    { path: '/abstract', priority: 0.8, freq: 'monthly' as const },
    { path: '/wabi-sabi', priority: 0.8, freq: 'monthly' as const },
    { path: '/conceptual-sketch', priority: 0.8, freq: 'monthly' as const },
  ]

  const sitemap: MetadataRoute.Sitemap = []

  for (const domain of domains) {
    for (const page of pages) {
      sitemap.push({
        url: `${domain}${page.path}`,
        lastModified: now,
        changeFrequency: page.freq,
        priority: page.priority,
      })
    }
  }

  return sitemap
}
