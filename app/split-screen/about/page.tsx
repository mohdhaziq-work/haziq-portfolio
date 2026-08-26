'use client'

import Link from 'next/link'

export default function SplitScreenAbout() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 52px)' }}>
        <div style={{ background: '#000', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-2px', marginBottom: '20px' }}>About<br />Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 400, lineHeight: 1.8 }}>We believe in the power of duality. Every design has two sides — the bold and the subtle, the dark and the light.</p>
        </div>
        <div style={{ background: '#fff', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '2px solid #000' }}>
          <div style={{ marginBottom: '24px' }}>
            {[
              { title: 'Mission', desc: 'Create balanced, dual-natured designs.' },
              { title: 'Vision', desc: 'A web of perfect contrast and harmony.' },
              { title: 'Values', desc: 'Duality. Balance. Contrast. Clarity.' },
              { title: 'Process', desc: 'Split, balance, contrast, deliver.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
                <h3 style={{ color: '#000', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ color: '#999', fontSize: '13px', fontWeight: 400 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { value: '100+', label: 'Projects' },
              { value: '5+', label: 'Years' },
              { value: '50+', label: 'Clients' },
              { value: '24/7', label: 'Support' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '12px', background: i % 2 === 0 ? '#000' : '#fff', textAlign: 'center' }}>
                <p style={{ color: i % 2 === 0 ? '#fff' : '#000', fontSize: '20px', fontWeight: 900 }}>{s.value}</p>
                <p style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : '#999', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', textAlign: 'center', borderTop: '2px solid #000' }}>
        <Link href="/split-screen" style={{ color: '#000', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
