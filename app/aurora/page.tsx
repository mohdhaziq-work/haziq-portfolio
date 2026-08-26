'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AuroraHome() {
  const [mounted, setMounted] = useState(false)
  const [activeWave, setActiveWave] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const waves = [
    { colors: ['#00c9ff', '#92fe9d'], name: 'Aurora Green' },
    { colors: ['#fc5c7d', '#6a82fb'], name: 'Aurora Purple' },
    { colors: ['#f093fb', '#f5576c'], name: 'Aurora Pink' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: '24px', padding: '40px 28px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${waves[activeWave].colors[0]}33, ${waves[activeWave].colors[1]}33)` }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 700, marginBottom: '14px' }}>Aurora</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Northern lights-inspired design with flowing gradients and ethereal glow effects.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {waves.map((w, i) => (
          <button key={i} onClick={() => setActiveWave(i)} style={{
            flex: 1, padding: '16px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s',
            background: activeWave === i ? `linear-gradient(135deg, ${w.colors[0]}, ${w.colors[1]})` : 'rgba(255,255,255,0.05)',
            border: activeWave === i ? 'none' : '1px solid rgba(255,255,255,0.1)',
          }}>
            <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{w.name}</p>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Flowing', desc: 'Gradients that shift like the northern lights.' },
          { title: 'Ethereal', desc: 'Soft glows that create a dreamy atmosphere.' },
          { title: 'Dynamic', desc: 'Colors that breathe and pulse with life.' },
        ].map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', background: `linear-gradient(135deg, ${waves[activeWave].colors[0]}, ${waves[activeWave].colors[1]})`, borderRadius: '50%' }} />
            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', textAlign: 'center' }}>
            <p style={{ background: `linear-gradient(135deg, ${waves[activeWave].colors[0]}, ${waves[activeWave].colors[1]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '26px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/aurora/gallery" style={{ padding: '14px 28px', background: `linear-gradient(135deg, ${waves[activeWave].colors[0]}, ${waves[activeWave].colors[1]})`, color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '12px' }}>View Gallery</Link>
        <Link href="/aurora/about" style={{ padding: '14px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Learn More</Link>
      </div>
    </div>
  )
}