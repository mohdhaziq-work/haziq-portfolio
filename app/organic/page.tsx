'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function OrganicHome() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0f7f0', fontFamily: '"Nunito", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16" onMouseMove={handleMouseMove}>
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#ffffff',
            borderRadius: '32px',
            boxShadow: '0 4px 30px rgba(0,100,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Organic blob that follows cursor */}
            <div className="absolute pointer-events-none" style={{
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(46,204,113,0.15) 0%, transparent 70%)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.5s ease, top 0.5s ease',
            }} />

            <div className="relative z-10 text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: '#2ecc7120',
                borderRadius: '9999px',
              }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#27ae60' }}>Organic Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2d5a27' }}>
                Nature Inspired
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#6b8a65' }}>
                Soft curves, natural shapes, and earthy tones. Design that feels alive and connected to nature.
              </p>
            </div>

            {/* Organic Shapes */}
            <div className="flex justify-center gap-6 mb-8">
              {[
                { radius: '60% 40% 30% 70% / 60% 30% 70% 40%', color: '#2ecc71' },
                { radius: '30% 70% 70% 30% / 30% 30% 70% 70%', color: '#27ae60' },
                { radius: '50% 50% 30% 70% / 40% 60% 40% 60%', color: '#1abc9c' },
              ].map((shape, i) => (
                <div key={i} className="w-20 h-20" style={{
                  background: `${shape.color}30`,
                  borderRadius: shape.radius,
                  border: `2px solid ${shape.color}40`,
                }} />
              ))}
            </div>

            {/* Organic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Curves', desc: 'No sharp corners. Everything flows with natural, organic curves.', color: '#2ecc71' },
                { title: 'Texture', desc: 'Natural textures like wood, stone, and leaves add warmth.', color: '#27ae60' },
                { title: 'Growth', desc: 'Elements that feel like they grow and evolve naturally.', color: '#1abc9c' },
              ].map((f, i) => (
                <div key={i} className="p-5" style={{ background: '#f0f7f0', borderRadius: '24px' }}>
                  <div className="w-10 h-10 mb-3" style={{
                    background: `${f.color}20`,
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  }} />
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#2d5a27' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b8a65' }}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/organic/gallery" className="px-8 py-3 text-sm font-bold text-center text-white" style={{ background: '#27ae60', borderRadius: '9999px' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#6b8a65', border: '1px solid #c8e6c9', borderRadius: '9999px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#a5d6a7' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
