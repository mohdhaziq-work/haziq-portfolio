'use client'

import Link from 'next/link'

export default function OrganicAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8dcc8', borderRadius: '30px', padding: '32px 28px', marginBottom: '20px' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '34px', fontWeight: 700, marginBottom: '14px' }}>About Organic</h1>
        <p style={{ color: '#8b7355', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>We draw inspiration from nature — the curves of leaves, the texture of bark, the flow of water.</p>
        <p style={{ color: '#8b7355', fontSize: '14px', lineHeight: 1.8 }}>Every design feels natural, warm, and grounded.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Mission', desc: 'Bring nature beauty to digital design.' },
          { title: 'Vision', desc: 'A web that feels natural and welcoming.' },
          { title: 'Values', desc: 'Nature. Warmth. Flow. Balance.' },
          { title: 'Process', desc: 'Observe nature, sketch forms, code organic.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#e8dcc8', borderRadius: '20px', padding: '18px' }}>
            <h3 style={{ color: '#5a4a35', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#8b7355', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: ['#6b8f3c', '#8b7355', '#5a8f9f', '#a0522d'][i], borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/organic" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '20px', border: '1px solid #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
