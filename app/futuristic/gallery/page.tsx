'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FuturisticGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Neural Dashboard', cat: 'Web' },
    { title: 'Quantum Landing', cat: 'Web' },
    { title: 'Plasma App', cat: 'App' },
    { title: 'Cyber Portfolio', cat: 'Web' },
    { title: 'Neon Shop', cat: 'Web' },
    { title: 'Holo Admin', cat: 'App' },
    { title: 'Grid Forms', cat: 'UI' },
    { title: 'Scan Cards', cat: 'UI' },
    { title: 'Matrix Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', padding: '24px', marginBottom: '24px', textAlign: 'center', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)' }}>
        <h1 style={{ color: '#00f0ff', fontSize: '36px', fontWeight: 900, letterSpacing: '4px' }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', letterSpacing: '2px',
            background: active === c ? 'rgba(0,240,255,0.1)' : 'transparent',
            color: active === c ? '#00f0ff' : 'rgba(255,255,255,0.3)',
            border: active === c ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.1)',
            clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)' }}>
            <div style={{ height: '80px', background: 'rgba(0,240,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgba(0,240,255,0.3)', fontSize: '20px', fontWeight: 900 }}>{'{ }'}</span>
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#fff', fontSize: '12px', fontWeight: 700, marginBottom: '4px', letterSpacing: '1px' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/futuristic" style={{ padding: '12px 28px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '2px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>Back Home</Link>
      </div>
    </div>
  )
}
