'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/split-screen', label: 'Home' },
  { href: '/split-screen/about', label: 'About' },
  { href: '/split-screen/services', label: 'Services' },
  { href: '/split-screen/gallery', label: 'Gallery' },
  { href: '/split-screen/contact', label: 'Contact' },
]

export default function SplitScreenLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: '"Archivo", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: '#fff', borderBottom: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: '#000', border: 'none', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#000', fontSize: '18px', fontWeight: 900, letterSpacing: '-1px' }}>SPLIT</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#fff', borderRight: '2px solid #000', paddingTop: '52px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '24px', padding: '20px', background: '#000' }}>
                <p style={{ color: '#fff', fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>SPLIT</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 400 }}>Screen Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '2px',
                    background: active ? '#000' : 'transparent',
                    color: active ? '#fff' : '#666', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 700 : 400, transition: 'all 0.2s',
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
