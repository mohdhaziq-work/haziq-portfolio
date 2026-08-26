'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DarkModeContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
        <h1 style={{ color: '#e0e0e0', fontSize: '32px', fontWeight: 700 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>{'> send_message()'}</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '11px', marginBottom: '4px', fontFamily: '"JetBrains Mono", monospace' }}>{label}:</label>
                  <input style={{ width: '100%', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#e0e0e0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: '"JetBrains Mono", monospace' }} />
                </div>
              ))}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#444', fontSize: '11px', marginBottom: '4px', fontFamily: '"JetBrains Mono", monospace' }}>Message:</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#e0e0e0', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"JetBrains Mono", monospace' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '12px', background: '#e0e0e0', color: '#0d0d0d', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace' }}>{'> submit()'}</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <p style={{ color: '#22c55e', fontSize: '14px', fontFamily: '"JetBrains Mono", monospace', marginBottom: '8px' }}>{'> message.sent()'}</p>
              <p style={{ color: '#555', fontSize: '12px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '15px', fontWeight: 600, marginBottom: '18px' }}>{'> get_info()'}</h2>
          {[
            { label: 'email', value: 'hello@darkmode.studio' },
            { label: 'phone', value: '+91 98765 43210' },
            { label: 'location', value: 'India' },
            { label: 'hours', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <p style={{ color: '#444', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', marginBottom: '2px' }}>{item.label}:</p>
              <p style={{ color: '#e0e0e0', fontSize: '13px', fontWeight: 500 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/dark-mode" style={{ padding: '12px 24px', color: '#666', fontSize: '12px', textDecoration: 'none', borderRadius: '6px', border: '1px solid #333' }}>Back Home</Link>
      </div>
    </div>
  )
}
