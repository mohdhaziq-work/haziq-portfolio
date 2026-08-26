'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WatercolorHome() {
  const [mounted, setMounted] = useState(false)
  const [activeHue, setActiveHue] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const hues = [
    { name: 'Rose', color: 'rgba(255,182,193,0.3)' },
    { name: 'Sky', color: 'rgba(173,216,230,0.3)' },
    { name: 'Lavender', color: 'rgba(200,180,255,0.3)' },
    { name: 'Sage', color: 'rgba(180,210,180,0.3)' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: `radial-gradient(circle at 30% 50%, ${hues[activeHue].color}, rgba(254,252,250,0.5))`, borderRadius: '30px', padding: '48px 28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#8b6f5e', fontSize: '52px', fontWeight: 600, fontStyle: 'italic', marginBottom: '16px' }}>Watercolor</h1>
        <p style={{ color: '#b8a090', fontSize: '16px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8, fontStyle: 'italic' }}>Soft washes of color, bleeding edges, and organic textures. Like painting on digital paper.</p>
      </div>

      {/* Hue Selector */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
        {hues.map((h, i) => (
          <button key={i} onClick={() => setActiveHue(i)} style={{
            width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer',
            background: h.color, border: activeHue === i ? '2px solid #8b6f5e' : '2px solid transparent',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { title: 'Soft Washes', desc: 'Colors that bleed and blend like watercolor.' },
          { title: 'Organic', desc: 'Natural textures and flowing forms.' },
          { title: 'Delicate', desc: 'Gentle, hand-painted aesthetic.' },
        ].map((f, i) => (
          <div key={i} style={{ background: `radial-gradient(circle at 50% 50%, ${hues[activeHue].color}, rgba(254,252,250,0.8))`, borderRadius: '20px', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ color: '#8b6f5e', fontSize: '18px', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ color: '#b8a090', fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: `radial-gradient(circle, ${hues[activeHue].color}, rgba(254,252,250,0.9))`, borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#8b6f5e', fontSize: '32px', fontWeight: 600, fontStyle: 'italic' }}>{s.value}</p>
            <p style={{ color: '#b8a090', fontSize: '11px', marginTop: '4px', fontStyle: 'italic' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/watercolor/gallery" style={{ padding: '14px 28px', background: 'rgba(255,182,193,0.3)', color: '#8b6f5e', fontSize: '15px', fontWeight: 600, fontStyle: 'italic', textDecoration: 'none', borderRadius: '20px' }}>View Gallery</Link>
        <Link href="/watercolor/about" style={{ padding: '14px 28px', color: '#b8a090', fontSize: '15px', fontWeight: 400, fontStyle: 'italic', textDecoration: 'none', borderRadius: '20px', border: '1px solid rgba(200,180,160,0.3)' }}>Learn More</Link>
      </div>
    </div>
  )
}
