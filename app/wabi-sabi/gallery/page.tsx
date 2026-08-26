'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WabiSabiGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Earth Tones', cat: 'Web' },
    { title: 'Stone Garden', cat: 'Web' },
    { title: 'Wood Grain', cat: 'App' },
    { title: 'Clay Forms', cat: 'Web' },
    { title: 'Rustic Blog', cat: 'Web' },
    { title: 'Weathered Shop', cat: 'App' },
    { title: 'Imperfect UI', cat: 'UI' },
    { title: 'Humble Cards', cat: 'UI' },
    { title: 'Wabi Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#b8a090', fontSize: '12px', letterSpacing: '4px', marginBottom: '16px' }}>Gallery</p>
        <h1 style={{ color: '#8b7355', fontSize: '48px', fontWeight: 300 }}>Selected Works</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
            color: active === c ? '#8b7355' : '#b8a090', fontWeight: active === c ? 500 : 300,
            borderBottom: active === c ? '1px solid #8b7355' : '1px solid transparent',
            paddingBottom: '4px',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {filtered.map((w, i) => (
          <div key={i}>
            <div style={{ height: '120px', background: ['#8b7355', '#6b6b6b', '#a0522d', '#b87333', '#8b7355', '#6b6b6b', '#a0522d', '#b87333', '#8b7355'][i] + '20', marginBottom: '12px' }} />
            <h3 style={{ color: '#8b7355', fontSize: '15px', fontWeight: 400, marginBottom: '4px' }}>{w.title}</h3>
            <p style={{ color: '#b8a090', fontSize: '11px', fontWeight: 300 }}>{w.cat}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/wabi-sabi" style={{ color: '#b8a090', fontSize: '14px', fontWeight: 300, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
