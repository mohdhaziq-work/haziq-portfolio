'use client'

import { useState } from 'react'
import Link from 'next/link'

const DESIGNS = [
  { id: 1, name: 'Skeuomorphism', cat: 'Realistic', desc: 'Realistic textures, leather, wood grain, and physical metaphors.', color: '#8b7355', bg: '#f5f0ea', href: '/skeuomorphism' },
  { id: 2, name: 'Neumorphism', cat: 'Soft UI', desc: 'Soft extruded elements with gentle dual shadows.', color: '#6c63ff', bg: '#e8e5f0', href: '/neomorphism' },
  { id: 3, name: 'Pixel Art', cat: 'Retro', desc: '8-bit retro gaming aesthetic with pixel grids.', color: '#e94560', bg: '#1a1a2e', href: '/pixel-art', light: true },
  { id: 4, name: 'Glassmorphism', cat: 'Modern', desc: 'Frosted glass panels with blur and transparency.', color: '#4ecdc4', bg: '#e8faf8', href: '/glassmorphism' },
  { id: 5, name: 'Brutalism', cat: 'Bold', desc: 'Raw, unpolished design with stark contrast.', color: '#ff3e3e', bg: '#fff5f5', href: '/brutalism' },
  { id: 6, name: 'Cyberpunk', cat: 'Futuristic', desc: 'Neon glow, glitch effects, and dark sci-fi vibes.', color: '#ff00ff', bg: '#1a0a2e', href: '/cyberpunk', light: true },
  { id: 7, name: 'Minimalism', cat: 'Clean', desc: 'Less is more. White space, one font, pure focus.', color: '#111111', bg: '#f8f8f8', href: '/minimalism' },
  { id: 8, name: 'Retro Vintage', cat: 'Retro', desc: 'Warm sepia tones, classic serif fonts, nostalgia.', color: '#8b7355', bg: '#f4e8d1', href: '/retro' },
  { id: 9, name: 'Gradient Mesh', cat: 'Colorful', desc: 'Flowing multi-color gradients and mesh blends.', color: '#667eea', bg: '#eef0fb', href: '/gradient-mesh' },
  { id: 10, name: 'Dark Mode', cat: 'Modern', desc: 'Dark backgrounds, light text, easy on the eyes.', color: '#58a6ff', bg: '#0d1117', href: '/dark-mode', light: true },
  { id: 11, name: 'Flat Design', cat: 'Clean', desc: 'Bold colors, zero shadows, clean geometry.', color: '#3498db', bg: '#eaf4fc', href: '/flat-design' },
  { id: 12, name: 'Material Design', cat: 'Modern', desc: 'Google design language with elevation and motion.', color: '#4285f4', bg: '#e8f0fe', href: '/material-design' },
  { id: 13, name: 'Aurora', cat: 'Nature', desc: 'Northern lights — living, flowing color gradients.', color: '#00cc88', bg: '#e6faf2', href: '/aurora' },
  { id: 14, name: 'Isometric', cat: '3D', desc: '3D-like 2D perspective with depth illusion.', color: '#e74c3c', bg: '#fdf0ef', href: '/isometric' },
  { id: 15, name: 'Typography Led', cat: 'Text', desc: 'Typography IS the design. Letters as visuals.', color: '#2c3e50', bg: '#f0f2f5', href: '/typography' },
  { id: 16, name: 'Illustration', cat: 'Art', desc: 'Custom hand-drawn illustrations as hero elements.', color: '#f59e0b', bg: '#fef9ec', href: '/illustration' },
  { id: 17, name: 'Parallax', cat: 'Interactive', desc: 'Scroll-based depth layers and motion effects.', color: '#667eea', bg: '#eef0fb', href: '/parallax' },
  { id: 18, name: 'Split Screen', cat: 'Layout', desc: 'Half-half contrasting layout with drag divider.', color: '#1a1a2e', bg: '#f0f1f5', href: '/split-screen' },
  { id: 19, name: 'Monochrome', cat: 'Minimal', desc: 'Single color family, infinite shades of gray.', color: '#333333', bg: '#f5f5f5', href: '/monochrome' },
  { id: 20, name: 'Organic', cat: 'Nature', desc: 'Natural curves, soft blobs, earthy feel.', color: '#27ae60', bg: '#eafaf1', href: '/organic' },
  { id: 21, name: 'Futuristic', cat: 'Sci-Fi', desc: 'HUD elements, grid systems, sci-fi interfaces.', color: '#00d4ff', bg: '#e6f9ff', href: '/futuristic' },
  { id: 22, name: 'Handwritten', cat: 'Personal', desc: 'Pen-on-paper feel, sticky notes, notebook lines.', color: '#5d4037', bg: '#fdf6e3', href: '/handwritten' },
  { id: 23, name: 'Geometric', cat: 'Pattern', desc: 'Bold shapes, rotating patterns, visual rhythm.', color: '#ff6348', bg: '#fff2ef', href: '/geometric' },
  { id: 24, name: 'Cinematic', cat: 'Visual', desc: 'Letterbox frames, dramatic lighting, film grain.', color: '#ffd700', bg: '#1a1a1a', href: '/cinematic', light: true },
  { id: 25, name: 'Watercolor', cat: 'Art', desc: 'Soft painted blobs, pastel palettes, artistic.', color: '#87ceeb', bg: '#f0f8ff', href: '/watercolor' },
  { id: 26, name: 'Neon Glow', cat: 'Bold', desc: 'Pulsing neon borders and glowing text effects.', color: '#ff00ff', bg: '#0a0a0a', href: '/neon-glow', light: true },
  { id: 27, name: 'Abstract', cat: 'Art', desc: 'Non-representational shapes, colors, and forms.', color: '#e94560', bg: '#16213e', href: '/abstract', light: true },
  { id: 28, name: 'Wabi Sabi', cat: 'Japanese', desc: 'Imperfect beauty — rustic, worn, authentic.', color: '#8b7355', bg: '#f5f0eb', href: '/wabi-sabi' },
  { id: 29, name: 'Conceptual Sketch', cat: 'Creative', desc: 'Wireframe, blueprint, pencil-on-paper aesthetic.', color: '#666666', bg: '#fafafa', href: '/conceptual-sketch' },
]

