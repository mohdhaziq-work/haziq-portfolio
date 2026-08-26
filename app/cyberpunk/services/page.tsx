'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CyberpunkServices() {
  const [selected, setSelected] = useState<number | null>(null)
  const neon = '#ff00ff'

  const services = [
    { title: 'CYBER WEBSITES', price: 'Rs 5,000', desc: 'Full neon-themed websites with glitch effects and HUD elements.', features: ['Neon animations', 'Dark theme', 'Responsive', 'SEO optimized'] },
    { title: 'CYBER UI KITS', price: 'Rs 3,000', desc: 'Component libraries with cyberpunk aesthetics.', features: ['50+ components', 'Neon variants', 'Dark mode', 'Documentation'] },
    { title: 'CYBER BRANDING', price: 'Rs 2,500', desc: 'Brand identities built around futuristic neon aesthetics.', features: ['Logo design', 'Color system', 'Brand guide', 'Asset library'] },
  ]

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: neon, fontSize: '36px', fontWeight: 900, letterSpacing: '5px', textShadow: `0 0 20px ${neon}60` }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? `${neon}10` : '#0a0a0a',
            border: `1px solid ${selected === i ? neon : neon + '20'}`,
            padding: '22px', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: neon, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', marginBottom: '10px' }}>{s.title}</h3>
            <p style={{ color: neon, fontSize: '28px', fontWeight: 900, textShadow: `0 0 10px ${neon}40`, marginBottom: '14px' }}>{s.price}</p>
            <p style={{ color: '#4a6a7a', fontSize: '11px', lineHeight: 1.7, marginBottom: '14px', flex: 1 }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                  <div style={{ width: '4px', height: '4px', background: neon, boxShadow: `0 0 6px ${neon}` }} />
                  <span style={{ color: '#4a6a7a', fontSize: '10px' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/cyberpunk/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: `${neon}20`, color: neon, border: `1px solid ${neon}60`,
              fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textDecoration: 'none',
              textShadow: `0 0 10px ${neon}60`,
            }}>GET STARTED</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cyberpunk" style={{ padding: '12px 28px', background: 'transparent', color: '#4a6a7a', border: '1px solid #222', fontSize: '10px', letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
