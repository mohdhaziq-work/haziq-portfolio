'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BrutalismServices() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const services = [
    { title: 'BRUTAL WEBSITES', price: 'Rs 5,000', desc: 'Raw, fast, honest websites. No bloat, no fluff. Pure content.', features: ['Zero dependencies', 'Instant load', 'System fonts', 'Maximum impact'] },
    { title: 'BRUTAL UI KITS', price: 'Rs 3,000', desc: 'Component libraries with stark contrast and bold typography.', features: ['50+ components', 'No decorations', 'High contrast', 'Accessible'] },
    { title: 'BRUTAL BRANDING', price: 'Rs 2,500', desc: 'Brand identities that refuse to blend in. Bold logos, honest messaging.', features: ['Logo design', 'Brand voice', 'Style guide', 'Asset library'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0 #000', padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-2px' }}>SERVICES</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #000', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{s.price}</p>
            <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>{s.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              {s.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#ff3e3e' }} />
                  <span style={{ fontSize: '10px', color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/brutalism/contact" style={{
              display: 'block', textAlign: 'center', padding: '10px', background: '#000',
              color: '#fff', border: '3px solid #000', fontSize: '10px', fontWeight: 700, textDecoration: 'none',
            }}>GET STARTED</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/brutalism" style={{ padding: '12px 28px', background: '#fff', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0 #000', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
