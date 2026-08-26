'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MinimalismContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#111', fontSize: '36px', fontWeight: 300 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
        <div>
          <h2 style={{ color: '#111', fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#bbb', fontSize: '11px', marginBottom: '6px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', borderBottom: '1px solid #eee', color: '#111', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#bbb', fontSize: '11px', marginBottom: '6px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', borderBottom: '1px solid #eee', color: '#111', fontSize: '14px', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: '12px 32px', background: '#111', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginTop: '8px' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#111', fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Sent</p>
              <p style={{ color: '#bbb', fontSize: '13px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div>
          <h2 style={{ color: '#111', fontSize: '16px', fontWeight: 500, marginBottom: '24px' }}>Info</h2>
          {[
            { label: 'Email', value: 'hello@minimal.studio' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Location', value: 'India' },
            { label: 'Hours', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: '#ddd', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#111', fontSize: '14px', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/minimalism" style={{ color: '#bbb', fontSize: '12px', letterSpacing: '2px', textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
