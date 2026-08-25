'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CyberpunkHome() {
  const [mounted, setMounted] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [neonColor, setNeonColor] = useState('#ff00ff')
  const [scanlinePos, setScanlinePos] = useState(0)

  useEffect(() => {
    setMounted(true)
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)
    const scanInterval = setInterval(() => {
      setScanlinePos(prev => (prev + 1) % 100)
    }, 50)
    return () => { clearInterval(glitchInterval); clearInterval(scanInterval) }
  }, [])
  if (!mounted) return null

  const neonColors = ['#ff00ff', '#00ffff', '#ff3e3e', '#ffd93d', '#00ff88']

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', fontFamily: '"Orbitron", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');`}</style>

      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)`,
      }} />

      {/* Moving scanline */}
      <div className="fixed left-0 right-0 h-1 pointer-events-none z-40" style={{
        top: `${scanlinePos}%`,
        background: `linear-gradient(90deg, transparent, ${neonColor}40, transparent)`,
        boxShadow: `0 0 20px ${neonColor}30`,
      }} />

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%)',
            border: `2px solid ${neonColor}60`,
            boxShadow: `0 0 30px ${neonColor}20, inset 0 0 30px ${neonColor}05`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: `2px solid ${neonColor}`, borderLeft: `2px solid ${neonColor}` }} />
            <div className="absolute top-0 right-0 w-8 h-8" style={{ borderTop: `2px solid ${neonColor}`, borderRight: `2px solid ${neonColor}` }} />
            <div className="absolute bottom-0 left-0 w-8 h-8" style={{ borderBottom: `2px solid ${neonColor}`, borderLeft: `2px solid ${neonColor}` }} />
            <div className="absolute bottom-0 right-0 w-8 h-8" style={{ borderBottom: `2px solid ${neonColor}`, borderRight: `2px solid ${neonColor}` }} />

            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: `${neonColor}15`,
                border: `1px solid ${neonColor}40`,
              }}>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: neonColor }}>Cyberpunk Design</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-3" style={{
                color: neonColor,
                textShadow: `0 0 20px ${neonColor}80, 0 0 40px ${neonColor}40, 0 0 80px ${neonColor}20`,
                transform: glitchActive ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : 'none',
                transition: glitchActive ? 'none' : 'transform 0.1s',
              }}>
                NEON CITY
              </h1>
              <p className="text-xs md:text-sm" style={{ color: '#888', letterSpacing: '2px' }}>
                FUTURE.IS.NOW // DIGITAL.REVOLUTION // NEON.DREAMS
              </p>
            </div>

            {/* Neon Color Picker */}
            <h2 className="text-xs font-bold text-center mb-4 tracking-widest" style={{ color: neonColor }}>Choose Neon</h2>
            <div className="flex justify-center gap-3 mb-8">
              {neonColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setNeonColor(color)}
                  className="w-10 h-10 rounded-full transition-all"
                  style={{
                    background: color,
                    boxShadow: neonColor === color ? `0 0 20px ${color}80, 0 0 40px ${color}40` : `0 0 10px ${color}40`,
                    border: neonColor === color ? `2px solid #fff` : `2px solid ${color}60`,
                    transform: neonColor === color ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* Cyber Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'THREAT LEVEL', value: 'MAX', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
                { label: 'SIGNAL', value: '99.9%', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0' },
                { label: 'UPTIME', value: '24/7', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                { label: 'FIREWALL', value: 'ACTIVE', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              ].map((stat, i) => (
                <div key={i} className="p-4 text-center" style={{
                  background: `${neonColor}08`,
                  border: `1px solid ${neonColor}30`,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={neonColor} strokeWidth="2" strokeLinecap="round" className="mx-auto mb-2">
                    <path d={stat.icon} />
                  </svg>
                  <p className="text-lg font-black" style={{ color: neonColor, textShadow: `0 0 10px ${neonColor}60` }}>{stat.value}</p>
                  <p className="text-[8px] mt-1 tracking-widest" style={{ color: '#666' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/cyberpunk/gallery" className="px-8 py-3 text-xs font-bold text-center tracking-widest" style={{
                background: `${neonColor}20`,
                color: neonColor,
                border: `1px solid ${neonColor}60`,
                boxShadow: `0 0 20px ${neonColor}30`,
                textShadow: `0 0 10px ${neonColor}60`,
              }}>
                JACK IN
              </Link>
              <Link href="/designs" className="px-8 py-3 text-xs font-bold text-center tracking-widest" style={{
                background: 'transparent',
                color: '#666',
                border: '1px solid #333',
              }}>
                ALL DESIGNS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold text-center mb-8 tracking-widest" style={{ color: neonColor }}>SYSTEM.MODULES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'NEON GLOW', desc: 'Luminous elements that pulse and glow against dark backgrounds. Light as a design element.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { title: 'GLITCH FX', desc: 'Digital distortion and chromatic aberration effects that create visual tension and energy.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z' },
              { title: 'HUD ELEMENTS', desc: 'Heads-up display inspired interfaces with data readouts, status bars, and system metrics.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{
                background: '#0a0a0a',
                border: `1px solid ${neonColor}30`,
                boxShadow: `0 0 15px ${neonColor}10`,
              }}>
                <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{
                  background: `${neonColor}15`,
                  border: `1px solid ${neonColor}40`,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={neonColor} strokeWidth="2" strokeLinecap="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-xs font-bold mb-2 tracking-widest" style={{ color: neonColor }}>{f.title}</h3>
                <p className="text-[10px] leading-relaxed" style={{ color: '#666' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-6 py-3 text-xs font-bold tracking-widest" style={{ background: 'transparent', color: '#666', border: '1px solid #333' }}>
            DISCONNECT
          </Link>
        </div>
      </section>
    </div>
  )
}
