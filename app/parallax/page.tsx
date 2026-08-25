'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ParallaxHome() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop)
      }
    }
    const container = containerRef.current
    if (container) container.addEventListener('scroll', handleScroll, { passive: true })
    return () => { if (container) container.removeEventListener('scroll', handleScroll) }
  }, [])
  if (!mounted) return null

  return (
    <div ref={containerRef} className="min-h-screen overflow-auto" style={{ fontFamily: '"Inter", sans-serif', perspective: '1px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Parallax Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: '#1a1a2e' }}>
        {/* Background layer - moves slower */}
        <div className="absolute inset-0" style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.3,
        }} />
        
        {/* Mid layer */}
        <div className="absolute inset-0" style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="absolute rounded-full" style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
              background: `rgba(255,255,255,${0.03 + i * 0.01})`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }} />
          ))}
        </div>

        {/* Foreground content */}
        <div className="relative z-10 text-center px-4" style={{
          transform: `translateY(${scrollY * -0.2}px)`,
        }}>
          <div className="inline-block mb-4 px-4 py-1.5" style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">Parallax Design</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            transform: `translateY(${scrollY * -0.4}px)`,
          }}>
            Depth in Motion
          </h1>
          <p className="text-sm text-white/60 max-w-md mx-auto" style={{
            transform: `translateY(${scrollY * -0.3}px)`,
          }}>
            Scroll to experience depth. Layers move at different speeds creating a3D illusion.
          </p>
          <div className="mt-8" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="mx-auto animate-bounce">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* Content sections with parallax */}
      {[
        { title: 'Layered Depth', desc: 'Multiple layers at different scroll speeds create the illusion of3D space on a2D screen.', color: '#667eea' },
        { title: 'Smooth Motion', desc: 'Hardware-accelerated transforms ensure buttery smooth60fps animations.', color: '#764ba2' },
        { title: 'Storytelling', desc: 'Parallax guides users through your narrative, revealing content as they scroll.', color: '#f093fb' },
      ].map((section, i) => (
        <section key={i} className="relative py-20 px-4" style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div style={{
                transform: `translateX(${Math.max(0, (scrollY - 600 - i * 400) * 0.1)}px)`,
                opacity: Math.min(1, Math.max(0, (scrollY - 500 - i * 400) / 200)),
              }}>
                <div className="w-12 h-12 mb-4 flex items-center justify-center" style={{ background: `${section.color}20`, borderRadius: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={section.color} strokeWidth="2" strokeLinecap="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a2e' }}>{section.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{section.desc}</p>
              </div>
              <div className="h-48 rounded-2xl" style={{
                background: `linear-gradient(135deg, ${section.color}40, ${section.color}10)`,
                transform: `translateX(${Math.max(0, -(scrollY - 600 - i * 400) * 0.1)}px)`,
              }} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: '#1a1a2e' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Experience the Depth</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/parallax/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{ background: '#667eea', borderRadius: '12px' }}>
              View Gallery
            </Link>
            <Link href="/designs" className="px-8 py-3 text-sm text-center text-white/60" style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px' }}>
              All Designs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
