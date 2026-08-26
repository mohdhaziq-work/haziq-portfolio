'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ff634820', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#2d3436', fontSize: '32px', fontWeight: 700 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ff634815', padding: '24px' }}>
          <h2 style={{ color: '#2d3436', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#2d343688', fontSize: '12px', marginBottom: '4px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: '#f8f9fa', border: '1px solid #ff634820', borderRadius: '8px', color: '#2d3436', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#2d343688', fontSize: '12px', marginBottom: '4px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: '#f8f9fa', border: '1px solid #ff634820', borderRadius: '8px', color: '#2d3436', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#ff6348', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: '48px', height: '48px', background: '#ff634815', borderRadius: '12px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6348" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#ff6348', fontSize: '16px', fontWeight: 600 }}>Message Sent!</p>
              <p style={{ color: '#2d343666', fontSize: '13px', marginTop: '6px' }}>We will reply within 24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ff634815', padding: '24px' }}>
          <h2 style={{ color: '#2d3436', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@studio.design' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#2d343644', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#2d3436', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/geometric" style={{ padding: '12px 28px', background: '#ff634815', color: '#ff6348', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
