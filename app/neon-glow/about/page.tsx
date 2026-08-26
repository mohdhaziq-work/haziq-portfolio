'use client'

import Link from 'next/link'

export default function NeonGlowAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(255,0,255,0.05)', border: '2px solid #ff00ff', padding: '32px 28px', marginBottom: '24px', boxShadow: '0 0 30px rgba(255,0,255,0.3)' }}>
        <p style={{ color: '#ff00ff', fontSize: '8px', marginBottom: '12px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>ABOUT://US</p>
        <h1 style={{ color: '#ff00ff', fontSize: '28px', fontWeight: 400, marginBottom: '14px', textShadow: '0 0 20px rgba(255,0,255,0.5)' }}>NEON STUDIO</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', lineHeight: 1.8, marginBottom: '10px' }}>We create designs that glow in the dark. Neon aesthetics, retro-futuristic vibes, electric energy.</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', lineHeight: 1.8 }}>Every pixel pulses with light.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Make the web glow with neon energy.' },
          { title: 'Vision', desc: 'A web that lights up the night.' },
          { title: 'Values', desc: 'Glow. Pulse. Electric. Retro.' },
          { title: 'Process', desc: 'Dark bg, neon text, add glow, animate.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,255,0.3)', padding: '16px', boxShadow: '0 0 10px rgba(255,0,255,0.1)' }}>
            <h3 style={{ color: '#ff00ff', fontSize: '10px', fontWeight: 400, marginBottom: '6px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', lineHeight: 1.6 }}>{item.desc}</p>
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
          <div key={i} style={{ background: 'rgba(255,0,255,0.05)', border: '1px solid rgba(255,0,255,0.3)', padding: '14px', textAlign: 'center', boxShadow: '0 0 10px rgba(255,0,255,0.1)' }}>
            <p style={{ color: '#ff00ff', fontSize: '18px', fontWeight: 400, textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '7px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/neon-glow" style={{ padding: '10px 24px', color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 400, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
