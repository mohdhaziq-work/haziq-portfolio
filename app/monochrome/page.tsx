'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MonochromeHome() {
  const [mounted, setMounted] = useState(false)
  const [activeShade, setActiveShade] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const shades = ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e6e6e6', '#f2f2f2', '#ffffff']

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#ccc' }}>Monochrome</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#000', letterSpacing: '-2px' }}>
                One Color.<br />Infinite Depth.
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#999' }}>
                A single color palette with varying shades. Simplicity that creates sophisticated visual hierarchy.
              </p>
            </div>

            {/* Shade Palette */}
            <div className="flex justify-center gap-1 mb-8">
              {shades.map((shade, i) => (
                <button
                  key={i}
                  onClick={() => setActiveShade(i)}
                  className="w-8 h-8 transition-all"
                  style={{
                    background: shade,
                    border: activeShade === i ? '2px solid #000' : '2px solid transparent',
                    transform: activeShade === i ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* Monochrome Grid */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {shades.slice(0, 8).map((shade, i) => (
                <div key={i} className="aspect-square flex items-center justify-center" style={{ background: shade }}>
                  <span className="text-xs font-mono" style={{ color: i < 4 ? '#fff' : '#000' }}>{shade}</span>
                </div>
              ))}
            </div>

            {/* Typography in monochrome */}
            <div className="space-y-6 mb-12">
              {[
                { weight: '700', size: '4xl', text: 'Bold Statement', shade: '#000' },
                { weight: '500', size: '2xl', text: 'Medium emphasis', shade: '#333' },
                { weight: '400', size: 'lg', text: 'Regular body text for comfortable reading', shade: '#666' },
                { weight: '300', size: 'sm', text: 'Light captions and secondary information', shade: '#999' },
              ].map((item, i) => (
                <div key={i} className="pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <p className={`text-${item.size} font-${item.weight}`} style={{ color: item.shade }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/monochrome/gallery" className="px-8 py-3 text-sm font-semibold text-center text-white" style={{ background: '#000' }}>
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
