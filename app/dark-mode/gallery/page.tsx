'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DarkModeGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Terminal Dashboard', cat: 'Web' },
    { title: 'Dark E-Commerce', cat: 'Web' },
    { title: 'Code Editor UI', cat: 'App' },
    { title: 'Dark Analytics', cat: 'Web' },
    { title: 'Night Reader', cat: 'App' },
    { title: 'Dark Portfolio', cat: 'Web' },
    { title: 'Terminal Chat', cat: 'App' },
    { title: 'Dark Admin', cat: 'Web' },
    { title: 'Code Theme', cat: 'UI' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
        <h1 style={{ color: '#e0e0e0', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '16px', background: '#111', borderRadius: '8px', padding: '4px', border: '1px solid #222', maxWidth: '400px', margin: '0 auto 16px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            flex: 1, padding: '8px', borderRadius: '6px', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
            background: active === c ? '#1a1a1a' : 'transparent',
            color: active === c ? '#e0e0e0' : '#555',
            border: active === c ? '1px solid #333' : '1px solid transparent',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ height: '80px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#333', fontSize: '24px', fontFamily: '"JetBrains Mono", monospace' }}>{'{ }'}</span>
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#e0e0e0', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#444', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/dark-mode" style={{ padding: '12px 24px', color: '#666', fontSize: '12px', textDecoration: 'none', borderRadius: '6px', border: '1px solid #333' }}>Back Home</Link>
      </div>
    </div>
  )
}
