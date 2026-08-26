'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FuturisticServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Sci-Fi Websites', price: 'Rs 5,000', desc: 'Websites with futuristic sci-fi aesthetics.', features: ['Sci-fi design', 'Neon accents', 'Responsive', 'Angular'] },
    { title: 'Sci-Fi UI', price: 'Rs 3,000', desc: 'UI kits with futuristic components.', features: ['50+ components', 'Neon themes', 'Figma', 'Docs'] },
    { title: 'Sci-Fi Branding', price: 'Rs 2,500', desc: 'Brand identities from the future.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', padding: '24px', marginBottom: '24px', textAlign: 'center', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)' }}>
        <h1 style={{ color: '#00f0ff', fontSize: '36px', fontWeight: 900, letterSpacing: '4px' }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? 'rgba(0,240,255,0.1)' : 'rgba(255,255,255,0.03)',
            border: selected === i ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.1)',
            padding: '22px', cursor: 'pointer', transition: 'all 0.2s', clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)',
          }}>
            <h3 style={{ color: '#fff', fontSize: '13px', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>{s.title}</h3>
            <p style={{ color: '#00f0ff', fontSize: '26px', fontWeight: 900, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/futuristic/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: 'rgba(0,240,255,0.1)', color: '#00f0ff',
              fontSize: '10px', fontWeight: 700, textDecoration: 'none', letterSpacing: '2px',
              border: '1px solid #00f0ff', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/futuristic" style={{ padding: '12px 28px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '2px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>Back Home</Link>
      </div>
    </div>
  )
}
