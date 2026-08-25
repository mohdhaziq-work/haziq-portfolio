'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GradientMeshHome() {
  const [mounted, setMounted] = useState(false)
  const [activePreset, setActivePreset] = useState(0)
  const [hue, setHue] = useState(240)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const presets = [
    { name: 'Ocean', colors: ['#667eea', '#764ba2', '#f093fb'], angle: 135 },
    { name: 'Sunset', colors: ['#ff6b6b', '#ffa500', '#ffd93d'], angle: 45 },
    { name: 'Forest', colors: ['#11998e', '#38ef7d', '#0cebeb'], angle: 180 },
    { name: 'Berry', colors: ['#8e2de2', '#4a00e0', '#e94560'], angle: 270 },
  ]

  const current = presets[activePreset]

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(${current.angle}deg, ${current.colors.join(', ')})`,
      transition: 'background 0.8s ease',
    }}>
      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '9999px',
              }}>
                <span className="text-xs font-bold tracking-widest uppercase text-white">Gradient Mesh</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
                Flowing Colors
              </h1>
              <p className="text-sm text-white/80 max-w-md mx-auto">
                Smooth, flowing gradients that blend multiple colors seamlessly. Modern, vibrant, and eye-catching.
              </p>
            </div>

            {/* Preset Selector */}
            <h2 className="text-sm font-bold text-center mb-4 text-white/90">Choose Palette</h2>
            <div className="flex justify-center gap-3 mb-8">
              {presets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => setActivePreset(i)}
                  className="px-4 py-2 text-xs font-bold transition-all"
                  style={{
                    background: activePreset === i ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '9999px',
                    border: activePreset === i ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Gradient Preview */}
            <div className="max-w-md mx-auto mb-8">
              <div className="h-32 rounded-2xl" style={{
                background: `linear-gradient(${current.angle}deg, ${current.colors.join(', ')})`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }} />
              <div className="flex justify-between mt-3">
                {current.colors.map((color, i) => (
                  <div key={i} className="text-center">
                    <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ background: color, border: '2px solid rgba(255,255,255,0.5)' }} />
                    <p className="text-[10px] text-white/70">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mesh Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Multi-Stop', desc: 'Gradients with3+ color stops create rich, complex color transitions.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                { title: 'Mesh Blend', desc: 'Multiple gradient layers overlap to create organic, mesh-like color fields.', icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' },
                { title: 'Dynamic', desc: 'Animated gradients that shift and flow, creating living, breathing backgrounds.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              ].map((f, i) => (
                <div key={i} className="p-5" style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/gradient-mesh/gallery" className="px-8 py-3 text-sm font-bold text-center text-white" style={{
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.4)',
              }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center text-white/80" style={{
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

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-sm text-white/60">Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
