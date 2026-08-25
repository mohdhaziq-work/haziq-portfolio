'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GlassGallery() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState('All')
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const glass = { background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '20px' }

  const works = [
    { title: 'Frosted Dashboard', cat: 'Web' },
    { title: 'Glass Music Player', cat: 'App' },
    { title: 'Transparent Portfolio', cat: 'Web' },
    { title: 'Blur Navigation', cat: 'UI' },
    { title: 'Glass Cards Kit', cat: 'UI' },
    { title: 'Crystal Landing Page', cat: 'Web' },
    { title: 'Frost Calculator', cat: 'App' },
    { title: 'Glass E-Commerce', cat: 'Web' },
    { title: 'Transparent Chat UI', cat: 'App' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ ...glass, padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>Our frosted creations</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
            background: active === c ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
            color: '#fff', transition: 'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ ...glass, overflow: 'hidden' }}>
            <div style={{ height: '120px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }} />
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/glassmorphism" style={{ padding: '14px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontSize: '14px', textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
