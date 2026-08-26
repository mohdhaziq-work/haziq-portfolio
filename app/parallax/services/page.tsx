'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ParallaxServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Parallax Websites', price: 'Rs 5,000', desc: 'Websites with immersive parallax scrolling effects.', features: ['Parallax layers', 'Smooth scroll', 'Responsive', 'Animated'] },
    { title: 'Parallax Landing', price: 'Rs 3,000', desc: 'Landing pages with depth and motion.', features: ['Hero parallax', 'Story scroll', 'Interactive', 'Fast'] },
    { title: 'Parallax Presentations', price: 'Rs 2,500', desc: 'Presentations that move and flow.', features: ['Slide parallax', 'Transitions', 'Export', 'Animated'] },
  ]

  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px' }}>SERVICES</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 200 }}>What we offer</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '24px', cursor: 'pointer', transition: 'all 0.3s',
            border: selected === i ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            background: selected === i ? 'rgba(255,255,255,0.05)' : 'transparent',
          }}>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#fff', fontSize: '32px', fontWeight: 200, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 300, lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 300, marginBottom: '4px' }}>{f}</p>
              ))}
            </div>
            <Link href="/parallax/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              fontSize: '12px', fontWeight: 400, textDecoration: 'none', letterSpacing: '2px',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/parallax" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 300, textDecoration: 'none', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
