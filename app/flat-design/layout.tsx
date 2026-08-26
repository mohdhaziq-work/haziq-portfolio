'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/flat-design', label: 'Home' },
  { href: '/flat-design/about', label: 'About' },
  { href: '/flat-design/services', label: 'Services' },
  { href: '/flat-design/gallery', label: 'Gallery' },
  { href: '/flat-design/contact', label: 'Contact' },
]

export default function FlatDesignLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: '"Nunito", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: '#2980b9', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Flat Design</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#fff', paddingTop: '56px', boxShadow: '4px 0 20px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#3498db', borderRadius: '12px' }}>
                <div style={{ width: '52px', height: '52px', margin: '0 auto 10px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3498db', fontSize: '22px', fontWeight: 800 }}>F</span>
                </div>
                <p style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>Flat Design</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Clean & Simple</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '4px', borderRadius: '10px',
                    background: active ? '#3498db' : 'transparent',
                    color: active ? '#fff' : '#555', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 700 : 600, transition: 'all 0.2s',
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
