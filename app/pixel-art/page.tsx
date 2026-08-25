'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PixelArtHome() {
  const [mounted, setMounted] = useState(false)
  const [activePixel, setActivePixel] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [grid, setGrid] = useState<boolean[]>(new Array(64).fill(false))

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const bg = '#1a1a2e'
  const panel = '#16213e'
  const accent = '#e94560'
  const secondary = '#0f3460'
  const green = '#53d769'
  const yellow = '#f5c518'

  const togglePixel = (i: number) => {
    const newGrid = [...grid]
    newGrid[i] = !newGrid[i]
    setGrid(newGrid)
    if (newGrid[i]) setScore(s => s + 1)
    else setScore(s => s - 1)
  }

  return (
    <div className="min-h-screen" style={{ background: bg, fontFamily: '"Press Start 2P", monospace', imageRendering: 'pixelated' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: panel, border: `4px solid ${secondary}`, boxShadow: `0 0 0 4px ${bg}, 0 0 0 8px ${secondary}` }}>
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', zIndex: 1 }} />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-block mb-4 px-4 py-2" style={{ background: accent, border: `2px solid ${yellow}` }}>
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: yellow }}>8-Bit Design</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: yellow, textShadow: `4px 4px 0 ${accent}`, lineHeight: 1.4 }}>
                  Pixel Perfect
                </h1>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#8892b0' }}>
                  Retro gaming aesthetic. Every pixel placed with purpose. Chunky fonts, bold colors, and that classic 8-bit charm.
                </p>
              </div>

              {/* Pixel Grid - Interactive */}
              <h2 className="text-sm font-bold text-center mb-4" style={{ color: yellow }}>Click to Draw</h2>
              <div className="flex justify-center mb-6">
                <div className="inline-grid grid-cols-8 gap-1 p-4" style={{ background: secondary, border: `2px solid ${accent}` }}>
                  {grid.map((active, i) => (
                    <button
                      key={i}
                      onClick={() => togglePixel(i)}
                      className="w-6 h-6 md:w-8 md:h-8 transition-all duration-100"
                      style={{
                        background: active ? accent : '#0a0a1a',
                        border: `2px solid ${active ? yellow : '#1a1a3e'}`,
                        boxShadow: active ? `0 0 8px ${accent}60` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-[10px] mb-8" style={{ color: green }}>Pixels Active: {score}/64</p>

              {/* Pixel Art Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { label: 'Resolution', value: '8x8', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z' },
                  { label: 'Colors', value: '16', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                  { label: 'Style', value: 'Retro', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Era', value: '1980s', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 text-center" style={{ background: secondary, border: `2px solid ${accent}30` }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" className="mx-auto mb-2">
                      <path d={stat.icon} />
                    </svg>
                    <p className="text-lg font-bold" style={{ color: yellow }}>{stat.value}</p>
                    <p className="text-[8px] mt-1" style={{ color: '#8892b0' }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/pixel-art/gallery" className="px-6 py-3 text-[10px] font-bold text-center" style={{ background: accent, color: yellow, border: `2px solid ${yellow}`, boxShadow: `4px 4px 0 ${secondary}` }}>
                  View Gallery
                </Link>
                <Link href="/designs" className="px-6 py-3 text-[10px] font-bold text-center" style={{ background: secondary, color: '#8892b0', border: `2px solid ${accent}30` }}>
                  All Designs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold text-center mb-8" style={{ color: yellow }}>Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Grid-Based', desc: 'Every element snaps to a pixel grid. No anti-aliasing, no sub-pixel rendering. Pure digital clarity.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z' },
              { title: 'Limited Palette', desc: 'Restricted color palettes inspired by classic hardware. 16 colors maximum for authentic retro feel.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z' },
              { title: 'Chunky Typography', desc: 'Bitmap-style fonts where every letter is crafted pixel by pixel. Readable at any size.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: panel, border: `2px solid ${secondary}` }}>
                <div className="w-10 h-10 mb-3 flex items-center justify-center" style={{ background: secondary, border: `2px solid ${accent}30` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-[10px] font-bold mb-2" style={{ color: yellow }}>{f.title}</h3>
                <p className="text-[9px] leading-relaxed" style={{ color: '#8892b0' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block px-6 py-3 text-[10px] font-bold" style={{ background: secondary, color: '#8892b0', border: `2px solid ${accent}30` }}>
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
