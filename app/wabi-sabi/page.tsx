'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WabiSabiHome() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: '#f5f0eb', fontFamily: '"Noto Serif", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600&display=swap');`}</style>

      {/* Hero */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#ede8e0',
            borderRadius: '2px',
            border: '1px solid #d4cbbf',
          }}>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: '#a89888' }}>Wabi Sabi</p>
              <h1 className="text-4xl md:text-5xl font-medium mb-6" style={{ color: '#4a3f35', letterSpacing: '-1px' }}>
                Imperfect Beauty
              </h1>
              <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: '#8a7f75' }}>
                Finding beauty in imperfection. Embracing the worn, the weathered, the authentic. Japanese aesthetics meet digital design.
              </p>
            </div>

            {/* Wabi Sabi principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { kanji: '侘', title: 'Wabi', desc: 'Rustic simplicity. Finding richness in austerity.', color: '#8b7355' },
                { kanji: '寂', title: 'Sabi', desc: 'Beauty of age. Patina tells a story.', color: '#6b8a65' },
                { kanji: '間', title: 'Ma', desc: 'Negative space. The pause between notes.', color: '#8a7f75' },
              ].map((item, i) => (
                <div key={i} className="text-center p-6" style={{
                  background: '#f5f0eb',
                  border: '1px solid #d4cbbf',
                }}>
                  <p className="text-4xl mb-3" style={{ color: item.color }}>{item.kanji}</p>
                  <h3 className="text-sm font-medium mb-2" style={{ color: '#4a3f35' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8a7f75' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Texture samples */}
            <div className="grid grid-cols-4 gap-3 mb-12">
              {[
                { bg: '#d4cbbf', label: 'Stone' },
                { bg: '#c4b8a8', label: 'Wood' },
                { bg: '#b8a898', label: 'Clay' },
                { bg: '#a89888', label: 'Earth' },
              ].map((item, i) => (
                <div key={i} className="aspect-square flex items-end justify-center p-2" style={{ background: item.bg }}>
                  <span className="text-[10px]" style={{ color: '#6a5f55' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wabi-sabi/gallery" className="px-8 py-3 text-sm font-medium text-center" style={{ background: '#4a3f35', color: '#f5f0eb' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#8a7f75', border: '1px solid #d4cbbf' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs tracking-widest" style={{ color: '#b8a898' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
