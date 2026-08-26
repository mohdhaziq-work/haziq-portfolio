'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ParallaxHome() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  if (!mounted) return null

  return (
    <div style={{ position: 'relative' }}>
      {/* Hero with parallax layers */}
      <div style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', transform: `translateY(${scrollY * 0.1}px)` }} />
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(233,69,96,0.1)', transform: `translateY(${scrollY * 0.3}px)` }} />
        <div style={{ position: 'absolute', bottom: '30%', right: '15%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(0,201,255,0.1)', transform: `translateY(${scrollY * 0.2}px)` }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
          <h1 style={{ color: '#fff', fontSize: '64px', fontWeight: 200, letterSpacing: '12px', marginBottom: '16px' }}>PARALLAX</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 300, letterSpacing: '4px' }}>Depth through motion</p>
        </div>
      </div>

      {/* Content sections */}
      <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px' }}>CONCEPT</p>
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: 200, marginBottom: '16px' }}>Layers create depth</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 300, lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}>Multiple layers moving at different speeds create an illusion of three-dimensional space on a flat screen.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '80px' }}>
          {[
            { title: 'Depth', desc: 'Multiple layers at different speeds.' },
            { title: 'Motion', desc: 'Smooth scrolling that feels natural.' },
            { title: 'Immersion', desc: 'Experiences that draw you in.' },
          ].map((f, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', fontWeight: 200 }}>{i + 1}</span>
              </div>
              <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 300, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '80px' }}>
          {[
            { value: '100+', label: 'Projects' },
            { value: '5+', label: 'Years' },
            { value: '50+', label: 'Clients' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: '36px', fontWeight: 200 }}>{s.value}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '3px', marginTop: '8px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/parallax/gallery" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px', fontWeight: 400, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '2px' }}>View Gallery</Link>
          <Link href="/parallax/about" style={{ padding: '14px 32px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 300, textDecoration: 'none', letterSpacing: '2px' }}>Learn More</Link>
        </div>
      </div>
    </div>
  )
}
