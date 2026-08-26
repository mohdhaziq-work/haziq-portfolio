'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MinimalismGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Clean Dashboard', cat: 'Web' },
    { title: 'White Landing', cat: 'Web' },
    { title: 'Minimal Portfolio', cat: 'Web' },
    { title: 'Simple UI Kit', cat: 'UI' },
    { title: 'Clean App', cat: 'App' },
    { title: 'White E-Commerce', cat: 'Web' },
    { title: 'Minimal Forms', cat: 'UI' },
    { title: 'Simple Blog', cat: 'Web' },
    { title: 'Clean Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#111', fontSize: '36px', fontWeight: 300 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
            color: active === c ? '#111' : '#ddd', fontWeight: active === c ? 500 : 300,
            transition: 'color 0.2s',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {filtered.map((w, i) => (
          <div key={i}>
            <div style={{ height: '120px', background: '#f5f5f5', marginBottom: '12px' }} />
            <h3 style={{ color: '#111', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{w.title}</h3>
            <p style={{ color: '#ddd', fontSize: '11px' }}>{w.cat}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/minimalism" style={{ color: '#bbb', fontSize: '12px', letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
