'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NeonGlowHome() {
  const [mounted, setMounted] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const neons = [
    { name: 'Magenta', color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' },
    { name: 'Cyan', color: '#00ffff', glow: 'rgba(0,255,255,0.5)' },
    { name: 'Lime', color: '#00ff00', glow: 'rgba(0,255,0,0.5)' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(255,0,255,0.05)', border: `2px solid ${neons[activeColor].color}`, padding: '40px 28px', marginBottom: '24px', textAlign: 'center', boxShadow: `0 0 30px ${neons[activeColor].glow}` }}>
        <p style={{ color: neons[activeColor].color, fontSize: '8px', marginBottom: '12px', textShadow: `0 0 10px ${neons[activeColor].glow}` }}>SYSTEM://ONLINE</p>
        <h1 style={{ color: neons[activeColor].color, fontSize: '36px', fontWeight: 400, marginBottom: '14px', textShadow: `0 0 20px ${neons[activeColor].glow}` }}>NEON GLOW</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8 }}>Retro-futuristic neon aesthetics. Glowing text, dark backgrounds, electric colors.</p>
      </div>

      {/* Color Selector */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {neons.map((n, i) => (
          <button key={i} onClick={() => setActiveColor(i)} style={{
            padding: '10px 18px', fontSize: '8px', fontWeight: 400, cursor: 'pointer',
            background: activeColor === i ? `${n.color}20` : 'transparent',
            color: activeColor === i ? n.color : 'rgba(255,255,255,0.3)',
            border: activeColor === i ? `2px solid ${n.color}` : '2px solid rgba(255,255,255,0.1)',
            boxShadow: activeColor === i ? `0 0 15px ${n.glow}` : 'none',
            textShadow: activeColor === i ? `0 0 10px ${n.glow}` : 'none',
          }}>{n.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Glow', desc: 'Text that shines in the dark.' },
          { title: 'Pulse', desc: 'Animations that breathe with light.' },
          { title: 'Electric', desc: 'Colors that crackle with energy.' },
        ].map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${neons[activeColor].color}30`, padding: '18px', textAlign: 'center', boxShadow: `0 0 10px ${neons[activeColor].glow}20` }}>
            <h3 style={{ color: neons[activeColor].color, fontSize: '10px', fontWeight: 400, marginBottom: '8px', textShadow: `0 0 10px ${neons[activeColor].glow}` }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
        ].map((s, i) => (
          <div key={i} style={{ background: `${neons[activeColor].color}10`, border: `1px solid ${neons[activeColor].color}30`, padding: '16px', textAlign: 'center', boxShadow: `0 0 10px ${neons[activeColor].glow}20` }}>
            <p style={{ color: neons[activeColor].color, fontSize: '20px', fontWeight: 400, textShadow: `0 0 10px ${neons[activeColor].glow}` }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '7px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/neon-glow/gallery" style={{ padding: '12px 24px', background: `${neons[activeColor].color}20`, color: neons[activeColor].color, fontSize: '8px', fontWeight: 400, textDecoration: 'none', border: `2px solid ${neons[activeColor].color}`, boxShadow: `0 0 15px ${neons[activeColor].glow}`, textShadow: `0 0 10px ${neons[activeColor].glow}` }}>View Gallery</Link>
        <Link href="/neon-glow/about" style={{ padding: '12px 24px', color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 400, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)' }}>Learn More</Link>
      </div>
    </div>
  )
}
