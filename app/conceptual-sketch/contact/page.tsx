'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConceptualSketchContact() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 400 }}>Contact</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fff', border: '2px dashed #ccc', borderRadius: '8px', padding: '22px' }}>
          <h2 style={{ color: '#333', fontSize: '20px', fontWeight: 400, marginBottom: '16px' }}>Send Message</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#999', fontSize: '12px', marginBottom: '6px', fontWeight: 400 }}>{label}</label>
                  <input style={{ width: '100%', padding: '12px 14px', background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '6px', color: '#333', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Architects Daughter", cursive' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#999', fontSize: '12px', marginBottom: '6px', fontWeight: 400 }}>Message</label>
                <textarea rows={3} style={{ width: '100%', padding: '12px 14px', background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '6px', color: '#333', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: '"Architects Daughter", cursive' }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: '100%', padding: '14px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 400, cursor: 'pointer' }}>Send Message</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#333', fontSize: '24px', fontWeight: 400, marginBottom: '8px' }}>Sent!</p>
              <p style={{ color: '#999', fontSize: '14px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '22px' }}>
          <h2 style={{ color: '#333', fontSize: '20px', fontWeight: 400, marginBottom: '20px' }}>Info</h2>
          {[
            { label: 'EMAIL', value: 'hello@sketch.studio' },
            { label: 'PHONE', value: '+91 98765 43210' },
            { label: 'LOCATION', value: 'India' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ color: '#bbb', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ color: '#333', fontSize: '15px', fontWeight: 400 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/conceptual-sketch" style={{ padding: '12px 28px', color: '#666', fontSize: '16px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px', border: '2px dashed #ccc' }}>Back Home</Link>
      </div>
    </div>
  )
}
