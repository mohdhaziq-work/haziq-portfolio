'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GlassContact() {
  const [mounted, setMounted] = useState(false)
  const [sent, setSent] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const glass = { background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '20px' }
  const input = { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }

  return (
    <div style={{ padding: '32px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ ...glass, padding: '32px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 700 }}>Contact</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>Get in touch</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ ...glass, padding: '28px' }}>
          <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '6px' }}>{label}</label>
                  <input style={input} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '6px' }}>Message</label>
                <textarea rows={4} style={{ ...input, resize: 'vertical' as const }} />
              </div>
              <button onClick={() => setSent(true)} style={{
                width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(78,205,196,0.3)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: '#4ecdc4', fontSize: '18px', fontWeight: 600 }}>Message Sent!</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '8px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ ...glass, padding: '28px' }}>
          <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@glassstudio.design' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'Mirzapur, India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/glassmorphism" style={{ padding: '14px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '14px', textDecoration: 'none' }}>Back Home</Link>
      </div>
    </div>
  )
}
