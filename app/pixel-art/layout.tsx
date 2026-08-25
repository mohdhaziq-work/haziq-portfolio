'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/pixel-art', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/pixel-art/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/pixel-art/services', label: 'Services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { href: '/pixel-art/gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/pixel-art/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function PixelArtLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const bg = '#1a1a2e'
  const panel = '#16213e'
  const accent = '#e94560'
  const yellow = '#f5c518'
  const green = '#53d769'

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: '"Press Start 2P", monospace', imageRendering: 'pixelated' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>

      {/* Top Bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '52px', background: panel,
        borderBottom: `3px solid ${accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{
            width: '36px', height: '36px', background: '#0a0a1a',
            border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={yellow} strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <span style={{ color: yellow, fontSize: '10px', fontWeight: 700, textShadow: `2px 2px 0 ${accent}` }}>PIXEL QUEST</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: green, fontSize: '8px' }}>HP: 100</span>
          <div style={{ width: '60px', height: '8px', background: '#0a0a1a', border: `1px solid ${accent}` }}>
            <div style={{ width: '100%', height: '100%', background: green }} />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebar(false)} />
          <nav style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px',
            background: panel, borderRight: `3px solid ${accent}`, paddingTop: '52px',
          }}>
            <div style={{ padding: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '16px', background: '#0a0a1a', border: `2px solid ${accent}` }}>
                <div style={{ width: '48px', height: '48px', margin: '0 auto 8px', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${yellow}` }}>
                  <span style={{ color: yellow, fontSize: '16px' }}>P</span>
                </div>
                <p style={{ color: yellow, fontSize: '8px', marginBottom: '4px' }}>Pixel Quest</p>
                <p style={{ color: '#8892b0', fontSize: '6px' }}>8-Bit Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 12px', marginBottom: '4px',
                    background: active ? accent : 'transparent',
                    border: active ? `2px solid ${yellow}` : '2px solid transparent',
                    color: active ? yellow : '#8892b0',
                    textDecoration: 'none', fontSize: '8px',
                    transition: 'all 0.2s',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
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
