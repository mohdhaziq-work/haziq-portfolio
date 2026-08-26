'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function OrganicContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8dcc8', borderRadius: '30px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '34px', fontWeight: 700 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#e8dcc8', borderRadius: '20px', padding: '22px' }}>
          <h2 style={{ color: '#5a4a35', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#8b7355', fontSize: '11px', marginBottom: '6px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: '#f5f0e8', border: '1px solid #d4c5a9', borderRadius: '12px', color: '#5a4a35', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#8b7355', fontSize: '11px', marginBottom: '6px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: '#f5f0e8', border: '1px solid #d4c5a9', borderRadius: '12px', color: '#5a4a35', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: '#5a4a35', color: '#f5f0e8', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', background: '#6b8f3c', borderRadius: '50%', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#5a4a35', fontSize: '18px', fontWeight: 600 }}>Message Sent!</p>
              <p style={{ color: '#8b7355', fontSize: '12px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#e8dcc8', borderRadius: '20px', padding: '22px' }}>
          <h2 style={{ color: '#5a4a35', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@organic.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#8b7355', fontSize: '9px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#5a4a35', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/organic" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '20px', border: '1px solid #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
