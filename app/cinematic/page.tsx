'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CinematicHome() {
  const [mounted, setMounted] = useState(false)
  const [activeScene, setActiveScene] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const scenes = [
    { name: 'Dawn', color: '#ff6b35' },
    { name: 'Dusk', color: '#8b5cf6' },
    { name: 'Night', color: '#0ea5e9' },
  ]

  return (
    <div>
      {/* Cinematic Hero */}
      <div style={{ height: 'calc(100vh - 120px)', background: `linear-gradient(135deg, #0a0a0a, ${scenes[activeScene].color}20, #0a0a0a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '200px', height: '1px', background: `linear-gradient(90deg, transparent, ${scenes[activeScene].color}40, transparent)` }} />
        <div style={{ position: 'absolute', bottom: '30%', right: '10%', width: '150px', height: '1px', background: `linear-gradient(90deg, transparent, ${scenes[activeScene].color}30, transparent)` }} />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '6px', marginBottom: '16px' }}>A FILM BY</p>
          <h1 style={{ color: '#fff', fontSize: '72px', fontWeight: 400, letterSpacing: '12px', marginBottom: '16px' }}>CINEMATIC</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, letterSpacing: '2px' }}>Design that tells a story</p>
        </div>
      </div>

      {/* Scene Selector */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '0' }}>
        {scenes.map((s, i) => (
          <button key={i} onClick={() => setActiveScene(i)} style={{
            flex: 1, padding: '16px', fontSize: '11px', fontWeight: 400, cursor: 'pointer', letterSpacing: '4px',
            background: activeScene === i ? s.color : 'transparent',
            color: activeScene === i ? '#fff' : 'rgba(255,255,255,0.3)',
            border: 'none', fontFamily: '"Barlow", sans-serif',
          }}>{s.name}</button>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '60px' }}>
          {[
            { title: 'Drama', desc: 'High contrast and bold compositions.' },
            { title: 'Story', desc: 'Every scroll reveals a new chapter.' },
            { title: 'Mood', desc: 'Lighting that sets the atmosphere.' },
          ].map((f, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '1px', background: scenes[activeScene].color, margin: '0 auto 16px' }} />
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 400, letterSpacing: '4px', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '60px' }}>
          {[
            { value: '100+', label: 'Projects' },
            { value: '5+', label: 'Years' },
            { value: '50+', label: 'Clients' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: '36px', fontWeight: 400, letterSpacing: '4px' }}>{s.value}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '4px', marginTop: '8px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/cinematic/gallery" style={{ padding: '14px 32px', background: scenes[activeScene].color, color: '#fff', fontSize: '12px', fontWeight: 400, textDecoration: 'none', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif' }}>View Gallery</Link>
          <Link href="/cinematic/about" style={{ padding: '14px 32px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 300, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif' }}>Learn More</Link>
        </div>
      </div>
    </div>
  )
}
