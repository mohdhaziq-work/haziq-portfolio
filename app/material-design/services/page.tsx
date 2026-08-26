'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MaterialDesignServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Material Websites', price: 'Rs 5,000', desc: 'Websites with elevation, ripples, and purposeful motion.', features: ['Material design', 'Elevation', 'Responsive', 'Motion'] },
    { title: 'Material UI Kits', price: 'Rs 3,000', desc: 'Component libraries following Material guidelines.', features: ['50+ components', 'Material themes', 'Figma', 'Docs'] },
    { title: 'Material Branding', price: 'Rs 2,500', desc: 'Brand identities with Material Design principles.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#6200ee', padding: '24px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 400 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: '#fff', borderRadius: '4px',
            boxShadow: selected === i ? '0 10px 20px rgba(0,0,0,0.19)' : '0 1px 3px rgba(0,0,0,0.12)',
            overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <div style={{ height: '4px', background: selected === i ? '#6200ee' : '#e0e0e0' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#6200ee', fontSize: '28px', fontWeight: 500, marginBottom: '12px' }}>{s.price}</p>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
              <div style={{ marginBottom: '14px' }}>
                {s.features.map((f, j) => (
                  <p key={j} style={{ color: '#999', fontSize: '12px', marginBottom: '3px' }}>{f}</p>
                ))}
              </div>
              <Link href="/material-design/contact" style={{
                display: 'block', textAlign: 'center', padding: '10px',
                background: '#6200ee', color: '#fff',
                fontSize: '13px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Get Started</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/material-design" style={{ padding: '12px 32px', color: '#6200ee', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px', border: '1px solid #6200ee', textTransform: 'uppercase', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
