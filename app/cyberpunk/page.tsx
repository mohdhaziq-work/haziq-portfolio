'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CyberpunkHome() {
  const [mounted, setMounted] = useState(false)
  const [neon, setNeon] = useState('#ff00ff')
  const [time, setTime] = useState(0)
  useEffect(() => { setMounted(true); const i = setInterval(() => setTime(t => t + 1), 100); return () => clearInterval(i) }, [])
  if (!mounted) return null

  const colors = ['#ff00ff', '#00ffff', '#ff3e3e', '#ffd93d', '#00ff88']

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '32px 24px', marginBottom: '24px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: `2px solid ${neon}`, borderLeft: `2px solid ${neon}` }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: `2px solid ${neon}`, borderRight: `2px solid ${neon}` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: `2px solid ${neon}`, borderLeft: `2px solid ${neon}` }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: `2px solid ${neon}`, borderRight: `2px solid ${neon}` }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#4a6a7a', fontSize: '9px', letterSpacing: '4px', marginBottom: '12px' }}>CYBERPUNK DESIGN</p>
          <h1 style={{ color: neon, fontSize: '48px', fontWeight: 900, textShadow: `0 0 20px ${neon}80, 0 0 40px ${neon}40`, letterSpacing: '6px', marginBottom: '16px' }}>NEON CITY</h1>
          <p style={{ color: '#666', fontSize: '11px', letterSpacing: '3px' }}>FUTURE.IS.NOW // DIGITAL.REVOLUTION</p>
        </div>
      </div>

      <p style={{ color: '#4a6a7a', fontSize: '10px', textAlign: 'center', marginBottom: '8px', letterSpacing: '2px' }}>CHOOSE NEON</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        {colors.map(c => (
          <button key={c} onClick={() => setNeon(c)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: c, border: neon === c ? '2px solid #fff' : `2px solid ${c}60`, boxShadow: neon === c ? `0 0 20px ${c}80` : `0 0 10px ${c}40`, cursor: 'pointer', transform: neon === c ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s' }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'SYS.TIME', value: `${Math.floor(time / 10) % 24}:${String(time % 60).padStart(2, '0')}` },
          { label: 'STATUS', value: 'ONLINE' },
          { label: 'SIGNAL', value: `${95 + (time % 5)}%` },
          { label: 'MODE', value: 'ACTIVE' },
        ].map((s, i) => (
          <div key={i} style={{ background: `${neon}08`, border: `1px solid ${neon}20`, padding: '12px', textAlign: 'center' }}>
            <p style={{ color: '#4a6a7a', fontSize: '7px', letterSpacing: '2px', marginBottom: '4px' }}>{s.label}</p>
            <p style={{ color: neon, fontSize: '16px', fontWeight: 900, textShadow: `0 0 10px ${neon}60` }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'NEON GLOW', desc: 'Luminous elements that pulse against dark backgrounds.' },
          { title: 'GLITCH FX', desc: 'Digital distortion and chromatic aberration effects.' },
          { title: 'HUD ELEMENTS', desc: 'Heads-up display inspired interfaces and data readouts.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '16px' }}>
            <div style={{ width: '6px', height: '6px', background: neon, boxShadow: `0 0 10px ${neon}`, marginBottom: '10px' }} />
            <h3 style={{ color: neon, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#4a6a7a', fontSize: '10px', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/cyberpunk/gallery" style={{ padding: '12px 28px', background: `${neon}20`, color: neon, border: `1px solid ${neon}60`, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textDecoration: 'none', textShadow: `0 0 10px ${neon}60` }}>GALLERY</Link>
        <Link href="/cyberpunk/about" style={{ padding: '12px 28px', background: 'transparent', color: '#4a6a7a', border: '1px solid #222', fontSize: '10px', letterSpacing: '3px', textDecoration: 'none' }}>ABOUT</Link>
      </div>
    </div>
  )
}
