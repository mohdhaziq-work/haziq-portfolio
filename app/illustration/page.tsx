'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function IllustrationHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTool, setActiveTool] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tools = [
    { name: 'Pencil', color: '#ff6b6b' },
    { name: 'Brush', color: '#4ecdc4' },
    { name: 'Pen', color: '#45b7d1' },
    { name: 'Marker', color: '#f7dc6f' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ff6b6b', borderRadius: '24px', padding: '36px 28px', marginBottom: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10px', left: '30px', width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }} />
        <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 700, marginBottom: '14px', position: 'relative' }}>Illustration</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>Hand-drawn, playful, and full of personality. Illustrations that tell stories.</p>
      </div>

      {/* Drawing Tools */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {tools.map((t, i) => (
          <button key={i} onClick={() => setActiveTool(i)} style={{
            padding: '10px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            background: activeTool === i ? t.color : '#fff',
            color: activeTool === i ? '#fff' : '#666',
            border: activeTool === i ? 'none' : '2px solid #eee',
          }}>{t.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Characters', desc: 'Unique characters that bring stories to life.' },
          { title: 'Scenes', desc: 'Rich environments that set the mood.' },
          { title: 'Icons', desc: 'Playful icons with personality.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '56px', height: '56px', margin: '0 auto 12px', background: tools[activeTool].color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
            </div>
            <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#999', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: tools[activeTool].color, borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '26px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/illustration/gallery" style={{ padding: '14px 28px', background: tools[activeTool].color, color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', borderRadius: '50px' }}>View Gallery</Link>
        <Link href="/illustration/about" style={{ padding: '14px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '50px', border: '2px solid #eee' }}>Learn More</Link>
      </div>
    </div>
  )
}
