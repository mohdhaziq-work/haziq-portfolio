'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Futuristic Dashboard', cat: 'Web' },
    { title: 'Futuristic Landing', cat: 'Web' },
    { title: 'Futuristic Portfolio', cat: 'Web' },
    { title: 'Futuristic UI Kit', cat: 'UI' },
    { title: 'Futuristic App', cat: 'App' },
    { title: 'Futuristic E-Commerce', cat: 'Web' },
    { title: 'Futuristic Forms', cat: 'UI' },
    { title: 'Futuristic Blog', cat: 'Web' },
    { title: 'Futuristic Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(5,5,16,0.9)', borderRadius: '16px', border: '1px solid #00d4ff20', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#eee', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#eee66', fontSize: '14px', marginTop: '8px' }}>Our futuristic creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#00d4ff' : 'rgba(5,5,16,0.9)', color: active === c ? '#fff' : '#eee88', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: 'rgba(5,5,16,0.9)', borderRadius: '12px', border: '1px solid #00d4ff15', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#00d4ff10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#00d4ff25' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#eee', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#eee66', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/futuristic" style={{ padding: '12px 28px', background: '#00d4ff15', color: '#00d4ff', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
