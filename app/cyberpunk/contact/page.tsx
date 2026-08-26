'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CyberpunkContact() {
  const [mounted, setMounted] = useState(false)
  const [sent, setSent] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  const neon = '#ff00ff'

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: neon, fontSize: '32px', fontWeight: 900, letterSpacing: '4px', textShadow: `0 0 20px ${neon}60` }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '20px' }}>
          <h2 style={{ color: neon, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', marginBottom: '16px' }}>SEND MESSAGE</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#4a6a7a', fontSize: '9px', letterSpacing: '1px', marginBottom: '4px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px', background: `${neon}05`, border: `1px solid ${neon}20`, color: neon, fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#4a6a7a', fontSize: '9px', letterSpacing: '1px', marginBottom: '4px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px', background: `${neon}05`, border: `1px solid ${neon}20`, color: neon, fontSize: '11px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: `${neon}20`, color: neon, border: `1px solid ${neon}60`, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', cursor: 'pointer', textShadow: `0 0 10px ${neon}60` }}>TRANSMIT</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: '40px', height: '40px', background: `${neon}20`, border: `1px solid ${neon}40`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={neon} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: neon, fontSize: '12px', fontWeight: 700, letterSpacing: '2px' }}>TRANSMITTED</p>
              <p style={{ color: '#4a6a7a', fontSize: '9px', marginTop: '6px' }}>Response within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '20px' }}>
          <h2 style={{ color: neon, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', marginBottom: '20px' }}>INFO</h2>
          {[
            { label: 'EMAIL', value: 'hello@cyber.studio' },
            { label: 'DISCORD', value: 'CyberStudio#0001' },
            { label: 'LOCATION', value: 'Digital Realm' },
            { label: 'HOURS', value: '24/7 Online' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#4a6a7a', fontSize: '7px', letterSpacing: '3px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: neon, fontSize: '12px', fontWeight: 700 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cyberpunk" style={{ padding: '12px 28px', background: 'transparent', color: '#4a6a7a', border: '1px solid #222', fontSize: '10px', letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
