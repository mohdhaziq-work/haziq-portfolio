'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WatercolorHome() {
  const [mounted, setMounted] = useState(false)
  const [activeColor, setActiveColor] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const palettes = [
    { name: 'Sunset', colors: ['#ff6b6b', '#ffa500', '#ffd93d', '#ff9a9e'] },
    { name: 'Ocean', colors: ['#667eea', '#764ba2', '#4facfe', '#00f2fe'] },
    { name: 'Garden', colors: ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5'] },
  ]

  const current = palettes[activeColor]

  return (
    <div className="min-h-screen" style={{ background: '#fefefe', fontFamily: '"Nunito", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{ background: '#87ceeb20', borderRadius: '9999px' }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#87ceeb' }}>Watercolor</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: '#5a6c7d' }}>
                Painted Dreams
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#8fa5b5' }}>
                Soft, painted watercolor effects that bring warmth and artistic flair to digital design.
              </p>
            </div>

            {/* Palette Selector */}
            <div className="flex justify-center gap-3 mb-8">
              {palettes.map((palette, i) => (
                <button
                  key={i}
                  onClick={() => setActiveColor(i)}
                  className="px-4 py-2 text-xs font-semibold transition-all"
                  style={{
                    background: activeColor === i ? '#5a6c7d' : '#f5f5f5',
                    color: activeColor === i ? '#fff' : '#8fa5b5',
                    borderRadius: '9999px',
                  }}
                >
                  {palette.name}
                </button>
              ))}
            </div>

            {/* Watercolor blobs */}
            <div className="flex justify-center gap-4 mb-8">
              {current.colors.map((color, i) => (
                <div key={i} className="w-20 h-20" style={{
                  background: `radial-gradient(circle, ${color}80 0%, ${color}20 70%, transparent 100%)`,
                  borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
                  filter: 'blur(2px)',
                }} />
              ))}
            </div>

            {/* Watercolor card */}
            <div className="max-w-md mx-auto mb-8 p-6" style={{
              background: `linear-gradient(135deg, ${current.colors[0]}15, ${current.colors[1]}10, ${current.colors[2]}15)`,
              borderRadius: '8px',
              border: `1px solid ${current.colors[0]}20`,
            }}>
              <p className="text-lg font-light text-center" style={{ color: '#5a6c7d' }}>
                &ldquo;Art washes away from the soul the dust of everyday life.&rdquo;
              </p>
              <p className="text-xs text-center mt-3" style={{ color: '#8fa5b5' }}>Pablo Picasso</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/watercolor/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{
                background: `linear-gradient(135deg, ${current.colors[0]}, ${current.colors[1]})`,
                borderRadius: '9999px',
              }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#8fa5b5', border: '1px solid #e8eff5', borderRadius: '9999px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#c5d5e0' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
