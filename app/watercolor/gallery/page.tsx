'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WatercolorGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Rose Garden', cat: 'Web', color: 'rgba(255,182,193,0.3)' },
    { title: 'Ocean Mist', cat: 'Web', color: 'rgba(173,216,230,0.3)' },
    { title: 'Lavender Fields', cat: 'App', color: 'rgba(200,180,255,0.3)' },
    { title: 'Sage Meadow', cat: 'Web', color: 'rgba(180,210,180,0.3)' },
    { title: 'Sunset Wash', cat: 'Web', color: 'rgba(255,200,150,0.3)' },
    { title: 'Morning Dew', cat: 'App', color: 'rgba(200,220,255,0.3)' },
    { title: 'Petal Pink', cat: 'UI', color: 'rgba(255,182,193,0.3)' },
    { title: 'Cloud Blue', cat: 'UI', color: 'rgba(173,216,230,0.3)' },
    { title: 'Spring Bloom', cat: 'Web', color: 'rgba(200,180,255,0.3)' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.2), rgba(254,252,250,0.5))', borderRadius: '30px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#8b6f5e', fontSize: '44px', fontWeight: 600, fontStyle: 'italic' }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: 400, fontStyle: 'italic', cursor: 'pointer',
            background: active === c ? 'rgba(255,182,193,0.3)' : 'transparent',
            color: active === c ? '#8b6f5e' : '#b8a090',
            border: active === c ? 'none' : '1px solid rgba(200,180,160,0.3)',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: `radial-gradient(circle, ${w.color}, rgba(254,252,250,0.8))`, borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: `radial-gradient(circle at 30% 50%, ${w.color}, transparent)` }} />
            <div style={{ padding: '16px' }}>
              <h3 style={{ color: '#8b6f5e', fontSize: '16px', fontWeight: 600, fontStyle: 'italic', marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#b8a090', fontSize: '12px', fontStyle: 'italic' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/watercolor" style={{ padding: '12px 28px', color: '#b8a090', fontSize: '15px', fontWeight: 400, fontStyle: 'italic', textDecoration: 'none', borderRadius: '20px', border: '1px solid rgba(200,180,160,0.3)' }}>Back Home</Link>
      </div>
    </div>
  )
}
