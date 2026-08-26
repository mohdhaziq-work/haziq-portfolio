'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/geometric', label: 'Home' },
  { href: '/geometric/about', label: 'About' },
  { href: '/geometric/services', label: 'Services' },
  { href: '/geometric/gallery', label: 'Gallery' },
  { href: '/geometric/contact', label: 'Contact' },
]

export default function GeometricLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', fontFamily: '"Montserrat", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      {/* Geometric pattern bg */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.03, backgroundImage: 'linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000), linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000), linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000), linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000), linear-gradient(60deg, rgba(0,0,0,0.5) 25%, transparent 25.5%, transparent 75%, rgba(0,0,0,0.5) 75%), linear-gradient(60deg, rgba(0,0,0,0.5) 25%, transparent 25.5%, transparent 75%, rgba(0,0,0,0.5) 75%)', backgroundSize: '40px 70px', backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '52px', background: '#fff', borderBottom: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: '#000', border: 'none', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#000', fontSize: '16px', fontWeight: 900, letterSpacing: '4px' }}>GEOMETRIC</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#fff', borderRight: '3px solid #000', paddingTop: '52px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#000' }}>
                <div style={{ width: '48px', height: '48px', margin: '0 auto 10px', background: '#fff', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>GEOMETRIC</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>Shape Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '2px',
                    background: active ? '#000' : 'transparent',
                    color: active ? '#fff' : '#666', textDecoration: 'none',
                    fontSize: '13px', fontWeight: active ? 700 : 500, transition: 'all 0.2s',
                    letterSpacing: '1px',
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
