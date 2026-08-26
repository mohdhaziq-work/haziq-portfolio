'use client'

import Link from 'next/link'

export default function FlatDesignAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#3498db', borderRadius: '16px', padding: '32px 28px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800, marginBottom: '14px' }}>About Flat Design</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>We believe in simplicity. No shadows, no gradients, no textures — just bold colors and clean shapes.</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8 }}>Flat design strips away the unnecessary to reveal what truly matters.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Mission', desc: 'Create clean, bold designs that communicate clearly.' },
          { title: 'Vision', desc: 'A web free from visual noise and unnecessary effects.' },
          { title: 'Values', desc: 'Simplicity. Boldness. Clarity. Function.' },
          { title: 'Process', desc: 'Strip away, simplify, color boldly, deliver.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ color: '#333', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#999', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'][i], borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '22px', fontWeight: 800 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/flat-design" style={{ padding: '12px 28px', color: '#555', fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '10px', border: '2px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
