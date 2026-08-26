'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HandwrittenContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f5f0e8', borderRadius: '20px', padding: '24px', marginBottom: '20px', border: '2px dashed #d4c5a9', textAlign: 'center' }}>
        <h1 style={{ color: '#5a4a35', fontSize: '40px', fontWeight: 700 }}>Write to Us</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#f5f0e8', borderRadius: '16px', padding: '22px', border: '2px dashed #d4c5a9' }}>
          <h2 style={{ color: '#5a4a35', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Send a Note</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#8b7355', fontSize: '14px', marginBottom: '6px', fontWeight: 500 }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: '#fffef5', border: '2px dashed #d4c5a9', borderRadius: '10px', color: '#5a4a35', fontSize: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Caveat", cursive' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#8b7355', fontSize: '14px', marginBottom: '6px', fontWeight: 500 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: '#fffef5', border: '2px dashed #d4c5a9', borderRadius: '10px', color: '#5a4a35', fontSize: '16px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Caveat", cursive' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: '#5a4a35', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 600, cursor: 'pointer' }}>Send Note</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#5a4a35', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Sent!</p>
              <p style={{ color: '#8b7355', fontSize: '16px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#f5f0e8', borderRadius: '16px', padding: '22px', border: '2px dashed #d4c5a9' }}>
          <h2 style={{ color: '#5a4a35', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@handwritten.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#8b7355', fontSize: '11px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#5a4a35', fontSize: '18px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/handwritten" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '18px', fontWeight: 500, textDecoration: 'none', borderRadius: '12px', border: '2px dashed #d4c5a9' }}>Back Home</Link>
      </div>
    </div>
  )
}
