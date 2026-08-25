'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/glassmorphism', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/glassmorphism/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/glassmorphism/services', label: 'Services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { href: '/glassmorphism/gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/glassmorphism/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function GlassmorphismLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Floating blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: '10%', left: '5%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,100,100,0.1)', top: '50%', right: '5%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(100,200,255,0.08)', bottom: '10%', left: '30%', filter: 'blur(50px)' }} />
      </div>

      {/* Top Bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '56px',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>Glass Studio</span>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: '999px',
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.8)', fontSize: '12px',
        }}>
          Available
        </div>
      </header>

      {/* Sidebar */}
      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebar(false)} />
          <nav style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            borderRight: '1px solid rgba(255,255,255,0.2)', paddingTop: '56px',
          }}>
            <div style={{ padding: '20px' }}>
              <div style={{
                textAlign: 'center', marginBottom: '28px', padding: '24px',
                background: 'rgba(255,255,255,0.1)', borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 12px',
                  background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}>
                  <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>G</span>
                </div>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>Glass Studio</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Frosted Design</p>
              </div>

              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', marginBottom: '6px', borderRadius: '14px',
                    background: active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                    border: active ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                    color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: active ? 600 : 400,
                    transition: 'all 0.2s',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

      <main style={{ paddingTop: '56px', position: 'relative', zIndex: 1 }}>{children}</main>
    </div>
  )
}
