'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function OrganicHome() {
  const [mounted, setMounted] = useState(false)
  const [activeShape, setActiveShape] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const shapes = [
    { name: 'Leaf', color: '#6b8f3c' },
    { name: 'Stone', color: '#8b7355' },
    { name: 'Water', color: '#5a8f9f' },
    { name: 'Earth', color: '#a0522d' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8dcc8', borderRadius: '30px', padding: '36px 28px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '40px', fontWeight: 700, marginBottom: '14px' }}>Organic</h1>
        <p style={{ color: '#8b7355', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Nature-inspired design with soft shapes, earthy tones, and flowing forms.</p>
      </div>

      {/* Nature Elements */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {shapes.map((s, i) => (
          <button key={i} onClick={() => setActiveShape(i)} style={{
            padding: '10px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            background: activeShape === i ? s.color : '#e8dcc8',
            color: activeShape === i ? '#fff' : '#8b7355',
            border: 'none',
          }}>{s.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Natural', desc: 'Shapes found in nature — leaves, stones, water.' },
          { title: 'Warm', desc: 'Earthy tones that feel welcoming and grounded.' },
          { title: 'Flowing', desc: 'Curves and organic lines, no sharp edges.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#e8dcc8', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', background: shapes[activeShape].color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
            </div>
            <h3 style={{ color: '#5a4a35', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#8b7355', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: shapes[activeShape].color, borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '26px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/organic/gallery" style={{ padding: '14px 28px', background: shapes[activeShape].color, color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', borderRadius: '20px' }}>View Gallery</Link>
        <Link href="/organic/about" style={{ padding: '14px 28px', color: '#8b7355', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '20px', border: '1px solid #d4c5a9' }}>Learn More</Link>
      </div>
    </div>
  )
}
