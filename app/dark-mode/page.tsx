'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DarkModeHome() {
  const [mounted, setMounted] = useState(false)
  const [brightness, setBrightness] = useState(80)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: '#0d1117', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '16px',
          }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{
                background: '#1f6feb20',
                border: '1px solid #1f6feb40',
                borderRadius: '9999px',
              }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#58a6ff' }}>Dark Mode</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#f0f6fc' }}>
                Easy on the Eyes
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#8b949e' }}>
                Dark backgrounds reduce eye strain and save battery. Content pops against the darkness. Modern, sleek, professional.
              </p>
            </div>

            {/* Brightness Control */}
            <div className="max-w-xs mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: '#8b949e' }}>Brightness</span>
                <span className="text-xs font-bold" style={{ color: '#58a6ff' }}>{brightness}%</span>
              </div>
              <input
                type="range" min="20" max="100" value={brightness}
                onChange={e => setBrightness(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #1f6feb ${brightness}%, #30363d ${brightness}%)` }}
              />
            </div>

            {/* Dark UI Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Card */}
              <div className="p-5" style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '12px' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#1f6feb20' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#f0f6fc' }}>Analytics</p>
                    <p className="text-xs" style={{ color: '#8b949e' }}>Last30 days</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {[
                    { label: 'Views', value: '12.4K', change: '+14%' },
                    { label: 'Clicks', value: '3.2K', change: '+8%' },
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 p-3" style={{ background: '#161b22', borderRadius: '8px' }}>
                      <p className="text-lg font-bold" style={{ color: '#f0f6fc' }}>{stat.value}</p>
                      <p className="text-[10px]" style={{ color: '#8b949e' }}>{stat.label}</p>
                      <p className="text-[10px] font-bold" style={{ color: '#3fb950' }}>{stat.change}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="p-5" style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '12px' }}>
                <div className="flex gap-0 mb-4">
                  {['Code', 'Preview', 'Deploy'].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className="flex-1 py-2 text-xs font-medium transition-all"
                      style={{
                        background: activeTab === i ? '#1f6feb20' : 'transparent',
                        color: activeTab === i ? '#58a6ff' : '#8b949e',
                        borderBottom: activeTab === i ? '2px solid #1f6feb' : '2px solid transparent',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="p-4" style={{ background: '#161b22', borderRadius: '8px', fontFamily: 'monospace' }}>
                  {activeTab === 0 && (
                    <pre className="text-xs" style={{ color: '#8b949e' }}>
                      <span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#d2a8ff' }}>design</span> = {'{\n'}
                      {'  '}<span style={{ color: '#79c0ff' }}>theme</span>: <span style={{ color: '#a5d6ff' }}>&quot;dark&quot;</span>,{'\n'}
                      {'  '}<span style={{ color: '#79c0ff' }}>accent</span>: <span style={{ color: '#a5d6ff' }}>&quot;#58a6ff&quot;</span>,{'\n'}
                      {'}'}
                    </pre>
                  )}
                  {activeTab === 1 && (
                    <p className="text-xs text-center py-4" style={{ color: '#8b949e' }}>Preview renders here</p>
                  )}
                  {activeTab === 2 && (
                    <div className="text-center py-4">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ background: '#238636' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-xs" style={{ color: '#3fb950' }}>Deployed!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dark-mode/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{ background: '#238636', borderRadius: '8px' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#8b949e', border: '1px solid #30363d', borderRadius: '8px' }}>
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
              { title: 'Eye Comfort', desc: 'Reduced blue light and lower contrast ease strain during long sessions.', color: '#58a6ff' },
              { title: 'Battery Saver', desc: 'Dark pixels use less power on OLED screens. Better for mobile devices.', color: '#3fb950' },
              { title: 'Modern Feel', desc: 'Dark interfaces feel premium and professional. Used by top tech companies.', color: '#d2a8ff' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px' }}>
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: f.color }} />
                <h3 className="text-sm font-semibold mb-2" style={{ color: '#f0f6fc' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8b949e' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#8b949e' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
