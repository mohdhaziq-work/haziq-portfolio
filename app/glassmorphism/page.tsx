'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GlassHome() {
  const [mounted, setMounted] = useState(false)
  const [blur, setBlur] = useState(16)
  const [opacity, setOpacity] = useState(20)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const glass = (b: number = blur, o: number = opacity) => ({
    background: `rgba(255,255,255,${o / 100})`,
    backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`,
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
  })

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ ...glass(20, 25), padding: '48px 32px', marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '999px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>GLASSMORPHISM</span>
        </div>
        <h1 style={{ color: '#fff', fontSize: '44px', fontWeight: 700, marginBottom: '16px', textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}>Through the Glass</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Frosted glass panels floating over colorful backgrounds. Transparency, blur, and light borders create depth.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div style={{ ...glass(12, 15), padding: '20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Blur: {blur}px</p>
          <input type="range" min="0" max="40" value={blur} onChange={e => setBlur(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#fff' }} />
        </div>
        <div style={{ ...glass(12, 15), padding: '20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Opacity: {opacity}%</p>
          <input type="range" min="5" max="50" value={opacity} onChange={e => setOpacity(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#fff' }} />
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'Transparency', desc: 'Semi-transparent backgrounds let content behind show through beautifully.' },
          { title: 'Frosted Blur', desc: 'Backdrop blur creates the frosted glass effect that softens everything.' },
          { title: 'Light Borders', desc: 'Subtle white borders catch light and define edges without harsh lines.' },
        ].map((f, i) => (
          <div key={i} style={{ ...glass(10, 15), padding: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>{i + 1}</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { value: '40px', label: 'Max Blur' },
          { value: '50%', label: 'Max Opacity' },
          { value: '3px', label: 'Border' },
          { value: '20px', label: 'Radius' },
        ].map((s, i) => (
          <div key={i} style={{ ...glass(8, 12), padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/glassmorphism/gallery" style={{ padding: '14px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>View Gallery</Link>
        <Link href="/glassmorphism/about" style={{ padding: '14px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '14px', textDecoration: 'none' }}>Learn More</Link>
      </div>
    </div>
  )
}
