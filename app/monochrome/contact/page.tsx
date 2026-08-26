'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MonochromeContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '20px', marginBottom: '16px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #000', padding: '20px' }}>
          <h2 style={{ color: '#000', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#999', fontSize: '10px', marginBottom: '4px', fontWeight: 600 }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px', background: '#f5f5f5', border: '1px solid #000', color: '#000', fontSize: '12px', outline: 'none', boxSizing: 'border-box', fontFamily: '"IBM Plex Mono", monospace' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#999', fontSize: '10px', marginBottom: '4px', fontWeight: 600 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px', background: '#f5f5f5', border: '1px solid #000', color: '#000', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"IBM Plex Mono", monospace' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ color: '#000', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Sent.</p>
              <p style={{ color: '#999', fontSize: '11px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#000', padding: '20px' }}>
          <h2 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '18px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@mono.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/monochrome" style={{ padding: '10px 24px', color: '#000', fontSize: '12px', fontWeight: 500, textDecoration: 'none', border: '1px solid #000' }}>Back Home</Link>
      </div>
    </div>
  )
}
