'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RetroGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Vintage Poster', cat: 'Print' },
    { title: 'Retro Landing', cat: 'Web' },
    { title: 'Classic Album', cat: 'Print' },
    { title: 'Vintage Blog', cat: 'Web' },
    { title: 'Retro Branding', cat: 'Brand' },
    { title: 'Classic Menu', cat: 'Print' },
    { title: 'Vintage Shop', cat: 'Web' },
    { title: 'Retro Magazine', cat: 'Print' },
    { title: 'Classic Portfolio', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'Print', 'Brand']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', border: '3px solid #8b7355', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#3a2f25', fontSize: '32px', fontWeight: 900 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '8px 18px', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
            background: active === c ? '#8b7355' : '#d4c4a8',
            color: active === c ? '#f4e8d1' : '#5a4a35',
            border: '2px solid #c4a882',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#e8d5b8', border: '2px solid #c4a882', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#d4c4a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#8b7355', borderRadius: '50%' }} />
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#3a2f25', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#8b7355', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/retro" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '13px', textDecoration: 'none', border: '2px solid #c4a882' }}>Back Home</Link>
      </div>
    </div>
  )
}
