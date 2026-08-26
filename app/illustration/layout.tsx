'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/illustration', label: 'Home' },
  { href: '/illustration/about', label: 'About' },
  { href: '/illustration/services', label: 'Services' },
  { href: '/illustration/gallery', label: 'Gallery' },
  { href: '/illustration/contact', label: 'Contact' },
]

export default function IllustrationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fffbf0', fontFamily: '"Fredoka", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: '#ff6b6b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '4px solid #ee5a5a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '40px', height: '40px', background: '#fff', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>Illustration</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#fff', paddingTop: '56px', boxShadow: '4px 0 20px rgba(0,0,0,0.1)', borderRadius: '0 24px 24px 0' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#ff6b6b', borderRadius: '20px' }}>
                <div style={{ width: '60px', height: '60px', margin: '0 auto 10px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#ff6b6b', fontSize: '28px', fontWeight: 700 }}>I</span>
                </div>
                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>Illustration Studio</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Draw. Create. Inspire.</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 18px', marginBottom: '6px', borderRadius: '14px',
                    background: active ? '#ff6b6b' : 'transparent',
                    color: active ? '#fff' : '#666', textDecoration: 'none',
                    fontSize: '15px', fontWeight: active ? 600 : 400, transition: 'all 0.2s',
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
