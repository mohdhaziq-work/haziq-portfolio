'use client'

import Link from 'next/link'

export default function ParallaxAbout() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px' }}>ABOUT</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 200, marginBottom: '20px' }}>Depth in design</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 300, lineHeight: 1.8, maxWidth: '500px', margin: '0 auto', marginBottom: '12px' }}>We create immersive digital experiences using parallax scrolling and layered design.</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 300, lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}>Every layer tells part of the story. Together, they create depth.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '60px' }}>
        {[
          { title: 'Mission', desc: 'Create depth on flat screens.' },
          { title: 'Vision', desc: 'A web that feels three-dimensional.' },
          { title: 'Values', desc: 'Depth. Motion. Immersion. Elegance.' },
          { title: 'Process', desc: 'Layer, offset, animate, refine.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</p>
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
            <p style={{ color: '#fff', fontSize: '28px', fontWeight: 200 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '3px', marginTop: '8px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/parallax" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 300, textDecoration: 'none', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
