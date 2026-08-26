'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/retro', label: 'Home' },
  { href: '/retro/about', label: 'About' },
  { href: '/retro/services', label: 'Services' },
  { href: '/retro/gallery', label: 'Gallery' },
  { href: '/retro/contact', label: 'Contact' },
]

export default function RetroLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f4e8d1', fontFamily: '"Playfair Display", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@400;600&display=swap');`}</style>

      {/* Film grain */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.08, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: '#e8d5b8', borderBottom: '2px solid #c4a882', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxShadow: '0 2px 8px rgba(139,115,85,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: '#d4c4a8', border: '2px solid #8b7355', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a4a35" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#3a2f25', fontSize: '16px', fontWeight: 700, letterSpacing: '1px' }}>Retro Studio</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#e8d5b8', borderRight: '2px solid #c4a882', paddingTop: '52px', boxShadow: '4px 0 16px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#d4c4a8', border: '2px solid #c4a882', borderRadius: '8px' }}>
                <div style={{ width: '48px', height: '48px', margin: '0 auto 8px', background: '#8b7355', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#f4e8d1', fontSize: '20px', fontWeight: 700 }}>R</span>
                </div>
                <p style={{ color: '#3a2f25', fontSize: '14px', fontWeight: 700 }}>Retro Studio</p>
                <p style={{ color: '#8b7355', fontSize: '11px' }}>Vintage Design</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '10px 16px', marginBottom: '4px', borderRadius: '6px',
                    background: active ? '#8b7355' : 'transparent',
                    color: active ? '#f4e8d1' : '#5a4a35', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 600 : 400, transition: 'all 0.2s',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '52px' }}>{children}</main>
    </div>
  )
}
