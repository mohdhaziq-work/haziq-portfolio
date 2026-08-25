'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MinimalismHome() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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
    <div className="min-h-screen" style={{ background: '#fafafa', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff' }}
            onMouseMove={handleMouseMove}
          >
            {/* Subtle cursor follower */}
            <div className="absolute w-64 h-64 rounded-full pointer-events-none" style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.3s ease, top 0.3s ease',
            }} />

            <div className="relative z-10 text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#999' }}>Minimalism</p>
              <h1 className="text-4xl md:text-6xl font-light mb-6" style={{ color: '#111', letterSpacing: '-1px', lineHeight: 1.1 }}>
                Less is<br /><span className="font-semibold">More</span>
              </h1>
              <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: '#888' }}>
                Strip away the unnecessary. Every element earns its place. White space is not empty — it is intentional.
              </p>
            </div>

            {/* Minimal Navigation */}
            <div className="flex justify-center gap-8 mb-12">
              {['Space', 'Type', 'Color'].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(i)}
                  className="text-sm transition-all"
                  style={{
                    color: activeSection === i ? '#111' : '#ccc',
                    fontWeight: activeSection === i ? 500 : 300,
                    borderBottom: activeSection === i ? '1px solid #111' : '1px solid transparent',
                    paddingBottom: '4px',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Content based on selection */}
            <div className="max-w-lg mx-auto mb-12">
              {activeSection === 0 && (
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6" style={{ border: '1px solid #eee' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full" style={{ background: '#111' }} />
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#888' }}>
                    White space creates breathing room. It guides the eye, establishes hierarchy, and lets content speak for itself.
                  </p>
                </div>
              )}
              {activeSection === 1 && (
                <div className="text-center">
                  <p className="text-5xl font-light mb-4" style={{ color: '#111', letterSpacing: '-2px' }}>Aa</p>
                  <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#ccc' }}>Inter / Light 300</p>
                  <p className="text-sm" style={{ color: '#888' }}>
                    Typography is the foundation. One typeface, two weights. Let the letters do the work.
                  </p>
                </div>
              )}
              {activeSection === 2 && (
                <div className="text-center">
                  <div className="flex justify-center gap-2 mb-6">
                    {['#111', '#444', '#888', '#bbb', '#eee'].map((color, i) => (
                      <div key={i} className="w-12 h-12" style={{ background: color }} />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: '#888' }}>
                    A monochromatic palette. Black, white, and grays. Color is used sparingly, only when it serves a purpose.
                  </p>
                </div>
              )}
            </div>

            {/* Minimal Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12">
              {[
                { value: '1', label: 'Font' },
                { value: '3', label: 'Colors' },
                { value: '0', label: 'Shadows' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-light" style={{ color: '#111' }}>{stat.value}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: '#ccc' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/minimalism/gallery" className="px-8 py-3 text-sm font-medium text-center" style={{ background: '#111', color: '#fff' }}>
                Explore
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm font-light text-center" style={{ color: '#888', border: '1px solid #eee' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Intentional', desc: 'Every element has a reason to exist. If it does not serve a purpose, it does not belong.' },
              { num: '02', title: 'Restrained', desc: 'Restraint is strength. The courage to leave things out creates clarity and focus.' },
              { num: '03', title: 'Timeless', desc: 'Minimal design does not age. It remains relevant because it never followed trends.' },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-xs tracking-[0.3em] mb-3" style={{ color: '#ccc' }}>{f.num}</p>
                <h3 className="text-lg font-medium mb-3" style={{ color: '#111' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#999' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs tracking-[0.2em] uppercase" style={{ color: '#ccc' }}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
