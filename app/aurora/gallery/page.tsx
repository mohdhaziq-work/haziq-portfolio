'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Aurora Dashboard', cat: 'Web' },
    { title: 'Aurora Landing', cat: 'Web' },
    { title: 'Aurora Portfolio', cat: 'Web' },
    { title: 'Aurora UI Kit', cat: 'UI' },
    { title: 'Aurora App', cat: 'App' },
    { title: 'Aurora E-Commerce', cat: 'Web' },
    { title: 'Aurora Forms', cat: 'UI' },
    { title: 'Aurora Blog', cat: 'Web' },
    { title: 'Aurora Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(10,10,26,0.8)', borderRadius: '16px', border: '1px solid #00cc8820', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#fff66', fontSize: '14px', marginTop: '8px' }}>Our aurora creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#00cc88' : 'rgba(10,10,26,0.8)', color: active === c ? '#fff' : '#fff88', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: 'rgba(10,10,26,0.8)', borderRadius: '12px', border: '1px solid #00cc8815', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#00cc8810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#00cc8825' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#fff66', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/aurora" style={{ padding: '12px 28px', background: '#00cc8815', color: '#00cc88', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
