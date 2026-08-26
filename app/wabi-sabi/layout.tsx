'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/wabi-sabi', label: 'Home' },
  { href: '/wabi-sabi/about', label: 'About' },
  { href: '/wabi-sabi/services', label: 'Services' },
  { href: '/wabi-sabi/gallery', label: 'Gallery' },
  { href: '/wabi-sabi/contact', label: 'Contact' },
]

export default function WabiSabiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: '"Noto Serif JP", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Wabi-sabi texture */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.02, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(245,240,232,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(180,160,140,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid rgba(180,160,140,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#8b7355', fontSize: '18px', fontWeight: 400 }}>侘寂</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(180,160,140,0.3)', paddingTop: '56px' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px' }}>
                <p style={{ color: '#8b7355', fontSize: '48px', fontWeight: 300 }}>侘</p>
                <p style={{ color: '#b8a090', fontSize: '14px', fontWeight: 300, marginTop: '8px' }}>Wabi Sabi Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 18px', marginBottom: '4px',
                    background: active ? 'rgba(180,160,140,0.1)' : 'transparent',
                    color: active ? '#8b7355' : '#b8a090', textDecoration: 'none',
                    fontSize: '15px', fontWeight: active ? 500 : 300, transition: 'all 0.2s',
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
