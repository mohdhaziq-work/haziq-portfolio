'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Abstract Dashboard', cat: 'Web' },
    { title: 'Abstract Landing', cat: 'Web' },
    { title: 'Abstract Portfolio', cat: 'Web' },
    { title: 'Abstract UI Kit', cat: 'UI' },
    { title: 'Abstract App', cat: 'App' },
    { title: 'Abstract E-Commerce', cat: 'Web' },
    { title: 'Abstract Forms', cat: 'UI' },
    { title: 'Abstract Blog', cat: 'Web' },
    { title: 'Abstract Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', borderRadius: '16px', border: '1px solid #e9456020', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#eee', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#eee66', fontSize: '14px', marginTop: '8px' }}>Our abstract creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#e94560' : '#16213e', color: active === c ? '#fff' : '#eee88', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#16213e', borderRadius: '12px', border: '1px solid #e9456015', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#e9456010', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e9456025' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#eee', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#eee66', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/abstract" style={{ padding: '12px 28px', background: '#e9456015', color: '#e94560', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
