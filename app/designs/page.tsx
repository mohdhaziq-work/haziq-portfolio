'use client'

import { useState } from 'react'

// 29 Design Styles
const DESIGN_STYLES = [
  { id: 1, name: 'Pixel Art', category: 'Retro', description: '8-bit retro gaming aesthetic with pixel-perfect designs', color: '#ff6b6b', icon: '🎮' },
  { id: 2, name: 'Glassmorphism', category: 'Modern', description: 'Frosted glass effect with blur and transparency', color: '#4ecdc4', icon: '💎' },
  { id: 3, name: 'Neumorphism', category: 'Modern', description: 'Soft UI with subtle shadows and extruded elements', color: '#a8e6cf', icon: '🔘' },
  { id: 4, name: 'Brutalism', category: 'Bold', description: 'Raw, unpolished, bold typography and layouts', color: '#ffd93d', icon: '⬛' },
  { id: 5, name: 'Cyberpunk', category: 'Futuristic', description: 'Neon lights, dark backgrounds, futuristic vibes', color: '#ff00ff', icon: '🌆' },
  { id: 6, name: 'Minimalism', category: 'Clean', description: 'Less is more - clean, simple, focused', color: '#ffffff', icon: '◻️' },
  { id: 7, name: 'Retro/Vintage', category: 'Retro', description: 'Old-school nostalgic design with vintage colors', color: '#d4a574', icon: '📻' },
  { id: 8, name: 'Gradient Mesh', category: 'Colorful', description: 'Flowing colorful gradients and mesh backgrounds', color: '#667eea', icon: '🌈' },
  { id: 9, name: 'Dark Mode', category: 'Modern', description: 'Dark backgrounds with light text - easy on eyes', color: '#1a1a2e', icon: '🌙' },
  { id: 10, name: 'Skeuomorphism', category: 'Realistic', description: 'Realistic textures mimicking real-world objects', color: '#8b7355', icon: '🎨' },
  { id: 11, name: 'Flat Design', category: 'Clean', description: 'Simple, no shadows, bold colors, clean shapes', color: '#3498db', icon: '📐' },
  { id: 12, name: 'Material Design', category: 'Modern', description: 'Google design language with elevation and motion', color: '#4285f4', icon: '📦' },
  { id: 13, name: 'Aurora', category: 'Nature', description: 'Northern lights effect with flowing colors', color: '#00ff88', icon: '🌌' },
  { id: 14, name: 'Isometric', category: '3D', description: '3D-like 2D design with isometric perspective', color: '#e74c3c', icon: '🧊' },
  { id: 15, name: 'Typography-Led', category: 'Text', description: 'Typography as the main visual element', color: '#2c3e50', icon: '🔤' },
  { id: 16, name: 'Illustration-Heavy', category: 'Art', description: 'Custom illustrations as primary design element', color: '#e91e63', icon: '🖌️' },
  { id: 17, name: 'Parallax', category: 'Interactive', description: 'Scroll-based animations and depth effects', color: '#9b59b6', icon: '📜' },
  { id: 18, name: 'Split Screen', category: 'Layout', description: 'Half-half layout with contrasting sections', color: '#1abc9c', icon: '⬜' },
  { id: 19, name: 'Monochrome', category: 'Minimal', description: 'Single color palette with varying shades', color: '#333333', icon: '⬛' },
  { id: 20, name: 'Organic', category: 'Nature', description: 'Natural, flowing shapes and soft curves', color: '#27ae60', icon: '🍃' },
  { id: 21, name: 'Futuristic', category: 'Sci-Fi', description: 'Sci-fi inspired with tech elements', color: '#00d4ff', icon: '🚀' },
  { id: 22, name: 'Handwritten', category: 'Personal', description: 'Script fonts and personal touch', color: '#8b4513', icon: '✍️' },
  { id: 23, name: 'Geometric', category: 'Pattern', description: 'Bold shapes and geometric patterns', color: '#ff6348', icon: '🔷' },
  { id: 24, name: 'Cinematic', category: 'Visual', description: 'Movie-like visuals with dramatic lighting', color: '#2c3e50', icon: '🎬' },
  { id: 25, name: 'Watercolor', category: 'Art', description: 'Soft, painted watercolor effect', color: '#87ceeb', icon: '🎨' },
  { id: 26, name: 'Neon Glow', category: 'Bold', description: 'Glowing neon elements on dark backgrounds', color: '#ff00ff', icon: '💡' },
  { id: 27, name: 'Abstract', category: 'Art', description: 'Non-representational artistic expression', color: '#ff6b6b', icon: '🎭' },
  { id: 28, name: 'Wabi Sabi', category: 'Japanese', description: 'Japanese imperfect beauty - rustic and natural', color: '#8b7355', icon: '🍵' },
  { id: 29, name: 'Conceptual Sketch', category: 'Creative', description: 'Hand-drawn wireframe aesthetic', color: '#666666', icon: '✏️' },
]

const CATEGORIES = ['All', 'Modern', 'Retro', 'Bold', 'Clean', 'Futuristic', 'Art', 'Nature', 'Layout', 'Other']

export default function DesignsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDesigns = DESIGN_STYLES.filter(design => {
    const matchesCategory = activeCategory === 'All' || design.category === activeCategory
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Design <span className="text-accent">Styles</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            29 unique design styles for your next project. Choose a style and let's build something amazing.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search design styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Design Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Color Preview */}
              <div
                className="h-32 relative overflow-hidden"
                style={{ backgroundColor: design.color + '20' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                    {design.icon}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {design.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{design.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{design.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {design.description}
                </p>
                <button className="w-full py-2.5 bg-gray-100 hover:bg-accent hover:text-white text-gray-700 rounded-lg text-sm font-medium transition-all">
                  Request This Style
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDesigns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No design styles found</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
              className="mt-4 text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-2xl p-8 border border-accent/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Like a style? Let's build it!
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Choose any design style and I'll create a custom website for your business. Starting at ₹2,500.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors"
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
