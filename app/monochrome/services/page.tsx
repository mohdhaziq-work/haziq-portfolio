'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MonochromeServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Mono Websites', price: 'Rs 5,000', desc: 'Websites in pure black and white.', features: ['B&W design', 'High contrast', 'Responsive', 'Timeless'] },
    { title: 'Mono UI Kits', price: 'Rs 3,000', desc: 'Component libraries in grayscale.', features: ['50+ components', 'Grayscale', 'Figma', 'Docs'] },
    { title: 'Mono Branding', price: 'Rs 2,500', desc: 'Brand identities in monochrome.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '20px', marginBottom: '16px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#000' : '#fff',
            padding: '20px', cursor: 'pointer', transition: 'all 0.2s',
            border: selected === i ? 'none' : '1px solid #000',
          }}>
            <h3 style={{ color: selected === i ? '#fff' : '#000', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#fff' : '#000', fontSize: '26px', fontWeight: 700, marginBottom: '10px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(255,255,255,0.5)' : '#666', fontSize: '11px', lineHeight: 1.6, marginBottom: '10px' }}>{s.desc}</p>
            <div style={{ marginBottom: '12px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(255,255,255,0.4)' : '#999', fontSize: '10px', marginBottom: '2px' }}>{f}</p>
              ))}
            </div>
            <Link href="/monochrome/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#fff' : '#000',
              color: selected === i ? '#000' : '#fff',
              fontSize: '11px', fontWeight: 700, textDecoration: 'none',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/monochrome" style={{ padding: '10px 24px', color: '#000', fontSize: '12px', fontWeight: 500, textDecoration: 'none', border: '1px solid #000' }}>Back Home</Link>
      </div>
    </div>
  )
}
