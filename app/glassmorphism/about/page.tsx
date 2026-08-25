'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GlassAbout() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const glass = { background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '20px' }

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ ...glass, padding: '40px 32px', marginBottom: '32px' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700, marginBottom: '20px' }}>About Glass Studio</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
          We specialize in glassmorphism — the art of creating depth through transparency and blur. Our designs float above colorful backgrounds, creating a sense of layers and dimension that feels modern and premium.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8 }}>
          Every element is carefully crafted with the right amount of blur, opacity, and border to achieve that perfect frosted glass look. We believe design should feel light, airy, and effortless.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'Mission', desc: 'Create interfaces that feel like looking through beautiful stained glass windows.' },
          { title: 'Vision', desc: 'A web where every surface has depth and every interaction feels tactile.' },
          { title: 'Values', desc: 'Transparency in design and business. Light, airy, honest aesthetics.' },
          { title: 'Process', desc: 'Start with color, add blur, adjust opacity, refine borders. Repeat until perfect.' },
        ].map((item, i) => (
          <div key={i} style={{ ...glass, padding: '24px' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '16px', label: 'Avg Blur' },
          { value: '20%', label: 'Avg Opacity' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ ...glass, padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '24px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/glassmorphism" style={{ padding: '14px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontSize: '14px', textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
