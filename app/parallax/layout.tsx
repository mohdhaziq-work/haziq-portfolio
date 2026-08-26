'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/parallax', label: 'Home' },
  { href: '/parallax/about', label: 'About' },
  { href: '/parallax/services', label: 'Services' },
  { href: '/parallax/gallery', label: 'Gallery' },
  { href: '/parallax/contact', label: 'Contact' },
]

export default function ParallaxLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e', fontFamily: '"Raleway", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(26,26,46,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#fff', fontSize: '18px', fontWeight: 300, letterSpacing: '4px' }}>PARALLAX</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: 'rgba(26,26,46,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)', paddingTop: '56px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px' }}>
                <p style={{ color: '#fff', fontSize: '36px', fontWeight: 200, letterSpacing: '8px' }}>P</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 300, letterSpacing: '4px', marginTop: '8px' }}>Parallax Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 16px', marginBottom: '2px',
                    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.4)', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 500 : 300, transition: 'all 0.2s',
                    letterSpacing: '2px',
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
