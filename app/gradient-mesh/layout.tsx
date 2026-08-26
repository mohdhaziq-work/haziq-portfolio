'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/gradient-mesh', label: 'Home' },
  { href: '/gradient-mesh/about', label: 'About' },
  { href: '/gradient-mesh/services', label: 'Services' },
  { href: '/gradient-mesh/gallery', label: 'Gallery' },
  { href: '/gradient-mesh/contact', label: 'Contact' },
]

export default function GradientMeshLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebar, setSidebar] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a1a', fontFamily: '"Space Grotesk", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Animated mesh background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', top: '-10%', left: '-10%', animation: 'meshFloat1 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)', bottom: '-5%', right: '-5%', animation: 'meshFloat2 25s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', top: '40%', left: '50%', animation: 'meshFloat3 18s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes meshFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(80px,60px)} }
        @keyframes meshFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-60px,-80px)} }
        @keyframes meshFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,50px)} }
      `}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '56px', background: 'rgba(10,10,26,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ width: '36px", height: "36px", background: "rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '17px', fontWeight: 700 }}>Gradient Mesh</span>
        </div>
      </header>

      {sidebar && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebar(false)} />
          <nav style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: 'rgba(15,15,30,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(139,92,246,0.2)', paddingTop: '56px', boxShadow: '4px 0 24px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px', padding: '24px', background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.2)' }}>
                <div style={{ width: '56px', height: '56px', margin: '0 auto 10px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>G</span>
                </div>
                <p style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>Gradient Mesh</p>
                <p style={{ color: 'rgba(139,92,246,0.7)', fontSize: '11px' }}>Fluid Design Studio</p>
              </div>
              {NAV.map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} style={{
                    display: 'block', padding: '12px 18px', marginBottom: '4px', borderRadius: '12px',
                    background: active ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2))' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    fontSize: '14px', fontWeight: active ? 600 : 400, transition: 'all 0.2s',
                    border: active ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                  }}>{item.label}</Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <main style={{ paddingTop: '56px', position: 'relative', zIndex: 1 }}>{children}</main>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 50 }}>
        <a href="tel:+917985277756" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '50px', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 20px rgba(139,92,246,0.4)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
          Call Us
        </a>
      </div>
    </div>
  )
}
