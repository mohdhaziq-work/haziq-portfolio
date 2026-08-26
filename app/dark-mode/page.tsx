'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DarkModeHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tabs = [
    { label: 'Terminal', desc: 'Command-line inspired' },
    { label: 'Monokai', desc: 'Classic dark theme' },
    { label: 'Dracula', desc: 'Purple accents' },
  ]

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Terminal Header */}
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', marginBottom: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: '#1a1a1a', borderBottom: '1px solid #222' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ color: '#555', fontSize: '11px', marginLeft: '8px' }}>dark-mode.sh</span>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ color: '#22c55e', fontSize: '13px', marginBottom: '8px' }}>$ echo &quot;Welcome&quot;</p>
          <h1 style={{ color: '#e0e0e0', fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>Dark Mode Studio</h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>Elegant dark interfaces that reduce eye strain and look stunning.</p>
          <p style={{ color: '#22c55e', fontSize: '13px' }}>$ <span style={{ color: '#555' }}>design --theme=dark --font=mono</span></p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: '#111', borderRadius: '8px', padding: '4px', border: '1px solid #222' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            flex: 1, padding: '10px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
            background: activeTab === i ? '#1a1a1a' : 'transparent',
            border: activeTab === i ? '1px solid #333' : '1px solid transparent',
          }}>
            <p style={{ color: activeTab === i ? '#e0e0e0' : '#555', fontSize: '12px', fontWeight: 600 }}>{t.label}</p>
            <p style={{ color: '#444', fontSize: '10px', marginTop: '2px' }}>{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Code Block Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { title: 'Dark UI', lines: ['const theme = "dark"', 'bg: #0d0d0d', 'text: #e0e0e0'] },
          { title: 'Dark UX', lines: ['reduce eye strain', 'high contrast', 'focused reading'] },
          { title: 'Dark DX', lines: ['JetBrains Mono', 'syntax colors', 'terminal vibes'] },
        ].map((c, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', background: '#1a1a1a', borderBottom: '1px solid #222' }}>
              <span style={{ color: '#666', fontSize: '11px' }}>{c.title}</span>
            </div>
            <div style={{ padding: '14px' }}>
              {c.lines.map((line, j) => (
                <p key={j} style={{ color: j === 0 ? '#22c55e' : '#555', fontSize: '11px', marginBottom: '4px', fontFamily: '"JetBrains Mono", monospace' }}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#e0e0e0', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#444', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/dark-mode/gallery" style={{ padding: '12px 24px', background: '#e0e0e0', color: '#0d0d0d', fontSize: '12px', fontWeight: 600, textDecoration: 'none', borderRadius: '6px' }}>View Gallery</Link>
        <Link href="/dark-mode/about" style={{ padding: '12px 24px', color: '#666', fontSize: '12px', textDecoration: 'none', borderRadius: '6px', border: '1px solid #333' }}>Learn More</Link>
      </div>
    </div>
  )
}
