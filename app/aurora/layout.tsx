'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/aurora', label: 'Home' },
  { href: '/aurora/about', label: 'About' },
  { href: '/aurora/services', label: 'Services' },
  { href: '/aurora/gallery', label: 'Gallery' },
  { href: '/aurora/contact', label: 'Contact' },
]

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0f0c29', fontFamily: '"Outfit", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Aurora glow */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '300px', pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(0,201,255,0.1) 0%, rgba(146,254,157,0.05) 50%, transparent 100%)' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(15,12,41,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,201,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'rgba(0,201,255,0.1)', border: '1px solid rgba(0,201,255,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c9ff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ background: 'linear-gradient(135deg, #00c9ff, #92fe9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '18px', fontWeight: 700 }}>Aurora</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '260px', background: 'rgba(15,12,41,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(0,201,255,0.2)', paddingTop: '56px', boxShadow: '4px 0 24px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: 'linear-gradient(135deg, rgba(0,201,255,0.15), rgba(146,254,157,0.15))', borderRadius: '16px', border: '1px solid rgba(0,201,255,0.2)' }}>
                <div style={{ width: '52px', height: '52px', margin: '0 auto 10px', background: 'linear-gradient(135deg, #00c9ff, #92fe9d)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#0f0c29', fontSize: '22px', fontWeight: 700 }}>A</span>
                </div>
                <p style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>Aurora Studio</p>
                <p style={{ color: 'rgba(0,201,255,0.6)', fontSize: '11px' }}>Ethereal Design</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 16px', marginBottom: '4px', borderRadius: '12px',
                    background: active ? 'linear-gradient(135deg, rgba(0,201,255,0.2), rgba(146,254,157,0.15))' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 600 : 400, transition: 'all 0.2s',
                    border: active ? '1px solid rgba(0,201,255,0.3)' : '1px solid transparent',
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