const CATS = ['All', 'Modern', 'Retro', 'Bold', 'Clean', 'Futuristic', 'Art', 'Nature', 'Layout', 'Other']

export default function DesignsPage() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  const list = DESIGNS.filter(d => {
    const okCat = cat === 'All' || d.cat === cat
    const okQ = d.name.toLowerCase().includes(q.toLowerCase()) || d.desc.toLowerCase().includes(q.toLowerCase())
    return okCat && okQ
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', paddingTop: '80px', paddingBottom: '64px' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#999', marginBottom: '12px' }}>
            Portfolio Showcase
          </p>
          <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.1 }}>
            29 Design Styles
          </h1>
          <p style={{ fontSize: '17px', color: '#777', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Each style has a full interactive demo page. Click any card to explore the design in action.
          </p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '400px', margin: '0 auto 32px' }}>
          <input
            type="text"
            placeholder="Search styles..."
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{
              width: '100%', padding: '14px 20px', fontSize: '15px',
              border: '1px solid #e0e0e0', borderRadius: '12px',
              background: '#fff', outline: 'none',
              color: '#333',
            }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '8px 20px', fontSize: '13px', fontWeight: 600,
                borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: cat === c ? '#111' : '#fff',
                color: cat === c ? '#fff' : '#666',
                boxShadow: cat === c ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'all 0.2s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {list.map(d => (
            <Link
              key={d.id}
              href={d.href}
              style={{
                display: 'block', textDecoration: 'none',
                background: '#fff', borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #eee',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Preview bar */}
              <div style={{
                height: '140px',
                background: d.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Big faded word behind */}
                <span style={{
                  position: 'absolute',
                  fontSize: '80px',
                  fontWeight: 900,
                  color: d.light ? 'rgba(255,255,255,0.06)' : (d.color + '0a'),
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {d.name.split(' ')[0].toUpperCase()}
                </span>

                {/* Name */}
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '22px',
                  fontWeight: 800,
                  color: d.light ? '#fff' : d.color,
                  textAlign: 'center',
                  padding: '0 16px',
                }}>
                  {d.name}
                </span>

                {/* Category pill */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: '999px',
                  background: d.light ? 'rgba(255,255,255,0.2)' : (d.color + '15'),
                  color: d.light ? 'rgba(255,255,255,0.9)' : d.color,
                }}>
                  {d.cat}
                </span>
              </div>

              {/* Text content */}
              <div style={{ padding: '20px 24px 24px' }}>
                <p style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#555',
                  marginBottom: '16px',
                }}>
                  {d.desc}
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  background: '#f5f5f5',
                  color: '#333',
                }}>
                  View Demo
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty */}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontSize: '18px', color: '#bbb', marginBottom: '16px' }}>No styles found</p>
            <button
              onClick={() => { setQ(''); setCat('All') }}
              style={{
                padding: '10px 24px', fontSize: '14px', fontWeight: 600,
                border: '1px solid #ddd', borderRadius: '8px',
                background: '#fff', color: '#666', cursor: 'pointer',
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          padding: '48px 32px',
          background: '#fff',
          borderRadius: '20px',
          border: '1px solid #eee',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
            Like a style? Let's build it!
          </h2>
          <p style={{ fontSize: '16px', color: '#777', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Pick any design and I will create a custom website for your business. Starting at Rs 2,500.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              fontSize: '15px',
              fontWeight: 700,
              background: '#111',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
            }}
          >
            Start a Project
          </a>
        </div>
      </div>
    </div>
  )
}
