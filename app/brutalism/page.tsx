'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BrutalismHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0 #000', padding: '32px 24px', marginBottom: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: '#ff3e3e', border: '3px solid #000', marginBottom: '16px' }}>
            <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>BRUTALISM</span>
          </div>
          <h1 style={{ color: '#000', fontSize: '48px', fontWeight: 700, lineHeight: 1, letterSpacing: '-3px', marginBottom: '16px' }}>RAW.<br />BOLD.<br />UNFILTERED.</h1>
          <p style={{ color: '#333', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>No polish. No pretense. Just honest, bold design that hits you in the face.</p>
        </div>

        <div style={{ display: 'flex', gap: 0, marginBottom: '16px' }}>
          {['MANIFESTO', 'RULES', 'EXAMPLES'].map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              flex: 1, padding: '12px', fontSize: '10px', fontWeight: 700, cursor: 'pointer',
              background: activeTab === i ? '#000' : '#fff',
              color: activeTab === i ? '#fff' : '#000',
              border: '3px solid #000', marginLeft: i > 0 ? '-3px' : 0,
              position: 'relative', zIndex: activeTab === i ? 10 : 0,
            }}>{tab}</button>
          ))}
        </div>

        <div style={{ border: '3px solid #000', padding: '24px', background: '#fff' }}>
          {activeTab === 0 && <div><h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>THE MANIFESTO</h2><p style={{ fontSize: '13px', color: '#333', lineHeight: 1.8 }}>Brutalism rejects the polished corporate aesthetic. It embraces raw HTML, system fonts, and stark contrast. Content matters more than decoration. Function over form.</p></div>}
          {activeTab === 1 && <div><h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>THE RULES</h2><ul style={{ listStyle: 'none', padding: 0 }}>{['No rounded corners', 'System fonts only', 'Maximum contrast', 'Raw HTML structure', 'No decorative elements', 'Content first'].map((r, i) => <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', fontSize: '13px', color: '#333' }}><span style={{ width: '24px', height: '24px', background: '#ff3e3e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, border: '2px solid #000' }}>{i + 1}</span>{r}</li>)}</ul></div>}
          {activeTab === 2 && <div><h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>EXAMPLES</h2><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>{['Bloomberg', 'Craigslist', 'Wikipedia', 'Hacker News'].map((s, i) => <div key={i} style={{ padding: '12px', textAlign: 'center', background: i % 2 === 0 ? '#ff3e3e' : '#ffd93d', color: i % 2 === 0 ? '#fff' : '#000', border: '2px solid #000' }}><p style={{ fontSize: '11px', fontWeight: 700 }}>{s}</p></div>)}</div></div>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
        {['CLICK ME', 'NO, ME', 'PICK ME'].map((label, i) => (
          <button key={i} onMouseEnter={() => setHoveredBtn(i)} onMouseLeave={() => setHoveredBtn(null)} style={{
            padding: '12px 24px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
            background: hoveredBtn === i ? '#ff3e3e' : '#fff',
            color: hoveredBtn === i ? '#fff' : '#000',
            border: '3px solid #000',
            boxShadow: hoveredBtn === i ? 'none' : '6px 6px 0 #000',
            transform: hoveredBtn === i ? 'translate(3px, 3px)' : 'none',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { title: 'HONESTY', desc: 'No hidden tricks. What you see is what you get.', color: '#ff3e3e' },
          { title: 'SPEED', desc: 'No heavy images. Pure HTML and CSS loads instantly.', color: '#ffd93d' },
          { title: 'IMPACT', desc: 'Impossible to ignore. Bold typography demands attention.', color: '#4ecdc4' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #000', padding: '20px' }}>
            <div style={{ width: '28px', height: '28px', background: f.color, border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, marginBottom: '12px' }}>{i + 1}</div>
            <h3 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/brutalism/gallery" style={{ padding: '12px 28px', background: '#000', color: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #ff3e3e', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>VIEW GALLERY</Link>
        <Link href="/brutalism/about" style={{ padding: '12px 28px', background: '#fff', color: '#000', border: '3px solid #000', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>LEARN MORE</Link>
      </div>
    </div>
  )
}
