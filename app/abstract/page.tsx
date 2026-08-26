'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AbstractHome() {
  const [mounted, setMounted] = useState(false)
  const [activeForm, setActiveForm] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const forms = [
    { name: 'Blob', radius: '30% 70% 70% 30% / 30% 30% 70% 70%', colors: ['#ff6b6b', '#4ecdc4'] },
    { name: 'Wave', radius: '60% 40% 30% 70% / 60% 30% 70% 40%', colors: ['#45b7d1', '#f7dc6f'] },
    { name: 'Organic', radius: '40% 60% 50% 50% / 50% 40% 60% 50%', colors: ['#a855f7', '#ec4899'] },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '32px', padding: '48px 28px', marginBottom: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '80px', height: '80px', borderRadius: forms[activeForm].radius, background: `linear-gradient(135deg, ${forms[activeForm].colors[0]}40, ${forms[activeForm].colors[1]}40)` }} />
        <h1 style={{ color: '#333', fontSize: '48px', fontWeight: 800, marginBottom: '14px', position: 'relative' }}>Abstract</h1>
        <p style={{ color: '#666', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>Designs that break the mold. Organic shapes, bold colors, and unexpected compositions.</p>
      </div>

      {/* Form Selector */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
        {forms.map((f, i) => (
          <button key={i} onClick={() => setActiveForm(i)} style={{
            width: '56px', height: '56px', borderRadius: f.radius, cursor: 'pointer',
            background: `linear-gradient(135deg, ${f.colors[0]}, ${f.colors[1]})`,
            border: activeForm === i ? '3px solid #333' : '3px solid transparent',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: '#333', fontSize: '14px', fontWeight: 600 }}>{forms[activeForm].name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Organic', desc: 'Shapes that flow like nature.' },
          { title: 'Bold', desc: 'Colors that demand attention.' },
          { title: 'Unexpected', desc: 'Compositions that surprise.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', background: `linear-gradient(135deg, ${forms[activeForm].colors[0]}, ${forms[activeForm].colors[1]})`, borderRadius: forms[activeForm].radius }} />
            <h3 style={{ color: '#333', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#999', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: `linear-gradient(135deg, ${forms[activeForm].colors[0]}20, ${forms[activeForm].colors[1]}20)`, borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#333', fontSize: '28px', fontWeight: 800 }}>{s.value}</p>
            <p style={{ color: '#999', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/abstract/gallery" style={{ padding: '14px 28px', background: `linear-gradient(135deg, ${forms[activeForm].colors[0]}, ${forms[activeForm].colors[1]})`, color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', borderRadius: '16px' }}>View Gallery</Link>
        <Link href="/abstract/about" style={{ padding: '14px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '16px', border: '1px solid #ddd' }}>Learn More</Link>
      </div>
    </div>
  )
}
