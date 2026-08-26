'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MaterialDesignGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Material Dashboard', cat: 'Web' },
    { title: 'Material Landing', cat: 'Web' },
    { title: 'Material App', cat: 'App' },
    { title: 'Material E-Commerce', cat: 'Web' },
    { title: 'Material Portfolio', cat: 'Web' },
    { title: 'Material Admin', cat: 'App' },
    { title: 'Material Blog', cat: 'Web' },
    { title: 'Material Forms', cat: 'UI' },
    { title: 'Material Cards', cat: 'UI' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#6200ee', padding: '24px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 400 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '8px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            background: active === c ? '#6200ee' : '#fff',
            color: active === c ? '#fff' : '#6200ee',
            border: active === c ? 'none' : '1px solid #6200ee',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#e8eaf6' }} />
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#999', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/material-design" style={{ padding: '12px 32px', color: '#6200ee', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px', border: '1px solid #6200ee', textTransform: 'uppercase', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
