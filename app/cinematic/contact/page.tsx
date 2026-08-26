'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CinematicContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '6px', marginBottom: '16px' }}>CONTACT</p>
        <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 400, letterSpacing: '8px' }}>Get in Touch</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '60px' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, letterSpacing: '4px', marginBottom: '20px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginBottom: '6px', fontWeight: 300, letterSpacing: '2px', fontFamily: '"Barlow", sans-serif' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '14px', fontWeight: 300, outline: 'none', boxSizing: 'border-box', fontFamily: '"Barlow", sans-serif' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginBottom: '6px', fontWeight: 300, letterSpacing: '2px', fontFamily: '"Barlow", sans-serif' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '14px', fontWeight: 300, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: '"Barlow", sans-serif' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ padding: '14px 40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 400, cursor: 'pointer', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif', marginTop: '8px' }}>Send</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#fff', fontSize: '24px', fontWeight: 400, letterSpacing: '6px', marginBottom: '8px' }}>Sent.</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: '"Barlow", sans-serif', fontWeight: 300 }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 400, letterSpacing: '4px', marginBottom: '24px' }}>Info</h2>
          {[
            { label: 'Email', value: 'hello@cinematic.studio' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Location', value: 'India' },
            { label: 'Hours', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '4px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 300, fontFamily: '"Barlow", sans-serif' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/cinematic" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 300, textDecoration: 'none', letterSpacing: '4px', fontFamily: '"Barlow", sans-serif' }}>Back Home</Link>
      </div>
    </div>
  )
}
