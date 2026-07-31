'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NeomorphismHome() {
  const [mounted, setMounted] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)
  const [sliderVal, setSliderVal] = useState(60)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const bg = '#e0e5ec'
  const sl = '#ffffff'
  const sd = '#a3b1c6'
  const accent = '#6c63ff'

  const neuRaised = {
    background: bg,
    boxShadow: `8px 8px 16px ${sd}, -8px -8px 16px ${sl}`,
    borderRadius: '24px',
  }
  const neuInset = {
    background: bg,
    boxShadow: `inset 4px 4px 8px ${sd}, inset -4px -4px 8px ${sl}`,
    borderRadius: '16px',
  }
  const neuBtn = {
    background: bg,
    boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`,
    borderRadius: '12px',
    color: '#4a5568',
    fontWeight: 600,
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={neuRaised}>
            <div className="p-6 md:p-8 mb-8 rounded-2xl" style={{
              background: `linear-gradient(135deg, ${accent}, #8b5cf6)`,
              boxShadow: `0 8px 24px ${accent}40`,
            }}>
              <div className="text-center">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full" style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(4px)',
                }}>
                  <span className="text-xs font-bold tracking-widest uppercase text-white/90">Neumorphic Design</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white" style={{ letterSpacing: '-1px' }}>
                  Soft &amp; Raised
                </h1>
                <p className="text-base md:text-lg text-white/80">
                  Interfaces that feel like they are pressed into soft plastic. Gentle shadows create depth without harshness.
                </p>
              </div>
            </div>

            {/* Interactive Controls */}
            <h2 className="text-xl font-bold text-center mb-6" style={{ color: '#4a5568' }}>Interactive Controls</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {/* Toggle 1 */}
              <div className="p-4" style={neuInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#6b7280' }}>Toggle Switch</p>
                <div className="flex justify-center">
                  <button onClick={() => setToggle1(!toggle1)} className="w-16 h-9 rounded-full relative" style={{
                    background: bg,
                    boxShadow: `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}`,
                    transition: 'all 0.3s ease',
                  }}>
                    <div className="absolute top-1 w-7 h-7 rounded-full transition-all" style={{
                      left: toggle1 ? '32px' : '4px',
                      background: toggle1 ? accent : '#a0aec0',
                      boxShadow: toggle1 ? `0 2px 6px ${accent}60` : `2px 2px 4px ${sd}, -2px -2px 4px ${sl}`,
                    }} />
                  </button>
                </div>
                <p className="text-[10px] mt-2 text-center" style={{ color: '#a0aec0' }}>{toggle1 ? 'Active' : 'Inactive'}</p>
              </div>

              {/* Toggle 2 */}
              <div className="p-4" style={neuInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#6b7280' }}>Power Switch</p>
                <div className="flex justify-center">
                  <button onClick={() => setToggle2(!toggle2)} className="w-16 h-9 rounded-full relative" style={{
                    background: bg,
                    boxShadow: `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}`,
                    transition: 'all 0.3s ease',
                  }}>
                    <div className="absolute top-1 w-7 h-7 rounded-full transition-all" style={{
                      left: toggle2 ? '32px' : '4px',
                      background: toggle2 ? '#48bb78' : '#a0aec0',
                      boxShadow: toggle2 ? '0 2px 6px #48bb7860' : `2px 2px 4px ${sd}, -2px -2px 4px ${sl}`,
                    }} />
                  </button>
                </div>
                <p className="text-[10px] mt-2 text-center" style={{ color: '#a0aec0' }}>{toggle2 ? 'ON' : 'OFF'}</p>
              </div>

              {/* Slider */}
              <div className="p-4" style={neuInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#6b7280' }}>Brightness</p>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={e => setSliderVal(parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${accent} ${sliderVal}%, #a3b1c6 ${sliderVal}%)`,
                      boxShadow: `inset 2px 2px 4px ${sd}, inset -2px -2px 4px ${sl}`,
                    }}
                  />
                  <p className="text-[10px] mt-2 text-center" style={{ color: '#a0aec0' }}>{sliderVal}%</p>
                </div>
              </div>

              {/* Circular Button */}
              <div className="p-4" style={neuInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#6b7280' }}>Play Button</p>
                <div className="flex justify-center">
                  <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{
                    background: bg,
                    boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={accent} stroke="none">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Status Dots */}
              <div className="p-4" style={neuInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#6b7280' }}>Status</p>
                <div className="flex justify-center gap-4">
                  {[{ c: '#48bb78', l: 'OK' }, { c: '#ecc94b', l: 'Warn' }, { c: '#f56565', l: 'Err' }].map((d, i) => (
                    <div key={i} className="text-center">
                      <div className="w-5 h-5 rounded-full" style={{
                        background: bg,
                        boxShadow: `inset 2px 2px 4px ${sd}, inset -2px -2px 4px ${sl}`,
                        position: 'relative',
                      }}>
                        <div className="absolute inset-1 rounded-full" style={{ background: d.c, boxShadow: `0 0 6px ${d.c}60` }} />
                      </div>
                      <p className="text-[8px] mt-1" style={{ color: '#a0aec0' }}>{d.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clock */}
              <div className="p-4" style={neuInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#6b7280' }}>Clock</p>
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full relative" style={{
                    background: bg,
                    boxShadow: `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}`,
                  }}>
                    <div className="absolute inset-1 rounded-full" style={{
                      background: bg,
                      boxShadow: `3px 3px 6px ${sd}, -3px -3px 6px ${sl}`,
                    }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[10px] font-bold" style={{ color: accent }}>
                          {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/neomorphism/about" className="px-8 py-3 rounded-xl font-bold text-center text-white" style={{
                background: `linear-gradient(135deg, ${accent}, #8b5cf6)`,
                boxShadow: `0 4px 12px ${accent}40`,
              }}>
                Explore Design
              </Link>
              <Link href="/neomorphism/gallery" className="px-8 py-3 rounded-xl font-bold text-center" style={neuBtn}>
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#4a5568' }}>Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Soft Extrusion', desc: 'Elements appear to be pressed into or raised from a soft surface, creating gentle depth without harsh edges.', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { title: 'Subtle Shadows', desc: 'Dual light and dark shadows create a soft 3D effect that feels tactile and approachable without being loud.', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707' },
              { title: 'Minimal Contrast', desc: 'Low contrast between elements and backgrounds creates a calm, unified aesthetic that is easy on the eyes.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z' },
            ].map((f, i) => (
              <div key={i} className="p-6" style={neuRaised}>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{
                  background: bg,
                  boxShadow: `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}`,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#4a5568' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#718096' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-6 py-3 rounded-xl font-semibold text-sm" style={neuBtn}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
