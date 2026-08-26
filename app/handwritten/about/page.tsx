'use client'

import Link from 'next/link'

export default function HandwrittenAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f5f0e8', borderRadius: '20px', padding: '32px 28px', marginBottom: '20px', border: '2px dashed #d4c5a9' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '40px', fontWeight: 700, marginBottom: '14px' }}>About Us</h1>
        <p style={{ color: '#8b7355', fontSize: '18px', lineHeight: 1.8, marginBottom: '10px' }}>We create designs that feel like they were drawn by hand. Every line has personality, every letter has soul.</p>
        <p style={{ color: '#8b7355', fontSize: '18px', lineHeight: 1.8 }}>Imperfection is our perfection.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Mission', desc: 'Bring warmth and personality through handwriting.' },
          { title: 'Vision', desc: 'A web that feels personal and human.' },
          { title: 'Values', desc: 'Warmth. Personality. Imperfection. Soul.' },
          { title: 'Process', desc: 'Sketch by hand, digitize, animate, deliver.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#f5f0e8', borderRadius: '16px', padding: '18px', border: '2px dashed #d4c5a9' }}>
            <h3 style={{ color: '#5a4a35', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#8b7355', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: ['#5a4a35', '#2563eb', '#dc2626', '#16a34a'][i], borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '24px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/handwritten" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '18px', fontWeight: 500, textDecoration: 'none', borderRadius: '12px', border: '2px dashed #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
