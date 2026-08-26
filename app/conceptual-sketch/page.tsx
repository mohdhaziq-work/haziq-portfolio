'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ConceptualSketchHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTool, setActiveTool] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tools = [
    { name: 'Pencil', stroke: '#333' },
    { name: 'Marker', stroke: '#000' },
    { name: 'Highlighter', stroke: '#fbbf24' },
    { name: 'Red Pen', stroke: '#dc2626' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '40px 28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '48px', fontWeight: 400, marginBottom: '14px' }}>Conceptual Sketch</h1>
        <p style={{ color: '#666', fontSize: '16px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8 }}>Designs that look like they were sketched on paper. Raw, authentic, and full of character.</p>
      </div>

      {/* Tool Selector */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
        {tools.map((t, i) => (
          <button key={i} onClick={() => setActiveTool(i)} style={{
            padding: '10px 18px', borderRadius: '8px', fontSize: '16px', fontWeight: 400, cursor: 'pointer',
            background: activeTool === i ? '#f0f0f0' : '#fff',
            color: activeTool === i ? '#333' : '#999',
            border: activeTool === i ? `2px solid ${t.stroke}` : '2px dashed #ccc',
          }}>{t.name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Raw', desc: 'Unpolished and authentic.' },
          { title: 'Quick', desc: 'Fast strokes that capture ideas.' },
          { title: 'Real', desc: 'Feels like actual paper sketches.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', border: '2px dashed #ccc', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', border: `2px solid ${tools[activeTool].stroke}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: tools[activeTool].stroke, fontSize: '20px', fontWeight: 400 }}>{i + 1}</span>
            </div>
            <h3 style={{ color: '#333', fontSize: '18px', fontWeight: 400, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '18px', textAlign: 'center' }}>
            <p style={{ color: '#333', fontSize: '28px', fontWeight: 400 }}>{s.value}</p>
            <p style={{ color: '#999', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/conceptual-sketch/gallery" style={{ padding: '14px 28px', background: '#333', color: '#fff', fontSize: '16px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px' }}>View Gallery</Link>
        <Link href="/conceptual-sketch/about" style={{ padding: '14px 28px', color: '#666', fontSize: '16px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px', border: '2px dashed #ccc' }}>Learn More</Link>
      </div>
    </div>
  )
}
