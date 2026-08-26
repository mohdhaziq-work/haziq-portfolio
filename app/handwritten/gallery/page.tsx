'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HandwrittenGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Notebook Landing', cat: 'Web' },
    { title: 'Letter Portfolio', cat: 'Web' },
    { title: 'Sketch App', cat: 'App' },
    { title: 'Diary Blog', cat: 'Web' },
    { title: 'Postcard Shop', cat: 'Web' },
    { title: 'Journal Admin', cat: 'App' },
    { title: 'Scribble Forms', cat: 'UI' },
    { title: 'Doodle Cards', cat: 'UI' },
    { title: 'Note Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f5f0e8', borderRadius: '20px', padding: '24px', marginBottom: '20px', border: '2px dashed #d4c5a9', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '40px', fontWeight: 700 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
            background: active === c ? '#5a4a35' : '#f5f0e8',
            color: active === c ? '#fff' : '#8b7355',
            border: active === c ? 'none' : '2px dashed #d4c5a9',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#f5f0e8', borderRadius: '16px', overflow: 'hidden', border: '2px dashed #d4c5a9' }}>
            <div style={{ height: '100px', background: '#e8dcc8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#5a4a35', fontSize: '32px', fontWeight: 700 }}>Aa</span>
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#5a4a35', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#8b7355', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/handwritten" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '18px', fontWeight: 500, textDecoration: 'none', borderRadius: '12px', border: '2px dashed #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
