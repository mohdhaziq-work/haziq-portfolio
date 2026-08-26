'use client'

import Link from 'next/link'

export default function MaterialDesignAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#6200ee', padding: '32px 28px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 400, marginBottom: '14px' }}>About Material Design</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>Material Design is a design language developed by Google. It uses grid-based layouts, responsive animations, and depth effects.</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8 }}>We bring these principles to every project we build.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Mission', desc: 'Build interfaces grounded in material reality.' },
          { title: 'Vision', desc: 'Consistent, intuitive design across all platforms.' },
          { title: 'Values', desc: 'Material. Bold. Graphic. Intentional.' },
          { title: 'Process', desc: 'Grid first, then elevation, then motion.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '18px' }}>
            <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 500, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#6200ee', fontSize: '24px', fontWeight: 500 }}>{s.value}</p>
            <p style={{ color: '#666', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/material-design" style={{ padding: '12px 32px', color: '#6200ee', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px', border: '1px solid #6200ee', textTransform: 'uppercase', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
