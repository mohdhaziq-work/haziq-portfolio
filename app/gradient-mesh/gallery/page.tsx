'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GradientMeshGallery() {
  const [active, setActive] = useState('All')

  const works = [
    { title: 'Ocean Waves', cat: 'Web', grad: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    { title: 'Sunset Glow', cat: 'Web', grad: 'linear-gradient(135deg, #f59e0b, #ec4899)' },
    { title: 'Forest Mist', cat: 'App', grad: 'linear-gradient(135deg, #10b981, #06b6d4)' },
    { title: 'Aurora Night', cat: 'Web', grad: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    { title: 'Lava Flow', cat: 'App', grad: 'linear-gradient(135deg, #ef4444, #f59e0b)' },
    { title: 'Crystal Blue', cat: 'UI', grad: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
    { title: 'Spring Bloom', cat: 'UI', grad: 'linear-gradient(135deg, #ec4899, #f59e0b)' },
    { title: 'Deep Space', cat: 'App', grad: 'linear-gradient(135deg, #1e1b4b, #8b5cf6)' },
    { title: 'Tropical', cat: 'Web', grad: 'linear-gradient(135deg, #10b981, #f59e0b)' },
  ]

  const cats = ['All', 'Web', 'App', 'UI']
  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))', borderRadius: '24px', border: '1px solid rgba(139,92,246,0.2)', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Gallery</h1>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding: '10px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
            background: active === c ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(255,255,255,0.05)',
            color: active === c ? '#fff' : 'rgba(255,255,255,0.5)',
            border: active === c ? 'none' : '1px solid rgba(255,255,255,0.1)',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {filtered.map((w, i) => (
          <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100px', background: w.grad }} />
            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>{w.cat}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/gradient-mesh" style={{ padding: '12px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
