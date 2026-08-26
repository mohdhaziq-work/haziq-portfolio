'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SplitScreenContact() {
  const [sent, setSent] = useState(false)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 52px)' }}>
        <div style={{ background: '#000', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@split.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '2px solid #000' }}>
          <h2 style={{ color: '#000', fontSize: '24px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#999', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px', background: '#f5f5f5', border: '2px solid #000', color: '#000', fontSize: '13px', fontWeight: 500, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#999', fontSize: '11px', marginBottom: '4px', fontWeight: 600 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px', background: '#f5f5f5', border: '2px solid #000', color: '#000', fontSize: '13px', fontWeight: 500, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: '#000', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#000', fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Sent.</p>
              <p style={{ color: '#999', fontSize: '13px', fontWeight: 400 }}>We will reply within24 hours</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '20px', textAlign: 'center', borderTop: '2px solid #000' }}>
        <Link href="/split-screen" style={{ color: '#000', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
