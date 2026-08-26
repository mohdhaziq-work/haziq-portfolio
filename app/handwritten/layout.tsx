'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/handwritten', label: 'Home' },
  { href: '/handwritten/about', label: 'About' },
  { href: '/handwritten/services', label: 'Services' },
  { href: '/handwritten/gallery', label: 'Gallery' },
  { href: '/handwritten/contact', label: 'Contact' },
]

export default function HandwrittenLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fffef5', fontFamily: '"Caveat", cursive' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: '#fffef5', borderBottom: '2px dashed #d4c5a9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '40px', height: '40px', background: '#fffef5', border: '2px dashed #d4c5a9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a4a35" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#5a4a35', fontSize: '24px', fontWeight: 700 }}>Handwritten</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#fffef5', borderRight: '2px dashed #d4c5a9', paddingTop: '56px' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px', background: '#f5f0e8', borderRadius: '20px', border: '2px dashed #d4c5a9' }}>
                <p style={{ color: '#5a4a35', fontSize: '48px', fontWeight: 700 }}>Hi!</p>
                <p style={{ color: '#8b7355', fontSize: '16px', fontWeight: 500, marginTop: '8px' }}>Handwritten Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 18px', marginBottom: '6px', borderRadius: '12px',
                    background: active ? '#f5f0e8' : 'transparent',
                    color: active ? '#5a4a35' : '#8b7355', textDecoration: 'none',
                    fontSize: '20px', fontWeight: active ? 700 : 500, transition: 'all 0.2s',
                    border: active ? '2px dashed #d4c5a9' : '2px dashed transparent',
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
