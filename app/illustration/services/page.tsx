'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IllustrationServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Character Design', price: 'Rs 3,000', desc: 'Unique characters with personality and charm.', features: ['Custom characters', 'Expressions', 'Poses', 'Vector'] },
    { title: 'Scene Illustration', price: 'Rs 5,000', desc: 'Rich scenes that tell stories and set moods.', features: ['Full scenes', 'Backgrounds', 'Animated', 'HD'] },
    { title: 'Icon Illustration', price: 'Rs 2,000', desc: 'Playful icons with hand-drawn style.', features: ['Custom icons', 'Icon sets', 'SVG', 'Animated'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ff6b6b', borderRadius: '24px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 700 }}>Services</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? '#ff6b6b' : '#fff',
            borderRadius: '20px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{ color: selected === i ? '#fff' : '#333', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: selected === i ? '#fff' : '#ff6b6b', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: selected === i ? 'rgba(255,255,255,0.8)' : '#999', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '14px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: selected === i ? 'rgba(255,255,255,0.7)' : '#bbb', fontSize: '11px', marginBottom: '3px' }}>{f}</p>
              ))}
            </div>
            <Link href="/illustration/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px',
              background: selected === i ? '#fff' : '#ff6b6b',
              color: selected === i ? '#ff6b6b' : '#fff',
              fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '50px',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/illustration" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '50px', border: '2px solid #eee' }}>Back Home</Link>
      </div>
    </div>
  )
}
