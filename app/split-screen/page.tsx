'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SplitScreenHome() {
  const [mounted, setMounted] = useState(false)
  const [splitPos, setSplitPos] = useState(50)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div>
      {/* Split Hero */}
      <div style={{ display: 'flex', height: 'calc(100vh - 52px)' }}>
        <div style={{ width: `${splitPos}%`, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', transition: 'width 0.3s' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '56px', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-2px' }}>Split<br />Screen</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 400, marginTop: '16px' }}>Two halves, one story.</p>
          </div>
        </div>
        <div style={{ width: `${100 - splitPos}%`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', transition: 'width 0.3s' }}>
          <div>
            <p style={{ color: '#000', fontSize: '15px', fontWeight: 400, lineHeight: 1.8, maxWidth: '300px' }}>Designs that use the power of duality. Light and dark. Content and space. Left and right.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <Link href="/split-screen/gallery" style={{ padding: '12px 24px', background: '#000', color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Gallery</Link>
              <Link href="/split-screen/about" style={{ padding: '12px 24px', color: '#000', fontSize: '13px', fontWeight: 500, textDecoration: 'none', border: '2px solid #000' }}>About</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Split Slider Control */}
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#999', fontSize: '11px', fontWeight: 600, marginBottom: '10px' }}>DRAG TO SPLIT</p>
          <input type="range" min="20" max="80" value={splitPos} onChange={(e) => setSplitPos(Number(e.target.value))} style={{ width: '100%', accentColor: '#000' }} />
        </div>
      </div>

      {/* Split Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', minHeight: '300px' }}>
        <div style={{ background: '#000', padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-1px' }}>Duality</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 400, lineHeight: 1.7 }}>Two contrasting sides that complement each other. Light meets dark.</p>
        </div>
        <div style={{ background: '#fff', padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '2px solid #000' }}>
          <h3 style={{ color: '#000', fontSize: '24px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-1px' }}>Balance</h3>
          <p style={{ color: '#999', fontSize: '13px', fontWeight: 400, lineHeight: 1.7 }}>Perfect equilibrium between content and space. Nothing wasted.</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '2px solid #000' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '24px', textAlign: 'center', borderRight: i < 2 ? '2px solid #000' : 'none' }}>
            <p style={{ color: '#000', fontSize: '28px', fontWeight: 900 }}>{s.value}</p>
            <p style={{ color: '#999', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
