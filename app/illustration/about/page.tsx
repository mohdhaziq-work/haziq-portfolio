'use client'

import Link from 'next/link'

export default function IllustrationAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ff6b6b', borderRadius: '24px', padding: '32px 28px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 700, marginBottom: '14px' }}>About Illustration</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>We create hand-drawn illustrations that bring warmth and personality to digital experiences.</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8 }}>Every stroke is intentional, every character has a story.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Mission', desc: 'Bring warmth and personality through illustration.' },
          { title: 'Vision', desc: 'A web full of hand-drawn charm and character.' },
          { title: 'Values', desc: 'Playful. Warm. Expressive. Unique.' },
          { title: 'Process', desc: 'Sketch, refine, digitize, animate.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h3>
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
          <div key={i} style={{ background: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f'][i], borderRadius: '20px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/illustration" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '50px', border: '2px solid #eee' }}>Back Home</Link>
      </div>
    </div>
  )
}
