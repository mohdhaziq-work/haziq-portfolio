'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Geometric Dashboard', cat: 'Web' },
    { title: 'Geometric Landing', cat: 'Web' },
    { title: 'Geometric Portfolio', cat: 'Web' },
    { title: 'Geometric UI Kit', cat: 'UI' },
    { title: 'Geometric App', cat: 'App' },
    { title: 'Geometric E-Commerce', cat: 'Web' },
    { title: 'Geometric Forms', cat: 'UI' },
    { title: 'Geometric Blog', cat: 'Web' },
    { title: 'Geometric Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ff634820', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#2d3436', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#2d343666', fontSize: '14px', marginTop: '8px' }}>Our geometric creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#ff6348' : '#fff', color: active === c ? '#fff' : '#2d343688', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #ff634815', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#ff634810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ff634825' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#2d3436', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#2d343666', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/geometric" style={{ padding: '12px 28px', background: '#ff634815', color: '#ff6348', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
