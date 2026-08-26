'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConceptualSketchGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Sketch Landing', cat: 'Web' },
    { title: 'Doodle Portfolio', cat: 'Web' },
    { title: 'Sketch App', cat: 'App' },
    { title: 'Rough Blog', cat: 'Web' },
    { title: 'Sketch Shop', cat: 'Web' },
    { title: 'Doodle Admin', cat: 'App' },
    { title: 'Sketch Forms', cat: 'UI' },
    { title: 'Rough Cards', cat: 'UI' },
    { title: 'Sketch Dashboard', cat: 'Web' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 400 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 400, cursor: 'pointer',
            background: active === c ? '#333' : '#fff',
            color: active === c ? '#fff' : '#666',
            border: active === c ? 'none' : '2px dashed #ccc',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', border: '2px dashed #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#ccc', fontSize: '28px', fontWeight: 400 }}>Aa</span>
            </div>
            <div style={{ padding: '14px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 400, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#bbb', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/conceptual-sketch" style={{ padding: '12px 28px', color: '#666', fontSize: '16px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px', border: '2px dashed #ccc' }}>Back Home</Link>
      </div>
    </div>
  )
}
