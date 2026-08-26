'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ParallaxGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Mountain Layers', cat: 'Web' },
    { title: 'Ocean Depth', cat: 'Web' },
    { title: 'City Parallax', cat: 'App' },
    { title: 'Forest Walk', cat: 'Web' },
    { title: 'Space Journey', cat: 'App' },
    { title: 'Desert Dunes', cat: 'Web' },
    { title: 'Arctic Ice', cat: 'UI' },
    { title: 'Volcano Layers', cat: 'App' },
    { title: 'Sky Dive', cat: 'UI' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px' }}>GALLERY</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 200 }}>Selected Works</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px',
            color: active === c ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: active === c ? 500 : 300,
            letterSpacing: '2px', borderBottom: active === c ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
            paddingBottom: '4px',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <div style={{ height: '120px', background: `linear-gradient(135deg, rgba(${i * 25},${i * 15},${i * 30},0.3), rgba(${i * 15},${i * 25},${i * 20},0.2))`, border: '1px solid rgba(255,255,255,0.1)', marginBottom: '12px' }} />
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 400, marginBottom: '4px' }}>{w.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 300 }}>{w.cat}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/parallax" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 300, textDecoration: 'none', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
