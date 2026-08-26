'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NeonGlowServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Neon Websites', price: 'Rs 5,000', desc: 'Websites with glowing neon aesthetics.', features: ['Neon glow', 'Dark theme', 'Responsive', 'Animated'] },
    { title: 'Neon UI', price: 'Rs 3,000', desc: 'UI kits with neon components.', features: ['50+ components', 'Neon themes', 'Figma', 'Docs'] },
    { title: 'Neon Branding', price: 'Rs 2,500', desc: 'Brand identities with neon flair.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(255,0,255,0.05)', border: '2px solid #ff00ff', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 0 30px rgba(255,0,255,0.3)' }}>
        <h1 style={{ color: '#ff00ff', fontSize: '28px', fontWeight: 400, textShadow: '0 0 20px rgba(255,0,255,0.5)' }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? 'rgba(255,0,255,0.1)' : 'rgba(255,255,255,0.03)',
            border: selected === i ? '2px solid #ff00ff' : '1px solid rgba(255,0,255,0.3)',
            padding: '20px', cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: selected === i ? '0 0 20px rgba(255,0,255,0.3)' : '0 0 10px rgba(255,0,255,0.1)',
          }}>
            <h3 style={{ color: '#ff00ff', fontSize: '10px', fontWeight: 400, marginBottom: '8px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>{s.title}</h3>
            <p style={{ color: '#ff00ff', fontSize: '22px', fontWeight: 400, marginBottom: '10px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>{s.price}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', lineHeight: 1.6, marginBottom: '10px' }}>{s.desc}</p>
            <div style={{ marginBottom: '12px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '7px', marginBottom: '2px' }}>{f}</p>
              ))}
            </div>
            <Link href="/neon-glow/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: 'rgba(255,0,255,0.1)', color: '#ff00ff',
              fontSize: '8px', fontWeight: 400, textDecoration: 'none',
              border: '2px solid #ff00ff', boxShadow: '0 0 10px rgba(255,0,255,0.3)',
              textShadow: '0 0 10px rgba(255,0,255,0.5)',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/neon-glow" style={{ padding: '10px 24px', color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 400, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
