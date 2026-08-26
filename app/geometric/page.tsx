'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GeometricHome() {
  const [mounted, setMounted] = useState(false)
  const [activeShape, setActiveShape] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const shapes = [
    { name: 'Triangle', clip: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
    { name: 'Diamond', clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
    { name: 'Hexagon', clip: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
    { name: 'Pentagon', clip: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '40px 28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 900, letterSpacing: '6px', marginBottom: '14px' }}>GEOMETRIC</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Designs built on shapes. Triangles, hexagons, diamonds — pure geometry.</p>
      </div>

      {/* Shape Selector */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
        {shapes.map((s, i) => (
          <button key={i} onClick={() => setActiveShape(i)} style={{
            width: '48px', height: '48px', background: activeShape === i ? '#000' : '#ddd', cursor: 'pointer',
            border: 'none', clipPath: s.clip, transition: 'all 0.2s',
          }} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: '#000', fontSize: '14px', fontWeight: 700, letterSpacing: '2px' }}>{shapes[activeShape].name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Precision', desc: 'Every angle calculated, every line exact.' },
          { title: 'Structure', desc: 'Order from chaos through geometry.' },
          { title: 'Balance', desc: 'Symmetry that pleases the eye.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', background: '#000', clipPath: shapes[activeShape].clip }} />
            <h3 style={{ color: '#000', fontSize: '16px', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>{f.title}</h3>
            <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#000', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '28px', fontWeight: 900 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/geometric/gallery" style={{ padding: '14px 28px', background: '#000', color: '#fff', fontSize: '12px', fontWeight: 800, textDecoration: 'none', letterSpacing: '2px' }}>View Gallery</Link>
        <Link href="/geometric/about" style={{ padding: '14px 28px', color: '#000', fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '3px solid #000', letterSpacing: '2px' }}>Learn More</Link>
      </div>
    </div>
  )
}
