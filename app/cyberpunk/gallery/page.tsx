'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CyberpunkGallery() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState('All')
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  const neon = '#ff00ff'

  const works = [
    { title: 'Neon Dashboard', cat: 'Web', color: '#ff00ff' },
    { title: 'Cyber Landing', cat: 'Web', color: '#00ffff' },
    { title: 'Glitch Portfolio', cat: 'Web', color: '#ff3e3e' },
    { title: 'HUD Interface', cat: 'UI', color: '#ffd93d' },
    { title: 'Matrix Chat', cat: 'App', color: '#00ff88' },
    { title: 'Neon E-Commerce', cat: 'Web', color: '#ff00ff' },
    { title: 'Cyber Forms', cat: 'UI', color: '#00ffff' },
    { title: 'Glitch Music', cat: 'App', color: '#ff3e3e' },
    { title: 'Neon Analytics', cat: 'Web', color: '#ffd93d' },
  ]

  const cats = ['All', 'Web', 'UI', 'App']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: neon, fontSize: '32px', fontWeight: 900, letterSpacing: '4px', textShadow: `0 0 20px ${neon}60` }}>GALLERY</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{ padding: '8px 16px', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', cursor: 'pointer', background: active === c ? `${neon}20` : 'transparent', color: active === c ? neon : '#4a6a7a', border: `1px solid ${active === c ? neon + '60' : '#222'}` }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ background: '#0a0a0a', border: `1px solid ${w.color}30`, overflow: 'hidden' }}>
            <div style={{ height: '100px', background: `${w.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', border: `2px solid ${w.color}60` }} />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ color: w.color, fontSize: '10px', fontWeight: 700, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: '#4a6a7a', fontSize: '8px', letterSpacing: '1px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cyberpunk" style={{ padding: '12px 28px', background: `${neon}15`, color: neon, border: `1px solid ${neon}40`, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
