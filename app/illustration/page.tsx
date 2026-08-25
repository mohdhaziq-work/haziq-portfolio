'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function IllustrationHome() {
  const [mounted, setMounted] = useState(false)
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const scenes = [
    { name: 'Workspace', bg: '#fef3c7', accent: '#f59e0b' },
    { name: 'Nature', bg: '#d1fae5', accent: '#10b981' },
    { name: 'City', bg: '#dbeafe', accent: '#3b82f6' },
  ]

  const current = scenes[activeScene]

  return (
    <div className="min-h-screen" style={{ background: current.bg, transition: 'background 0.5s ease', fontFamily: '"Nunito", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{ background: `${current.accent}20`, borderRadius: '9999px' }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: current.accent }}>Illustration-Heavy</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#1f2937' }}>
                Drawn by Hand
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#6b7280' }}>
                Custom illustrations as the primary design element. Unique, memorable, and full of personality.
              </p>
            </div>

            {/* Scene Selector */}
            <div className="flex justify-center gap-3 mb-8">
              {scenes.map((scene, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScene(i)}
                  className="px-4 py-2 text-xs font-bold transition-all"
                  style={{
                    background: activeScene === i ? current.accent : '#f3f4f6',
                    color: activeScene === i ? '#fff' : '#6b7280',
                    borderRadius: '9999px',
                  }}
                >
                  {scene.name}
                </button>
              ))}
            </div>

            {/* SVG Illustration */}
            <div className="flex justify-center mb-8">
              <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
                {/* Desk */}
                <rect x="50" y="120" width="200" height="8" rx="4" fill={current.accent} opacity="0.3" />
                {/* Monitor */}
                <rect x="100" y="50" width="100" height="70" rx="8" fill={current.accent} opacity="0.2" />
                <rect x="108" y="58" width="84" height="54" rx="4" fill={current.accent} opacity="0.1" />
                <rect x="140" y="120" width="20" height="8" rx="2" fill={current.accent} opacity="0.3" />
                {/* Coffee cup */}
                <rect x="220" y="100" width="20" height="20" rx="4" fill={current.accent} opacity="0.4" />
                <path d="M240 105 Q250 110 240 115" stroke={current.accent} strokeWidth="2" opacity="0.3" fill="none" />
                {/* Plant */}
                <rect x="60" y="100" width="15" height="20" rx="3" fill={current.accent} opacity="0.3" />
                <circle cx="67" cy="95" r="12" fill={current.accent} opacity="0.2" />
                <circle cx="60" cy="90" r="8" fill={current.accent} opacity="0.15" />
                {/* Floating elements */}
                <circle cx="80" cy="40" r="6" fill={current.accent} opacity="0.2" />
                <circle cx="240" cy="50" r="4" fill={current.accent} opacity="0.15" />
                <rect x="260" y="70" width="8" height="8" rx="2" fill={current.accent} opacity="0.2" transform="rotate(45 264 74)" />
              </svg>
            </div>

            {/* Illustration Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Characters', desc: 'Unique characters that represent your brand personality and connect with users.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { title: 'Scenes', desc: 'Full scene illustrations that tell your brand story in a single visual.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { title: 'Icons', desc: 'Custom icon sets that match your illustration style perfectly.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z' },
              ].map((f, i) => (
                <div key={i} className="p-5" style={{ background: current.bg, borderRadius: '16px' }}>
                  <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{ background: `${current.accent}20`, borderRadius: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={current.accent} strokeWidth="2" strokeLinecap="round">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#1f2937' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/illustration/gallery" className="px-8 py-3 text-sm font-bold text-center text-white" style={{ background: current.accent, borderRadius: '12px' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#9ca3af' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
