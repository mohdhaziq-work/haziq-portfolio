'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function RetroHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTrack, setActiveTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tracks = [
    { title: 'Summer of 69', artist: 'Classic Rock', duration: '3:45' },
    { title: 'Bohemian Rhapsody', artist: 'Opera Rock', duration: '5:55' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#f4e8d1', fontFamily: '"Playfair Display", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@400;600&display=swap');`}</style>

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#e8d5b8',
            border: '3px solid #8b7355',
            boxShadow: '0 4px 20px rgba(139,115,85,0.3)',
            position: 'relative',
          }}>
            {/* Vintage border decoration */}
            <div className="absolute inset-2 pointer-events-none" style={{ border: '1px solid #c4a882' }} />

            <div className="relative z-10 text-center mb-8">
              <div className="inline-block mb-4 px-6 py-2" style={{ background: '#8b7355', borderRadius: '2px' }}>
                <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#f4e8d1' }}>Vintage Design</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ color: '#3a2f25', letterSpacing: '-1px', lineHeight: 1 }}>
                Timeless<br />Elegance
              </h1>
              <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: '#6a5f55', fontFamily: '"Source Serif 4", serif' }}>
                Warm tones, classic typography, and nostalgic textures. Design that feels like a cherished memory.
              </p>
            </div>

            {/* Vintage Radio Player */}
            <div className="max-w-sm mx-auto mb-8 p-6" style={{
              background: '#d4c4a8',
              border: '2px solid #8b7355',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                  background: '#8b7355',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f4e8d1" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: '#3a2f25' }}>{tracks[activeTrack].title}</p>
                  <p className="text-xs" style={{ color: '#8b7355' }}>{tracks[activeTrack].artist}</p>
                </div>
                <span className="text-xs" style={{ color: '#8b7355' }}>{tracks[activeTrack].duration}</span>
              </div>

              {/* Track list */}
              <div className="space-y-1">
                {tracks.map((track, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTrack(i)}
                    className="w-full text-left px-3 py-2 text-xs transition-all"
                    style={{
                      background: activeTrack === i ? '#8b7355' : 'transparent',
                      color: activeTrack === i ? '#f4e8d1' : '#6a5f55',
                    }}
                  >
                    {track.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Vintage Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              {[
                { value: '1960s', label: 'Era' },
                { value: 'Warm', label: 'Palette' },
                { value: 'Serif', label: 'Typography' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-3" style={{ background: '#d4c4a8', border: '1px solid #c4a882' }}>
                  <p className="text-lg font-bold" style={{ color: '#3a2f25' }}>{stat.value}</p>
                  <p className="text-[10px] tracking-widest uppercase" style={{ color: '#8b7355' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/retro/gallery" className="px-8 py-3 text-sm font-bold text-center tracking-wider" style={{ background: '#8b7355', color: '#f4e8d1', border: '2px solid #6b5540' }}>
                Explore
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#8b7355', border: '2px solid #c4a882' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8" style={{ color: '#3a2f25' }}>Design Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Warm Tones', desc: 'Sepia, amber, and earth tones create a cozy, familiar feeling of days gone by.', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707' },
              { title: 'Classic Type', desc: 'Serif fonts and hand-lettered styles that evoke the golden age of print design.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { title: 'Textures', desc: 'Paper grain, film noise, and worn edges add character and authenticity.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: '#e8d5b8', border: '2px solid #c4a882' }}>
                <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{ background: '#8b7355', borderRadius: '50%' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f4e8d1" strokeWidth="2" strokeLinecap="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: '#3a2f25' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6a5f55' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs tracking-widest uppercase" style={{ color: '#8b7355' }}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
