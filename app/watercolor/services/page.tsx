'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WatercolorServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Watercolor Websites', price: 'Rs 5,000', desc: 'Websites with soft watercolor textures and washes.', features: ['Watercolor textures', 'Soft washes', 'Responsive', 'Organic'] },
    { title: 'Watercolor Art', price: 'Rs 3,000', desc: 'Custom watercolor illustrations and backgrounds.', features: ['Custom art', 'Backgrounds', 'Textures', 'HD'] },
    { title: 'Watercolor Branding', price: 'Rs 2,500', desc: 'Brand identities with watercolor aesthetics.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.2), rgba(254,252,250,0.5))', borderRadius: '30px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#8b6f5e', fontSize: '44px', fontWeight: 600, fontStyle: 'italic' }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? 'radial-gradient(circle, rgba(255,182,193,0.3), rgba(254,252,250,0.8))' : 'radial-gradient(circle, rgba(255,182,193,0.1), rgba(254,252,250,0.8))',
            borderRadius: '20px', padding: '24px', cursor: 'pointer', transition: 'all 0.3s',
          }}>
            <h3 style={{ color: '#8b6f5e', fontSize: '18px', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#8b6f5e', fontSize: '32px', fontWeight: 600, fontStyle: 'italic', marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#b8a090', fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#c8b8a8', fontSize: '12px', fontStyle: 'italic', marginBottom: '4px' }}>{f}</p>
              ))}
            </div>
            <Link href="/watercolor/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: 'rgba(255,182,193,0.3)', color: '#8b6f5e',
              fontSize: '14px', fontWeight: 600, fontStyle: 'italic', textDecoration: 'none', borderRadius: '16px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/watercolor" style={{ padding: '12px 28px', color: '#b8a090', fontSize: '15px', fontWeight: 400, fontStyle: 'italic', textDecoration: 'none', borderRadius: '20px', border: '1px solid rgba(200,180,160,0.3)' }}>Back Home</Link>
      </div>
    </div>
  )
}
