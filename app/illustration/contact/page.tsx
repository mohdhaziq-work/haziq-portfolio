'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IllustrationContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#ff6b6b', borderRadius: '24px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 700 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '22px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#333', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#bbb', fontSize: '11px', marginBottom: '6px', fontWeight: 500 }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: '#fffbf0', border: '2px solid #f0e6d6', borderRadius: '12px', color: '#333', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#bbb', fontSize: '11px', marginBottom: '6px', fontWeight: 500 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: '#fffbf0', border: '2px solid #f0e6d6', borderRadius: '12px', color: '#333', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '60px', height: '60px', background: '#4ecdc4', borderRadius: '50%', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>Message Sent!</p>
              <p style={{ color: '#bbb', fontSize: '12px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '22px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#333', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@illustration.studio', color: '#ff6b6b' },
            { label: 'PHONE', value: '+91 98765 43210', color: '#4ecdc4' },
            { label: 'LOCATION', value: 'India', color: '#45b7d1' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM', color: '#f7dc6f' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px', padding: '12px', background: '#fffbf0', borderRadius: '12px' }}>
              <p style={{ color: item.color, fontSize: '9px', letterSpacing: '2px', marginBottom: '4px', fontWeight: 700 }}>{item.label}</p>
              <p style={{ color: '#333', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/illustration" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '50px', border: '2px solid #eee' }}>Back Home</Link>
      </div>
    </div>
  )
}
