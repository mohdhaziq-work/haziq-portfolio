'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/organic', label: 'Home' },
  { href: '/organic/about', label: 'About' },
  { href: '/organic/services', label: 'Services' },
  { href: '/organic/gallery', label: 'Gallery' },
  { href: '/organic/contact', label: 'Contact' },
]

export default function OrganicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: '"Lora", serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: '#f5f0e8', borderBottom: '1px solid #d4c5a9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: '#e8dcc8', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a4a35" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#5a4a35', fontSize: '18px', fontWeight: 600 }}>Organic</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#f5f0e8', borderRight: '1px solid #d4c5a9', paddingTop: '56px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#e8dcc8', borderRadius: '20px' }}>
                <div style={{ width: '52px', height: '52px', margin: '0 auto 10px', background: '#5a4a35', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#f5f0e8', fontSize: '22px', fontWeight: 600 }}>O</span>
                </div>
                <p style={{ color: '#5a4a35', fontSize: '15px', fontWeight: 600 }}>Organic Studio</p>
                <p style={{ color: '#8b7355', fontSize: '11px' }}>Nature-inspired</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '4px', borderRadius: '12px',
                    background: active ? '#5a4a35' : 'transparent',
                    color: active ? '#f5f0e8' : '#8b7355', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 600 : 400, transition: 'all 0.2s',
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
