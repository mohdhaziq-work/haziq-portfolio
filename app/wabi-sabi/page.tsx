'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WabiSabiHome() {
  const [mounted, setMounted] = useState(false)
  const [activeElement, setActiveElement] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const elements = [
    { name: 'Earth', color: '#8b7355' },
    { name: 'Stone', color: '#6b6b6b' },
    { name: 'Wood', color: '#a0522d' },
    { name: 'Clay', color: '#b87333' },
  ]

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <p style={{ color: '#b8a090', fontSize: '12px', letterSpacing: '4px', marginBottom: '16px' }}>侘寂</p>
        <h1 style={{ color: '#8b7355', fontSize: '56px', fontWeight: 300, marginBottom: '20px' }}>Wabi Sabi</h1>
        <p style={{ color: '#b8a090', fontSize: '16px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>Finding beauty in imperfection. Embracing the incomplete, the impermanent, and the humble.</p>
      </div>

      {/* Element Selector */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
        {elements.map((e, i) => (
          <button key={i} onClick={() => setActiveElement(i)} style={{
            padding: '12px 20px', fontSize: '13px', fontWeight: 300, cursor: 'pointer',
            background: activeElement === i ? e.color : 'transparent',
            color: activeElement === i ? '#f5f0e8' : '#b8a090',
            border: activeElement === i ? 'none' : '1px solid rgba(180,160,140,0.3)',
            borderRadius: '0',
          }}>{e.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {[
          { title: 'Imperfect', desc: 'Beauty in the flawed and weathered.' },
          { title: 'Impermanent', desc: 'Embracing change and transience.' },
          { title: 'Incomplete', desc: 'Finding wholeness in the partial.' },
        ].map((f, i) => (
          <div key={i} style={{ padding: '24px', borderBottom: `1px solid ${elements[activeElement].color}30` }}>
            <h3 style={{ color: '#8b7355', fontSize: '16px', fontWeight: 400, marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ color: '#b8a090', fontSize: '13px', lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ color: elements[activeElement].color, fontSize: '32px', fontWeight: 300 }}>{s.value}</p>
            <p style={{ color: '#b8a090', fontSize: '10px', letterSpacing: '3px', marginTop: '8px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/wabi-sabi/gallery" style={{ padding: '14px 32px', background: elements[activeElement].color, color: '#f5f0e8', fontSize: '14px', fontWeight: 400, textDecoration: 'none' }}>View Gallery</Link>
        <Link href="/wabi-sabi/about" style={{ padding: '14px 32px', color: '#b8a090', fontSize: '14px', fontWeight: 300, textDecoration: 'none', border: '1px solid rgba(180,160,140,0.3)' }}>Learn More</Link>
      </div>
    </div>
  )
}
