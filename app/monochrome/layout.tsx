'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/monochrome', label: 'Home' },
  { href: '/monochrome/about', label: 'About' },
  { href: '/monochrome/services', label: 'Services' },
  { href: '/monochrome/gallery', label: 'Gallery' },
  { href: '/monochrome/contact', label: 'Contact' },
]

export default function MonochromeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: '"IBM Plex Mono", monospace' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '48px', background: '#fff', borderBottom: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '32px', height: '32px', background: '#fff', border: '1px solid #000', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#000', fontSize: '14px', fontWeight: 700 }}>MONOCHROME</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '240px', background: '#fff', borderRight: '1px solid #000', paddingTop: '48px' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '20px', padding: '16px', background: '#000' }}>
                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>MONO</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 400 }}>chrome Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '10px 12px', marginBottom: '1px',
                    background: active ? '#000' : 'transparent',
                    color: active ? '#fff' : '#666', textDecoration: 'none',
                    fontSize: '12px', fontWeight: active ? 700 : 400, transition: 'all 0.2s',
                  }}>{item.label}</Link>
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
