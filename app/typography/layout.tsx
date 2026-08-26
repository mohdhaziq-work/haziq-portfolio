'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/typography', label: 'Home' },
  { href: '/typography/about', label: 'About' },
  { href: '/typography/services', label: 'Services' },
  { href: '/typography/gallery', label: 'Gallery' },
  { href: '/typography/contact', label: 'Contact' },
]

export default function TypographyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fefefe', fontFamily: '"DM Serif Display", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: '#fefefe', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#111', fontSize: '20px', fontWeight: 400, fontStyle: 'italic' }}>Typography</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#fefefe', paddingTop: '56px', boxShadow: '4px 0 20px rgba(0,0,0,0.08)' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                <p style={{ color: '#111', fontSize: '48px', fontWeight: 400, fontStyle: 'italic', lineHeight: 1 }}>Aa</p>
                <p style={{ color: '#111', fontSize: '16px', fontWeight: 400, fontStyle: 'italic', marginTop: '8px' }}>Typography Studio</p>
                <p style={{ color: '#999', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', marginTop: '4px' }}>Where type speaks louder</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '4px',
                    background: active ? '#111' : 'transparent',
                    color: active ? '#fff' : '#666', textDecoration: 'none',
                    fontSize: '15px', fontStyle: active ? 'italic' : 'normal', fontWeight: active ? 400 : 300, transition: 'all 0.2s',
                    fontFamily: active ? '"DM Serif Display", serif' : '"DM Sans", sans-serif',
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
