'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BrutalismHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: '#f5f0e8', fontFamily: '"Space Mono", monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#ffffff',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0 #000000',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-2" style={{ background: '#ff3e3e', border: '3px solid #000' }}>
                <span className="text-xs font-bold tracking-widest uppercase text-white">Brutalism</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#000', lineHeight: 1.1, letterSpacing: '-2px' }}>
                RAW.<br />BOLD.<br />UNFILTERED.
              </h1>
              <p className="text-sm md:text-base" style={{ color: '#333', maxWidth: '500px', margin: '0 auto' }}>
                No polish. No pretense. Just honest, bold design that hits you in the face. Typography as art. Contrast as statement.
              </p>
            </div>

            {/* Brutal Tabs */}
            <div className="flex gap-0 mb-6">
              {['MANIFESTO', 'RULES', 'EXAMPLES'].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="flex-1 py-3 text-xs font-bold transition-all"
                  style={{
                    background: activeTab === i ? '#000' : '#fff',
                    color: activeTab === i ? '#fff' : '#000',
                    border: '3px solid #000',
                    marginLeft: i > 0 ? '-3px' : 0,
                    zIndex: activeTab === i ? 10 : 0,
                    position: 'relative',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6" style={{ border: '3px solid #000', background: '#fff' }}>
              {activeTab === 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#000' }}>THE MANIFESTO</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#333' }}>
                    Brutalism rejects the polished, corporate aesthetic. It embraces raw HTML, system fonts, and stark contrast.
                    It says: content matters more than decoration. Function over form. Truth over beauty.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#333' }}>
                    In a world of rounded corners and gentle gradients, Brutalism is a rebellion. It demands attention.
                    It refuses to blend in. It is honest design.
                  </p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#000' }}>THE RULES</h2>
                  <ul className="space-y-3">
                    {['No rounded corners', 'System fonts only', 'Maximum contrast', 'Raw HTML structure', 'No decorative elements', 'Content first, always'].map((rule, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm" style={{ color: '#333' }}>
                        <span className="w-6 h-6 flex items-center justify-center text-xs font-bold" style={{ background: '#ff3e3e', color: '#fff', border: '2px solid #000' }}>{i + 1}</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#000' }}>EXAMPLES</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {['Bloomberg', 'Craigslist', 'Wikipedia', 'Hacker News'].map((site, i) => (
                      <div key={i} className="p-3 text-center" style={{ border: '2px solid #000', background: i % 2 === 0 ? '#ff3e3e' : '#ffd93d', color: i % 2 === 0 ? '#fff' : '#000' }}>
                        <p className="text-xs font-bold">{site}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Brutal Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              {['CLICK ME', 'NO, ME', 'PICK ME'].map((label, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredBtn(i)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="px-6 py-3 text-sm font-bold transition-all"
                  style={{
                    background: hoveredBtn === i ? '#ff3e3e' : '#fff',
                    color: hoveredBtn === i ? '#fff' : '#000',
                    border: '3px solid #000',
                    boxShadow: hoveredBtn === i ? 'none' : '6px 6px 0 #000',
                    transform: hoveredBtn === i ? 'translate(3px, 3px)' : 'none',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/brutalism/gallery" className="px-8 py-3 text-sm font-bold text-center" style={{ background: '#000', color: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #ff3e3e' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm font-bold text-center" style={{ background: '#fff', color: '#000', border: '3px solid #000' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#000' }}>WHY BRUTALISM?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'HONESTY', desc: 'No hidden tricks. What you see is what you get. Raw content without decoration.', color: '#ff3e3e' },
              { title: 'SPEED', desc: 'No heavy images, no complex animations. Pure HTML and CSS loads instantly.', color: '#ffd93d' },
              { title: 'IMPACT', desc: 'Impossible to ignore. Bold typography and stark contrast demand attention.', color: '#4ecdc4' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: '#fff', border: '3px solid #000', boxShadow: '6px 6px 0 #000' }}>
                <div className="w-8 h-8 mb-3 flex items-center justify-center text-xs font-bold" style={{ background: f.color, border: '2px solid #000' }}>
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: '#000' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-6 py-3 text-sm font-bold" style={{ background: '#fff', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
