'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WabiSabiContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#b8a090', fontSize: '12px', letterSpacing: '4px', marginBottom: '16px' }}>Contact</p>
        <h1 style={{ color: '#8b7355', fontSize: '48px', fontWeight: 300 }}>Get in touch</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
        <div>
          <h2 style={{ color: '#8b7355', fontSize: '16px', fontWeight: 400, marginBottom: '20px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#b8a090', fontSize: '11px', marginBottom: '6px', fontWeight: 300, letterSpacing: '2px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(180,160,140,0.3)', color: '#8b7355', fontSize: '14px', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#b8a090', fontSize: '11px', marginBottom: '6px', fontWeight: 300, letterSpacing: '2px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(180,160,140,0.3)', color: '#8b7355', fontSize: '14px', fontWeight: 300, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: '14px 40px', background: '#8b7355', color: '#f5f0e8', border: 'none', fontSize: '14px', fontWeight: 400, cursor: 'pointer', marginTop: '8px' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#8b7355', fontSize: '24px', fontWeight: 300, marginBottom: '8px' }}>Sent.</p>
              <p style={{ color: '#b8a090', fontSize: '13px', fontWeight: 300 }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div>
          <h2 style={{ color: '#8b7355', fontSize: '16px', fontWeight: 400, marginBottom: '24px' }}>Info</h2>
          {[
            { label: 'Email', value: 'hello@wabisabi.studio' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Location', value: 'India' },
            { label: 'Hours', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: '#b8a090', fontSize: '10px', letterSpacing: '3px', marginBottom: '4px', fontWeight: 300 }}>{item.label}</p>
              <p style={{ color: '#8b7355', fontSize: '15px', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/wabi-sabi" style={{ color: '#b8a090', fontSize: '14px', fontWeight: 300, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
