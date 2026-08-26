'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MaterialDesignContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#6200ee', padding: '24px', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 400 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '24px' }}>
          <h2 style={{ color: '#333', fontSize: '20px', fontWeight: 500, marginBottom: '18px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#6200ee', fontSize: '12px', marginBottom: '6px', fontWeight: 500 }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', borderBottom: '2px solid #e0e0e0', color: '#333', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#6200ee', fontSize: '12px', marginBottom: '6px', fontWeight: 500 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', borderBottom: '2px solid #e0e0e0', color: '#333', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: '12px 32px', background: '#6200ee', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', background: '#03dac6', borderRadius: '50%', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#333', fontSize: '18px', fontWeight: 500 }}>Message Sent!</p>
              <p style={{ color: '#999', fontSize: '13px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', padding: '24px' }}>
          <h2 style={{ color: '#333', fontSize: '20px', fontWeight: 500, marginBottom: '22px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@material.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6200ee', fontSize: '10px', letterSpacing: '1px', marginBottom: '4px', fontWeight: 500 }}>{item.label}</p>
              <p style={{ color: '#333', fontSize: '14px', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/material-design" style={{ padding: '12px 32px', color: '#6200ee', fontSize: '14px', fontWeight: 500, textDecoration: 'none', borderRadius: '4px', border: '1px solid #6200ee', textTransform: 'uppercase', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
