'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AuroraContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(0,201,255,0.15), rgba(146,254,157,0.15))', borderRadius: '24px', border: '1px solid rgba(0,201,255,0.2)', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '18px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '6px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '6px' }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #00c9ff, #92fe9d)', color: '#0f0c29', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #00c9ff, #92fe9d)', borderRadius: '50%', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f0c29" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Message Sent!</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '6px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '22px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@aurora.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '18px' }}>
              <p style={{ color: 'rgba(0,201,255,0.6)', fontSize: '9px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/aurora" style={{ padding: '12px 28px', color: '#fff', fontSize: '13px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Back Home</Link>
      </div>
    </div>
  )
}
