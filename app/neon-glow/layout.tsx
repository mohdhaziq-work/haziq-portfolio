'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/neon-glow', label: 'Home' },
  { href: '/neon-glow/about', label: 'About' },
  { href: '/neon-glow/services', label: 'Services' },
  { href: '/neon-glow/gallery', label: 'Gallery' },
  { href: '/neon-glow/contact', label: 'Contact' },
]

export default function NeonGlowLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: '"Press Start 2P", monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>

      {/* Neon grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,0,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: 'rgba(10,10,10,0.9)', borderBottom: '2px solid #ff00ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxShadow: '0 0 20px rgba(255,0,255,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'rgba(255,0,255,0.1)', border: '2px solid #ff00ff', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 10px rgba(255,0,255,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff00ff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#ff00ff', fontSize: '12px', fontWeight: 400, textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>NEON</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '240px', background: 'rgba(10,10,10,0.95)', borderRight: '2px solid #ff00ff', paddingTop: '52px', boxShadow: '4px 0 20px rgba(255,0,255,0.2)' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px', padding: '16px', background: 'rgba(255,0,255,0.05)', border: '2px solid rgba(255,0,255,0.3)' }}>
                <p style={{ color: '#ff00ff', fontSize: '18px', fontWeight: 400, textShadow: '0 0 10px rgba(255,0,255,0.5)' }}>N</p>
                <p style={{ color: 'rgba(255,0,255,0.5)', fontSize: '8px', marginTop: '8px' }}>Neon Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '10px 12px', marginBottom: '2px',
                    background: active ? 'rgba(255,0,255,0.1)' : 'transparent',
                    color: active ? '#ff00ff' : 'rgba(255,255,255,0.3)', textDecoration: 'none',
                    fontSize: '8px', fontWeight: active ? 400 : 400, transition: 'all 0.2s',
                    textShadow: active ? '0 0 10px rgba(255,0,255,0.5)' : 'none',
                    borderLeft: active ? '2px solid #ff00ff' : '2px solid transparent',
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
