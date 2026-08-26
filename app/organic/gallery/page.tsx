'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function OrganicGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Forest Landing', cat: 'Web', color: '#6b8f3c' },
    { title: 'Stone Portfolio', cat: 'Web', color: '#8b7355' },
    { title: 'Water App', cat: 'App', color: '#5a8f9f' },
    { title: 'Earth Blog', cat: 'Web', color: '#a0522d' },
    { title: 'Leaf Shop', cat: 'Web', color: '#6b8f3c' },
    { title: 'Bark Admin', cat: 'App', color: '#8b7355' },
    { title: 'River Forms', cat: 'UI', color: '#5a8f9f' },
    { title: 'Soil Cards', cat: 'UI', color: '#a0522d' },
    { title: 'Garden Dashboard', cat: 'Web', color: '#6b8f3c' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8dcc8', borderRadius: '30px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '34px', fontWeight: 700 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            background: active === c ? '#5a4a35' : '#e8dcc8',
            color: active === c ? '#f5f0e8' : '#8b7355',
            border: 'none',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#e8dcc8', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: w.color }} />
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#5a4a35', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#8b7355', fontSize: '11px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/organic" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '20px', border: '1px solid #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
