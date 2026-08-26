'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FlatDesignServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Flat Websites', price: 'Rs 5,000', desc: 'Clean, colorful websites with zero shadows or gradients.', features: ['Flat design', 'Bold colors', 'Responsive', 'Fast'] },
    { title: 'Flat UI Kits', price: 'Rs 3,000', desc: 'Component libraries with flat design principles.', features: ['50+ components', 'Color themes', 'Figma', 'Docs'] },
    { title: 'Flat Branding', price: 'Rs 2,500', desc: 'Brand identities with bold, flat aesthetics.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#3498db', borderRadius: '16px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#3498db' : '#fff',
            borderRadius: '12px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: selected === i ? '#fff' : '#333', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#fff' : '#3498db', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(255,255,255,0.8)' : '#999', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(255,255,255,0.7)' : '#bbb', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/flat-design/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#fff' : '#3498db',
              color: selected === i ? '#3498db' : '#fff',
              fontSize: '13px', fontWeight: 700, textDecoration: 'none', borderRadius: '8px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/flat-design" style={{ padding: '12px 28px', color: '#555', fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '10px', border: '2px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
