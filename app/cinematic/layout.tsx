'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/cinematic', label: 'Home' },
  { href: '/cinematic/about', label: 'About' },
  { href: '/cinematic/services', label: 'Services' },
  { href: '/cinematic/gallery', label: 'Gallery' },
  { href: '/cinematic/contact', label: 'Contact' },
]

export default function CinematicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: '"Bebas Neue", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');`}</style>

      {/* Letterbox bars */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '60px', background: '#000', zIndex: 45 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', background: '#000', zIndex: 45 }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '60px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#fff', fontSize: '22px', fontWeight: 400, letterSpacing: '6px' }}>CINEMATIC</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#000', borderRight: '1px solid rgba(255,255,255,0.2)', paddingTop: '60px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px' }}>
                <p style={{ color: '#fff', fontSize: '36px', fontWeight: 400, letterSpacing: '8px' }}>C</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '4px', marginTop: '8px' }}>Cinematic Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 16px', marginBottom: '2px',
                    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.3)', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 500 : 300, transition: 'all 0.2s',
                    letterSpacing: '3px', fontFamily: '"Barlow", sans-serif',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '60px', paddingBottom: '60px' }}>{children}</main>
    </div>
  )
}
