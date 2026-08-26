'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MinimalismHome() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p style={{ color: '#ccc', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>Minimalism</p>
        <h1 style={{ color: '#111', fontSize: '48px', fontWeight: 300, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1px' }}>Less is<br /><span style={{ fontWeight: 600 }}>More</span></h1>
        <p style={{ color: '#999', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Strip away the unnecessary. Every element earns its place. White space is not empty — it is intentional.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '48px' }}>
        {['Space', 'Type', 'Color'].map((item, i) => (
          <button key={i} onClick={() => setActiveSection(i)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px',
            color: activeSection === i ? '#111' : '#ddd', fontWeight: activeSection === i ? 500 : 300,
            borderBottom: activeSection === i ? '1px solid #111' : '1px solid transparent',
            paddingBottom: '4px', transition: 'all 0.2s',
          }}>{item}</button>
        ))}
      </div>

      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        {activeSection === 0 && (
          <div>
            <div style={{ width: '120px', height: '120px', margin: '0 auto 24px', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#111' }} />
            </div>
            <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.7 }}>White space creates breathing room. It guides the eye and lets content speak.</p>
          </div>
        )}
        {activeSection === 1 && (
          <div>
            <p style={{ color: '#111', fontSize: '72px', fontWeight: 300, letterSpacing: '-3px', marginBottom: '8px' }}>Aa</p>
            <p style={{ color: '#ddd', fontSize: '10px', letterSpacing: '3px', marginBottom: '16px' }}>INTER / LIGHT 300</p>
            <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.7 }}>One typeface, two weights. Let the letters do the work.</p>
          </div>
        )}
        {activeSection === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {['#111', '#444', '#888', '#bbb', '#eee'].map((c, i) => (
                <div key={i} style={{ width: '48px', height: '48px', background: c }} />
              ))}
            </div>
            <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.7 }}>Monochromatic palette. Black, white, and grays. Color used sparingly.</p>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', marginBottom: '48px' }}>
        {[
          { value: '1', label: 'Font' },
          { value: '3', label: 'Colors' },
          { value: '0', label: 'Shadows' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ color: '#111', fontSize: '36px', fontWeight: 300 }}>{s.value}</p>
            <p style={{ color: '#ddd', fontSize: '10px', letterSpacing: '3px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '48px' }}>
        {[
          { num: '01', title: 'Intentional', desc: 'Every element has a reason to exist.' },
          { num: '02', title: 'Restrained', desc: 'Restraint is strength.' },
          { num: '03', title: 'Timeless', desc: 'Minimal design does not age.' },
        ].map((f, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ color: '#ddd', fontSize: '10px', letterSpacing: '3px', marginBottom: '8px' }}>{f.num}</p>
            <h3 style={{ color: '#111', fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ color: '#bbb', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/minimalism/gallery" style={{ padding: '12px 32px', background: '#111', color: '#fff', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>Explore</Link>
        <Link href="/minimalism/about" style={{ padding: '12px 32px', color: '#999', fontSize: '13px', fontWeight: 300, textDecoration: 'none', border: '1px solid #eee' }}>Learn More</Link>
      </div>
    </div>
  )
}
