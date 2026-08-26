'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MonochromeGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'B&W Portfolio', cat: 'Web' },
    { title: 'Mono Landing', cat: 'Web' },
    { title: 'Grayscale App', cat: 'App' },
    { title: 'B&W Blog', cat: 'Web' },
    { title: 'Mono Shop', cat: 'Web' },
    { title: 'Grayscale Admin', cat: 'App' },
    { title: 'B&W Forms', cat: 'UI' },
    { title: 'Mono Cards', cat: 'UI' },
    { title: 'Grayscale Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '20px', marginBottom: '16px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '8px 16px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
            background: active === c ? '#000' : '#fff',
            color: active === c ? '#fff' : '#000',
            border: active === c ? 'none' : '1px solid #000',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: i % 2 === 0 ? '#000' : '#fff', border: i % 2 !== 0 ? '1px solid #000' : 'none', overflow: 'hidden' }}>
            <div style={{ height: '80px', background: ['#000', '#333', '#666', '#999', '#ccc', '#000', '#333', '#666', '#999'][i] }} />
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: i % 2 === 0 ? '#fff' : '#000', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : '#999', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/monochrome" style={{ padding: '10px 24px', color: '#000', fontSize: '12px', fontWeight: 500, textDecoration: 'none', border: '1px solid #000' }}>Back Home</Link>
      </div>
    </div>
  )
}
