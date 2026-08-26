'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CyberpunkAbout() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  const neon = '#ff00ff'

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '32px 24px', marginBottom: '24px' }}>
        <h1 style={{ color: neon, fontSize: '32px', fontWeight: 900, letterSpacing: '4px', textShadow: `0 0 20px ${neon}60`, marginBottom: '20px' }}>ABOUT US</h1>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.8, marginBottom: '16px' }}>We are digital architects of the future. Our designs blend neon aesthetics with functional interfaces, creating experiences that feel like stepping into a cyberpunk world.</p>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.8 }}>Every pixel glows with purpose. Every interaction feels like jacking into the matrix. We build for the future that is already here.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'MISSION', desc: 'Push the boundaries of digital design with futuristic aesthetics.' },
          { title: 'VISION', desc: 'A web where every interface feels like a sci-fi control panel.' },
          { title: 'VALUES', desc: 'Innovation. Boldness. Neon. Always pushing forward.' },
          { title: 'PROCESS', desc: 'Dark backgrounds first. Add neon. Refine until it glows.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '16px' }}>
            <h3 style={{ color: neon, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#4a6a7a', fontSize: '11px', lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '24/7', label: 'UPTIME' },
          { value: '99.9%', label: 'SIGNAL' },
          { value: 'MAX', label: 'SECURITY' },
        ].map((s, i) => (
          <div key={i} style={{ background: `${neon}08`, border: `1px solid ${neon}20`, padding: '16px', textAlign: 'center' }}>
            <p style={{ color: neon, fontSize: '20px', fontWeight: 900, textShadow: `0 0 10px ${neon}60` }}>{s.value}</p>
            <p style={{ color: '#4a6a7a', fontSize: '7px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cyberpunk" style={{ padding: '12px 28px', background: `${neon}15`, color: neon, border: `1px solid ${neon}40`, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
