'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IsometricServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Isometric Websites', price: 'Rs 5,000', desc: 'Websites with 3D isometric perspective and depth.', features: ['Isometric design', '3D transforms', 'Responsive', 'Animated'] },
    { title: 'Isometric UI', price: 'Rs 3,000', desc: 'UI kits with isometric components.', features: ['50+ components', 'Isometric themes', 'Figma', 'Docs'] },
    { title: 'Isometric Branding', price: 'Rs 2,500', desc: 'Brand identities with isometric illustrations.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: '2px solid #e94560', padding: '24px', marginBottom: '24px', transform: 'skewY(-2deg)', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800, letterSpacing: '2px' }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: '#16213e', border: selected === i ? '2px solid #e94560' : '2px solid #0f3460',
            padding: '22px', cursor: 'pointer', transition: 'all 0.2s', transform: 'skewY(-2deg)',
          }}>
            <div style={{ transform: 'skewY(2deg)' }}>
              <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#e94560', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>{s.price}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
              <div style={{ marginBottom: '14px' }}>
                {s.features.map((f, j) => (
                  <p key={j} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
                ))}
              </div>
              <Link href="/isometric/contact" style={{
                display: 'block', textAlign: 'center', padding: '10px',
                background: '#e94560', color: '#fff',
                fontSize: '12px', fontWeight: 700, textDecoration: 'none', transform: 'skewX(-10deg)',
              }}>Get Started</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/isometric" style={{ padding: '12px 28px', color: '#e94560', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '2px solid #e94560', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
