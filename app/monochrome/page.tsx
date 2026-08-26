'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MonochromeHome() {
  const [mounted, setMounted] = useState(false)
  const [grayLevel, setGrayLevel] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const grays = ['#000000', '#333333', '#666666', '#999999', '#cccccc']

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '32px 24px', marginBottom: '16px' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>MONOCHROME</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.7 }}>One color. Infinite possibilities. The beauty of black and white.</p>
      </div>

      {/* Gray Scale */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {grays.map((g, i) => (
          <button key={i} onClick={() => setGrayLevel(i)} style={{
            flex: 1, height: '40px', background: g, border: grayLevel === i ? '2px solid #000' : '2px solid transparent', cursor: 'pointer',
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { title: 'Pure', desc: 'No color distractions. Pure form.' },
          { title: 'Bold', desc: 'High contrast that demands attention.' },
          { title: 'Timeless', desc: 'Never goes out of style.' },
        ].map((f, i) => (
          <div key={i} style={{ background: grays[grayLevel], padding: '18px' }}>
            <h3 style={{ color: grayLevel > 2 ? '#000' : '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: grayLevel > 2 ? '#666' : 'rgba(255,255,255,0.5)', fontSize: '11px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
        ].map((s, i) => (
          <div key={i} style={{ background: i === 0 ? '#000' : i === 1 ? '#666' : '#ccc', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: i === 2 ? '#000' : '#fff', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: i === 2 ? '#666' : 'rgba(255,255,255,0.5)', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/monochrome/gallery" style={{ padding: '12px 24px', background: '#000', color: '#fff', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>View Gallery</Link>
        <Link href="/monochrome/about" style={{ padding: '12px 24px', color: '#000', fontSize: '12px', fontWeight: 500, textDecoration: 'none', border: '1px solid #000' }}>Learn More</Link>
      </div>
    </div>
  )
}
