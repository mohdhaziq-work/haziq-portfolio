'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/neomorphism', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/neomorphism/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/neomorphism/services', label: 'Services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { href: '/neomorphism/gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/neomorphism/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function NeomorphismLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  // Neumorphism base color
  const bg = '#e0e5ec'
  const shadowLight = '#ffffff'
  const shadowDark = '#a3b1c6'
  const accent = '#6c63ff'

  return (
    <div className="min-h-screen" style={{
      background: bg,
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    }}>
      {/* Neumorphic Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        height: '56px',
        background: bg,
        boxShadow: `0 4px 12px ${shadowDark}40, 0 -1px 0 ${shadowLight}`,
      }}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl"
              style={{
                background: bg,
                boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{
                background: bg,
                boxShadow: `inset 3px 3px 6px ${shadowDark}, inset -3px -3px 6px ${shadowLight}`,
              }}>
                <span style={{ color: accent, fontWeight: 700, fontSize: '14px' }}>N</span>
              </div>
              <span style={{ color: '#4a5568', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>NeuraSoft</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full" style={{
            background: bg,
            boxShadow: `3px 3px 6px ${shadowDark}, -3px -3px 6px ${shadowLight}`,
          }}>
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <nav className="absolute top-0 left-0 bottom-0 w-72" style={{
            background: bg,
            boxShadow: `8px 0 20px ${shadowDark}60`,
            paddingTop: '56px',
          }}>
            <div className="p-4">
              <div className="mb-6 p-4 rounded-2xl" style={{
                background: bg,
                boxShadow: `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`,
              }}>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{
                  background: bg,
                  boxShadow: `5px 5px 10px ${shadowDark}, -5px -5px 10px ${shadowLight}`,
                }}>
                  <span style={{ color: accent, fontWeight: 700, fontSize: '22px' }}>N</span>
                </div>
                <p className="text-center font-bold text-sm" style={{ color: '#4a5568' }}>NeuraSoft</p>
                <p className="text-center text-xs" style={{ color: '#a0aec0' }}>Soft UI Design</p>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                      style={{
                        background: isActive ? bg : 'transparent',
                        boxShadow: isActive
                          ? `inset 3px 3px 6px ${shadowDark}, inset -3px -3px 6px ${shadowLight}`
                          : 'none',
                        color: isActive ? accent : '#6b7280',
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-14" style={{ background: bg, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
