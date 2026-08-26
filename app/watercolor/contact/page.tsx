'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WatercolorContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.2), rgba(254,252,250,0.5))', borderRadius: '30px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#8b6f5e', fontSize: '44px', fontWeight: 600, fontStyle: 'italic' }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.1), rgba(254,252,250,0.8))', borderRadius: '20px', padding: '24px' }}>
          <h2 style={{ color: '#8b6f5e', fontSize: '20px', fontWeight: 600, fontStyle: 'italic', marginBottom: '18px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#b8a090', fontSize: '12px', marginBottom: '6px', fontStyle: 'italic' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: 'rgba(254,252,250,0.8)', border: '1px solid rgba(200,180,160,0.3)', borderRadius: '12px', color: '#8b6f5e', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontStyle: 'italic' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#b8a090', fontSize: '12px', marginBottom: '6px', fontStyle: 'italic' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: 'rgba(254,252,250,0.8)', border: '1px solid rgba(200,180,160,0.3)', borderRadius: '12px', color: '#8b6f5e', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontStyle: 'italic' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: 'rgba(255,182,193,0.3)', color: '#8b6f5e', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 600, fontStyle: 'italic', cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#8b6f5e', fontSize: '24px', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>Sent!</p>
              <p style={{ color: '#b8a090', fontSize: '14px', fontStyle: 'italic' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: 'radial-gradient(circle, rgba(173,216,230,0.1), rgba(254,252,250,0.8))', borderRadius: '20px', padding: '24px' }}>
          <h2 style={{ color: '#8b6f5e', fontSize: '20px', fontWeight: 600, fontStyle: 'italic', marginBottom: '22px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@watercolor.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '18px' }}>
              <p style={{ color: '#c8b8a8', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px', fontStyle: 'italic' }}>{item.label}</p>
              <p style={{ color: '#8b6f5e', fontSize: '15px', fontWeight: 400, fontStyle: 'italic' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/watercolor" style={{ padding: '12px 28px', color: '#b8a090', fontSize: '15px', fontWeight: 400, fontStyle: 'italic', textDecoration: 'none', borderRadius: '20px', border: '1px solid rgba(200,180,160,0.3)' }}>Back Home</Link>
      </div>
    </div>
  )
}
