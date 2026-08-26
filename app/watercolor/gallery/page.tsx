'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Watercolor Dashboard', cat: 'Web' },
    { title: 'Watercolor Landing', cat: 'Web' },
    { title: 'Watercolor Portfolio', cat: 'Web' },
    { title: 'Watercolor UI Kit', cat: 'UI' },
    { title: 'Watercolor App', cat: 'App' },
    { title: 'Watercolor E-Commerce', cat: 'Web' },
    { title: 'Watercolor Forms', cat: 'UI' },
    { title: 'Watercolor Blog', cat: 'Web' },
    { title: 'Watercolor Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #87ceeb20', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#5a6c7d', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#5a6c7d66', fontSize: '14px', marginTop: '8px' }}>Our watercolor creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#87ceeb' : '#fff', color: active === c ? '#fff' : '#5a6c7d88', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #87ceeb15', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#87ceeb10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#87ceeb25' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#5a6c7d', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#5a6c7d66', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/watercolor" style={{ padding: '12px 28px', background: '#87ceeb15', color: '#87ceeb', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
