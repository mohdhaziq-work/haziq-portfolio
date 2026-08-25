'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GeometricHome() {
  const [mounted, setMounted] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setRotation(r => (r + 1) % 360), 50)
    return () => clearInterval(interval)
  }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff', borderRadius: '0' }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{ background: '#ff634820' }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#ff6348' }}>Geometric Design</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4" style={{ color: '#2d3436', letterSpacing: '-2px' }}>
                Shape Language
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#636e72' }}>
                Bold shapes and geometric patterns create structure, rhythm, and visual interest.
              </p>
            </div>

            {/* Rotating Geometric Pattern */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="absolute inset-0 flex items-center justify-center" style={{
                    transform: `rotate(${rotation + i * 30}deg)`,
                  }}>
                    <div style={{
                      width: 120 + i * 20,
                      height: 120 + i * 20,
                      border: `3px solid ${['#ff6348', '#ffa502', '#2ed573', '#1e90ff'][i]}`,
                      opacity: 0.3 + i * 0.15,
                      borderRadius: i % 2 === 0 ? '0' : '50%',
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Shape Grid */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[
                { shape: 'square', color: '#ff6348' },
                { shape: 'circle', color: '#ffa502' },
                { shape: 'triangle', color: '#2ed573' },
                { shape: 'diamond', color: '#1e90ff' },
                { shape: 'circle', color: '#ff6348' },
                { shape: 'square', color: '#ffa502' },
                { shape: 'diamond', color: '#2ed573' },
                { shape: 'triangle', color: '#1e90ff' },
              ].map((item, i) => (
                <div key={i} className="aspect-square flex items-center justify-center" style={{ background: `${item.color}15` }}>
                  {item.shape === 'square' && <div className="w-8 h-8" style={{ background: item.color }} />}
                  {item.shape === 'circle' && <div className="w-8 h-8 rounded-full" style={{ background: item.color }} />}
                  {item.shape === 'triangle' && (
                    <div style={{
                      width: 0, height: 0,
                      borderLeft: '16px solid transparent',
                      borderRight: '16px solid transparent',
                      borderBottom: `28px solid ${item.color}`,
                    }} />
                  )}
                  {item.shape === 'diamond' && <div className="w-6 h-6" style={{ background: item.color, transform: 'rotate(45deg)' }} />}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/geometric/gallery" className="px-8 py-3 text-sm font-bold text-center text-white" style={{ background: '#ff6348' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#636e72', border: '2px solid #dfe6e9' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs font-bold" style={{ color: '#b2bec3' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
