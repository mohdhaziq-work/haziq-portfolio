'use client'

import Link from 'next/link'

export default function CinematicAbout() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '6px', marginBottom: '16px' }}>ABOUT</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 400, letterSpacing: '8px', marginBottom: '20px' }}>Our Story</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, lineHeight: 1.8, maxWidth: '500px', margin: '0 auto', marginBottom: '12px' }}>We approach design like filmmaking. Every frame matters, every transition tells a story.</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}>Light, shadow, and composition create mood and emotion.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '60px' }}>
        {[
          { title: 'Mission', desc: 'Tell stories through design.' },
          { title: 'Vision', desc: 'A web that feels like cinema.' },
          { title: 'Values', desc: 'Drama. Story. Mood. Composition.' },
          { title: 'Process', desc: 'Script, storyboard, design, animate.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 400, letterSpacing: '4px', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: '"Barlow", sans-serif', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '60px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '28px', fontWeight: 400, letterSpacing: '4px' }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '4px', marginTop: '8px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cinematic" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 300, textDecoration: 'none', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif' }}>Back Home</Link>
      </div>
    </div>
  )
}
