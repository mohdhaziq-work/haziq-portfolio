'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AbstractHome() {
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
    <div className="min-h-screen" style={{ background: '#1a1a2e', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16" onMouseMove={handleMouseMove}>
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10 relative overflow-hidden" style={{
            background: '#16213e',
            borderRadius: '24px',
            border: '1px solid #0f3460',
          }}>
            {/* Abstract background that follows mouse */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-64 h-64 rounded-full" style={{
                background: 'radial-gradient(circle, rgba(233,69,96,0.2) 0%, transparent 70%)',
                left: `${mousePos.x}%`,
                top: `${mousePos.y}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.3s ease, top 0.3s ease',
              }} />
              <div className="absolute w-48 h-48 rounded-full" style={{
                background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
                left: `${100 - mousePos.x}%`,
                top: `${100 - mousePos.y}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.5s ease, top 0.5s ease',
              }} />
            </div>

            <div className="relative z-10 text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: 'rgba(233,69,96,0.15)',
                borderRadius: '9999px',
                border: '1px solid rgba(233,69,96,0.3)',
              }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#e94560' }}>Abstract Art</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light mb-4" style={{ color: '#eee' }}>
                Beyond<br /><span className="font-bold" style={{ color: '#e94560' }}>Form</span>
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#8892b0' }}>
                Non-representational artistic expression. Shapes, colors, and forms that exist for their own sake.
              </p>
            </div>

            {/* Abstract shapes */}
            <div className="flex justify-center gap-6 mb-8">
              {[
                { shape: 'circle', color: '#e94560', size: 60 },
                { shape: 'square', color: '#667eea', size: 50 },
                { shape: 'triangle', color: '#ffd93d', size: 55 },
                { shape: 'circle', color: '#00ff88', size: 40 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center" style={{
                  width: item.size,
                  height: item.size,
                  background: `${item.color}30`,
                  borderRadius: item.shape === 'circle' ? '50%' : item.shape === 'square' ? '8px' : '0',
                  border: `2px solid ${item.color}50`,
                  transform: item.shape === 'triangle' ? 'rotate(45deg)' : 'none',
                }} />
              ))}
            </div>

            {/* Abstract grid */}
            <div className="grid grid-cols-3 gap-2 mb-8 max-w-xs mx-auto">
              {Array.from({ length: 9 }).map((_, i) => {
                const colors = ['#e94560', '#667eea', '#ffd93d', '#00ff88', '#ff6b6b', '#4facfe', '#a8e6cf', '#dda0dd', '#ffa07a']
                return (
                  <div key={i} className="aspect-square" style={{
                    background: `${colors[i]}20`,
                    borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '8px' : '0',
                    border: `1px solid ${colors[i]}30`,
                  }} />
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/abstract/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{
                background: '#e94560',
                borderRadius: '12px',
              }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#8892b0', border: '1px solid #0f3460', borderRadius: '12px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#4a5568' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
