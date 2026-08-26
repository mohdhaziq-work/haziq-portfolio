'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SplitScreenServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Split Websites', price: 'Rs 5,000', desc: 'Websites with dual-panel split layouts.', features: ['Split layout', 'Dual panels', 'Responsive', 'Bold'] },
    { title: 'Split Landing', price: 'Rs 3,000', desc: 'Landing pages with contrasting halves.', features: ['Hero split', 'Contrast', 'Interactive', 'Fast'] },
    { title: 'Split Branding', price: 'Rs 2,500', desc: 'Brand identities with dual-natured aesthetics.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div>
      <div style={{ background: '#000', padding: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '2px solid #000' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '24px', cursor: 'pointer', transition: 'all 0.2s',
            background: selected === i ? '#000' : '#fff',
            borderRight: i < 2 ? '2px solid #000' : 'none',
          }}>
            <h3 style={{ color: selected === i ? '#fff' : '#000', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#fff' : '#000', fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(255,255,255,0.5)' : '#999', fontSize: '12px', fontWeight: 400, lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(255,255,255,0.4)' : '#ccc', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/split-screen/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#fff' : '#000',
              color: selected === i ? '#000' : '#fff',
              fontSize: '12px', fontWeight: 700, textDecoration: 'none',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', textAlign: 'center', borderTop: '2px solid #000' }}>
        <Link href="/split-screen" style={{ color: '#000', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
