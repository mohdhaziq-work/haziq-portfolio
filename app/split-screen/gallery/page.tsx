'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SplitScreenGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Split Landing', cat: 'Web' },
    { title: 'Dual Portfolio', cat: 'Web' },
    { title: 'Split App', cat: 'App' },
    { title: 'Contrast Blog', cat: 'Web' },
    { title: 'Split Shop', cat: 'Web' },
    { title: 'Dual Admin', cat: 'App' },
    { title: 'Split Forms', cat: 'UI' },
    { title: 'Contrast Cards', cat: 'UI' },
    { title: 'Split Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80px' }}>
        <div style={{ background: '#000', padding: '20px', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>Gallery</h1>
        </div>
        <div style={{ background: '#fff', padding: '20px', display: 'flex', alignItems: 'center', borderLeft: '2px solid #000' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{
                padding: '6px 14px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                background: active === c ? '#000' : 'transparent',
                color: active === c ? '#fff' : '#999',
                border: active === c ? 'none' : '1px solid #ddd',
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '2px solid #000' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ borderRight: (i + 1) % 3 !== 0 ? '2px solid #000' : 'none', borderBottom: '2px solid #000' }}>
            <div style={{ height: '100px', background: i % 2 === 0 ? '#000' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: i % 2 === 0 ? '#fff' : '#000', fontSize: '24px', fontWeight: 900 }}>{i + 1}</span>
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#000', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#999', fontSize: '11px', fontWeight: 400 }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', textAlign: 'center', borderTop: '2px solid #000' }}>
        <Link href="/split-screen" style={{ color: '#000', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
