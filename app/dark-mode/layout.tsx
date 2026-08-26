'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dark-mode', label: 'Home' },
  { href: '/dark-mode/about', label: 'About' },
  { href: '/dark-mode/services', label: 'Services' },
  { href: '/dark-mode/gallery', label: 'Gallery' },
  { href: '/dark-mode/contact', label: 'Contact' },
]

export default function DarkModeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: '"JetBrains Mono", monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Subtle grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '48px', background: '#111', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '32px', height: '32px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#e0e0e0', fontSize: '14px', fontWeight: 600 }}>Dark Mode</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ color: '#555', fontSize: '11px' }}>Online</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '240px', background: '#111', borderRight: '1px solid #222', paddingTop: '48px' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '20px', padding: '16px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#333', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#e0e0e0', fontSize: '14px', fontWeight: 700 }}>D</span>
                  </div>
                  <div>
                    <p style={{ color: '#e0e0e0', fontSize: '13px', fontWeight: 600 }}>Dark Mode</p>
                    <p style={{ color: '#555', fontSize: '10px' }}>Terminal Studio</p>
                  </div>
                </div>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '2px', borderRadius: '6px',
                    background: active ? '#1a1a1a' : 'transparent',
                    color: active ? '#e0e0e0' : '#666', textDecoration: 'none',
                    fontSize: '13px', fontWeight: active ? 600 : 400, transition: 'all 0.2s',
                    border: active ? '1px solid #333' : '1px solid transparent',
                  }}>
                    <span style={{ color: active ? '#e0e0e0' : '#444' }}>{'>'}</span>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '48px' }}>{children}</main>
    </div>
  )
}
