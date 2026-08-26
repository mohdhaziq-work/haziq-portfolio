'use client'

import Link from 'next/link'

export default function AuroraAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,201,255,0.15), rgba(146,254,157,0.15))', borderRadius: '24px', border: '1px solid rgba(0,201,255,0.2)', padding: '36px 28px', marginBottom: '24px' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>About Aurora</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>We draw inspiration from the northern lights — the most beautiful natural phenomenon on Earth.</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8 }}>Our designs flow, glow, and shimmer like the aurora borealis.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Create ethereal digital experiences that captivate.' },
          { title: 'Vision', desc: 'A web that glows with natural beauty.' },
          { title: 'Values', desc: 'Flow. Glow. Harmony. Wonder.' },
          { title: 'Process', desc: 'Study nature, capture light, code the aurora.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px' }}>
            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: 'linear-gradient(135deg, rgba(0,201,255,0.2), rgba(146,254,157,0.15))', borderRadius: '16px', border: '1px solid rgba(0,201,255,0.2)', padding: '18px', textAlign: 'center' }}>
            <p style={{ background: 'linear-gradient(135deg, #00c9ff, #92fe9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '24px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/aurora" style={{ padding: '12px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
