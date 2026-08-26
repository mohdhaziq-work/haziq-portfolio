'use client'

import Link from 'next/link'

export default function TypographyAbout() {
  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: '#999', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>About</p>
        <h1 style={{ color: '#111', fontSize: '48px', fontWeight: 400, fontStyle: 'italic', lineHeight: 1, marginBottom: '20px' }}>Letters<br />are our<br />medium.</h1>
        <p style={{ color: '#666', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, lineHeight: 1.8, marginBottom: '12px' }}>We believe typography is the most powerful design tool. A single letter can evoke emotion, convey meaning, and create beauty.</p>
        <p style={{ color: '#666', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, lineHeight: 1.8 }}>Every project starts with type. We choose fonts that speak, sizes that breathe, and spacing that flows.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {[
          { title: 'Mission', desc: 'Let typography do the talking.' },
          { title: 'Vision', desc: 'A web where type is the hero.' },
          { title: 'Values', desc: 'Hierarchy. Rhythm. Contrast. Restraint.' },
          { title: 'Process', desc: 'Choose type, set scale, refine spacing.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <h3 style={{ color: '#111', fontSize: '18px', fontWeight: 400, fontStyle: 'italic', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#999', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ color: '#111', fontSize: '28px', fontWeight: 400, fontStyle: 'italic' }}>{s.value}</p>
            <p style={{ color: '#ccc', fontSize: '10px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/typography" style={{ color: '#111', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, textDecoration: 'none', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Back Home</Link>
      </div>
    </div>
  )
}
