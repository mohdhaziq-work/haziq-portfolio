'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AbstractServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Abstract Websites', price: 'Rs 5,000', desc: 'Websites with organic shapes and bold compositions.', features: ['Abstract shapes', 'Bold colors', 'Responsive', 'Creative'] },
    { title: 'Abstract Art', price: 'Rs 3,000', desc: 'Custom abstract illustrations and backgrounds.', features: ['Custom art', 'Backgrounds', 'Textures', 'HD'] },
    { title: 'Abstract Branding', price: 'Rs 2,500', desc: 'Brand identities with abstract aesthetics.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '32px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 800 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15))' : '#fff',
            borderRadius: '20px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#333', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#999', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#bbb', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/abstract/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)', color: '#fff',
              fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '14px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/abstract" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '16px', border: '1px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
