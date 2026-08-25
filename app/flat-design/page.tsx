'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FlatDesignHome() {
  const [mounted, setMounted] = useState(false)
  const [activeColor, setActiveColor] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const colors = [
    { bg: '#3498db', name: 'Peter River' },
    { bg: '#2ecc71', name: 'Emerald' },
    { bg: '#e74c3c', name: 'Alizarin' },
    { bg: '#f39c12', name: 'Sunflower' },
    { bg: '#9b59b6', name: 'Amethyst' },
    { bg: '#1abc9c', name: 'Turquoise' },
  ]

  const current = colors[activeColor]

  return (
    <div className="min-h-screen" style={{ background: '#ecf0f1', fontFamily: '"Nunito", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff', borderRadius: '0' }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-2" style={{ background: current.bg, borderRadius: '0' }}>
                <span className="text-xs font-bold tracking-widest uppercase text-white">Flat Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#2c3e50' }}>
                Bold & Clean
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#7f8c8d' }}>
                No shadows, no gradients, no textures. Just bold colors, clean shapes, and clear typography. Simplicity at its best.
              </p>
            </div>

            {/* Color Palette Selector */}
            <h2 className="text-sm font-bold text-center mb-4" style={{ color: '#2c3e50' }}>Pick a Color</h2>
            <div className="flex justify-center gap-2 mb-8">
              {colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setActiveColor(i)}
                  className="w-10 h-10 transition-all"
                  style={{
                    background: color.bg,
                    borderRadius: '0',
                    border: activeColor === i ? '3px solid #2c3e50' : '3px solid transparent',
                    transform: activeColor === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* Flat UI Components */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
                { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search' },
                { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', label: 'Settings' },
                { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Favorites' },
              ].map((item, i) => (
                <div key={i} className="p-4 text-center" style={{ background: current.bg, borderRadius: '0' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="mx-auto mb-2">
                    <path d={item.icon} />
                  </svg>
                  <p className="text-xs font-bold text-white">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Flat Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {['Primary', 'Success', 'Danger', 'Warning'].map((label, i) => {
                const btnColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']
                return (
                  <button key={i} className="px-6 py-3 text-sm font-bold text-white" style={{ background: btnColors[i], borderRadius: '0' }}>
                    {label}
                  </button>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/flat-design/gallery" className="px-8 py-3 text-sm font-bold text-center text-white" style={{ background: current.bg, borderRadius: '0' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm font-bold text-center" style={{ color: '#7f8c8d', border: '2px solid #bdc3c7', borderRadius: '0' }}>
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
              { title: 'No Shadows', desc: 'Zero drop shadows, zero inner shadows. Elements sit flat on the surface.', color: '#3498db' },
              { title: 'Bold Colors', desc: 'Bright, saturated colors that grab attention and create clear visual hierarchy.', color: '#2ecc71' },
              { title: 'Simple Shapes', desc: 'Clean rectangles, circles, and squares. No complex shapes or decorations.', color: '#e74c3c' },
            ].map((f, i) => (
              <div key={i} className="p-5" style={{ background: '#ffffff', borderRadius: '0' }}>
                <div className="w-3 h-3 mb-3" style={{ background: f.color, borderRadius: '0' }} />
                <h3 className="text-sm font-bold mb-2" style={{ color: '#2c3e50' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#7f8c8d' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs font-bold" style={{ color: '#7f8c8d' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
