'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MaterialDesignHome() {
  const [mounted, setMounted] = useState(false)
  const [elevation, setElevation] = useState(1)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const shadows = [
    '0 1px 3px rgba(0,0,0,0.12)',
    '0 3px 6px rgba(0,0,0,0.16)',
    '0 10px 20px rgba(0,0,0,0.19)',
    '0 14px 28px rgba(0,0,0,0.25)',
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#6200ee', borderRadius: '0', padding: '40px 28px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 400, marginBottom: '14px' }}>Material Design</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', maxWidth: '400px', lineHeight: 1.7 }}>Elevation, ripples, and purposeful motion. Design inspired by the physical world and its textures.</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#666', fontSize: '12px', fontWeight: 500, marginBottom: '10px' }}>Elevation: {elevation}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4].map(e => (
            <button key={e} onClick={() => setElevation(e)} style={{
              flex: 1, padding: '12px', background: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',
              boxShadow: shadows[e - 1], transition: 'all 0.2s',
            }}>
              <span style={{ color: '#6200ee', fontSize: '14px', fontWeight: 500 }}>DP {e * 4}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { title: 'Elevation', desc: 'Shadows that show hierarchy and depth.', color: '#6200ee' },
          { title: 'Ripple', desc: 'Touch feedback that responds to interaction.', color: '#03dac6' },
          { title: 'Motion', desc: 'Purposeful animations that guide the eye.', color: '#ff6584' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
            <div style={{ height: '4px', background: f.color }} />
            <div style={{ padding: '16px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 500, marginBottom: '6px' }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6200ee', fontSize: '28px', fontWeight: 500 }}>{s.value}</p>
            <p style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/material-design/gallery" style={{ padding: '12px 32px', background: '#6200ee', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>View Gallery</Link>
        <Link href="/material-design/about" style={{ padding: '12px 32px', color: '#6200ee', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px', border: '1px solid #6200ee', textTransform: 'uppercase', letterSpacing: '1px' }}>Learn More</Link>
      </div>
    </div>
  )
}
