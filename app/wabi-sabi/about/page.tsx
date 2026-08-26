'use client'

import Link from 'next/link'

export default function WabiSabiAbout() {
  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: '#b8a090', fontSize: '12px', letterSpacing: '4px', marginBottom: '16px' }}>About</p>
        <h1 style={{ color: '#8b7355', fontSize: '48px', fontWeight: 300, marginBottom: '20px' }}>侘寂</h1>
        <p style={{ color: '#b8a090', fontSize: '15px', lineHeight: 1.8, fontWeight: 300, marginBottom: '12px' }}>Wabi-sabi is a Japanese aesthetic philosophy that finds beauty in imperfection, impermanence, and incompleteness.</p>
        <p style={{ color: '#b8a090', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>We bring this philosophy to digital design — embracing asymmetry, roughness, and simplicity.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' }}>
        {[
          { title: 'Mission', desc: 'Find beauty in digital imperfection.' },
          { title: 'Vision', desc: 'A web that embraces the imperfect.' },
          { title: 'Values', desc: 'Imperfection. Transience. Simplicity.' },
          { title: 'Process', desc: 'Embrace flaws, simplify, accept change.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '20px', borderBottom: '1px solid rgba(180,160,140,0.2)' }}>
            <h3 style={{ color: '#8b7355', fontSize: '16px', fontWeight: 400, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#b8a090', fontSize: '13px', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
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
            <p style={{ color: '#8b7355', fontSize: '28px', fontWeight: 300 }}>{s.value}</p>
            <p style={{ color: '#b8a090', fontSize: '10px', letterSpacing: '3px', marginTop: '8px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/wabi-sabi" style={{ color: '#b8a090', fontSize: '14px', fontWeight: 300, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
