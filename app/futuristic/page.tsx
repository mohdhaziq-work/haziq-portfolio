'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FuturisticHome() {
  const [mounted, setMounted] = useState(false)
  const [activeSystem, setActiveSystem] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const systems = [
    { name: 'Neural', color: '#00f0ff' },
    { name: 'Quantum', color: '#ff00ff' },
    { name: 'Plasma', color: '#00ff88' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)', padding: '40px 28px', marginBottom: '24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(0,240,255,0.5)', fontSize: '10px', letterSpacing: '4px', marginBottom: '12px' }}>SYSTEM ONLINE</p>
        <h1 style={{ color: '#00f0ff', fontSize: '42px', fontWeight: 900, letterSpacing: '6px', marginBottom: '14px' }}>FUTURE</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Sci-fi inspired design with neon accents, scan lines, and angular shapes.</p>
      </div>

      {/* System Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {systems.map((s, i) => (
          <button key={i} onClick={() => setActiveSystem(i)} style={{
            flex: 1, padding: '14px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', letterSpacing: '2px',
            background: activeSystem === i ? `${s.color}15` : 'transparent',
            color: activeSystem === i ? s.color : 'rgba(255,255,255,0.3)',
            border: activeSystem === i ? `1px solid ${s.color}` : '1px solid rgba(255,255,255,0.1)',
            clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
          }}>{s.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Neural', desc: 'AI-powered interfaces that think ahead.' },
          { title: 'Quantum', desc: 'Processing at the speed of light.' },
          { title: 'Plasma', desc: 'Energy that flows through every pixel.' },
        ].map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)' }}>
            <div style={{ width: '32px', height: '32px', margin: '0 auto 12px', background: `${systems[activeSystem].color}20`, border: `1px solid ${systems[activeSystem].color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: systems[activeSystem].color, fontSize: '14px', fontWeight: 700 }}>{i + 1}</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: '13px', fontWeight: 700, marginBottom: '6px', textAlign: 'center', letterSpacing: '1px' }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', lineHeight: 1.6, textAlign: 'center' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
        ].map((s, i) => (
          <div key={i} style={{ background: `${systems[activeSystem].color}10`, border: `1px solid ${systems[activeSystem].color}30`, padding: '16px', textAlign: 'center', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <p style={{ color: systems[activeSystem].color, fontSize: '24px', fontWeight: 900 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/futuristic/gallery" style={{ padding: '14px 28px', background: `${systems[activeSystem].color}20`, color: systems[activeSystem].color, fontSize: '11px', fontWeight: 700, textDecoration: 'none', border: `1px solid ${systems[activeSystem].color}`, letterSpacing: '2px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>View Gallery</Link>
        <Link href="/futuristic/about" style={{ padding: '14px 28px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '2px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>Learn More</Link>
      </div>
    </div>
  )
}
