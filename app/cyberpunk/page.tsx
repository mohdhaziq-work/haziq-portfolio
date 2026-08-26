'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CyberpunkHome() {
  const [mounted, setMounted] = useState(false)
  const [neon, setNeon] = useState('#ff00ff')
  const [time, setTime] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setTime(x => x + 1), 100)
    const g = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 150) }, 4000)
    return () => { clearInterval(t); clearInterval(g) }
  }, [])
  if (!mounted) return null

  const colors = ['#ff00ff', '#00ffff', '#ff3e3e', '#ffd93d', '#00ff88']

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '40px 24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        {/* Corner accents */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
          <div key={pos} style={{
            position: 'absolute', width: '20px', height: '20px',
            [pos.includes('top') ? 'top' : 'bottom']: 0,
            [pos.includes('left') ? 'left' : 'right']: 0,
            [`border${pos.includes('top') ? 'Top' : 'Bottom'}`]: `2px solid ${neon}`,
            [`border${pos.includes('left') ? 'Left' : 'Right'}`]: `2px solid ${neon}`,
          }} />
        ))}

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#4a6a7a', fontSize: '9px', letterSpacing: '5px', marginBottom: '16px' }}>CYBERPUNK DESIGN SYSTEM</p>
          <h1 style={{
            color: neon, fontSize: '52px', fontWeight: 900, letterSpacing: '8px',
            textShadow: `0 0 20px ${neon}80, 0 0 40px ${neon}40, 0 0 80px ${neon}20`,
            transform: glitch ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)` : 'none',
            transition: glitch ? 'none' : 'transform 0.1s',
            marginBottom: '16px',
          }}>NEON CITY</h1>
          <p style={{ color: '#666', fontSize: '10px', letterSpacing: '4px' }}>FUTURE.IS.NOW // DIGITAL.REVOLUTION // NEON.DREAMS</p>
        </div>
      </div>

      {/* Neon Color Picker */}
      <p style={{ color: '#4a6a7a', fontSize: '9px', textAlign: 'center', letterSpacing: '3px', marginBottom: '10px' }}>CHOOSE NEON</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        {colors.map(c => (
          <button key={c} onClick={() => setNeon(c)} style={{
            width: '36px', height: '36px', borderRadius: '50%', background: c, cursor: 'pointer',
            border: neon === c ? '2px solid #fff' : `2px solid ${c}60`,
            boxShadow: neon === c ? `0 0 20px ${c}80, 0 0 40px ${c}40` : `0 0 10px ${c}40`,
            transform: neon === c ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s',
          }} />
        ))}
      </div>

      {/* HUD Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
        {[
          { label: 'SYS.TIME', value: `${Math.floor(time / 10) % 24}:${String(time % 60).padStart(2, '0')}` },
          { label: 'STATUS', value: 'ONLINE' },
          { label: 'SIGNAL', value: `${95 + (time % 5)}%` },
          { label: 'MODE', value: 'ACTIVE' },
        ].map((s, i) => (
          <div key={i} style={{ background: `${neon}08`, border: `1px solid ${neon}20`, padding: '14px', textAlign: 'center' }}>
            <p style={{ color: '#4a6a7a', fontSize: '7px', letterSpacing: '2px', marginBottom: '6px' }}>{s.label}</p>
            <p style={{ color: neon, fontSize: '18px', fontWeight: 900, textShadow: `0 0 10px ${neon}60` }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Hex Grid */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${neon}${String(8 + i * 3).padStart(2, '0')}`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}>
            <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'NEON GLOW', desc: 'Luminous elements that pulse against dark backgrounds.' },
          { title: 'GLITCH FX', desc: 'Digital distortion and chromatic aberration effects.' },
          { title: 'HUD ELEMENTS', desc: 'Heads-up display inspired interfaces and data readouts.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '18px' }}>
            <div style={{ width: '6px', height: '6px', background: neon, boxShadow: `0 0 10px ${neon}`, marginBottom: '12px' }} />
            <h3 style={{ color: neon, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ color: '#4a6a7a', fontSize: '11px', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/cyberpunk/gallery" style={{ padding: '14px 32px', background: `${neon}20`, color: neon, border: `1px solid ${neon}60`, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textDecoration: 'none', textShadow: `0 0 10px ${neon}60` }}>GALLERY</Link>
        <Link href="/cyberpunk/about" style={{ padding: '14px 32px', background: 'transparent', color: '#4a6a7a', border: '1px solid #222', fontSize: '10px', letterSpacing: '3px', textDecoration: 'none' }}>ABOUT</Link>
      </div>
    </div>
  )
}
