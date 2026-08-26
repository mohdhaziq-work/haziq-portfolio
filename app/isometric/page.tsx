'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function IsometricHome() {
  const [mounted, setMounted] = useState(false)
  const [activeFace, setActiveFace] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const faces = [
    { label: 'Top', color: '#e94560' },
    { label: 'Left', color: '#0f3460' },
    { label: 'Right', color: '#533483' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: '2px solid #e94560', padding: '40px 28px', marginBottom: '24px', transform: 'skewY(-2deg)', position: 'relative' }}>
        <div style={{ transform: 'skewY(2deg)', textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 800, marginBottom: '14px', letterSpacing: '3px' }}>ISOMETRIC</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>3D perspective on a 2D canvas. Depth, dimension, and dramatic angles.</p>
        </div>
      </div>

      {/* Isometric Cube Demo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          {/* Top face */}
          <div onClick={() => setActiveFace(0)} style={{ position: 'absolute', width: '80px', height: '80px', background: activeFace === 0 ? '#e94560' : 'rgba(233,69,96,0.5)', transform: 'rotate(45deg) skew(-15deg, -15deg)', top: '0', left: '20px', cursor: 'pointer', transition: 'all 0.3s' }} />
          {/* Left face */}
          <div onClick={() => setActiveFace(1)} style={{ position: 'absolute', width: '80px', height: '50px', background: activeFace === 1 ? '#0f3460' : 'rgba(15,52,96,0.5)', transform: 'skewY(30deg)', bottom: '0', left: '0', cursor: 'pointer', transition: 'all 0.3s' }} />
          {/* Right face */}
          <div onClick={() => setActiveFace(2)} style={{ position: 'absolute', width: '80px', height: '50px', background: activeFace === 2 ? '#533483' : 'rgba(83,52,131,0.5)', transform: 'skewY(-30deg)', bottom: '0', right: '0', cursor: 'pointer', transition: 'all 0.3s' }} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: faces[activeFace].color, fontSize: '14px', fontWeight: 600 }}>{faces[activeFace].label} Face Selected</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Depth', desc: 'Layers that create real dimension.', color: '#e94560' },
          { title: 'Angle', desc: 'Perspective that draws the eye.', color: '#0f3460' },
          { title: 'Dimension', desc: 'Flat surfaces that feel 3D.', color: '#533483' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#16213e', border: `2px solid ${f.color}`, padding: '18px', transform: 'skewY(-2deg)' }}>
            <div style={{ transform: 'skewY(2deg)' }}>
              <div style={{ width: '32px', height: '32px', background: f.color, transform: 'rotate(45deg)', margin: '0 auto 12px' }} />
              <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '6px', textAlign: 'center' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.6, textAlign: 'center' }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#16213e', border: '2px solid #e94560', padding: '16px', textAlign: 'center', transform: 'skewX(-5deg)' }}>
            <p style={{ color: '#e94560', fontSize: '26px', fontWeight: 800 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/isometric/gallery" style={{ padding: '14px 28px', background: '#e94560', color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>View Gallery</Link>
        <Link href="/isometric/about" style={{ padding: '14px 28px', color: '#e94560', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '2px solid #e94560', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>Learn More</Link>
      </div>
    </div>
  )
}
