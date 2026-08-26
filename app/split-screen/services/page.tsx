'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Split Screen Websites', price: 'Rs 5,000', desc: 'Full split screen themed websites.', features: ['Custom design', 'Responsive', 'Animations', 'SEO'] },
    { title: 'Split Screen UI Kits', price: 'Rs 3,000', desc: 'Component libraries with split screen aesthetics.', features: ['50+ components', 'Figma', 'Dark mode', 'Docs'] },
    { title: 'Split Screen Branding', price: 'Rs 2,500', desc: 'Brand identities with split screen design.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #667eea20', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '32px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#667eea10' : '#fff', borderRadius: '16px', border: '1px solid ' + (selected === i ? '#667eea' : '#667eea15'), padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}>
            <h3 style={{ color: '#1a1a2e', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#667eea', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#1a1a2e88', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px', flex: 1 }}>{s.desc}</p>
            <div style={{ marginBottom: '12px' }}>
              {s.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#667eea' }} />
                  <span style={{ color: '#1a1a2e88', fontSize: '12px' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/split-screen/contact" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#667eea', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/split-screen" style={{ padding: '12px 28px', background: '#667eea15', color: '#667eea', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
