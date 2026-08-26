'use client'

import Link from 'next/link'

export default function FuturisticAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)', padding: '32px 28px', marginBottom: '24px' }}>
        <p style={{ color: 'rgba(0,240,255,0.5)', fontSize: '10px', letterSpacing: '4px', marginBottom: '12px' }}>SYSTEM INFO</p>
        <h1 style={{ color: '#00f0ff', fontSize: '36px', fontWeight: 900, letterSpacing: '4px', marginBottom: '14px' }}>ABOUT</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>We design interfaces from the future. Sci-fi aesthetics, neon accents, and angular compositions.</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.8 }}>Every pixel is calculated, every angle is intentional.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Design interfaces from the future.' },
          { title: 'Vision', desc: 'A web that looks like sci-fi movies.' },
          { title: 'Values', desc: 'Precision. Neon. Angular. Futuristic.' },
          { title: 'Process', desc: 'Sketch sci-fi, code transforms, add glow.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)' }}>
            <h3 style={{ color: '#00f0ff', fontSize: '13px', fontWeight: 700, marginBottom: '6px', letterSpacing: '1px' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
          { value: '24/7', label: 'SUPPORT' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', padding: '14px', textAlign: 'center', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <p style={{ color: '#00f0ff', fontSize: '20px', fontWeight: 900 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/futuristic" style={{ padding: '12px 28px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '2px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>Back Home</Link>
      </div>
    </div>
  )
}
