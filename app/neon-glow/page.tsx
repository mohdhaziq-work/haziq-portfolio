'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NeonGlowHome() {
  const [mounted, setMounted] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setPulse(p => (p + 1) % 100), 50)
    return () => clearInterval(interval)
  }, [])
  if (!mounted) return null

  const glowIntensity = 0.5 + Math.sin(pulse * 0.1) * 0.3

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#0a0a0a',
            border: '1px solid #1a1a1a',
            borderRadius: '16px',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: 'rgba(255,0,255,0.1)',
                border: '1px solid rgba(255,0,255,0.3)',
                borderRadius: '9999px',
              }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#ff00ff' }}>Neon Glow</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{
                color: '#ff00ff',
                textShadow: `0 0 ${20 * glowIntensity}px rgba(255,0,255,${glowIntensity}), 0 0 ${40 * glowIntensity}px rgba(255,0,255,${glowIntensity * 0.5})`,
              }}>
                GLOW
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#666' }}>
                Luminous neon elements that pulse and glow against dark backgrounds. Electric, bold, unforgettable.
              </p>
            </div>

            {/* Neon Text Samples */}
            <div className="space-y-6 mb-8">
              {[
                { text: 'Electric', color: '#ff00ff' },
                { text: 'Vibrant', color: '#00ffff' },
                { text: 'Radiant', color: '#ff3e3e' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold" style={{
                    color: item.color,
                    textShadow: `0 0 10px ${item.color}80, 0 0 20px ${item.color}40, 0 0 40px ${item.color}20`,
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Neon Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { label: 'Magenta', color: '#ff00ff' },
                { label: 'Cyan', color: '#00ffff' },
                { label: 'Red', color: '#ff3e3e' },
                { label: 'Green', color: '#00ff88' },
              ].map((btn, i) => (
                <button key={i} className="px-6 py-3 text-sm font-bold transition-all" style={{
                  background: 'transparent',
                  color: btn.color,
                  border: `2px solid ${btn.color}`,
                  boxShadow: `0 0 10px ${btn.color}40, inset 0 0 10px ${btn.color}10`,
                  borderRadius: '4px',
                  textShadow: `0 0 10px ${btn.color}60`,
                }}>
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Neon circles */}
            <div className="flex justify-center gap-6 mb-8">
              {['#ff00ff', '#00ffff', '#ff3e3e', '#00ff88'].map((color, i) => (
                <div key={i} className="w-12 h-12 rounded-full" style={{
                  background: 'transparent',
                  border: `2px solid ${color}`,
                  boxShadow: `0 0 10px ${color}60, 0 0 20px ${color}30, inset 0 0 10px ${color}20`,
                }} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/neon-glow/gallery" className="px-8 py-3 text-sm font-bold text-center" style={{
                background: 'transparent',
                color: '#ff00ff',
                border: '2px solid #ff00ff',
                boxShadow: '0 0 20px rgba(255,0,255,0.3)',
                borderRadius: '4px',
                textShadow: '0 0 10px rgba(255,0,255,0.6)',
              }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#666', border: '1px solid #222', borderRadius: '4px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#444' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
