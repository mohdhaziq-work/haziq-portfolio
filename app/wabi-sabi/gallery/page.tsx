'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Gallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Wabi Sabi Dashboard', cat: 'Web' },
    { title: 'Wabi Sabi Landing', cat: 'Web' },
    { title: 'Wabi Sabi Portfolio', cat: 'Web' },
    { title: 'Wabi Sabi UI Kit', cat: 'UI' },
    { title: 'Wabi Sabi App', cat: 'App' },
    { title: 'Wabi Sabi E-Commerce', cat: 'Web' },
    { title: 'Wabi Sabi Forms', cat: 'UI' },
    { title: 'Wabi Sabi Blog', cat: 'Web' },
    { title: 'Wabi Sabi Analytics', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ede8e0', borderRadius: '16px', border: '1px solid #8b735520', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#4a3f35', fontSize: '32px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: '#4a3f3566', fontSize: '14px', marginTop: '8px' }}>Our wabi sabi creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: active === c ? '#8b7355' : '#ede8e0', color: active === c ? '#fff' : '#4a3f3588', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#ede8e0', borderRadius: '12px', border: '1px solid #8b735515', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: '#8b735510', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#8b735525' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: '#4a3f35', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#4a3f3566', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/wabi-sabi" style={{ padding: '12px 28px', background: '#8b735515', color: '#8b7355', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
