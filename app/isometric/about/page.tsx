'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e74c3c20', padding: '32px 24px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#2d3436', fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>About Isometric</h1>
        <p style={{ color: '#2d343688', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>We specialize in isometric design — creating interfaces that are both beautiful and functional.</p>
        <p style={{ color: '#2d343688', fontSize: '15px', lineHeight: 1.8 }}>Every project receives our full attention and creative energy.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Create designs that inspire and convert.' },
          { title: 'Vision', desc: 'A web where every site is beautiful and usable.' },
          { title: 'Values', desc: 'Quality, creativity, and user-first thinking.' },
          { title: 'Process', desc: 'Research, design, test, iterate, deliver.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e74c3c15', padding: '20px' }}>
            <h3 style={{ color: '#2d3436', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#2d343688', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e74c3c15', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#e74c3c', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#2d343666', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/isometric" style={{ padding: '12px 28px', background: '#e74c3c15', color: '#e74c3c', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
