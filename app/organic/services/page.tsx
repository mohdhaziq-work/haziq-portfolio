'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function OrganicServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Organic Websites', price: 'Rs 5,000', desc: 'Websites with natural shapes and earthy tones.', features: ['Organic shapes', 'Earthy colors', 'Responsive', 'Warm'] },
    { title: 'Organic UI', price: 'Rs 3,000', desc: 'UI kits with nature-inspired components.', features: ['50+ components', 'Nature themes', 'Figma', 'Docs'] },
    { title: 'Organic Branding', price: 'Rs 2,500', desc: 'Brand identities rooted in nature.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8dcc8', borderRadius: '30px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '34px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#5a4a35' : '#e8dcc8',
            borderRadius: '20px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: selected === i ? '#f5f0e8' : '#5a4a35', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#f5f0e8' : '#6b8f3c', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(245,240,232,0.8)' : '#8b7355', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(245,240,232,0.7)' : '#b8a88a', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/organic/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#f5f0e8' : '#5a4a35',
              color: selected === i ? '#5a4a35' : '#f5f0e8',
              fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '16px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/organic" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '20px', border: '1px solid #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
