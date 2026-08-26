'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Handwritten Dashboard', cat: 'Web' },
    { title: 'Handwritten Landing', cat: 'Web' },
    { title: 'Handwritten Portfolio', cat: 'Web' },
    { title: 'Handwritten UI Kit', cat: 'UI' },
    { title: 'Handwritten App', cat: 'App' },
    { title: 'Handwritten E-Commerce', cat: 'Web' },
    { title: 'Handwritten Forms', cat: 'UI' },
    { title: 'Handwritten Blog', cat: 'Web' },
    { title: 'Handwritten Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #5d403720', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#3e2723', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#3e272366', fontSize: '14px', marginTop: '8px' }}>Our handwritten creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#5d4037' : '#fff', color: active === c ? '#fff' : '#3e272388', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #5d403715', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#5d403710', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#5d403725' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#3e2723', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#3e272366', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/handwritten" style={{ padding: '12px 28px', background: '#5d403715', color: '#5d4037', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
