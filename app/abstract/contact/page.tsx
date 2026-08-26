'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AbstractContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '32px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 800 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#333', fontSize: '18px', fontWeight: 700, marginBottom: '18px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#bbb', fontSize: '11px', marginBottom: '6px', fontWeight: 500 }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: '#f8f8f8', border: '1px solid #eee', borderRadius: '12px', color: '#333', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#bbb', fontSize: '11px', marginBottom: '6px', fontWeight: 500 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: '#f8f8f8', border: '1px solid #eee', borderRadius: '12px', color: '#333', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)', borderRadius: '50%', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#333', fontSize: '18px', fontWeight: 700 }}>Message Sent!</p>
              <p style={{ color: '#bbb', fontSize: '12px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#333', fontSize: '18px', fontWeight: 700, marginBottom: '22px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@abstract.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '18px' }}>
              <p style={{ color: '#bbb', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#333', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/abstract" style={{ padding: '12px 28px', color: '#666', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '16px', border: '1px solid #ddd' }}>Back Home</Link>
      </div>
    </div>
  )
}
