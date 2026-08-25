'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ConceptualSketchHome() {
  const [mounted, setMounted] = useState(false)
  const [activeTool, setActiveTool] = useState(0)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const tools = ['Pencil', 'Wireframe', 'Blueprint']

  return (
    <div className="min-h-screen" style={{ background: '#fafafa', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* Grid paper background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }} />

      {/* Hero */}
      <section className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10" style={{ background: '#ffffff', border: '1px solid #e5e5e5' }}>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-1.5" style={{ background: '#f0f0f0' }}>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#666' }}>Conceptual Sketch</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: '#333', letterSpacing: '-1px' }}>
                Ideas on Paper
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{ color: '#999' }}>
                Hand-drawn wireframe aesthetic. Raw sketches that capture the essence of an idea before it becomes polished.
              </p>
            </div>

            {/* Tool Selector */}
            <div className="flex justify-center gap-2 mb-8">
              {tools.map((tool, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTool(i)}
                  className="px-4 py-2 text-xs font-medium transition-all"
                  style={{
                    background: activeTool === i ? '#333' : '#f5f5f5',
                    color: activeTool === i ? '#fff' : '#999',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  {tool}
                </button>
              ))}
            </div>

            {/* Sketch Preview */}
            <div className="max-w-md mx-auto mb-8 p-8" style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              boxShadow: '2px 2px 10px rgba(0,0,0,0.05)',
            }}>
              {activeTool === 0 && (
                <svg width="100%" height="200" viewBox="0 0 300 200" fill="none">
                  {/* Hand-drawn style lines */}
                  <path d="M20 30 Q50 25 80 35 Q110 45 140 30 Q170 15 200 35 Q230 55 260 40" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <rect x="30" y="60" width="100" height="60" rx="4" stroke="#666" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                  <rect x="150" y="60" width="120" height="60" rx="4" stroke="#666" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                  <circle cx="80" cy="170" r="20" stroke="#999" strokeWidth="1.5" fill="none" />
                  <rect x="120" y="150" width="80" height="40" rx="20" stroke="#999" strokeWidth="1.5" fill="none" />
                  <line x1="220" y1="150" x2="280" y2="190" stroke="#ccc" strokeWidth="1" />
                  <line x1="280" y1="150" x2="220" y2="190" stroke="#ccc" strokeWidth="1" />
                </svg>
              )}
              {activeTool === 1 && (
                <svg width="100%" height="200" viewBox="0 0 300 200" fill="none">
                  {/* Wireframe boxes */}
                  <rect x="10" y="10" width="280" height="30" stroke="#333" strokeWidth="1.5" fill="#f5f5f5" />
                  <rect x="20" y="15" width="60" height="20" stroke="#999" strokeWidth="1" fill="none" />
                  <rect x="100" y="18" width="40" height="14" stroke="#ccc" strokeWidth="1" fill="none" />
                  <rect x="150" y="18" width="40" height="14" stroke="#ccc" strokeWidth="1" fill="none" />
                  <rect x="200" y="18" width="40" height="14" stroke="#ccc" strokeWidth="1" fill="none" />
                  <rect x="10" y="50" width="130" height="140" stroke="#333" strokeWidth="1.5" fill="#fafafa" />
                  <rect x="160" y="50" width="130" height="65" stroke="#333" strokeWidth="1.5" fill="#fafafa" />
                  <rect x="160" y="125" width="130" height="65" stroke="#333" strokeWidth="1.5" fill="#fafafa" />
                  <line x1="30" y1="80" x2="120" y2="80" stroke="#ddd" strokeWidth="1" />
                  <line x1="30" y1="95" x2="100" y2="95" stroke="#ddd" strokeWidth="1" />
                  <line x1="30" y1="110" x2="110" y2="110" stroke="#ddd" strokeWidth="1" />
                </svg>
              )}
              {activeTool === 2 && (
                <svg width="100%" height="200" viewBox="0 0 300 200" fill="none">
                  {/* Blueprint style */}
                  <rect x="10" y="10" width="280" height="180" stroke="#4a90d9" strokeWidth="1" fill="none" />
                  <line x1="10" y1="50" x2="290" y2="50" stroke="#4a90d9" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="#4a90d9" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="200" y1="10" x2="200" y2="190" stroke="#4a90d9" strokeWidth="0.5" strokeDasharray="4 4" />
                  <rect x="30" y="70" width="50" height="40" stroke="#4a90d9" strokeWidth="1.5" fill="rgba(74,144,217,0.1)" />
                  <rect x="120" y="70" width="60" height="40" stroke="#4a90d9" strokeWidth="1.5" fill="rgba(74,144,217,0.1)" />
                  <rect x="30" y="130" width="150" height="40" stroke="#4a90d9" strokeWidth="1.5" fill="rgba(74,144,217,0.1)" />
                  <text x="55" y="95" fill="#4a90d9" fontSize="8" textAnchor="middle">A</text>
                  <text x="150" y="95" fill="#4a90d9" fontSize="8" textAnchor="middle">B</text>
                  <text x="105" y="155" fill="#4a90d9" fontSize="8" textAnchor="middle">C</text>
                </svg>
              )}
            </div>

            {/* Sketch Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: 'Raw', label: 'Style' },
                { value: 'Fast', label: 'Process' },
                { value: 'Clear', label: 'Vision' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-3" style={{ background: '#f8f8f8', border: '1px solid #eee' }}>
                  <p className="text-lg font-medium" style={{ color: '#333' }}>{stat.value}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#ccc' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/conceptual-sketch/gallery" className="px-8 py-3 text-sm font-medium text-center text-white" style={{ background: '#333' }}>
                View Gallery
              </Link>
              <Link href="/designs" className="px-8 py-3 text-sm text-center" style={{ color: '#999', border: '1px solid #e5e5e5' }}>
                All Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-xs" style={{ color: '#ccc' }}>Back to Portfolio</Link>
        </div>
      </section>
    </div>
  )
}
