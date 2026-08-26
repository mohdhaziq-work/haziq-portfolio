'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TypographyGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Editorial Layout', cat: 'Print' },
    { title: 'Type Poster', cat: 'Print' },
    { title: 'Serif Landing', cat: 'Web' },
    { title: 'Letterpress Blog', cat: 'Web' },
    { title: 'Type Specimen', cat: 'Print' },
    { title: 'Typographic Portfolio', cat: 'Web' },
    { title: 'Font Showcase', cat: 'Web' },
    { title: 'Type Hierarchy', cat: 'UI' },
    { title: 'Reading App', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'Print', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#999', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Gallery</p>
        <h1 style={{ color: '#111', fontSize: '48px', fontWeight: 400, fontStyle: 'italic' }}>Selected<br />Works.</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
            color: active === c ? '#111' : '#ccc', fontFamily: '"DM Sans", sans-serif',
            fontWeight: active === c ? 500 : 300, borderBottom: active === c ? '1px solid #111' : '1px solid transparent',
            paddingBottom: '4px',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {filtered.map((w, i) => (
          <div key={i}>
            <div style={{ height: '120px', background: '#f5f5f5', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#ddd', fontSize: '36px', fontStyle: 'italic' }}>Aa</span>
            </div>
            <h3 style={{ color: '#111', fontSize: '15px', fontWeight: 400, fontStyle: 'italic', marginBottom: '4px' }}>{w.title}</h3>
            <p style={{ color: '#ccc', fontSize: '11px', fontFamily: '"DM Sans", sans-serif' }}>{w.cat}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/typography" style={{ color: '#111', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, textDecoration: 'none', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Back Home</Link>
      </div>
    </div>
  )
}
