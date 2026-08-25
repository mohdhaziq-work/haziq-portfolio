'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PixelArtGallery() {
  const [mounted, setMounted] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const accent = '#e94560'
  const yellow = '#f5c518'

  const works = [
    { title: 'Retro Dashboard', cat: 'Web', color: '#e94560' },
    { title: 'Game UI Kit', cat: 'UI', color: '#53d769' },
    { title: 'Pixel Portraits', cat: 'Art', color: '#f5c518' },
    { title: 'Arcade Landing', cat: 'Web', color: '#4ecdc4' },
    { title: 'Sprite Sheet Tool', cat: 'Tool', color: '#9b59b6' },
    { title: '8-Bit Icons', cat: 'UI', color: '#ff6b6b' },
    { title: 'Retro Blog Theme', cat: 'Web', color: '#3498db' },
    { title: 'Pixel Animations', cat: 'Art', color: '#e67e22' },
    { title: 'Game Menu System', cat: 'UI', color: '#1abc9c' },
  ]

  const filters = ['All', 'Web', 'UI', 'Art', 'Tool']
  const filtered = activeFilter === 'All' ? works : works.filter(w => w.cat === activeFilter)

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: `3px solid ${accent}`, padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: yellow, fontSize: '24px', textShadow: `2px 2px 0 ${accent}` }}>GALLERY</h1>
        <p style={{ color: '#8892b0', fontSize: '8px', marginTop: '8px' }}>Our pixel-perfect creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding: '8px 16px', fontSize: '7px', cursor: 'pointer',
            background: activeFilter === f ? accent : '#0a0a1a',
            color: activeFilter === f ? yellow : '#8892b0',
            border: `2px solid ${activeFilter === f ? yellow : accent + '30'}`,
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#16213e', border: `2px solid ${accent}30`, overflow: 'hidden' }}>
            <div style={{ height: '120px', background: `${w.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '40px', background: w.color, opacity: 0.4 }} />
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ color: yellow, fontSize: '8px', marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#8892b0', fontSize: '6px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/pixel-art" style={{ padding: '12px 28px', background: accent, color: yellow, border: `2px solid ${yellow}`, fontSize: '8px', textDecoration: 'none' }}>
          BACK HOME
        </Link>
      </div>
    </div>
  )
}
