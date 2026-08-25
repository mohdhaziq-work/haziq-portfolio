'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CinematicHome() {
  const [mounted, setMounted] = useState(false)
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const scenes = [
    { title: 'The Beginning', desc: 'Every great story starts with a single frame.', bg: '#1a1a1a' },
    { title: 'The Journey', desc: 'Through challenges and triumphs, we grow.', bg: '#0d1117' },
    { title: 'The Vision', desc: 'Where imagination meets reality.', bg: '#1a0a2e' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* Cinematic letterbox bars */}
      <div className="fixed top-0 left-0 right-0 h-12 z-50" style={{ background: '#000' }} />
      <div className="fixed bottom-0 left-0 right-0 h-12 z-50" style={{ background: '#000' }} />

      {/* Hero */}
      <section className="px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden" style={{ borderRadius: '4px' }}>
            {/* Scene background */}
            <div className="absolute inset-0" style={{
              background: `linear-gradient(135deg, ${scenes[activeScene].bg}, #000)`,
              transition: 'background 0.5s ease',
            }} />

            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.8) 100%)',
            }} />

            <div className="relative z-10 p-8 md:p-16 text-center">
              <p className="text-xs tracking-[0.5em] uppercase mb-6" style={{ color: '#ffd700' }}>A Film By Haziq</p>
              <h1 className="text-4xl md:text-6xl font-light mb-4" style={{
                color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                letterSpacing: '4px',
              }}>
                {scenes[activeScene].title}
              </h1>
              <p className="text-sm max-w-md mx-auto mb-8" style={{ color: '#888' }}>
                {scenes[activeScene].desc}
              </p>

              {/* Scene selector - like film frames */}
              <div className="flex justify-center gap-2 mb-8">
                {scenes.map((scene, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScene(i)}
                    className="w-16 h-10 transition-all"
                    style={{
                      background: scene.bg,
                      border: activeScene === i ? '2px solid #ffd700' : '2px solid #333',
                      borderRadius: '2px',
                    }}
                  />
                ))}
              </div>

              {/* Film strip */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-3 h-5" style={{
                    background: i === 3 ? '#ffd700' : '#333',
                    borderRadius: '1px',
                  }} />
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/cinematic/gallery" className="px-8 py-3 text-sm font-light text-center tracking-widest" style={{
                  background: '#ffd700',
                  color: '#000',
                  borderRadius: '2px',
                }}>
                  Watch
                </Link>
                <Link href="/designs" className="px-8 py-3 text-sm text-center tracking-widest" style={{ color: '#888', border: '1px solid #333', borderRadius: '2px' }}>
                  All Designs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Dramatic Light', desc: 'High contrast lighting creates mood and draws focus to key elements.', color: '#ffd700' },
              { title: 'Letterbox', desc: 'Widescreen aspect ratios evoke the cinema experience.', color: '#c0c0c0' },
              { title: 'Narrative', desc: 'Every scroll reveals a new chapter in the visual story.', color: '#cd7f32' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: '#111', border: '1px solid #222' }}>
                <div className="w-2 h-2 mb-3" style={{ background: f.color }} />
                <h3 className="text-sm font-light mb-2 text-white">{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#666' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs tracking-widest" style={{ color: '#555' }}>CREDITS</Link>
        </div>
      </section>
    </div>
  )
}
