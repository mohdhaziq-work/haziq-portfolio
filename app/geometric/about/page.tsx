'use client'

import Link from 'next/link'

export default function GeometricAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '32px 28px', marginBottom: '24px' }}>
        <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 900, letterSpacing: '4px', marginBottom: '14px' }}>ABOUT</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>We build designs on geometric foundations. Every element is a shape, every layout is a grid.</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8 }}>Precision is our language, geometry is our alphabet.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Build design on geometric foundations.' },
          { title: 'Vision', desc: 'A web of perfect shapes and grids.' },
          { title: 'Values', desc: 'Precision. Structure. Balance. Form.' },
          { title: 'Process', desc: 'Grid first, shapes next, refine angles.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', padding: '18px' }}>
            <h3 style={{ color: '#000', fontSize: '16px', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: '#000', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '22px', fontWeight: 900 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/geometric" style={{ padding: '12px 28px', color: '#000', fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '3px solid #000', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
