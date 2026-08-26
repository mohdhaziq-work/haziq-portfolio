'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/cinematic', label: 'Home' },
  { href: '/cinematic/about', label: 'About' },
  { href: '/cinematic/services', label: 'Services' },
  { href: '/cinematic/gallery', label: 'Gallery' },
  { href: '/cinematic/contact', label: 'Contact' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: '#111', borderBottom: '1px solid #ffd70030', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: '#ffd70015', border: '1px solid #ffd70030', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>Cinematic</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#111', borderRight: '1px solid #ffd70020', paddingTop: '52px', boxShadow: '4px 0 16px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#ffd70010', borderRadius: '12px', border: '1px solid #ffd70020' }}>
                <div style={{ width: '44px', height: '44px', margin: '0 auto 8px', background: '#ffd700', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>C</span>
                </div>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>Cinematic</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{ display: 'block', padding: '10px 16px', marginBottom: '4px', borderRadius: '10px', background: active ? '#ffd700' : 'transparent', color: active ? '#fff' : '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: active ? 600 : 400, transition: 'all 0.2s' }}>
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
