'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RetroServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Retro Websites', price: 'Rs 5,000', desc: 'Vintage-themed websites with warm palettes and classic typography.', features: ['Vintage design', 'Serif fonts', 'Warm colors', 'Responsive'] },
    { title: 'Retro Branding', price: 'Rs 3,000', desc: 'Brand identities with nostalgic charm and timeless appeal.', features: ['Logo design', 'Color palette', 'Brand guide', 'Assets'] },
    { title: 'Retro Print', price: 'Rs 2,000', desc: 'Posters, menus, and print materials with vintage aesthetics.', features: ['Poster design', 'Menu design', 'Flyers', 'Business cards'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', border: '3px solid #8b7355', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#3a2f25', fontSize: '32px', fontWeight: 900 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#8b7355' : '#e8d5b8',
            border: '2px solid #c4a882', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: selected === i ? '#f4e8d1' : '#3a2f25', fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#f4e8d1' : '#8b7355', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? '#c4a882' : '#6a5f55', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? '#c4a882' : '#8b7355', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/retro/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#f4e8d1' : '#8b7355',
              color: selected === i ? '#8b7355' : '#f4e8d1',
              fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '2px solid #6b5540',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/retro" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '13px', textDecoration: 'none', border: '2px solid #c4a882' }}>Back Home</Link>
      </div>
    </div>
  )
}
