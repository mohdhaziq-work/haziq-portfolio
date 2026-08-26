'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', borderRadius: '16px', border: '1px solid #8b735520', padding: '32px 24px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#3a2f25', fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>About Retro Vintage</h1>
        <p style={{ color: '#3a2f2588', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>We specialize in retro vintage design — creating interfaces that are both beautiful and functional.</p>
        <p style={{ color: '#3a2f2588', fontSize: '15px', lineHeight: 1.8 }}>Every project receives our full attention and creative energy.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Create designs that inspire and convert.' },
          { title: 'Vision', desc: 'A web where every site is beautiful and usable.' },
          { title: 'Values', desc: 'Quality, creativity, and user-first thinking.' },
          { title: 'Process', desc: 'Research, design, test, iterate, deliver.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#e8d5b8', borderRadius: '12px', border: '1px solid #8b735515', padding: '20px' }}>
            <h3 style={{ color: '#3a2f25', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#3a2f2588', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: '#e8d5b8', borderRadius: '12px', border: '1px solid #8b735515', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#8b7355', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#3a2f2566', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/retro" style={{ padding: '12px 28px', background: '#8b735515', color: '#8b7355', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
