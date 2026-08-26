'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IllustrationGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Happy Characters', cat: 'Characters', color: '#ff6b6b' },
    { title: 'City Scene', cat: 'Scenes', color: '#4ecdc4' },
    { title: 'Icon Set', cat: 'Icons', color: '#45b7d1' },
    { title: 'Animal Friends', cat: 'Characters', color: '#f7dc6f' },
    { title: 'Nature Scene', cat: 'Scenes', color: '#ff6b6b' },
    { title: 'UI Icons', cat: 'Icons', color: '#4ecdc4' },
    { title: 'Story Book', cat: 'Characters', color: '#45b7d1' },
    { title: 'Space Scene', cat: 'Scenes', color: '#f7dc6f' },
    { title: 'Emoji Set', cat: 'Icons', color: '#ff6b6b' },
  ]

  const cats = ['All', 'Characters', 'Scenes', 'Icons']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ff6b6b', borderRadius: '24px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 700 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            background: active === c ? '#ff6b6b' : '#fff',
            color: active === c ? '#fff' : '#666',
            border: active === c ? 'none' : '2px solid #eee',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ height: '100px', background: w.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#333', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#bbb', fontSize: '11px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/illustration" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '50px', border: '2px solid #eee' }}>Back Home</Link>
      </div>
    </div>
  )
}
