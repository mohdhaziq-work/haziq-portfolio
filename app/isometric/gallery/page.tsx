'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IsometricGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Isometric City', cat: 'Web' },
    { title: '3D Dashboard', cat: 'Web' },
    { title: 'Isometric App', cat: 'App' },
    { title: 'Depth Portfolio', cat: 'Web' },
    { title: 'Isometric Shop', cat: 'Web' },
    { title: '3D Admin', cat: 'App' },
    { title: 'Isometric Blog', cat: 'Web' },
    { title: 'Angle UI', cat: 'UI' },
    { title: 'Isometric Forms', cat: 'UI' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: '2px solid #e94560', padding: '24px', marginBottom: '24px', transform: 'skewY(-2deg)', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800, letterSpacing: '2px' }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transform: 'skewX(-10deg)',
            background: active === c ? '#e94560' : '#16213e',
            color: active === c ? '#fff' : 'rgba(255,255,255,0.5)',
            border: active === c ? 'none' : '2px solid #0f3460',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#16213e', border: '2px solid #0f3460', overflow: 'hidden', transform: 'skewY(-1deg)' }}>
            <div style={{ height: '80px', background: '#0f3460', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#e94560', transform: 'rotate(45deg)' }} />
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#fff', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/isometric" style={{ padding: '12px 28px', color: '#e94560', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '2px solid #e94560', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
