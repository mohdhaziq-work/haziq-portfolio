'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IsometricContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: '2px solid #e94560', padding: '24px', marginBottom: '24px', transform: 'skewY(-2deg)', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800, letterSpacing: '2px' }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#16213e', border: '2px solid #0f3460', padding: '22px', transform: 'skewY(-1deg)' }}>
          <div style={{ transform: 'skewY(1deg)' }}>
            <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Send Message</h2>
            {!sent ? (
              <div>
                {['Your Name', 'Email', 'Subject'].map((label, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', color: '#e94560', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>{label}</label>
                    <input style={{ width: '100%', padding: '10px 12px', background: '#0f3460', border: '2px solid #533483', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#e94560', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>Message</label>
                  <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: '#0f3460', border: '2px solid #533483', color: '#fff', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
                <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#e94560', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>TRANSMIT</button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <div style={{ width: '48px', height: '48px', background: '#e94560', transform: 'rotate(45deg)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" style={{ transform: 'rotate(-45deg)' }}><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>Transmitted!</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '6px' }}>We will reply within24 hours</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ background: '#16213e', border: '2px solid #0f3460', padding: '22px', transform: 'skewY(-1deg)' }}>
          <div style={{ transform: 'skewY(1deg)' }}>
            <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Info</h2>
            {[
              { label: 'EMAIL', value: 'hello@isometric.studio' },
              { label: 'PHONE', value: '+91 98765 43210' },
              { label: 'LOCATION', value: 'India' },
              { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <p style={{ color: '#e94560', fontSize: '9px', letterSpacing: '2px', marginBottom: '4px', fontWeight: 700 }}>{item.label}</p>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/isometric" style={{ padding: '12px 28px', color: '#e94560', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '2px solid #e94560', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
