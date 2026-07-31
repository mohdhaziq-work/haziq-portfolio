'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SkeuomorphismHome() {
  const [mounted, setMounted] = useState(false)
  const [activeToggle, setActiveToggle] = useState(false)
  const [sliderValue, setSliderValue] = useState(65)
  const [knobRotation, setKnobRotation] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setKnobRotation(prev => (prev + 3) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const skeuoPanel = {
    background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
    boxShadow: '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 1px 0 rgba(255,255,255,0.6)',
    border: '1px solid #c4bbb2',
    borderRadius: '24px',
  }

  const skeuoInset = {
    background: 'linear-gradient(145deg, #d8d0c8, #e8e0d8)',
    boxShadow: 'inset 4px 4px 8px #b8b0a8, inset -4px -4px 8px #ffffff',
    borderRadius: '16px',
  }

  const skeuoButton = {
    background: 'linear-gradient(180deg, #8b7355 0%, #6b5540 100%)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)',
    border: '1px solid #5a4a35',
    borderRadius: '12px',
    color: '#f5f0ea',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Panel */}
          <div className="p-6 md:p-10" style={skeuoPanel}>
            {/* Leather Texture Header */}
            <div className="p-6 md:p-8 mb-8" style={{
              background: 'linear-gradient(145deg, #6b5540, #5a4a35)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
              borderRadius: '16px',
              border: '1px solid #4a3a25',
            }}>
              <div className="text-center">
                <div className="inline-block mb-4 px-4 py-1 rounded-full" style={{
                  background: 'linear-gradient(180deg, #8b7355, #6b5540)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                  border: '1px solid #5a4a35',
                }}>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#d4c4b0', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Skeuomorphic Design</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{
                  color: '#f0ebe5',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 0 40px rgba(139,115,85,0.2)',
                  fontFamily: 'Georgia, serif',
                }}>
                  Crafted with Depth
                </h1>
                <p className="text-base md:text-lg" style={{
                  color: '#c4b8a8',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}>
                  Where digital meets physical. Realistic textures, shadows, and depth that make interfaces feel alive.
                </p>
              </div>
            </div>

            {/* Interactive Skeuomorphic Controls */}
            <h2 className="text-xl font-bold mb-4 text-center" style={{
              color: '#3a2f25',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              fontFamily: 'Georgia, serif',
            }}>
              Interactive Controls
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {/* Toggle Switch */}
              <div className="p-4" style={skeuoInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#5a4f45', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>Toggle Switch</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveToggle(!activeToggle)}
                    className="w-16 h-9 rounded-full relative"
                    style={{
                      background: activeToggle
                        ? 'linear-gradient(180deg, #6b8b55, #556b40)'
                        : 'linear-gradient(180deg, #a09890, #8a8078)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.3)',
                      border: '1px solid rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      className="absolute top-1 w-7 h-7 rounded-full"
                      style={{
                        left: activeToggle ? '32px' : '4px',
                        background: 'linear-gradient(180deg, #f5f0ea, #ddd5cd)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
                        border: '1px solid #c4bbb2',
                        transition: 'left 0.3s ease',
                      }}
                    />
                  </button>
                </div>
                <p className="text-[10px] mt-2 text-center" style={{ color: '#8a7f75' }}>{activeToggle ? 'ON' : 'OFF'}</p>
              </div>

              {/* Slider / Dial */}
              <div className="p-4" style={skeuoInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#5a4f45', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>Volume Dial</p>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                      background: 'linear-gradient(145deg, #f0ebe5, #d0c8c0)',
                      boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff, inset 0 0 0 3px #c4bbb2',
                    }}>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(145deg, #8b7355, #5a4a35)',
                          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                          border: '1px solid #4a3a25',
                          transform: `rotate(${knobRotation}deg)`,
                          transition: 'transform 0.05s linear',
                        }}
                      >
                        <div className="absolute w-1 h-4 rounded-full" style={{
                          background: '#f5f0ea',
                          top: '4px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] mt-2 text-center" style={{ color: '#8a7f75' }}>Rotating</p>
              </div>

              {/* Progress Bar */}
              <div className="p-4" style={skeuoInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#5a4f45', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>Progress</p>
                <div className="px-2">
                  <div className="w-full h-6 rounded-full relative" style={{
                    background: 'linear-gradient(180deg, #c4bbb2, #d8d0c8)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.3)',
                    border: '1px solid #b0a8a0',
                  }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${sliderValue}%`,
                        background: 'linear-gradient(180deg, #8b7355, #6b5540)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.2)',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                  <p className="text-[10px] mt-1 text-center" style={{ color: '#8a7f75' }}>{sliderValue}%</p>
                </div>
              </div>

              {/* Push Button */}
              <div className="p-4" style={skeuoInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#5a4f45', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>Push Button</p>
                <div className="flex justify-center">
                  <button
                    className="w-16 h-16 rounded-full font-bold text-sm"
                    style={{
                      background: 'linear-gradient(180deg, #b85555, #8b3535)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)',
                      border: '1px solid #6b2525',
                      color: '#f5e8e8',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    REC
                  </button>
                </div>
              </div>

              {/* LED Indicator */}
              <div className="p-4" style={skeuoInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#5a4f45', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>LED Indicator</p>
                <div className="flex justify-center gap-3">
                  {['#55b855', '#b8b855', '#b85555'].map((color, i) => (
                    <div key={i} className="w-6 h-6 rounded-full" style={{
                      background: color,
                      boxShadow: `0 0 8px ${color}80, inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)`,
                      border: '1px solid rgba(0,0,0,0.2)',
                    }} />
                  ))}
                </div>
                <p className="text-[10px] mt-2 text-center" style={{ color: '#8a7f75' }}>Active</p>
              </div>

              {/* Gauge */}
              <div className="p-4" style={skeuoInset}>
                <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#5a4f45', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>Gauge Meter</p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full relative" style={{
                    background: 'linear-gradient(145deg, #f0ebe5, #d0c8c0)',
                    boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
                    border: '2px solid #c4bbb2',
                  }}>
                    {/* Gauge marks */}
                    <div className="absolute inset-1 rounded-full" style={{
                      background: 'conic-gradient(from 220deg, #8b7355 0deg, #b8a855 90deg, #b85555 140deg, transparent 140deg)',
                      opacity: 0.3,
                      borderRadius: '50%',
                    }} />
                    {/* Needle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div style={{
                        width: '2px',
                        height: '24px',
                        background: '#b85555',
                        borderRadius: '1px',
                        transformOrigin: 'bottom center',
                        transform: `rotate(${sliderValue * 2.4 - 120}deg)`,
                        transition: 'transform 0.5s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full" style={{
                        background: 'linear-gradient(145deg, #8b7355, #5a4a35)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/skeuomorphism/about" className="px-8 py-3 rounded-xl font-bold text-center" style={skeuoButton}>
                Explore Design
              </Link>
              <Link href="/skeuomorphism/gallery" className="px-8 py-3 rounded-xl font-bold text-center" style={{
                background: 'linear-gradient(180deg, #f0ebe5, #ddd5cd)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.1)',
                border: '1px solid #c4bbb2',
                color: '#5a4f45',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              }}>
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{
            color: '#3a2f25',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
            fontFamily: 'Georgia, serif',
          }}>
            Design Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Realistic Depth', desc: 'Multi-layered shadows create the illusion of physical surfaces that respond to light and touch.', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { title: 'Tactile Surfaces', desc: 'Textures and materials that feel real — leather, metal, glass, wood — bringing warmth to digital.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
              { title: 'Physical Metaphors', desc: 'Switches that toggle, buttons that press, dials that turn — every interaction mirrors the real world.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
            ].map((feature, i) => (
              <div key={i} className="p-6" style={skeuoPanel}>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{
                  background: 'linear-gradient(145deg, #8b7355, #6b5540)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)',
                  border: '1px solid #5a4a35',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{
                  color: '#3a2f25',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                  fontFamily: 'Georgia, serif',
                }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6a5f55' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-6 py-3 rounded-xl font-semibold text-sm" style={{
            background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
            boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
            border: '1px solid #c4bbb2',
            color: '#5a4f45',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
          }}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
