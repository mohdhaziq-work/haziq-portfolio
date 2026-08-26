'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AbstractGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Blob Landing', cat: 'Web', grad: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)' },
    { title: 'Wave Portfolio', cat: 'Web', grad: 'linear-gradient(135deg, #45b7d1, #f7dc6f)' },
    { title: 'Organic App', cat: 'App', grad: 'linear-gradient(135deg, #a855f7, #ec4899)' },
    { title: 'Abstract Blog', cat: 'Web', grad: 'linear-gradient(135deg, #ff6b6b, #45b7d1)' },
    { title: 'Blob Shop', cat: 'Web', grad: 'linear-gradient(135deg, #4ecdc4, #f7dc6f)' },
    { title: 'Wave Admin', cat: 'App', grad: 'linear-gradient(135deg, #a855f7, #4ecdc4)' },
    { title: 'Organic Forms', cat: 'UI', grad: 'linear-gradient(135deg, #ff6b6b, #a855f7)' },
    { title: 'Abstract Cards', cat: 'UI', grad: 'linear-gradient(135deg, #45b7d1, #ec4899)' },
    { title: 'Blob Dashboard', cat: 'Web', grad: 'linear-gradient(135deg, #f7dc6f, #ff6b6b)' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '32px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 800 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', borderRadius: '14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            background: active === c ? 'linear-gradient(135deg, #ff6b6b, #4ecdc4)' : '#fff',
            color: active === c ? '#fff' : '#666',
            border: active === c ? 'none' : '1px solid #eee',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ height: '100px', background: w.grad }} />
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#333', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#bbb', fontSize: '11px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/abstract" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '16px', border: '1px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
