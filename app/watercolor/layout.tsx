'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/watercolor', label: 'Home' },
  { href: '/watercolor/about', label: 'About' },
  { href: '/watercolor/services', label: 'Services' },
  { href: '/watercolor/gallery', label: 'Gallery' },
  { href: '/watercolor/contact', label: 'Contact' },
]

export default function WatercolorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fefcfa', fontFamily: '"Playfair Display", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Nunito+Sans:wght@300;400;600&display=swap');`}</style>

      {/* Watercolor blobs */}
      <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,182,193,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(173,216,230,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(254,252,250,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(200,180,160,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'rgba(255,182,193,0.2)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b6f5e" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#8b6f5e', fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>Watercolor</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: 'rgba(254,252,250,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(200,180,160,0.3)', paddingTop: '56px' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px', background: 'radial-gradient(circle, rgba(255,182,193,0.2) 0%, rgba(173,216,230,0.1) 100%)', borderRadius: '20px' }}>
                <p style={{ color: '#8b6f5e', fontSize: '48px', fontWeight: 600, fontStyle: 'italic' }}>W</p>
                <p style={{ color: '#b8a090', fontSize: '14px', fontWeight: 400, fontStyle: 'italic', marginTop: '8px' }}>Watercolor Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 18px', marginBottom: '4px', borderRadius: '12px',
                    background: active ? 'rgba(255,182,193,0.15)' : 'transparent',
                    color: active ? '#8b6f5e' : '#b8a090', textDecoration: 'none',
                    fontSize: '16px', fontWeight: active ? 600 : 400, fontStyle: 'italic', transition: 'all 0.2s',
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
