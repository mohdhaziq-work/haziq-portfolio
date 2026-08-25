'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BrutalismAbout() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0 #000', padding: '32px 24px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-2px', marginBottom: '20px' }}>ABOUT US</h1>
        <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.8, marginBottom: '16px' }}>We are a design studio that believes in honesty. No sugar-coating, no unnecessary decoration. Our work is raw, bold, and impossible to ignore. We create websites that load fast, read well, and hit hard.</p>
        <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.8 }}>In a world of rounded corners and gentle gradients, we are the rebellion. We demand attention. We refuse to blend in. We are honest design.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'MISSION', desc: 'Strip away the noise. Let content speak. Make the web honest again.' },
          { title: 'VISION', desc: 'A web where every site has personality, not another template clone.' },
          { title: 'VALUES', desc: 'Honesty. Speed. Impact. No compromises.' },
          { title: 'PROCESS', desc: 'Content first. Structure second. Style last. Always.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0 #000', padding: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { value: '50+', label: 'PROJECTS' },
          { value: '0KB', label: 'IMAGES' },
          { value: '100', label: 'LIGHTHOUSE' },
          { value: '24/7', label: 'SUPPORT' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#000', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#999', fontSize: '8px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/brutalism" style={{ padding: '12px 28px', background: '#fff', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0 #000', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
