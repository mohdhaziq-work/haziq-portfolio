'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Dark Mode Dashboard', cat: 'Web' },
    { title: 'Dark Mode Landing', cat: 'Web' },
    { title: 'Dark Mode Portfolio', cat: 'Web' },
    { title: 'Dark Mode UI Kit', cat: 'UI' },
    { title: 'Dark Mode App', cat: 'App' },
    { title: 'Dark Mode E-Commerce', cat: 'Web' },
    { title: 'Dark Mode Forms', cat: 'UI' },
    { title: 'Dark Mode Blog', cat: 'Web' },
    { title: 'Dark Mode Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#161b22', borderRadius: '16px', border: '1px solid #58a6ff20', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#f0f6fc', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#f0f6fc66', fontSize: '14px', marginTop: '8px' }}>Our dark mode creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#58a6ff' : '#161b22', color: active === c ? '#fff' : '#f0f6fc88', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#161b22', borderRadius: '12px', border: '1px solid #58a6ff15', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#58a6ff10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#58a6ff25' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#f0f6fc', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#f0f6fc66', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/dark-mode" style={{ padding: '12px 28px', background: '#58a6ff15', color: '#58a6ff', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
