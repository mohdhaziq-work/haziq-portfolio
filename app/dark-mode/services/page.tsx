'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DarkModeServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Dark Websites', price: 'Rs 5,000', desc: 'Dark-themed websites with monospace fonts and terminal vibes.', features: ['Dark theme', 'Monospace', 'Responsive', 'Fast'] },
    { title: 'Dark UI Kits', price: 'Rs 3,000', desc: 'Component libraries with dark mode built in.', features: ['50+ components', 'Dark theme', 'Figma', 'Docs'] },
    { title: 'Dark Branding', price: 'Rs 2,500', desc: 'Brand identities with dark, elegant aesthetics.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
        <h1 style={{ color: '#e0e0e0', fontSize: '32px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#1a1a1a' : '#111',
            borderRadius: '8px', border: selected === i ? '1px solid #444' : '1px solid #222',
            padding: '20px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: '#e0e0e0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#22c55e', fontSize: '26px', fontWeight: 700, marginBottom: '10px', fontFamily: '"JetBrains Mono", monospace' }}>{s.price}</p>
            <p style={{ color: '#555', fontSize: '12px', lineHeight: 1.6, marginBottom: '10px' }}>{s.desc}</p>
            <div style={{ marginBottom: '12px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#444', fontSize: '11px', marginBottom: '3px', fontFamily: '"JetBrains Mono", monospace' }}>{'> '}{f}</p>
              ))}
            </div>
            <Link href="/dark-mode/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#e0e0e0' : '#222',
              color: selected === i ? '#0d0d0d' : '#666',
              fontSize: '12px', fontWeight: 600, textDecoration: 'none', borderRadius: '6px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/dark-mode" style={{ padding: '12px 24px', color: '#666', fontSize: '12px', textDecoration: 'none', borderRadius: '6px', border: '1px solid #333' }}>Back Home</Link>
      </div>
    </div>
  )
}
