'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function IsometricHome() {
  const [mounted, setMounted] = useState(false)
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: '#f0f4f8', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{ background: '#e74c3c20', borderRadius: '9999px' }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#e74c3c' }}>Isometric Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2d3436' }}>
                3D Perspective
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#636e72' }}>
                2D elements rendered with isometric perspective create a 3D-like effect. Depth without complexity.
              </p>
            </div>

            {/* Isometric Grid */}
            <div className="flex justify-center mb-8">
              <div className="relative" style={{ transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e']
                    const color = colors[i % colors.length]
                    const height = 20 + (i % 4) * 15
                    return (
                      <div
                        key={i}
                        onMouseEnter={() => setHoveredBlock(i)}
                        onMouseLeave={() => setHoveredBlock(null)}
                        className="w-16 h-16 cursor-pointer transition-all"
                        style={{
                          background: color,
                          transform: `translateZ(${hoveredBlock === i ? height + 20 : height}px)`,
                          boxShadow: `0 ${height}px 0 ${color}80, 0 ${height + 5}px 10px rgba(0,0,0,0.2)`,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Isometric Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '30deg', label: 'Angle' },
                { value: '3D', label: 'Effect' },
                { value: '2D', label: 'Reality' },
              ].map((stat, i) => (
                <div key={i} className="p-4 text-center" style={{ background: '#f8f9fa', borderRadius: '12px' }}>
                  <p className="text-xl font-bold" style={{ color: '#2d3436' }}>{stat.value}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#b2bec3' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/isometric/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{ background: '#e74c3c', borderRadius: '12px' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#636e72', border: '1px solid #dfe6e9', borderRadius: '12px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Depth Illusion', desc: 'Flat surfaces appear three-dimensional through careful angle and shadow placement.', color: '#e74c3c' },
              { title: 'Visual Interest', desc: 'Isometric views are inherently engaging. They draw the eye and hold attention.', color: '#3498db' },
              { title: 'Scalable', desc: 'Isometric graphics scale perfectly. No pixelation at any size.', color: '#2ecc71' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <div className="w-3 h-3 mb-3" style={{ background: f.color, borderRadius: '2px', transform: 'rotate(45deg)' }} />
                <h3 className="text-sm font-semibold mb-2" style={{ color: '#2d3436' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#636e72' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#b2bec3' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
