'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FlatDesignHome() {
  const [mounted, setMounted] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#3498db', borderRadius: '16px', padding: '36px 28px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 800, marginBottom: '14px' }}>Flat Design</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Bold colors, clean shapes, zero shadows. Pure flat design that feels fresh and modern.</p>
      </div>

      {/* Color Picker */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {colors.map((c, i) => (
          <button key={i} onClick={() => setActiveColor(i)} style={{
            width: '40px', height: '40px', borderRadius: '10px', background: c, border: activeColor === i ? '3px solid #333' : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s',
          }} />
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Bold Colors', desc: 'Vibrant, solid colors that grab attention.', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
          { title: 'Clean Shapes', desc: 'Simple geometric forms, no gradients.', icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z' },
          { title: 'Zero Shadows', desc: 'No depth effects, pure flat aesthetics.', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', background: colors[activeColor], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d={f.icon} /></svg>
            </div>
            <h3 style={{ color: '#333', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#999', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: colors[activeColor], borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '26px', fontWeight: 800 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/flat-design/gallery" style={{ padding: '14px 28px', background: colors[activeColor], color: '#fff', fontSize: '14px', fontWeight: 700, textDecoration: 'none', borderRadius: '10px' }}>View Gallery</Link>
        <Link href="/flat-design/about" style={{ padding: '14px 28px', color: '#555', fontSize: '14px', fontWeight: 600, textDecoration: 'none', borderRadius: '10px', border: '2px solid #ddd' }}>Learn More</Link>
      </div>
    </div>
  )
}
