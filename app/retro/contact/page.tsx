'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RetroContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', border: '3px solid #8b7355', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#3a2f25', fontSize: '32px', fontWeight: 900 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: '#e8d5b8', border: '2px solid #c4a882', padding: '22px' }}>
          <h2 style={{ color: '#3a2f25', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#8b7355', fontSize: '11px', marginBottom: '4px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: '#d4c4a8', border: '2px solid #c4a882', color: '#3a2f25', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Playfair Display", serif' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#8b7355', fontSize: '11px', marginBottom: '4px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: '#d4c4a8', border: '2px solid #c4a882', color: '#3a2f25', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Playfair Display", serif' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#8b7355', color: '#f4e8d1', border: '2px solid #6b5540', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <div style={{ width: '48px', height: '48px', background: '#8b7355', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f4e8d1" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#3a2f25', fontSize: '16px', fontWeight: 700 }}>Message Sent!</p>
              <p style={{ color: '#8b7355', fontSize: '12px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#e8d5b8', border: '2px solid #c4a882', padding: '22px' }}>
          <h2 style={{ color: '#3a2f25', fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@retro.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#8b7355', fontSize: '9px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#3a2f25', fontSize: '14px', fontWeight: 600 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/retro" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '13px', textDecoration: 'none', border: '2px solid #c4a882' }}>Back Home</Link>
      </div>
    </div>
  )
}
