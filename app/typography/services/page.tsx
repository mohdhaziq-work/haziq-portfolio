'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TypographyServices() {
  const [selected, setSelected] = useState<number | null>(null)

  const services = [
    { title: 'Typographic Websites', price: 'Rs 5,000', desc: 'Websites where typography is the hero.', features: ['Custom type scale', 'Serif + Sans pairing', 'Responsive', 'Elegant'] },
    { title: 'Type Design', price: 'Rs 3,000', desc: 'Custom lettering and typographic compositions.', features: ['Custom lettering', 'Type specimens', 'Print ready', 'Vector'] },
    { title: 'Type Branding', price: 'Rs 2,500', desc: 'Brand identities built on typography alone.', features: ['Wordmark', 'Type system', 'Guide', 'Assets'] },
  ]

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#999', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Services</p>
        <h1 style={{ color: '#111', fontSize: '48px', fontWeight: 400, fontStyle: 'italic' }}>What we<br />offer.</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding: '24px', cursor: 'pointer', transition: 'all 0.2s',
            border: selected === i ? '1px solid #111' : '1px solid #eee',
          }}>
            <h3 style={{ color: '#111', fontSize: '18px', fontWeight: 400, fontStyle: 'italic', marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#111', fontSize: '32px', fontWeight: 400, fontStyle: 'italic', marginBottom: '12px' }}>{s.price}</p>
            <p style={{ color: '#999', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, lineHeight: 1.6, marginBottom: '12px' }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <p key={j} style={{ color: '#ccc', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', marginBottom: '4px' }}>{f}</p>
              ))}
            </div>
            <Link href="/typography/contact" style={{ display: 'block', textAlign: 'center', padding: '12px', background: '#111', color: '#fff', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, textDecoration: 'none' }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/typography" style={{ color: '#111', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, textDecoration: 'none', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Back Home</Link>
      </div>
    </div>
  )
}
