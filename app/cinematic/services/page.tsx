'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CinematicServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Cinematic Websites', price: 'Rs 5,000', desc: 'Websites with film-like storytelling and drama.', features: ['Cinematic scroll', 'Dramatic lighting', 'Responsive', 'Story-driven'] },
    { title: 'Cinematic Video', price: 'Rs 8,000', desc: 'Video content with cinematic quality.', features: ['4K quality', 'Color grading', 'Sound design', 'Editing'] },
    { title: 'Cinematic Branding', price: 'Rs 3,000', desc: 'Brand identities with cinematic flair.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '6px', marginBottom: '16px' }}>SERVICES</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 400, letterSpacing: '8px' }}>Production</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '24px', cursor: 'pointer', transition: 'all 0.3s',
            border: selected === i ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            background: selected === i ? 'rgba(255,255,255,0.05)' : 'transparent',
          }}>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, letterSpacing: '3px', marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#fff', fontSize: '32px', fontWeight: 400, letterSpacing: '4px', marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, marginBottom: '4px' }}>{f}</p>
              ))}
            </div>
            <Link href="/cinematic/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              fontSize: '11px', fontWeight: 400, textDecoration: 'none', letterSpacing: '3px',
              border: '1px solid rgba(255,255,255,0.2)', fontFamily: '"Barlow", sans-serif',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cinematic" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 300, textDecoration: 'none', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif' }}>Back Home</Link>
      </div>
    </div>
  )
}
