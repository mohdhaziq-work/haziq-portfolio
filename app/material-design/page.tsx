'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MaterialDesignHome() {
  const [mounted, setMounted] = useState(false)
  const [elevation, setElevation] = useState(4)
  const [activeChip, setActiveChip] = useState(0)
  const [fabHover, setFabHover] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const getElevation = (level: number) => {
    const shadows = [
      'none',
      '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    ]
    return shadows[Math.min(level,5)]
  }

  return (
    <div className="min-h-screen" style={{ background: '#fafafa', fontFamily: '"Roboto", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: getElevation(elevation),
            transition: 'box-shadow 0.3s ease',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: '#4285f420',
                borderRadius: '9999px',
              }}>
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#4285f4' }}>Material Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#202124' }}>
                Material World
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#5f6368' }}>
                Google design language. Elevation, motion, and bold graphic elements create a unified visual language.
              </p>
            </div>

            {/* Elevation Control */}
            <div className="max-w-xs mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ color: '#5f6368' }}>Elevation</span>
                <span className="text-xs font-bold" style={{ color: '#4285f4' }}>dp {elevation}</span>
              </div>
              <input
                type="range" min="0" max="5" value={elevation}
                onChange={e => setElevation(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #4285f4 ${elevation * 20}%, #dadce0 ${elevation * 20}%)` }}
              />
            </div>

            {/* Material Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Elevation', desc: 'Shadows communicate depth. Higher elevation means closer to the user.', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', color: '#4285f4' },
                { title: 'Motion', desc: 'Animations are meaningful. They guide users and provide feedback.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#34a853' },
                { title: 'Color', desc: 'Bold, intentional color choices create hierarchy and brand identity.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', color: '#fbbc04' },
              ].map((f, i) => (
                <div key={i} className="p-5" style={{ background: '#ffffff', borderRadius: '12px', boxShadow: getElevation(2) }}>
                  <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{ background: `${f.color}20`, borderRadius: '50%' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: '#202124' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#5f6368' }}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Material Chips */}
            <h2 className="text-sm font-medium text-center mb-4" style={{ color: '#5f6368' }}>Filter by Category</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['All', 'Design', 'Development', 'Marketing', 'Analytics'].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => setActiveChip(i)}
                  className="px-4 py-2 text-xs font-medium transition-all"
                  style={{
                    background: activeChip === i ? '#4285f4' : '#ffffff',
                    color: activeChip === i ? '#ffffff' : '#5f6368',
                    borderRadius: '9999px',
                    border: activeChip === i ? 'none' : '1px solid #dadce0',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Material Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <button className="px-6 py-3 text-sm font-medium text-white" style={{ background: '#4285f4', borderRadius: '4px', boxShadow: getElevation(2) }}>
                Contained
              </button>
              <button className="px-6 py-3 text-sm font-medium" style={{ color: '#4285f4', border: '1px solid #4285f4', borderRadius: '4px' }}>
                Outlined
              </button>
              <button className="px-6 py-3 text-sm font-medium" style={{ color: '#4285f4', borderRadius: '4px' }}>
                Text
              </button>
            </div>

            {/* FAB */}
            <div className="flex justify-center mb-8">
              <button
                onMouseEnter={() => setFabHover(true)}
                onMouseLeave={() => setFabHover(false)}
                className="w-14 h-14 flex items-center justify-center transition-all"
                style={{
                  background: '#4285f4',
                  borderRadius: '16px',
                  boxShadow: fabHover ? getElevation(5) : getElevation(3),
                  transform: fabHover ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/material-design/gallery" className="px-8 py-3 text-sm font-medium text-center text-white" style={{ background: '#4285f4', borderRadius: '4px', boxShadow: getElevation(2) }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm font-medium text-center" style={{ color: '#4285f4', border: '1px solid #dadce0', borderRadius: '4px' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs font-medium" style={{ color: '#5f6368' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
