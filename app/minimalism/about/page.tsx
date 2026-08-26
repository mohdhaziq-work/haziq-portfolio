'use client'

import Link from 'next/link'

export default function MinimalismAbout() {
  return (
    <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ color: '#111', fontSize: '36px', fontWeight: 300, marginBottom: '20px' }}>About</h1>
        <p style={{ color: '#999', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>We believe in the power of reduction. Every element we include must earn its place. If it does not serve a purpose, it does not belong.</p>
        <p style={{ color: '#999', fontSize: '15px', lineHeight: 1.8 }}>Minimalism is not about having less. It is about making room for more of what matters.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '48px' }}>
        {[
          { title: 'Mission', desc: 'Create designs that breathe. Let content be the hero.' },
          { title: 'Vision', desc: 'A web free from clutter, where every pixel has purpose.' },
          { title: 'Values', desc: 'Simplicity. Clarity. Restraint. Timelessness.' },
          { title: 'Process', desc: 'Add everything, then remove until only the essential remains.' },
        ].map((item, i) => (
          <div key={i} style={{ paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
            <h3 style={{ color: '#111', fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#bbb', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '48px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ color: '#111', fontSize: '28px', fontWeight: 300 }}>{s.value}</p>
            <p style={{ color: '#ddd', fontSize: '10px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/minimalism" style={{ color: '#bbb', fontSize: '12px', letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
