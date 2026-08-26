'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HandwrittenHome() {
  const [mounted, setMounted] = useState(false)
  const [activePen, setActivePen] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const pens = [
    { name: 'Pencil', color: '#5a4a35' },
    { name: 'Blue Pen', color: '#2563eb' },
    { name: 'Red Pen', color: '#dc2626' },
    { name: 'Green Pen', color: '#16a34a' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f5f0e8', borderRadius: '20px', padding: '36px 28px', marginBottom: '20px', border: '2px dashed #d4c5a9', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '48px', fontWeight: 700, marginBottom: '14px' }}>Hello World!</h1>
        <p style={{ color: '#8b7355', fontSize: '18px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Hand-drawn, personal, and full of character. Like a notebook come to life.</p>
      </div>

      {/* Pen Selector */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {pens.map((p, i) => (
          <button key={i} onClick={() => setActivePen(i)} style={{
            padding: '10px 18px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
            background: activePen === i ? p.color : '#f5f0e8',
            color: activePen === i ? '#fff' : '#8b7355',
            border: activePen === i ? 'none' : '2px dashed #d4c5a9',
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Sketchy', desc: 'Lines that feel hand-drawn and alive.' },
          { title: 'Personal', desc: 'Like a letter from a friend.' },
          { title: 'Warm', desc: 'Paper textures and ink stains.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#f5f0e8', borderRadius: '16px', padding: '20px', border: '2px dashed #d4c5a9', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', background: pens[activePen].color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
            </div>
            <h3 style={{ color: '#5a4a35', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#8b7355', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: pens[activePen].color, borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '28px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/handwritten/gallery" style={{ padding: '14px 28px', background: pens[activePen].color, color: '#fff', fontSize: '18px', fontWeight: 600, textDecoration: 'none', borderRadius: '12px' }}>View Gallery</Link>
        <Link href="/handwritten/about" style={{ padding: '14px 28px', color: '#8b7355', fontSize: '18px', fontWeight: 500, textDecoration: 'none', borderRadius: '12px', border: '2px dashed #d4c5a9' }}>Learn More</Link>
      </div>
    </div>
  )
}
