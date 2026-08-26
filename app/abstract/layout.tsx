'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/abstract', label: 'Home' },
  { href: '/abstract/about', label: 'About' },
  { href: '/abstract/services', label: 'Services' },
  { href: '/abstract/gallery', label: 'Gallery' },
  { href: '/abstract/contact', label: 'Contact' },
]

export default function AbstractLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Manrope", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Abstract shapes */}
      <div style={{ position: 'fixed', top: '-5%', right: '-5%', width: '300px', height: '300px', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-5%', left: '-5%', width: '250px', height: '250px', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', background: 'linear-gradient(135deg, rgba(69,183,209,0.1), rgba(247,220,111,0.1))', pointerEvents: 'none' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(250,250,250,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ color: '#333', fontSize: '18px', fontWeight: 800 }}>Abstract</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#fafafa', borderRight: '1px solid rgba(0,0,0,0.08)', paddingTop: '56px' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px', background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '24px' }}>
                <div style={{ width: '56px', height: '56px', margin: '0 auto 10px', background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '24px', fontWeight: 800 }}>A</span>
                </div>
                <p style={{ color: '#333', fontSize: '16px', fontWeight: 700 }}>Abstract Studio</p>
                <p style={{ color: '#999', fontSize: '12px' }}>Shapes & Colors</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '14px 18px', marginBottom: '4px', borderRadius: '14px',
                    background: active ? 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15))' : 'transparent',
                    color: active ? '#333' : '#999', textDecoration: 'none',
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
