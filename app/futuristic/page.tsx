'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FuturisticHome() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(t => t + 1), 100)
    return () => clearInterval(interval)
  }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: '#050510', fontFamily: '"Orbitron", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');`}</style>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: 'linear-gradient(135deg, rgba(5,5,16,0.9), rgba(10,10,30,0.9))',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: '4px',
            position: 'relative',
          }}>
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
            <div className="absolute top-0 right-0 w-6 h-6" style={{ borderTop: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />
            <div className="absolute bottom-0 left-0 w-6 h-6" style={{ borderBottom: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
            <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />

            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
              }}>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#00d4ff' }}>Futuristic Design</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4" style={{
                color: '#00d4ff',
                textShadow: '0 0 30px rgba(0,212,255,0.5)',
                letterSpacing: '4px',
              }}>
                TOMORROW
              </h1>
              <p className="text-xs tracking-widest" style={{ color: '#4a6a7a' }}>
                SCI-FI.INTERFACES // HUD.DESIGN // FUTURE.TECH
              </p>
            </div>

            {/* HUD Data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'SYS.TIME', value: `${Math.floor(time / 10) % 24}:${String(time % 60).padStart(2, '0')}` },
                { label: 'STATUS', value: 'ONLINE' },
                { label: 'SIGNAL', value: `${95 + (time % 5)}%` },
                { label: 'MODE', value: 'ACTIVE' },
              ].map((stat, i) => (
                <div key={i} className="p-3" style={{
                  background: 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}>
                  <p className="text-[8px] tracking-widest mb-1" style={{ color: '#4a6a7a' }}>{stat.label}</p>
                  <p className="text-lg font-bold" style={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Hex Grid */}
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-10 h-10 flex items-center justify-center" style={{
                  background: `rgba(0,212,255,${0.05 + (i * 0.03)})`,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}>
                  <span className="text-[8px] font-bold" style={{ color: '#00d4ff' }}>{i + 1}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/futuristic/gallery" className="px-8 py-3 text-xs font-bold text-center tracking-widest" style={{
                background: 'rgba(0,212,255,0.2)',
                color: '#00d4ff',
                border: '1px solid rgba(0,212,255,0.4)',
                textShadow: '0 0 10px rgba(0,212,255,0.5)',
              }}>
                ENTER
              </Link>
              <Link href="/designs" className="px-8 py-3 text-xs text-center tracking-widest" style={{ color: '#4a6a7a', border: '1px solid rgba(0,212,255,0.1)' }}>
                ALL DESIGNS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'HUD ELEMENTS', desc: 'Heads-up display inspired interfaces with data readouts and system metrics.' },
              { title: 'GRID SYSTEMS', desc: 'Structured grid layouts that feel like control panels and dashboards.' },
              { title: 'GLOW EFFECTS', desc: 'Luminous accents that create depth and draw attention to key elements.' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{
                background: 'rgba(5,5,16,0.8)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}>
                <div className="w-2 h-2 mb-3" style={{ background: '#00d4ff', boxShadow: '0 0 10px #00d4ff' }} />
                <h3 className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#00d4ff' }}>{f.title}</h3>
                <p className="text-[10px] leading-relaxed" style={{ color: '#4a6a7a' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-[10px] tracking-widest" style={{ color: '#4a6a7a' }}>DISCONNECT</Link>
        </div>
      </section>
    </div>
  )
}
