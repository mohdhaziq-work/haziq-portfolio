'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NeonGlowContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(255,0,255,0.05)', border: '2px solid #ff00ff', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 0 30px rgba(255,0,255,0.3)' }}>
        <h1 style={{ color: '#ff00ff', fontSize: '28px', fontWeight: 400, textShadow: '0 0 20px rgba(255,0,255,0.5)' }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,255,0.3)', padding: '20px', boxShadow: '0 0 10px rgba(255,0,255,0.1)' }}>
          <h2 style={{ color: '#ff00ff', fontSize: '10px', fontWeight: 400, marginBottom: '16px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>TRANSMIT</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,0,255,0.5)', fontSize: '7px', marginBottom: '4px', letterSpacing: '1px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,0,255,0.05)', border: '1px solid rgba(255,0,255,0.3)', color: '#fff', fontSize: '10px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Press Start 2P", monospace' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: 'rgba(255,0,255,0.5)', fontSize: '7px', marginBottom: '4px', letterSpacing: '1px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,0,255,0.05)', border: '1px solid rgba(255,0,255,0.3)', color: '#fff', fontSize: '10px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Press Start 2P", monospace' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '10px', background: 'rgba(255,0,255,0.1)', color: '#ff00ff', border: '2px solid #ff00ff', fontSize: '8px', fontWeight: 400, cursor: 'pointer', boxShadow: '0 0 15px rgba(255,0,255,0.3)', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>TRANSMIT</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ color: '#ff00ff', fontSize: '12px', fontWeight: 400, textShadow: '0 0 10px rgba(255,0,255,0.5)', marginBottom: '8px' }}>TRANSMITTED</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,255,0.3)', padding: '20px', boxShadow: '0 0 10px rgba(255,0,255,0.1)' }}>
          <h2 style={{ color: '#ff00ff', fontSize: '10px', fontWeight: 400, marginBottom: '18px', textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>DATA</h2>
          {[
            { label: 'EMAIL', value: 'hello@neon.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <p style={{ color: 'rgba(255,0,255,0.4)', fontSize: '7px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/neon-glow" style={{ padding: '10px 24px', color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: 400, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
