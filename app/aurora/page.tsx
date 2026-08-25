'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AuroraHome() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(t => t + 1), 50)
    return () => clearInterval(interval)
  }, [])
  if (!mounted) return null

  const hue1 = (time * 0.5) % 360
  const hue2 = (time * 0.3 + 120) % 360
  const hue3 = (time * 0.2 + 240) % 360

  return (
    <div className="min-h-screen" style={{ background: '#0a0a1a', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* Aurora background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full" style={{
          background: `
            radial-gradient(ellipse at 20% 50%, hsla(${hue1}, 80%, 50%, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, hsla(${hue2}, 70%, 40%, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, hsla(${hue3}, 60%, 45%, 0.1) 0%, transparent 50%)
          `,
          transition: 'background 0.1s linear',
        }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: 'rgba(10,10,26,0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: `hsla(${hue1}, 80%, 50%, 0.2)`,
                borderRadius: '9999px',
                border: `1px solid hsla(${hue1}, 80%, 50%, 0.3)`,
              }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: `hsl(${hue1}, 80%, 70%)` }}>Aurora Design</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light mb-4" style={{
                background: `linear-gradient(135deg, hsl(${hue1}, 80%, 70%), hsl(${hue2}, 70%, 60%), hsl(${hue3}, 60%, 65%))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Northern Lights
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#8888aa' }}>
                Flowing, ethereal colors inspired by the aurora borealis. Living gradients that shift and dance.
              </p>
            </div>

            {/* Aurora Strips */}
            <div className="h-32 mb-8 rounded-2xl overflow-hidden relative">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="absolute inset-0" style={{
                  background: `linear-gradient(${90 + i * 15}deg, 
                    hsla(${(hue1 + i * 30) % 360}, 80%, 50%, 0.3) 0%,
                    hsla(${(hue2 + i * 30) % 360}, 70%, 40%, 0.2) 50%,
                    transparent 100%)`,
                  transform: `translateX(${Math.sin(time * 0.02 + i) * 20}px)`,
                  transition: 'transform 0.5s ease',
                }} />
              ))}
            </div>

            {/* Aurora Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Colors', value: 'Flowing', hue: hue1 },
                { label: 'Motion', value: 'Organic', hue: hue2 },
                { label: 'Feel', value: 'Ethereal', hue: hue3 },
              ].map((stat, i) => (
                <div key={i} className="p-4 text-center" style={{
                  background: `hsla(${stat.hue}, 60%, 30%, 0.2)`,
                  borderRadius: '16px',
                  border: `1px solid hsla(${stat.hue}, 60%, 50%, 0.2)`,
                }}>
                  <p className="text-lg font-semibold" style={{ color: `hsl(${stat.hue}, 80%, 70%)` }}>{stat.value}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#6666aa' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/aurora/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{
                background: `linear-gradient(135deg, hsl(${hue1}, 80%, 50%), hsl(${hue2}, 70%, 40%))`,
                borderRadius: '12px',
              }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#8888aa', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                All Designs
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
              { title: 'Living Color', desc: 'Colors that shift and flow like the real aurora. Never static, always moving.', hue: hue1 },
              { title: 'Ethereal Glow', desc: 'Soft, luminous effects that create a dreamlike atmosphere.', hue: hue2 },
              { title: 'Natural Motion', desc: 'Organic animations that mimic the gentle flow of northern lights.', hue: hue3 },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{
                background: 'rgba(10,10,26,0.6)',
                borderRadius: '16px',
                border: `1px solid hsla(${f.hue}, 60%, 50%, 0.2)`,
              }}>
                <div className="w-3 h-3 rounded-full mb-3" style={{ background: `hsl(${f.hue}, 80%, 60%)`, boxShadow: `0 0 10px hsla(${f.hue}, 80%, 60%, 0.5)` }} />
                <h3 className="text-sm font-semibold mb-2" style={{ color: `hsl(${f.hue}, 80%, 70%)` }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6666aa' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#6666aa' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
