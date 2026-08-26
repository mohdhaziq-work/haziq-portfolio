'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ParallaxContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '4px', marginBottom: '16px' }}>CONTACT</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 200 }}>Get in touch</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '60px' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, marginBottom: '20px', letterSpacing: '2px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginBottom: '6px', fontWeight: 300, letterSpacing: '2px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '14px', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginBottom: '6px', fontWeight: 300, letterSpacing: '2px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '14px', fontWeight: 300, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: '14px 40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px', fontWeight: 400, cursor: 'pointer', letterSpacing: '2px', marginTop: '8px' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#fff', fontSize: '24px', fontWeight: 200, marginBottom: '8px' }}>Sent.</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 300 }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, marginBottom: '24px', letterSpacing: '2px' }}>Info</h2>
          {[
            { label: 'Email', value: 'hello@parallax.studio' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Location', value: 'India' },
            { label: 'Hours', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '3px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 300 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/parallax" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 300, textDecoration: 'none', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
