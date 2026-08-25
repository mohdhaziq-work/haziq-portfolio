'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GlassmorphismHome() {
  const [mounted, setMounted] = useState(false)
  const [blur, setBlur] = useState(16)
  const [opacity, setOpacity] = useState(20)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const bg = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

  return (
    <div className="min-h-screen" style={{ background: bg }}>
      {/* Floating shapes background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', top: '10%', left: '10%', filter: 'blur(40px)' }} />
        <div className="absolute w-96 h-96 rounded-full" style={{ background: 'rgba(255,100,100,0.15)', top: '50%', right: '10%', filter: 'blur(60px)' }} />
        <div className="absolute w-64 h-64 rounded-full" style={{ background: 'rgba(100,200,255,0.12)', bottom: '10%', left: '30%', filter: 'blur(50px)' }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: `rgba(255,255,255,${opacity / 100})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">Glassmorphism</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                Through the Glass
              </h1>
              <p className="text-base md:text-lg text-white/80">
                Frosted glass panels floating over colorful backgrounds. Transparency, blur, and light borders create depth.
              </p>
            </div>

            {/* Interactive Glass Controls */}
            <h2 className="text-lg font-bold text-center mb-6 text-white/90">Adjust the Glass</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Blur Control */}
              <div className="p-5" style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <p className="text-xs font-semibold mb-3 text-white/80">Blur: {blur}px</p>
                <input
                  type="range" min="0" max="40" value={blur}
                  onChange={e => setBlur(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.3)' }}
                />
              </div>

              {/* Opacity Control */}
              <div className="p-5" style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <p className="text-xs font-semibold mb-3 text-white/80">Opacity: {opacity}%</p>
                <input
                  type="range" min="5" max="50" value={opacity}
                  onChange={e => setOpacity(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.3)' }}
                />
              </div>
            </div>

            {/* Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { title: 'Transparency', desc: 'Semi-transparent backgrounds let the content behind show through.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
                { title: 'Frosted Blur', desc: 'Backdrop blur creates the frosted glass effect that softens background content.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { title: 'Light Borders', desc: 'Subtle white borders catch light and define edges without harsh lines.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              ].map((f, i) => (
                <div
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className="p-5 cursor-pointer transition-all duration-300"
                  style={{
                    background: activeCard === i ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
                    backdropFilter: `blur(${blur}px)`,
                    borderRadius: '16px',
                    border: activeCard === i ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: activeCard === i ? '0 8px 32px rgba(0,0,0,0.15)' : 'none',
                    transform: activeCard === i ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold mb-2 text-white">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-white/70">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/glassmorphism/gallery" className="px-8 py-3 text-sm font-bold text-center text-white" style={{
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.4)',
              }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm font-bold text-center text-white/80" style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-6 py-3 text-sm font-semibold text-white/80" style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
