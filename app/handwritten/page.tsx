'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HandwrittenHome() {
  const [mounted, setMounted] = useState(false)
  const [activeNote, setActiveNote] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const notes = [
    { title: 'Dear Visitor,', text: 'Welcome to my little corner of the internet. Everything here is made with love and a pen.', color: '#fff9c4' },
    { title: 'My Promise,', text: 'Every project gets my full attention. No templates, no shortcuts. Just honest craft.', color: '#f8bbd0' },
    { title: 'Fun Fact,', text: 'I sketch every design on paper before touching a computer. Old school meets new school.', color: '#c8e6c9' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#fdf6e3', fontFamily: '"Caveat", cursive' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Patrick+Hand&display=swap');`}</style>

      {/* Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
      }} />

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{
            background: '#ffffff',
            borderRadius: '2px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
            transform: 'rotate(-0.5deg)',
            position: 'relative',
          }}>
            {/* Notebook lines */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e8e4df 31px, #e8e4df 32px)',
              backgroundPosition: '0 20px',
            }} />
            {/* Red margin line */}
            <div className="absolute top-0 bottom-0 left-16 pointer-events-none" style={{ borderLeft: '2px solid #ffcdd2' }} />

            <div className="relative z-10 pl-20">
              <div className="text-center mb-8">
                <div className="inline-block mb-4 px-4 py-1.5" style={{ background: '#fff9c4', borderRadius: '2px', transform: 'rotate(1deg)' }}>
                  <span className="text-sm font-semibold" style={{ color: '#5d4037' }}>Handwritten Style</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{
                  color: '#3e2723',
                  transform: 'rotate(-1deg)',
                  lineHeight: 1.1,
                }}>
                  Written<br />with Heart
                </h1>
                <p className="text-xl max-w-md mx-auto" style={{ color: '#795548', fontFamily: '"Patrick Hand", cursive' }}>
                  Personal, warm, and authentic. Like a handwritten letter from a friend.
                </p>
              </div>

              {/* Sticky Notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {notes.map((note, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveNote(i)}
                    className="p-5 cursor-pointer transition-all"
                    style={{
                      background: note.color,
                      borderRadius: '2px',
                      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                      transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                      border: activeNote === i ? '2px solid #5d4037' : '2px solid transparent',
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#3e2723' }}>{note.title}</h3>
                    <p className="text-lg" style={{ color: '#5d4037', fontFamily: '"Patrick Hand", cursive' }}>{note.text}</p>
                  </div>
                ))}
              </div>

              {/* Handwritten list */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#3e2723' }}>Things I love:</h2>
                <ul className="space-y-2">
                  {['Clean code that reads like poetry', 'Designs that make people smile', 'Coffee at3 AM while coding', 'Seeing my work live on the web'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg" style={{ color: '#5d4037' }}>
                      <span className="w-6 h-6 flex items-center justify-center text-sm" style={{ background: '#e8f5e9', borderRadius: '50%' }}>
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/handwritten/gallery" className="px-8 py-3 text-lg font-bold text-center" style={{ background: '#5d4037', color: '#fdf6e3', borderRadius: '2px' }}>
                  See My Work
                </Link>
                <Link href="/designs" className="px-8 py-3 text-lg text-center" style={{ color: '#795548', border: '2px solid #d7ccc8', borderRadius: '2px' }}>
                  All Designs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-lg" style={{ color: '#bcaaa4', fontFamily: '"Patrick Hand", cursive' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
