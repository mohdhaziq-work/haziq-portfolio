'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Material Design Dashboard', cat: 'Web' },
    { title: 'Material Design Landing', cat: 'Web' },
    { title: 'Material Design Portfolio', cat: 'Web' },
    { title: 'Material Design UI Kit', cat: 'UI' },
    { title: 'Material Design App', cat: 'App' },
    { title: 'Material Design E-Commerce', cat: 'Web' },
    { title: 'Material Design Forms', cat: 'UI' },
    { title: 'Material Design Blog', cat: 'Web' },
    { title: 'Material Design Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #4285f420', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#202124', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#20212466', fontSize: '14px', marginTop: '8px' }}>Our material design creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#4285f4' : '#fff', color: active === c ? '#fff' : '#20212488', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #4285f415', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#4285f410', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#4285f425' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#202124', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#20212466', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/material-design" style={{ padding: '12px 28px', background: '#4285f415', color: '#4285f4', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
