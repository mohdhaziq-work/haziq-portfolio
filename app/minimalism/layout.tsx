'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/minimalism', label: 'Home' },
  { href: '/minimalism/about', label: 'About' },
  { href: '/minimalism/services', label: 'Services' },
  { href: '/minimalism/gallery', label: 'Gallery' },
  { href: '/minimalism/contact', label: 'Contact' },
]

export default function MinimalismLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#111', fontSize: '14px', fontWeight: 500, letterSpacing: '1px' }}>Minimalism</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '240px', background: '#fff', paddingTop: '52px', boxShadow: '2px 0 20px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '20px' }}>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '10px 0', color: active ? '#111' : '#bbb', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 500 : 300, borderBottom: '1px solid #f5f5f5',
                    transition: 'color 0.2s',
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
