'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CinematicGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Film Noir', cat: 'Web' },
    { title: 'Golden Hour', cat: 'Web' },
    { title: 'Midnight', cat: 'App' },
    { title: 'Silent Film', cat: 'Web' },
    { title: 'Technicolor', cat: 'Web' },
    { title: 'Documentary', cat: 'App' },
    { title: 'Indie Film', cat: 'UI' },
    { title: 'Blockbuster', cat: 'UI' },
    { title: 'Short Film', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '6px', marginBottom: '16px' }}>GALLERY</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 400, letterSpacing: '8px' }}>Filmography</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px',
            color: active === c ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: active === c ? 500 : 300,
            letterSpacing: '3px', fontFamily: '"Barlow", sans-serif',
            borderBottom: active === c ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
            paddingBottom: '4px',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
        {filtered.map((w, i) => (
          <div key={i}>
            <div style={{ height: '120px', background: `linear-gradient(135deg, rgba(${i * 20},${i * 15},${i * 25},0.3), rgba(${i * 15},${i * 20},${i * 10},0.2))`, marginBottom: '12px' }} />
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 400, letterSpacing: '2px', marginBottom: '4px' }}>{w.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: '"Barlow", sans-serif', fontWeight: 300 }}>{w.cat}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cinematic" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 300, textDecoration: 'none', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif' }}>Back Home</Link>
      </div>
    </div>
  )
}
