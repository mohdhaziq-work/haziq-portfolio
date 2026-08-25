'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GlassServices() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const glass = { background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '20px' }

  const services = [
    { title: 'Glass Websites', price: 'Rs 5,000', desc: 'Full glassmorphism websites with frosted panels, blur effects, and floating layouts.', features: ['Custom glass effects', 'Responsive design', 'Smooth animations', 'SEO optimized'] },
    { title: 'Glass UI Kits', price: 'Rs 3,000', desc: 'Reusable component libraries with glass cards, buttons, modals, and navigation.', features: ['50+ components', 'Figma included', 'Dark & light mode', 'Documentation'] },
    { title: 'Glass Branding', price: 'Rs 2,500', desc: 'Brand identities built around transparency and frosted aesthetics.', features: ['Logo design', 'Color system', 'Brand guidelines', 'Asset library'] },
  ]

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ ...glass, padding: '32px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Services</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>What we offer</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {services.map((s, i) => (
          <div key={i} style={{ ...glass, padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>{s.price}</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ecdc4' }} />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/glassmorphism/contact" style={{
              display: 'block', textAlign: 'center', padding: '12px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
              fontSize: '13px', fontWeight: 600, textDecoration: 'none',
            }}>Get Started</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/glassmorphism" style={{ padding: '14px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '14px', textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
