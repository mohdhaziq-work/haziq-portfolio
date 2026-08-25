'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BrutalismGallery() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState('All')
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const works = [
    { title: 'Raw Portfolio', cat: 'Web', color: '#ff3e3e' },
    { title: 'Brut Blog', cat: 'Web', color: '#ffd93d' },
    { title: 'Honest E-Commerce', cat: 'Web', color: '#4ecdc4' },
    { title: 'Bold Landing', cat: 'Web', color: '#ff3e3e' },
    { title: 'Strip UI Kit', cat: 'UI', color: '#ffd93d' },
    { title: 'Raw Dashboard', cat: 'App', color: '#4ecdc4' },
    { title: 'Brut Forms', cat: 'UI', color: '#ff3e3e' },
    { title: 'Honest CMS', cat: 'App', color: '#ffd93d' },
    { title: 'Bold Newsletter', cat: 'Web', color: '#4ecdc4' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0 #000', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-2px' }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '8px 16px', fontSize: '10px', fontWeight: 700, cursor: 'pointer',
            background: active === c ? '#000' : '#fff',
            color: active === c ? '#fff' : '#000',
            border: '3px solid #000',
            boxShadow: active === c ? 'none' : '3px 3px 0 #000',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0 #000', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: w.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#000' }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ fontSize: '9px', color: '#999' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/brutalism" style={{ padding: '12px 28px', background: '#fff', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0 #000', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
