'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GeometricGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Triangle Grid', cat: 'Web' },
    { title: 'Hex Pattern', cat: 'Web' },
    { title: 'Diamond App', cat: 'App' },
    { title: 'Geo Portfolio', cat: 'Web' },
    { title: 'Shape Shop', cat: 'Web' },
    { title: 'Grid Admin', cat: 'App' },
    { title: 'Geo Forms', cat: 'UI' },
    { title: 'Pattern Cards', cat: 'UI' },
    { title: 'Geo Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 900, letterSpacing: '4px' }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', letterSpacing: '1px',
            background: active === c ? '#000' : '#fff',
            color: active === c ? '#fff' : '#000',
            border: active === c ? 'none' : '3px solid #000',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', overflow: 'hidden' }}>
            <div style={{ height: '80px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#fff', clipPath: ['polygon(50% 0%, 0% 100%, 100% 100%)', 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'][i % 3] }} />
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#000', fontSize: '13px', fontWeight: 800, marginBottom: '4px', letterSpacing: '1px' }}>{w.title}</h3>
              <p style={{ color: '#999', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/geometric" style={{ padding: '12px 28px', color: '#000', fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '3px solid #000', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
