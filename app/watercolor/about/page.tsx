'use client'

import Link from 'next/link'

export default function WatercolorAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,182,193,0.2), rgba(254,252,250,0.5))', borderRadius: '30px', padding: '36px 28px', marginBottom: '24px' }}>
        <h1 style={{ color: '#8b6f5e', fontSize: '44px', fontWeight: 600, fontStyle: 'italic', marginBottom: '16px' }}>About Watercolor</h1>
        <p style={{ color: '#b8a090', fontSize: '15px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '12px' }}>We paint digital experiences with soft washes of color. Every design feels like a hand-painted masterpiece.</p>
        <p style={{ color: '#b8a090', fontSize: '15px', lineHeight: 1.8, fontStyle: 'italic' }}>Water bleeds, colors blend, and beauty emerges from the flow.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Paint digital with watercolor soul.' },
          { title: 'Vision', desc: 'A web that feels hand-painted.' },
          { title: 'Values', desc: 'Softness. Flow. Color. Beauty.' },
          { title: 'Process', desc: 'Wash, bleed, blend, refine.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.1), rgba(254,252,250,0.8))', borderRadius: '20px', padding: '20px' }}>
            <h3 style={{ color: '#8b6f5e', fontSize: '18px', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#b8a090', fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ background: `radial-gradient(circle, ${['rgba(255,182,193,0.2)', 'rgba(173,216,230,0.2)', 'rgba(200,180,255,0.2)', 'rgba(180,210,180,0.2)'][i]}, rgba(254,252,250,0.9))`, borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#8b6f5e', fontSize: '26px', fontWeight: 600, fontStyle: 'italic' }}>{s.value}</p>
            <p style={{ color: '#b8a090', fontSize: '10px', marginTop: '4px', fontStyle: 'italic' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/watercolor" style={{ padding: '12px 28px', color: '#b8a090', fontSize: '15px', fontWeight: 400, fontStyle: 'italic', textDecoration: 'none', borderRadius: '20px', border: '1px solid rgba(200,180,160,0.3)' }}>Back Home</Link>
      </div>
    </div>
  )
}
