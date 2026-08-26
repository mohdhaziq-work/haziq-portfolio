'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/isometric', label: 'Home' },
  { href: '/isometric/about', label: 'About' },
  { href: '/isometric/services', label: 'Services' },
  { href: '/isometric/gallery', label: 'Gallery' },
  { href: '/isometric/contact', label: 'Contact' },
]

export default function IsometricLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e', fontFamily: '"Exo 2", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Isometric grid bg */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.05, backgroundImage: 'linear-gradient(30deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(150deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(30deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(150deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(60deg, rgba(255,255,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.5) 75%), linear-gradient(60deg, rgba(255,255,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.5) 75%)', backgroundSize: '80px 140px', backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(26,26,46,0.9)', backdropFilter: 'blur(10px)', borderBottom: '2px solid #e94560', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'rgba(233,69,96,0.15)', border: '2px solid #e94560', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: 'skewX(-10deg)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#e94560', fontSize: '18px', fontWeight: 800, letterSpacing: '2px', transform: 'skewX(-5deg)' }}>ISOMETRIC</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: '#16213e', borderRight: '2px solid #e94560', paddingTop: '56px', transform: 'perspective(1000px) rotateY(2deg)', transformOrigin: 'left center' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: 'rgba(233,69,96,0.1)', border: '2px solid #e94560', transform: 'skewY(-2deg)' }}>
                <div style={{ width: '52px', height: '52px', margin: '0 auto 10px', background: '#e94560', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '22px', fontWeight: 800, transform: 'rotate(-45deg)' }}>I</span>
                </div>
                <p style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>Isometric Studio</p>
                <p style={{ color: '#e94560', fontSize: '11px' }}>3D Perspective</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '4px',
                    background: active ? '#e94560' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 700 : 400, transition: 'all 0.2s',
                    transform: 'skewX(-5deg)',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '56px', position: 'relative', zIndex: 1 }}>{children}</main>
    </div>
  )
}
