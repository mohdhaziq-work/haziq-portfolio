'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #87ceeb20', padding: '32px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ color: '#87ceeb', fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>WATERCOLOR DESIGN</p>
          <h1 style={{ color: '#5a6c7d', fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.1 }}>Watercolor</h1>
          <p style={{ color: '#5a6c7d88', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>A complete watercolor design showcase with interactive elements and professional aesthetics.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px', marginBottom: '24px' }}>
        {[
          { title: 'Principle One', desc: 'Core design philosophy that drives every decision.' },
          { title: 'Principle Two', desc: 'Attention to detail for cohesive visual experience.' },
          { title: 'Principle Three', desc: 'User-first approach ensuring accessibility.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #87ceeb15', padding: '20px' }}>
            <div style={{ width: '32px', height: '32px', background: '#87ceeb15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#87ceeb', fontSize: '14px', fontWeight: 700 }}>{i + 1}</span>
            </div>
            <h3 style={{ color: '#5a6c7d', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#5a6c7d88', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '100%', label: 'Quality' },
          { value: '24/7', label: 'Support' },
          { value: '5.0', label: 'Rating' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #87ceeb15', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#87ceeb', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#5a6c7d66', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/watercolor/gallery" style={{ padding: '12px 28px', background: '#87ceeb', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>View Gallery</Link>
        <Link href="/watercolor/about" style={{ padding: '12px 28px', background: '#87ceeb15', color: '#87ceeb', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Learn More</Link>
      </div>
    </div>
  )
}
