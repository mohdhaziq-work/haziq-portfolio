'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WabiSabiServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Wabi Websites', price: 'Rs 5,000', desc: 'Websites with wabi-sabi aesthetics and earthy tones.', features: ['Wabi-sabi design', 'Earthy tones', 'Responsive', 'Minimal'] },
    { title: 'Wabi Branding', price: 'Rs 3,000', desc: 'Brand identities with wabi-sabi philosophy.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
    { title: 'Wabi Art', price: 'Rs 2,000', desc: 'Custom wabi-sabi illustrations and textures.', features: ['Custom art', 'Textures', 'Organic', 'HD'] },
  ]

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#b8a090', fontSize: '12px', letterSpacing: '4px', marginBottom: '16px' }}>Services</p>
        <h1 style={{ color: '#8b7355', fontSize: '48px', fontWeight: 300 }}>What we offer</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '24px', cursor: 'pointer', transition: 'all 0.2s',
            borderBottom: selected === i ? '2px solid #8b7355' : '1px solid rgba(180,160,140,0.2)',
          }}>
            <h3 style={{ color: '#8b7355', fontSize: '16px', fontWeight: 400, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#8b7355', fontSize: '32px', fontWeight: 300, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#b8a090', fontSize: '13px', lineHeight: 1.6, fontWeight: 300, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#c8b8a8', fontSize: '12px', fontWeight: 300, marginBottom: '4px' }}>{f}</p>
              ))}
            </div>
            <Link href="/wabi-sabi/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: '#8b7355', color: '#f5f0e8',
              fontSize: '13px', fontWeight: 400, textDecoration: 'none',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/wabi-sabi" style={{ color: '#b8a090', fontSize: '14px', fontWeight: 300, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
