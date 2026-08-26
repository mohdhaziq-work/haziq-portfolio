'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Wabi Sabi Websites', price: 'Rs 5,000', desc: 'Full wabi sabi themed websites.', features: ['Custom design', 'Responsive', 'Animations', 'SEO'] },
    { title: 'Wabi Sabi UI Kits', price: 'Rs 3,000', desc: 'Component libraries with wabi sabi aesthetics.', features: ['50+ components', 'Figma', 'Dark mode', 'Docs'] },
    { title: 'Wabi Sabi Branding', price: 'Rs 2,500', desc: 'Brand identities with wabi sabi design.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ede8e0', borderRadius: '16px', border: '1px solid #8b735520', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#4a3f35', fontSize: '32px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#8b735510' : '#ede8e0', borderRadius: '16px', border: '1px solid ' + (selected === i ? '#8b7355' : '#8b735515'), padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}>
            <h3 style={{ color: '#4a3f35', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#8b7355', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#4a3f3588', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px', flex: 1 }}>{s.desc}</p>
            <div style={{ marginBottom: '12px' }}>
              {s.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#8b7355' }} />
                  <span style={{ color: '#4a3f3588', fontSize: '12px' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/wabi-sabi/contact" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#8b7355', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/wabi-sabi" style={{ padding: '12px 28px', background: '#8b735515', color: '#8b7355', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
