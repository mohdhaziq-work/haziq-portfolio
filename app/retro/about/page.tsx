'use client'

import Link from 'next/link'

export default function RetroAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', border: '3px solid #8b7355', padding: '32px 24px', marginBottom: '24px' }}>
        <h1 style={{ color: '#3a2f25', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>About Retro Studio</h1>
        <p style={{ color: '#6a5f55', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>We bring back the charm of vintage design to the modern web. Our work is inspired by the golden age of print, film, and classic advertising.</p>
        <p style={{ color: '#6a5f55', fontSize: '14px', lineHeight: 1.8 }}>Every design tells a story. Warm palettes, serif typography, and nostalgic textures create experiences that feel familiar yet fresh.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Bring vintage charm to modern digital experiences.' },
          { title: 'Vision', desc: 'A web that feels warm, personal, and timeless.' },
          { title: 'Values', desc: 'Nostalgia. Warmth. Craftsmanship. Storytelling.' },
          { title: 'Process', desc: 'Research the era, sketch the vibe, code the feeling.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#d4c4a8', border: '2px solid #c4a882', padding: '18px' }}>
            <h3 style={{ color: '#3a2f25', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#6a5f55', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
          { value: '24/7', label: 'SUPPORT' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#8b7355', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#f4e8d1', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#c4a882', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/retro" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '13px', textDecoration: 'none', border: '2px solid #c4a882' }}>Back Home</Link>
      </div>
    </div>
  )
}
