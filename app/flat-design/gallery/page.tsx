'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FlatDesignGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Flat Dashboard', cat: 'Web', color: '#3498db' },
    { title: 'Colorful Landing', cat: 'Web', color: '#e74c3c' },
    { title: 'Flat Mobile App', cat: 'App', color: '#2ecc71' },
    { title: 'Bold Portfolio', cat: 'Web', color: '#f39c12' },
    { title: 'Flat E-Commerce', cat: 'Web', color: '#9b59b6' },
    { title: 'Simple UI Kit', cat: 'UI', color: '#1abc9c' },
    { title: 'Flat Blog', cat: 'Web', color: '#e67e22' },
    { title: 'Colorful Admin', cat: 'App', color: '#3498db' },
    { title: 'Flat Forms', cat: 'UI', color: '#e74c3c' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#3498db', borderRadius: '16px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            background: active === c ? '#3498db' : '#fff',
            color: active === c ? '#fff' : '#555', border: 'none',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: w.color }} />
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#333', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#bbb', fontSize: '11px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/flat-design" style={{ padding: '12px 28px', color: '#555', fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '10px', border: '2px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
