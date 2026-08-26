'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/futuristic', label: 'Home' },
  { href: '/futuristic/about', label: 'About' },
  { href: '/futuristic/services', label: 'Services' },
  { href: '/futuristic/gallery', label: 'Gallery' },
  { href: '/futuristic/contact', label: 'Contact' },
]

export default function FuturisticLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: '"Orbitron", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* Scan lines */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: 'rgba(10,10,10,0.9)', borderBottom: '1px solid #00f0ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'rgba(0,240,255,0.1)', border: '1px solid #00f0ff', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#00f0ff', fontSize: '16px', fontWeight: 800, letterSpacing: '4px' }}>FUTURE</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: 'rgba(10,10,10,0.95)', borderRight: '1px solid #00f0ff', paddingTop: '52px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)' }}>
                <p style={{ color: '#00f0ff', fontSize: '24px', fontWeight: 900, letterSpacing: '4px' }}>F</p>
                <p style={{ color: 'rgba(0,240,255,0.5)', fontSize: '10px', letterSpacing: '2px', marginTop: '8px' }}>Futuristic Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '2px',
                    background: active ? 'rgba(0,240,255,0.1)' : 'transparent',
                    color: active ? '#00f0ff' : 'rgba(255,255,255,0.3)', textDecoration: 'none',
                    fontSize: '12px', fontWeight: active ? 700 : 400, transition: 'all 0.2s',
                    letterSpacing: '2px', borderLeft: active ? '2px solid #00f0ff' : '2px solid transparent',
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
