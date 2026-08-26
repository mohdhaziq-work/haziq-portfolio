'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GeometricServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Geo Websites', price: 'Rs 5,000', desc: 'Websites built on geometric grids and shapes.', features: ['Geometric grid', 'Shape elements', 'Responsive', 'Precise'] },
    { title: 'Geo UI', price: 'Rs 3,000', desc: 'UI kits with geometric components.', features: ['50+ components', 'Shape themes', 'Figma', 'Docs'] },
    { title: 'Geo Branding', price: 'Rs 2,500', desc: 'Brand identities with geometric logos.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 900, letterSpacing: '4px' }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#000' : '#fff',
            border: selected === i ? '3px solid #000' : '3px solid #000',
            padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: selected === i ? '#fff' : '#000', fontSize: '15px', fontWeight: 800, marginBottom: '8px', letterSpacing: '1px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#fff' : '#000', fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(255,255,255,0.5)' : '#666', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(255,255,255,0.4)' : '#999', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/geometric/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#fff' : '#000',
              color: selected === i ? '#000' : '#fff',
              fontSize: '11px', fontWeight: 800, textDecoration: 'none', letterSpacing: '2px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/geometric" style={{ padding: '12px 28px', color: '#000', fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '3px solid #000', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
