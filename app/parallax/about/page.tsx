'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(26,26,46,0.9)', borderRadius: '16px', border: '1px solid #667eea20', padding: '32px 24px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>About Parallax</h1>
        <p style={{ color: '#fff88', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>We specialize in parallax design — creating interfaces that are both beautiful and functional.</p>
        <p style={{ color: '#fff88', fontSize: '15px', lineHeight: 1.8 }}>Every project receives our full attention and creative energy.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Create designs that inspire and convert.' },
          { title: 'Vision', desc: 'A web where every site is beautiful and usable.' },
          { title: 'Values', desc: 'Quality, creativity, and user-first thinking.' },
          { title: 'Process', desc: 'Research, design, test, iterate, deliver.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(26,26,46,0.9)', borderRadius: '12px', border: '1px solid #667eea15', padding: '20px' }}>
            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#fff88', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: 'rgba(26,26,46,0.9)', borderRadius: '12px', border: '1px solid #667eea15', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#667eea', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#fff66', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/parallax" style={{ padding: '12px 28px', background: '#667eea15', color: '#667eea', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
