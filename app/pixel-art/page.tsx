'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PixelArtHome() {
  const [mounted, setMounted] = useState(false)
  const [grid, setGrid] = useState<boolean[]>(new Array(64).fill(false))
  const [score, setScore] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const accent = '#e94560'
  const yellow = '#f5c518'
  const green = '#53d769'

  const toggle = (i: number) => {
    const g = [...grid]; g[i] = !g[i]; setGrid(g)
    setScore(g.filter(Boolean).length)
  }

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ background: '#16213e', border: `3px solid ${accent}`, padding: '32px 24px', marginBottom: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: accent, border: `2px solid ${yellow}`, marginBottom: '16px' }}>
            <span style={{ color: yellow, fontSize: '8px', letterSpacing: '3px' }}>8-BIT DESIGN</span>
          </div>
          <h1 style={{ color: yellow, fontSize: '28px', marginBottom: '16px', textShadow: `3px 3px 0 ${accent}`, lineHeight: 1.3 }}>
            Pixel Perfect
          </h1>
          <p style={{ color: '#8892b0', fontSize: '9px', lineHeight: 2, maxWidth: '400px', margin: '0 auto' }}>
            Retro gaming aesthetic. Every pixel placed with purpose. Chunky fonts, bold colors, and that classic 8-bit charm.
          </p>
        </div>
      </div>

      {/* Interactive Pixel Grid */}
      <div style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '24px', marginBottom: '32px' }}>
        <h2 style={{ color: yellow, fontSize: '10px', textAlign: 'center', marginBottom: '16px' }}>CLICK TO DRAW</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px', padding: '16px', background: '#0a0a1a', border: `2px solid ${accent}` }}>
            {grid.map((on, i) => (
              <button key={i} onClick={() => toggle(i)} style={{
                width: '28px', height: '28px', cursor: 'pointer',
                background: on ? accent : '#0a0a1a',
                border: `2px solid ${on ? yellow : '#1a1a3e'}`,
                boxShadow: on ? `0 0 8px ${accent}60` : 'none',
                transition: 'all 0.1s',
              }} />
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', color: green, fontSize: '8px' }}>Pixels Active: {score}/64</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { label: 'Resolution', value: '8x8' },
          { label: 'Colors', value: '16' },
          { label: 'Style', value: 'Retro' },
          { label: 'Era', value: '1980s' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '16px', textAlign: 'center' }}>
            <p style={{ color: yellow, fontSize: '16px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#8892b0', fontSize: '7px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'GRID BASED', desc: 'Every element snaps to a pixel grid. No anti-aliasing. Pure digital clarity.' },
          { title: 'LIMITED PALETTE', desc: 'Restricted color palettes inspired by classic hardware. 16 colors max.' },
          { title: 'CHUNKY TYPE', desc: 'Bitmap-style fonts crafted pixel by pixel. Readable at any size.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '20px' }}>
            <div style={{ width: '28px', height: '28px', background: accent, border: `2px solid ${yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ color: yellow, fontSize: '8px' }}>{i + 1}</span>
            </div>
            <h3 style={{ color: yellow, fontSize: '8px', marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ color: '#8892b0', fontSize: '7px', lineHeight: 2 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/pixel-art/gallery" style={{ padding: '12px 28px', background: accent, color: yellow, border: `2px solid ${yellow}`, fontSize: '8px', textDecoration: 'none', fontWeight: 700 }}>
          VIEW GALLERY
        </Link>
        <Link href="/pixel-art/about" style={{ padding: '12px 28px', background: '#0a0a1a', color: '#8892b0', border: `2px solid ${accent}30`, fontSize: '8px', textDecoration: 'none' }}>
          LEARN MORE
        </Link>
      </div>
    </div>
  )
}
