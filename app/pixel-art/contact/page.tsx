'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PixelArtContact() {
  const [mounted, setMounted] = useState(false)
  const [sent, setSent] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const accent = '#e94560'
  const yellow = '#f5c518'
  const green = '#53d769'

  return (
    <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: `3px solid ${accent}`, padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ color: yellow, fontSize: '24px', textShadow: `2px 2px 0 ${accent}` }}>CONTACT</h1>
        <p style={{ color: '#8892b0', fontSize: '8px', marginTop: '8px' }}>Send us a message</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '24px' }}>
          <h2 style={{ color: yellow, fontSize: '10px', marginBottom: '20px' }}>SEND MESSAGE</h2>
          {!sent ? (
            <div>
              {['Your Name', 'Email', 'Subject'].map((label, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#8892b0', fontSize: '7px', marginBottom: '6px' }}>{label}</label>
                  <input style={{
                    width: '100%', padding: '10px 12px', background: '#0a0a1a',
                    border: `2px solid ${accent}30`, color: yellow, fontSize: '8px',
                    outline: 'none', boxSizing: 'border-box',
                  }} />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#8892b0', fontSize: '7px', marginBottom: '6px' }}>Message</label>
                <textarea rows={4} style={{
                  width: '100%', padding: '10px 12px', background: '#0a0a1a',
                  border: `2px solid ${accent}30`, color: yellow, fontSize: '8px',
                  outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }} />
              </div>
              <button onClick={() => setSent(true)} style={{
                width: '100%', padding: '12px', background: accent, color: yellow,
                border: `2px solid ${yellow}`, fontSize: '8px', fontWeight: 700, cursor: 'pointer',
              }}>SEND MESSAGE</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: '48px', height: '48px', background: green, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ color: green, fontSize: '10px', fontWeight: 700 }}>MESSAGE SENT!</p>
              <p style={{ color: '#8892b0', fontSize: '7px', marginTop: '8px' }}>We will reply within24 hours</p>
            </div>
          )}
        </div>

        <div style={{ background: '#16213e', border: `2px solid ${accent}30`, padding: '24px' }}>
          <h2 style={{ color: yellow, fontSize: '10px', marginBottom: '20px' }}>INFO</h2>
          {[
            { label: 'EMAIL', value: 'hello@pixelquest.studio' },
            { label: 'DISCORD', value: 'PixelQuest#8bit' },
            { label: 'TWITTER', value: '@pixelquest' },
            { label: 'HOURS', value: 'Mon-Fri 10AM-6PM' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{ color: '#8892b0', fontSize: '6px', marginBottom: '4px', letterSpacing: '2px' }}>{item.label}</p>
              <p style={{ color: yellow, fontSize: '9px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/pixel-art" style={{ padding: '12px 28px', background: '#0a0a1a', color: '#8892b0', border: `2px solid ${accent}30`, fontSize: '8px', textDecoration: 'none' }}>
          BACK HOME
        </Link>
      </div>
    </div>
  )
}
