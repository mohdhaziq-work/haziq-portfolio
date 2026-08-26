'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MinimalismServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Minimal Websites', price: 'Rs 5,000', desc: 'Clean, focused websites with zero clutter.', features: ['Clean layout', 'Fast loading', 'Responsive', 'SEO'] },
    { title: 'Minimal UI Kits', price: 'Rs 3,000', desc: 'Component libraries with restrained aesthetics.', features: ['50+ components', 'Figma', 'Lightweight', 'Docs'] },
    { title: 'Minimal Branding', price: 'Rs 2,500', desc: 'Brand identities built on simplicity.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#111', fontSize: '36px', fontWeight: 300 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '24px', cursor: 'pointer',
            border: selected === i ? '1px solid #111' : '1px solid #eee',
            transition: 'all 0.2s',
          }}>
            <h3 style={{ color: '#111', fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#111', fontSize: '28px', fontWeight: 300, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#bbb', fontSize: '12px', marginBottom: '4px' }}>{f}</p>
              ))}
            </div>
            <Link href="/minimalism/contact" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#111', color: '#fff', fontSize: '12px', fontWeight: 500, textDecoration: 'none' }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/minimalism" style={{ color: '#bbb', fontSize: '12px', letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
