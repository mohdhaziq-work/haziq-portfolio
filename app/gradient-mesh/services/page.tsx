'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GradientMeshServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Gradient Websites', price: 'Rs 5,000', desc: 'Websites with flowing gradients and organic shapes.', features: ['Gradient design', 'Animations', 'Responsive', 'Modern'] },
    { title: 'Gradient UI', price: 'Rs 3,000', desc: 'UI kits with vibrant gradient themes.', features: ['50+ components', 'Gradient themes', 'Figma', 'Docs'] },
    { title: 'Gradient Branding', price: 'Rs 2,500', desc: 'Brand identities with colorful gradient palettes.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))', borderRadius: '24px', border: '1px solid rgba(139,92,246,0.2)', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2))' : 'rgba(255,255,255,0.05)',
            borderRadius: '16px', border: selected === i ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.1)',
            padding: '22px', cursor: 'pointer', transition: 'all 0.3s',
          }}>
            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/gradient-mesh/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: '#fff',
              fontSize: '12px', fontWeight: 600, textDecoration: 'none', borderRadius: '10px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/gradient-mesh" style={{ padding: '12px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
