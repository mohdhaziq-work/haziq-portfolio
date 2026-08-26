'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NeonGlowGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Neon City', cat: 'Web' },
    { title: 'Glow Portfolio', cat: 'Web' },
    { title: 'Neon App', cat: 'App' },
    { title: 'Electric Blog', cat: 'Web' },
    { title: 'Neon Shop', cat: 'Web' },
    { title: 'Glow Admin', cat: 'App' },
    { title: 'Neon Forms', cat: 'UI' },
    { title: 'Electric Cards', cat: 'UI' },
    { title: 'Neon Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(255,0,255,0.05)', border: '2px solid #ff00ff', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 0 30px rgba(255,0,255,0.3)' }}>
        <h1 style={{ color: '#ff00ff', fontSize: '28px', fontWeight: 400, textShadow: '0 0 20px rgba(255,0,255,0.5)' }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '8px 16px', fontSize: '8px', fontWeight: 400, cursor: 'pointer',
            background: active === c ? 'rgba(255,0,255,0.1)' : 'transparent',
            color: active === c ? '#ff00ff' : 'rgba(255,255,255,0.3)',
            border: active === c ? '2px solid #ff00ff' : '2px solid rgba(255,255,255,0.1)',
            boxShadow: active === c ? '0 0 10px rgba(255,0,255,0.3)' : 'none',
            textShadow: active === c ? '0 0 10px rgba(255,0,255,0.5)' : 'none',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,255,0.3)', overflow: 'hidden', boxShadow: '0 0 10px rgba(255,0,255,0.1)' }}>
            <div style={{ height: '80px', background: 'rgba(255,0,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgba(255,0,255,0.3)', fontSize: '16px', textShadow: '0 0 10px rgba(255,0,255,0.3)' }}>{'{ }'}</span>
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#ff00ff', fontSize: '8px', fontWeight: 400, marginBottom: '4px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '7px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/neon-glow" style={{ padding: '10px 24px', color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 400, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
