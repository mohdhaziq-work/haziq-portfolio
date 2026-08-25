'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TypographyHome() {
  const [mounted, setMounted] = useState(false)
  const [activeFont, setActiveFont] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const fonts = [
    { name: 'Playfair Display', family: '"Playfair Display", serif', weight: '700' },
    { name: 'Space Grotesk', family: '"Space Grotesk", sans-serif', weight: '700' },
    { name: 'DM Serif', family: '"DM Serif Display", serif', weight: '400' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Space+Grotesk:wght@400;700&family=DM+Serif+Display&family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#ccc' }}>Typography-Led</p>
              <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{
                fontFamily: fonts[activeFont].family,
                fontWeight: fonts[activeFont].weight,
                color: '#111',
                letterSpacing: '-3px',
                lineHeight: 0.9,
              }}>
                Words<br />as Art
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#999' }}>
                When typography IS the design. Letters become visuals. Text becomes texture. Words become the hero.
              </p>
            </div>

            {/* Font Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {fonts.map((font, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFont(i)}
                  className="px-4 py-2 text-xs transition-all"
                  style={{
                    background: activeFont === i ? '#111' : '#f5f5f5',
                    color: activeFont === i ? '#fff' : '#999',
                    fontFamily: font.family,
                    borderRadius: '0',
                  }}
                >
                  {font.name}
                </button>
              ))}
            </div>

            {/* Typography Showcase */}
            <div className="space-y-8 mb-12">
              <div className="text-center">
                <p className="text-8xl md:text-[12rem] font-bold leading-none" style={{
                  fontFamily: fonts[activeFont].family,
                  color: '#111',
                  letterSpacing: '-6px',
                  opacity: 0.1,
                }}>
                  Aa
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#ccc' }}>Heading</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: fonts[activeFont].family, color: '#111' }}>
                    The quick brown fox
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#ccc' }}>Body</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                    Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
                  </p>
                </div>
              </div>
            </div>

            {/* Type Scale */}
            <div className="space-y-4 mb-12">
              {[
                { size: '4xl', label: 'Display', text: 'Design is thinking made visual.' },
                { size: '2xl', label: 'Title', text: 'Good typography is invisible.' },
                { size: 'lg', label: 'Subtitle', text: 'Letters have a life of their own.' },
                { size: 'sm', label: 'Body', text: 'The details are not the details. They make the design.' },
                { size: 'xs', label: 'Caption', text: 'Every letter tells a story.' },
              ].map((item, i) => (
                <div key={i} className="flex items-baseline gap-4 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <span className="text-[10px] tracking-widest uppercase w-16 flex-shrink-0" style={{ color: '#ccc' }}>{item.label}</span>
                  <p className={`text-${item.size}`} style={{
                    fontFamily: i < 2 ? fonts[activeFont].family : '"Inter", sans-serif',
                    fontWeight: i < 2 ? 700 : 400,
                    color: i < 3 ? '#111' : '#888',
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/typography/gallery" className="px-8 py-3 text-sm font-medium text-center text-white" style={{ background: '#111' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#999', border: '1px solid #eee' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs tracking-widest uppercase" style={{ color: '#ccc' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
