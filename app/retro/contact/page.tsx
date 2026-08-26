'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', borderRadius: '16px', border: '1px solid #8b735520', padding: '24px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#3a2f25', fontSize: '32px', fontWeight: 700 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: '#e8d5b8', borderRadius: '16px', border: '1px solid #8b735515', padding: '24px' }}>
          <h2 style={{ color: '#3a2f25', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#3a2f2588', fontSize: '12px', marginBottom: '4px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: '#f4e8d1', border: '1px solid #8b735520', borderRadius: '8px', color: '#3a2f25', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#3a2f2588', fontSize: '12px', marginBottom: '4px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: '#f4e8d1', border: '1px solid #8b735520', borderRadius: '8px', color: '#3a2f25', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#8b7355', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: '48px', height: '48px', background: '#8b735515', borderRadius: '12px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#8b7355', fontSize: '16px', fontWeight: 600 }}>Message Sent!</p>
              <p style={{ color: '#3a2f2566', fontSize: '13px', marginTop: '6px' }}>We will reply within 24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#e8d5b8', borderRadius: '16px', border: '1px solid #8b735515', padding: '24px' }}>
          <h2 style={{ color: '#3a2f25', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@studio.design' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#3a2f2544', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#3a2f25', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/retro" style={{ padding: '12px 28px', background: '#8b735515', color: '#8b7355', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
