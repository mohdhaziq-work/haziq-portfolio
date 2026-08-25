'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const green = '#53d769'

export default function PixelArtServices() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const accent = '#e94560'
  const yellow = '#f5c518'

  const services = [
    { title: 'PIXEL WEBSITES', price: 'Rs 5,000', desc: 'Full retro-themed websites with8-bit aesthetics, pixel fonts, and interactive elements.', features: ['Custom pixel art', 'Responsive layout', 'Retro animations', 'SEO optimized'] },
    { title: 'GAME UI DESIGN', price: 'Rs 3,000', desc: 'User interfaces for games — menus, HUDs, inventory screens, and dialog boxes.', features: ['Sprite-based UI', 'Multiple states', 'Asset sheets', 'Game-ready'] },
    { title: 'PIXEL BRANDING', price: 'Rs 2,500', desc: 'Logos, icons, and brand assets in pixel art style. Perfect for indie games and retro brands.', features: ['Logo design', 'Icon set', 'Color palette', 'Brand guide'] },
  ]

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: `3px solid ${accent}`, padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ color: yellow, fontSize: '24px', textShadow: `2px 2px 0 ${accent}` }}>SERVICES</h1>
        <p style={{ color: '#8892b0', fontSize: '8px', marginTop: '8px' }}>What we offer</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: yellow, fontSize: '9px', marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: accent, fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#8892b0', fontSize: '7px', lineHeight: 2, marginBottom: '16px', flex: 1 }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '6px', height: '6px', background: green }} />
                  <span style={{ color: '#8892b0', fontSize: '7px' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pixel-art/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px', background: accent,
              color: yellow, border: `2px solid ${yellow}`, fontSize: '7px', textDecoration: 'none', fontWeight: 700,
            }}>GET STARTED</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/pixel-art" style={{ padding: '12px 28px', background: '#0a0a1a', color: '#8892b0', border: `2px solid ${accent}30`, fontSize: '8px', textDecoration: 'none' }}>
          BACK HOME
        </Link>
      </div>
    </div>
  )
}
