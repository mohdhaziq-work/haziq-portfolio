'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/material-design', label: 'Home' },
  { href: '/material-design/about', label: 'About' },
  { href: '/material-design/services', label: 'Services' },
  { href: '/material-design/gallery', label: 'Gallery' },
  { href: '/material-design/contact', label: 'Contact' },
]

export default function MaterialDesignLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Roboto", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '64px', background: '#6200ee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 500 }}>Material Design</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#fff', paddingTop: '64px', boxShadow: '4px 0 16px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px', padding: '20px', background: '#6200ee', borderRadius: '0' }}>
                <div style={{ width: '56px', height: '56px', margin: '0 auto 10px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#6200ee', fontSize: '24px', fontWeight: 700 }}>M</span>
                </div>
                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500, textAlign: 'center' }}>Material Design</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', textAlign: 'center' }}>Google-inspired</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', marginBottom: '2px', borderRadius: '0 25px 25px 0',
                    background: active ? '#ede7f6' : 'transparent',
                    color: active ? '#6200ee' : '#333', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 500 : 400, transition: 'all 0.2s',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '64px' }}>{children}</main>

      {/* FAB */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        <a href="tel:+917985277756" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: '#03dac6', borderRadius: '16px', boxShadow: '0 6px 10px rgba(0,0,0,0.14)', textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
        </a>
      </div>
    </div>
  )
}
