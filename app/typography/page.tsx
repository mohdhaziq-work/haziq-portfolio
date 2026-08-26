'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TypographyHome() {
  const [mounted, setMounted] = useState(false)
  const [activeSize, setActiveSize] = useState(1)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const sizes = [
    { label: 'Caption', size: '14px', weight: 300 },
    { label: 'Body', size: '18px', weight: 400 },
    { label: 'Heading', size: '36px', weight: 400 },
    { label: 'Display', size: '64px', weight: 400 },
  ]

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: '#999', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Design Studio</p>
        <h1 style={{ color: '#111', fontSize: '72px', fontWeight: 400, fontStyle: 'italic', lineHeight: 0.9, marginBottom: '20px' }}>Where<br />type<br />speaks.</h1>
        <p style={{ color: '#666', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, maxWidth: '400px', lineHeight: 1.8 }}>Typography is the foundation of all design. We let letters do the talking.</p>
      </div>

      {/* Type Scale Demo */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: '#999', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Type Scale</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {sizes.map((s, i) => (
            <button key={i} onClick={() => setActiveSize(i)} style={{
              padding: '8px 16px', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer',
              background: activeSize === i ? '#111' : 'transparent',
              color: activeSize === i ? '#fff' : '#999',
              border: activeSize === i ? 'none' : '1px solid #ddd',
            }}>{s.label}</button>
          ))}
        </div>
        <div style={{ padding: '32px', background: '#f8f8f8', textAlign: 'center' }}>
          <p style={{ color: '#111', fontSize: sizes[activeSize].size, fontWeight: sizes[activeSize].weight, fontStyle: 'italic' }}>The quick brown fox</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {[
          { title: 'Serif', desc: 'Classic elegance with DM Serif Display.', sample: 'Aa', font: '"DM Serif Display", serif' },
          { title: 'Sans', desc: 'Modern clarity with DM Sans.', sample: 'Aa', font: '"DM Sans", sans-serif' },
          { title: 'Italic', desc: 'Expressive emphasis through slant.', sample: 'Aa', font: '"DM Serif Display", serif', italic: true },
        ].map((f, i) => (
          <div key={i} style={{ padding: '24px', border: '1px solid #eee' }}>
            <p style={{ color: '#111', fontSize: '48px', fontWeight: 400, fontStyle: f.italic ? 'italic' : 'normal', fontFamily: f.font, marginBottom: '12px' }}>{f.sample}</p>
            <h3 style={{ color: '#111', fontSize: '16px', fontWeight: 500, fontFamily: '"DM Sans", sans-serif', marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#999', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300 }}>{f.desc}</p>
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
            <p style={{ color: '#111', fontSize: '36px', fontWeight: 400, fontStyle: 'italic' }}>{s.value}</p>
            <p style={{ color: '#ccc', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/typography/gallery" style={{ padding: '14px 32px', background: '#111', color: '#fff', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, textDecoration: 'none' }}>View Gallery</Link>
        <Link href="/typography/about" style={{ padding: '14px 32px', color: '#111', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, textDecoration: 'none', border: '1px solid #ddd' }}>Learn More</Link>
      </div>
    </div>
  )
}
