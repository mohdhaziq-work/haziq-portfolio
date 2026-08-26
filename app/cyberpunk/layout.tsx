'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/cyberpunk', label: 'HOME' },
  { href: '/cyberpunk/about', label: 'ABOUT' },
  { href: '/cyberpunk/services', label: 'SERVICES' },
  { href: '/cyberpunk/gallery', label: 'GALLERY' },
  { href: '/cyberpunk/contact', label: 'CONTACT' },
]

export default function CyberpunkLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(0)
  useEffect(() => { setMounted(true); const i = setInterval(() => setTime(t => t + 1), 100); return () => clearInterval(i) }, [])
  if (!mounted) return null

  const neon = '#ff00ff'

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: '"Orbitron", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');`}</style>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,0,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '48px', background: '#0a0a0a', borderBottom: `1px solid ${neon}40`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '32px', height: '32px', background: `${neon}15`, border: `1px solid ${neon}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={neon} strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: neon, fontSize: '11px', fontWeight: 900, letterSpacing: '3px', textShadow: `0 0 10px ${neon}80` }}>CYBER.STUDIO</span>
        </div>
        <span style={{ color: '#4a6a7a', fontSize: '9px', letterSpacing: '2px' }}>SYS.{String(time).padStart(4, '0')}</span>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '250px', background: '#0a0a0a', borderRight: `1px solid ${neon}30`, paddingTop: '48px' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '16px', background: `${neon}08`, border: `1px solid ${neon}20` }}>
                <div style={{ width: '40px', height: '40px', margin: '0 auto 8px', background: `${neon}20`, border: `1px solid ${neon}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: neon, fontSize: '14px', fontWeight: 900 }}>C</span>
                </div>
                <p style={{ color: neon, fontSize: '10px', fontWeight: 700, letterSpacing: '2px' }}>CYBER.STUDIO</p>
                <p style={{ color: '#4a6a7a', fontSize: '8px' }}>Digital Design</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '10px 14px', marginBottom: '4px',
                    background: active ? `${neon}15` : 'transparent',
                    borderLeft: active ? `2px solid ${neon}` : '2px solid transparent',
                    color: active ? neon : '#4a6a7a', textDecoration: 'none', fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '48px', position: 'relative', zIndex: 1 }}>{children}</main>
    </div>
  )
}
