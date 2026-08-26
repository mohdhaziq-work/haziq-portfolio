'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConceptualSketchServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Sketch Websites', price: 'Rs 5,000', desc: 'Websites with hand-sketched aesthetics.', features: ['Sketch style', 'Hand-drawn', 'Responsive', 'Raw'] },
    { title: 'Sketch UI', price: 'Rs 3,000', desc: 'UI kits with sketched components.', features: ['50+ components', 'Sketch style', 'Figma', 'Docs'] },
    { title: 'Sketch Branding', price: 'Rs 2,500', desc: 'Brand identities with sketch aesthetics.', features: ['Logo', 'Colors', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 400 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#f0f0f0' : '#fff',
            border: selected === i ? '2px solid #333' : '2px dashed #ccc',
            borderRadius: '8px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <h3 style={{ color: '#333', fontSize: '18px', fontWeight: 400, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#333', fontSize: '32px', fontWeight: 400, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#bbb', fontSize: '12px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/conceptual-sketch/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: '#333', color: '#fff',
              fontSize: '14px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/conceptual-sketch" style={{ padding: '12px 28px', color: '#666', fontSize: '16px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px', border: '2px dashed #ccc' }}>Back Home</Link>
      </div>
    </div>
  )
}
