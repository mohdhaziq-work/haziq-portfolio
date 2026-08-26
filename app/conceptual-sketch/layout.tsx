'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/conceptual-sketch', label: 'Home' },
  { href: '/conceptual-sketch/about', label: 'About' },
  { href: '/conceptual-sketch/services', label: 'Services' },
  { href: '/conceptual-sketch/gallery', label: 'Gallery' },
  { href: '/conceptual-sketch/contact', label: 'Contact' },
]

export default function ConceptualSketchLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: '"Architects Daughter", cursive' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Patrick+Hand&display=swap');`}</style>

      {/* Grid paper */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.05, backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: '#fff', borderBottom: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '40px', height: '40px', background: '#fff', border: '2px solid #333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#333', fontSize: '22px', fontWeight: 400 }}>Sketch</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#fff', borderRight: '2px solid #333', paddingTop: '56px' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px', background: '#f8f8f8', border: '2px dashed #ccc' }}>
                <p style={{ color: '#333', fontSize: '48px', fontWeight: 400 }}>S</p>
                <p style={{ color: '#666', fontSize: '14px', fontWeight: 400, marginTop: '8px' }}>Conceptual Sketch</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 18px', marginBottom: '4px', borderRadius: '8px',
                    background: active ? '#f0f0f0' : 'transparent',
                    color: active ? '#333' : '#999', textDecoration: 'none',
                    fontSize: '18px', fontWeight: active ? 400 : 400, transition: 'all 0.2s',
                    border: active ? '2px dashed #ccc' : '2px dashed transparent',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '56px' }}>{children}</main>
    </div>
  )
}
