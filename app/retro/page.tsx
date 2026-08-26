'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function RetroHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTrack, setActiveTrack] = useState(0)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tracks = [
    { title: 'Summer of 69', artist: 'Classic Rock', duration: '3:45' },
    { title: 'Bohemian Rhapsody', artist: 'Opera Rock', duration: '5:55' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
  ]

  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#e8d5b8', border: '3px solid #8b7355', padding: '32px 24px', marginBottom: '24px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: '8px', border: '1px solid #c4a882', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 20px', background: '#8b7355', marginBottom: '16px' }}>
            <span style={{ color: '#f4e8d1', fontSize: '10px', letterSpacing: '4px' }}>VINTAGE DESIGN</span>
          </div>
          <h1 style={{ color: '#3a2f25', fontSize: '44px', fontWeight: 900, marginBottom: '16px', lineHeight: 1 }}>Timeless<br />Elegance</h1>
          <p style={{ color: '#6a5f55', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Warm tones, classic typography, and nostalgic textures. Design that feels like a cherished memory.</p>
        </div>
      </div>

      {/* Radio Player */}
      <div style={{ maxWidth: '360px', margin: '0 auto 24px', padding: '20px', background: '#d4c4a8', border: '2px solid #8b7355' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#8b7355', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f4e8d1" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#3a2f25', fontSize: '14px', fontWeight: 700 }}>{tracks[activeTrack].title}</p>
            <p style={{ color: '#8b7355', fontSize: '11px' }}>{tracks[activeTrack].artist}</p>
          </div>
          <span style={{ color: '#8b7355', fontSize: '11px' }}>{tracks[activeTrack].duration}</span>
        </div>
        {tracks.map((t, i) => (
          <button key={i} onClick={() => setActiveTrack(i)} style={{
            width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: '12px', cursor: 'pointer',
            background: activeTrack === i ? '#8b7355' : 'transparent',
            color: activeTrack === i ? '#f4e8d1' : '#6a5f55', border: 'none',
          }}>{t.title}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '1960s', label: 'Era' },
          { value: 'Warm', label: 'Palette' },
          { value: 'Serif', label: 'Typography' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#d4c4a8', border: '1px solid #c4a882', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#3a2f25', fontSize: '20px', fontWeight: 700 }}>{s.value}</p>
            <p style={{ color: '#8b7355', fontSize: '10px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Warm Tones', desc: 'Sepia, amber, and earth tones create cozy feeling.' },
          { title: 'Classic Type', desc: 'Serif fonts that evoke the golden age of print.' },
          { title: 'Textures', desc: 'Paper grain and worn edges add character.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#e8d5b8', border: '2px solid #c4a882', padding: '18px' }}>
            <div style={{ width: '28px', height: '28px', background: '#8b7355', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#f4e8d1', fontSize: '12px', fontWeight: 700 }}>{i + 1}</span>
            </div>
            <h3 style={{ color: '#3a2f25', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#6a5f55', fontSize: '12px', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/retro/gallery" style={{ padding: '12px 28px', background: '#8b7355', color: '#f4e8d1', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '2px solid #6b5540' }}>View Gallery</Link>
        <Link href="/retro/about" style={{ padding: '12px 28px', color: '#8b7355', fontSize: '13px', textDecoration: 'none', border: '2px solid #c4a882' }}>Learn More</Link>
      </div>
    </div>
  )
}
