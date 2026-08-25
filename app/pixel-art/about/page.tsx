'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PixelArtAbout() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const accent = '#e94560'
  const yellow = '#f5c518'

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: `3px solid ${accent}`, padding: '32px 24px', marginBottom: '32px' }}>
        <h1 style={{ color: yellow, fontSize: '24px', marginBottom: '16px', textShadow: `2px 2px 0 ${accent}` }}>ABOUT US</h1>
        <p style={{ color: '#8892b0', fontSize: '9px', lineHeight: 2.2, marginBottom: '24px' }}>
          Pixel Quest is a retro-inspired design studio that believes in the power of simplicity. Born from the golden age of 8-bit gaming, we craft digital experiences that are bold, clear, and unforgettable. Every pixel is placed with intention. Every color earns its spot.
        </p>
        <p style={{ color: '#8892b0', fontSize: '9px', lineHeight: 2.2, marginBottom: '24px' }}>
          We reject the noise of modern design. No unnecessary gradients, no pointless animations. Just pure, honest pixel art that communicates instantly. Our work is inspired by the classics — NES, SNES, Game Boy — but built for the modern web.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'MISSION', desc: 'Bring back the charm of retro design to the modern web. Make websites fun again.' },
          { title: 'VISION', desc: 'A world where every website has personality, not just another template clone.' },
          { title: 'VALUES', desc: 'Simplicity. Clarity. Personality. Every pixel must earn its place on screen.' },
          { title: 'PROCESS', desc: 'Sketch on grid paper first. Then pixel-perfect execution. No shortcuts.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '20px' }}>
            <h3 style={{ color: yellow, fontSize: '9px', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#8892b0', fontSize: '8px', lineHeight: 2 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { value: '50+', label: 'Projects' },
          { value: '100%', label: 'Pixel Perfect' },
          { value: '8-BIT', label: 'Aesthetic' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#0a0a1a', border: `2px solid ${accent}`, padding: '16px', textAlign: 'center' }}>
            <p style={{ color: yellow, fontSize: '18px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#8892b0', fontSize: '6px', marginTop: '4px' }}>{s.label}</p>
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
