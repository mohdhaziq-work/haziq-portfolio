'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HandwrittenServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Handwritten Websites', price: 'Rs 5,000', desc: 'Websites with hand-drawn elements and personal touch.', features: ['Hand-drawn', 'Personal', 'Responsive', 'Warm'] },
    { title: 'Handwritten UI', price: 'Rs 3,000', desc: 'UI kits with sketchy, hand-drawn components.', features: ['50+ components', 'Sketchy style', 'Figma', 'Docs'] },
    { title: 'Handwritten Branding', price: 'Rs 2,500', desc: 'Brand identities with handwritten personality.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f5f0e8', borderRadius: '20px', padding: '24px', marginBottom: '20px', border: '2px dashed #d4c5a9', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '40px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#5a4a35' : '#f5f0e8',
            borderRadius: '16px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
            border: selected === i ? 'none' : '2px dashed #d4c5a9',
          }}>
            <h3 style={{ color: selected === i ? '#fff' : '#5a4a35', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#fff' : '#5a4a35', fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(255,255,255,0.8)' : '#8b7355', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(255,255,255,0.7)' : '#b8a88a', fontSize: '12px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/handwritten/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: selected === i ? '#fff' : '#5a4a35',
              color: selected === i ? '#5a4a35' : '#fff',
              fontSize: '16px', fontWeight: 600, textDecoration: 'none', borderRadius: '12px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/handwritten" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '18px', fontWeight: 500, textDecoration: 'none', borderRadius: '12px', border: '2px dashed #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
