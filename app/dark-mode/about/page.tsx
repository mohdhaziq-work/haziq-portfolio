'use client'

import Link from 'next/link'

export default function DarkModeAbout() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
        </div>
        <h1 style={{ color: '#e0e0e0', fontSize: '32px', fontWeight: 700, marginBottom: '14px' }}>About Dark Mode</h1>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.8, marginBottom: '10px' }}>We specialize in dark-themed interfaces that are easy on the eyes and beautiful to look at.</p>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.8 }}>Every design uses carefully chosen contrast ratios, monospace typography, and subtle grid patterns.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { title: 'Mission', desc: 'Create dark interfaces that reduce eye strain.' },
          { title: 'Vision', desc: 'A web that respects your eyes, day and night.' },
          { title: 'Values', desc: 'Contrast. Clarity. Comfort. Code aesthetic.' },
          { title: 'Process', desc: 'Design dark, test contrast, refine details.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '18px' }}>
            <h3 style={{ color: '#e0e0e0', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#555', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#e0e0e0', fontSize: '22px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#444', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/dark-mode" style={{ padding: '12px 24px', color: '#666', fontSize: '12px', textDecoration: 'none', borderRadius: '6px', border: '1px solid #333' }}>Back Home</Link>
      </div>
    </div>
  )
}
