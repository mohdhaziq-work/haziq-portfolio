'use client'

import Link from 'next/link'

export default function MonochromeAbout() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '28px 24px', marginBottom: '16px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>ABOUT MONOCHROME</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, marginBottom: '8px' }}>We strip away color to reveal the essence of design. Black and white forces focus on form, contrast, and composition.</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8 }}>Constraints breed creativity. One color, infinite expression.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { title: 'Mission', desc: 'Reveal beauty through monochrome constraint.' },
          { title: 'Vision', desc: 'A web that values form over color.' },
          { title: 'Values', desc: 'Contrast. Form. Restraint. Timelessness.' },
          { title: 'Process', desc: 'Design in grayscale, refine contrast, deliver.' },
        ].map((item, i) => (
          <div key={i} style={{ background: i % 2 === 0 ? '#000' : '#fff', padding: '16px', border: i % 2 !== 0 ? '1px solid #000' : 'none' }}>
            <h3 style={{ color: i % 2 === 0 ? '#fff' : '#000', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : '#666', fontSize: '11px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
          { value: '24/7', label: 'SUPPORT' },
        ].map((s, i) => (
          <div key={i} style={{ background: ['#000', '#333', '#666', '#999'][i], padding: '14px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/monochrome" style={{ padding: '10px 24px', color: '#000', fontSize: '12px', fontWeight: 500, textDecoration: 'none', border: '1px solid #000' }}>Back Home</Link>
      </div>
    </div>
  )
}
