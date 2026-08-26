'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FuturisticContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', padding: '24px', marginBottom: '24px', textAlign: 'center', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)' }}>
        <h1 style={{ color: '#00f0ff', fontSize: '36px', fontWeight: 900, letterSpacing: '4px' }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '22px', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)' }}>
          <h2 style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 700, marginBottom: '16px', letterSpacing: '2px' }}>TRANSMIT</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: 'rgba(0,240,255,0.5)', fontSize: '9px', marginBottom: '4px', fontWeight: 600, letterSpacing: '2px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', color: '#fff', fontSize: '12px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Orbitron", sans-serif' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: 'rgba(0,240,255,0.5)', fontSize: '9px', marginBottom: '4px', fontWeight: 600, letterSpacing: '2px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', color: '#fff', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Orbitron", sans-serif' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: 'rgba(0,240,255,0.1)', color: '#00f0ff', border: '1px solid #00f0ff', fontSize: '10px', fontWeight: 700, cursor: 'pointer', letterSpacing: '3px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>TRANSMIT</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <p style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>TRANSMITTED</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '22px', clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)' }}>
          <h2 style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 700, marginBottom: '20px', letterSpacing: '2px' }}>DATA</h2>
          {[
            { label: 'EMAIL', value: 'hello@future.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: 'rgba(0,240,255,0.4)', fontSize: '8px', letterSpacing: '3px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/futuristic" style={{ padding: '12px 28px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '2px', clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>Back Home</Link>
      </div>
    </div>
  )
}
