'use client'

import Link from 'next/link'

export default function AbstractAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '32px', padding: '36px 28px', marginBottom: '24px' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>About Abstract</h1>
        <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>We break the rules of traditional design. Organic shapes, unexpected compositions, and bold color palettes.</p>
        <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8 }}>Abstract design is about feeling, not form.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Break design conventions with abstract beauty.' },
          { title: 'Vision', desc: 'A web that surprises and delights.' },
          { title: 'Values', desc: 'Abstract. Bold. Organic. Unexpected.' },
          { title: 'Process', desc: 'Experiment, iterate, break rules, create.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: `linear-gradient(135deg, ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f'][i]}20, ${['#4ecdc4', '#45b7d1', '#f7dc6f', '#ff6b6b'][i]}20)`, borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#333', fontSize: '24px', fontWeight: 800 }}>{s.value}</p>
            <p style={{ color: '#999', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/abstract" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '16px', border: '1px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
