'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TypographyContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#999', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Contact</p>
        <h1 style={{ color: '#111', fontSize: '48px', fontWeight: 400, fontStyle: 'italic' }}>Let&apos;s<br />talk.</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
        <div>
          <h2 style={{ color: '#111', fontSize: '18px', fontWeight: 400, fontStyle: 'italic', marginBottom: '20px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#ccc', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 0', background: 'none', border: 'none', borderBottom: '1px solid #eee', color: '#111', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#ccc', fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 0', background: 'none', border: 'none', borderBottom: '1px solid #eee', color: '#111', fontSize: '15px', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: '14px 40px', background: '#111', color: '#fff', border: 'none', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 500, cursor: 'pointer', marginTop: '8px' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#111', fontSize: '24px', fontWeight: 400, fontStyle: 'italic', marginBottom: '8px' }}>Sent.</p>
              <p style={{ color: '#999', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div>
          <h2 style={{ color: '#111', fontSize: '18px', fontWeight: 400, fontStyle: 'italic', marginBottom: '24px' }}>Info</h2>
          {[
            { label: 'Email', value: 'hello@typography.studio' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Location', value: 'India' },
            { label: 'Hours', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: '#ccc', fontSize: '10px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#111', fontSize: '15px', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/typography" style={{ color: '#111', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, textDecoration: 'none', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Back Home</Link>
      </div>
    </div>
  )
}
