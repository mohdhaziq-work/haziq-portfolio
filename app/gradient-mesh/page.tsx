'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GradientMeshHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tabs = [
    { label: 'Fluid', desc: 'Organic shapes that flow like water' },
    { label: 'Vibrant', desc: 'Colors that pop and energize' },
    { label: 'Dynamic', desc: 'Animations that feel alive' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15), rgba(59,130,246,0.15))', borderRadius: '24px', border: '1px solid rgba(139,92,246,0.2)', padding: '40px 28px', marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.3))', borderRadius: '20px', marginBottom: '16px' }}>
          <span style={{ color: '#fff', fontSize: '11px', fontWeight: 500 }}>FLUID DESIGN</span>
        </div>
        <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.1 }}>Gradient<br />Mesh</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Flowing gradients, organic shapes, and fluid animations. Design that feels like liquid art.</p>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            flex: 1, padding: '14px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s',
            background: activeTab === i ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2))' : 'rgba(255,255,255,0.05)',
            border: activeTab === i ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.1)',
          }}>
            <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{t.label}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Mesh Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { grad: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', title: 'Ocean' },
          { grad: 'linear-gradient(135deg, #ec4899, #f59e0b)', title: 'Sunset' },
          { grad: 'linear-gradient(135deg, #10b981, #3b82f6)', title: 'Forest' },
        ].map((g, i) => (
          <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100px', background: g.grad }} />
            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{g.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '18px', textAlign: 'center' }}>
            <p style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '24px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/gradient-mesh/gallery" style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '12px' }}>View Gallery</Link>
        <Link href="/gradient-mesh/about" style={{ padding: '14px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Learn More</Link>
      </div>
    </div>
  )
}
