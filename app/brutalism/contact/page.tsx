'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BrutalismContact() {
  const [mounted, setMounted] = useState(false)
  const [sent, setSent] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0 #000', padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-2px' }}>CONTACT</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #000', padding: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '20px' }}>SEND MESSAGE</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, marginBottom: '6px' }}>{label}</label>
                  <input style={{ width: '100%', padding: '10px 12px', border: '3px solid #000', fontSize: '12px', outline: 'none', boxSizing: 'border-box', background: '#f5f0e8' }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, marginBottom: '6px' }}>Message</label>
                <textarea rows={4} style={{ width: '100%', padding: '10px 12px', border: '3px solid #000', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: '#f5f0e8' }} />
              </div>
              <button onClick={() => setSent(true)} style={{
                width: '100%', padding: '12px', background: '#ff3e3e', color: '#fff',
                border: '3px solid #000', boxShadow: '4px 4px 0 #000', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
              }}>SEND MESSAGE</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '48px', height: '48px', background: '#000', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700 }}>SENT!</p>
              <p style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>We reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #000', padding: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>INFO</h2>
          {[
            { label: 'EMAIL', value: 'hello@brut.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'Mirzapur, India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', fontWeight: 700, color: '#999', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 700 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/brutalism" style={{ padding: '12px 28px', background: '#fff', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0 #000', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>BACK HOME</Link>
      </div>
    </div>
  )
}
