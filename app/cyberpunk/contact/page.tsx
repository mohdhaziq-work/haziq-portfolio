'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CyberpunkContact() {
  const [sent, setSent] = useState(false)
  const neon = '#ff00ff'

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#0a0a0a', border: `1px solid ${neon}30`, padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: neon, fontSize: '36px', fontWeight: 900, letterSpacing: '5px', textShadow: `0 0 20px ${neon}60` }}>CONTACT</h1>
        <p style={{ color: '#4a6a7a', fontSize: '10px', letterSpacing: '2px', marginTop: '8px' }}>JACK IN // CONNECT</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '22px' }}>
          <h2 style={{ color: neon, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', marginBottom: '18px' }}>TRANSMIT MESSAGE</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#4a6a7a', fontSize: '8px', letterSpacing: '2px', marginBottom: '5px' }}>{label.toUpperCase()}</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: `${neon}05`, border: `1px solid ${neon}20`, color: neon, fontSize: '12px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Orbitron", sans-serif' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#4a6a7a', fontSize: '8px', letterSpacing: '2px', marginBottom: '5px' }}>MESSAGE</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: `${neon}05`, border: `1px solid ${neon}20`, color: neon, fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Orbitron", sans-serif' }} />
              </div>
              <button onClick={() => setSent(true)} style={{
                width: '100%', padding: '12px', background: `${neon}20`, color: neon,
                border: `1px solid ${neon}60`, fontSize: '10px', fontWeight: 700, letterSpacing: '4px',
                cursor: 'pointer', textShadow: `0 0 10px ${neon}60`, fontFamily: '"Orbitron", sans-serif',
              }}>TRANSMIT</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <div style={{ width: '44px', height: '44px', background: `${neon}20`, border: `1px solid ${neon}40`, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={neon} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: neon, fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textShadow: `0 0 10px ${neon}60` }}>TRANSMITTED</p>
              <p style={{ color: '#4a6a7a', fontSize: '9px', marginTop: '6px', letterSpacing: '1px' }}>Response within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0a0a0a', border: `1px solid ${neon}20`, padding: '22px' }}>
          <h2 style={{ color: neon, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', marginBottom: '22px' }}>SYSTEM INFO</h2>
          {[
            { label: 'EMAIL', value: 'hello@cyber.studio' },
            { label: 'DISCORD', value: 'CyberStudio#0001' },
            { label: 'LOCATION', value: 'Digital Realm' },
            { label: 'HOURS', value: '24/7 Online' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: i < 3 ? `1px solid ${neon}10` : 'none' }}>
              <p style={{ color: '#4a6a7a', fontSize: '7px', letterSpacing: '3px', marginBottom: '5px' }}>{item.label}</p>
              <p style={{ color: neon, fontSize: '13px', fontWeight: 700 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cyberpunk" style={{ padding: '12px 28px', background: 'transparent', color: '#4a6a7a', border: '1px solid #222', fontSize: '10px', letterSpacing: '2px', textDecoration: 'none' }}>DISCONNECT</Link>
      </div>
    </div>
  )
}
