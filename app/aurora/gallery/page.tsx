'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AuroraGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Northern Lights', cat: 'Web', grad: 'linear-gradient(135deg, #00c9ff, #92fe9d)' },
    { title: 'Purple Haze', cat: 'Web', grad: 'linear-gradient(135deg, #fc5c7d, #6a82fb)' },
    { title: 'Pink Dawn', cat: 'App', grad: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { title: 'Green Glow', cat: 'Web', grad: 'linear-gradient(135deg, #11998e, #38ef7d)' },
    { title: 'Blue Shift', cat: 'App', grad: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { title: 'Sunset Aurora', cat: 'UI', grad: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { title: 'Ice Aurora', cat: 'UI', grad: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' },
    { title: 'Fire Aurora', cat: 'App', grad: 'linear-gradient(135deg, #f5576c, #ff9a9e)' },
    { title: 'Deep Aurora', cat: 'Web', grad: 'linear-gradient(135deg, #0f0c29, #302b63)' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,201,255,0.15), rgba(146,254,157,0.15))', borderRadius: '24px', border: '1px solid rgba(0,201,255,0.2)', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
            background: active === c ? 'linear-gradient(135deg, #00c9ff, #92fe9d)' : 'rgba(255,255,255,0.05)',
            color: active === c ? '#0f0c29' : 'rgba(255,255,255,0.5)',
            border: active === c ? 'none' : '1px solid rgba(255,255,255,0.1)',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100px', background: w.grad }} />
            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/aurora" style={{ padding: '12px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
