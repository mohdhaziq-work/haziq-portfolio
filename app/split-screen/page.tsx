'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SplitScreenHome() {
  const [mounted, setMounted] = useState(false)
  const [splitPos, setSplitPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = ((e.clientX - rect.left) / rect.width) * 100
    setSplitPos(Math.max(20, Math.min(80, pos)))
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Hero - Split Screen */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden" style={{ borderRadius: '16px' }}>
            <div className="relative flex" style={{ height: '500px' }}
              onMouseMove={handleMouseMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              {/* Left Side */}
              <div className="flex-1 flex items-center justify-center p-8" style={{
                background: '#1a1a2e',
                width: `${splitPos}%`,
                transition: isDragging ? 'none' : 'width 0.3s ease',
              }}>
                <div className="text-center">
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#667eea' }}>Dark Side</p>
                  <h2 className="text-3xl font-bold text-white mb-3">Contrast</h2>
                  <p className="text-sm" style={{ color: '#8888aa' }}>Light meets dark. Two halves create one whole.</p>
                </div>
              </div>

              {/* Divider - Draggable */}
              <div
                className="absolute top-0 bottom-0 w-1 cursor-col-resize z-10"
                style={{ left: `${splitPos}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)}
              >
                <div className="w-full h-full" style={{ background: '#667eea' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#667eea' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
                  </svg>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1 flex items-center justify-center p-8" style={{
                background: '#f8f9fa',
                width: `${100 - splitPos}%`,
                transition: isDragging ? 'none' : 'width 0.3s ease',
              }}>
                <div className="text-center">
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#e74c3c' }}>Light Side</p>
                  <h2 className="text-3xl font-bold mb-3" style={{ color: '#1a1a2e' }}>Balance</h2>
                  <p className="text-sm" style={{ color: '#6b7280' }}>Two perspectives, one powerful message.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: '#9ca3af' }}>Drag the divider to adjust the split</p>

          {/* Split Features */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { title: 'Duality', desc: 'Two contrasting sides create visual tension and interest.', side: 'left', color: '#667eea' },
              { title: 'Balance', desc: 'Equal weight on both sides creates harmony.', side: 'right', color: '#e74c3c' },
              { title: 'Focus', desc: 'Each side has a clear purpose and message.', side: 'left', color: '#667eea' },
              { title: 'Impact', desc: 'The contrast between sides makes both stronger.', side: 'right', color: '#e74c3c' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{
                background: f.side === 'left' ? '#1a1a2e' : '#f8f9fa',
                borderRadius: '12px',
              }}>
                <div className="w-2 h-2 mb-3" style={{ background: f.color, borderRadius: '50%' }} />
                <h3 className="text-sm font-semibold mb-2" style={{ color: f.side === 'left' ? '#fff' : '#1a1a2e' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: f.side === 'left' ? '#8888aa' : '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/split-screen/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{ background: '#667eea', borderRadius: '12px' }}>
              View Gallery
            </Link>
            <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
              All Designs
            </Link>
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
