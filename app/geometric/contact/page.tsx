'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GeometricContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 900, letterSpacing: '4px' }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', border: '3px solid #000', padding: '22px' }}>
          <h2 style={{ color: '#000', fontSize: '16px', fontWeight: 800, marginBottom: '16px', letterSpacing: '2px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#999', fontSize: '10px', marginBottom: '4px', fontWeight: 700, letterSpacing: '1px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: '#f8f8f8', border: '2px solid #000', color: '#000', fontSize: '12px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Montserrat", sans-serif' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#999', fontSize: '10px', marginBottom: '4px', fontWeight: 700, letterSpacing: '1px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: '#f8f8f8', border: '2px solid #000', color: '#000', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Montserrat", sans-serif' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 800, cursor: 'pointer', letterSpacing: '2px' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <div style={{ width: '48px', height: '48px', background: '#000', margin: '0 auto 14px', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              <p style={{ color: '#000', fontSize: '16px', fontWeight: 800, letterSpacing: '2px' }}>Sent.</p>
              <p style={{ color: '#999', fontSize: '11px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#000', border: '3px solid #000', padding: '22px' }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 800, marginBottom: '20px', letterSpacing: '2px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@geometric.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', letterSpacing: '3px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/geometric" style={{ padding: '12px 28px', color: '#000', fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '3px solid #000', letterSpacing: '2px' }}>Back Home</Link>
      </div>
    </div>
  )
}
