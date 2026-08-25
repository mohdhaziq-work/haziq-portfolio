'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/brutalism', label: 'HOME' },
  { href: '/brutalism/about', label: 'ABOUT' },
  { href: '/brutalism/services', label: 'SERVICES' },
  { href: '/brutalism/gallery', label: 'GALLERY' },
  { href: '/brutalism/contact', label: 'CONTACT' },
]

export default function BrutalismLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: '"Space Mono", monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');`}</style>

      {/* Top Bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '52px', background: '#fff',
        borderBottom: '4px solid #000',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{
            width: '36px', height: '36px', background: '#fff',
            border: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '3px 3px 0 #000',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <span style={{ color: '#000', fontSize: '14px', fontWeight: 700, letterSpacing: '-1px' }}>BRUT.STUDIO</span>
        </div>
        <div style={{ padding: '4px 12px', background: '#ff3e3e', border: '2px solid #000', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
          RAW
        </div>
      </header>

      {/* Sidebar */}
      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setSidebar(false)} />
          <nav style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px',
            background: '#fff', borderRight: '4px solid #000', paddingTop: '52px',
            boxShadow: '8px 0 0 #000',
          }}>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '24px', padding: '16px', background: '#000', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', margin: '0 auto 8px', background: '#ff3e3e', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>B</span>
                </div>
                <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>BRUT.STUDIO</p>
                <p style={{ color: '#999', fontSize: '10px' }}>Raw Design</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '4px',
                    background: active ? '#000' : '#fff',
                    color: active ? '#fff' : '#000',
                    textDecoration: 'none', fontSize: '12px', fontWeight: 700,
                    border: '3px solid #000',
                    boxShadow: active ? 'none' : '4px 4px 0 #000',
                    transform: active ? 'translate(2px, 2px)' : 'none',
                    transition: 'all 0.1s',
                  }}>
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
