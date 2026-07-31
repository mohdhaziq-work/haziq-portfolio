'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/skeuomorphism', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/skeuomorphism/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/skeuomorphism/services', label: 'Services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { href: '/skeuomorphism/gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/skeuomorphism/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function SkeuomorphismLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #e8e0d8 0%, #d4ccc4 50%, #c8bfb5 100%)',
      fontFamily: 'Georgia, "Times New Roman", serif',
    }}>
      {/* Skeuomorphic Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        height: '56px',
        background: 'linear-gradient(180deg, #f0ebe5 0%, #d8d0c8 50%, #c4bbb2 100%)',
        borderBottom: '1px solid #a09890',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{
                background: 'linear-gradient(180deg, #f5f0ea 0%, #d8d0c8 100%)',
                border: '1px solid #a09890',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.2)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5a4f45" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(145deg, #8b7355, #6b5540)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)',
                border: '1px solid #5a4a35',
              }}>
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg tracking-wide" style={{
                color: '#3a2f25',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              }}>
                SkeuoCraft
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full" style={{
              background: 'linear-gradient(145deg, #8b7355, #6b5540)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)',
              border: '1px solid #5a4a35',
            }}>
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Skeuomorphic Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <nav className="absolute top-0 left-0 bottom-0 w-72" style={{
            background: 'linear-gradient(180deg, #f0ebe5 0%, #e0d8d0 30%, #d4ccc4 100%)',
            borderRight: '1px solid #a09890',
            boxShadow: '4px 0 16px rgba(0,0,0,0.2), inset -1px 0 0 rgba(255,255,255,0.3)',
            paddingTop: '56px',
          }}>
            <div className="p-4">
              <div className="mb-6 p-4 rounded-xl" style={{
                background: 'linear-gradient(145deg, #f5f0ea, #e0d8d0)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.5)',
                border: '1px solid #c4bbb2',
              }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{
                  background: 'linear-gradient(145deg, #8b7355, #5a4a35)',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)',
                  border: '2px solid #6b5540',
                }}>
                  <span className="text-white text-2xl font-bold">S</span>
                </div>
                <p className="text-center font-bold text-sm" style={{ color: '#3a2f25', textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>SkeuoCraft Studio</p>
                <p className="text-center text-xs" style={{ color: '#8a7f75' }}>Design & Development</p>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                      style={{
                        background: isActive
                          ? 'linear-gradient(145deg, #8b7355, #6b5540)'
                          : 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
                        boxShadow: isActive
                          ? 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.1)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.1)',
                        border: isActive ? '1px solid #5a4a35' : '1px solid #c4bbb2',
                        color: isActive ? '#f5f0ea' : '#5a4f45',
                        textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 0 rgba(255,255,255,0.5)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                      <span className="font-semibold text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="p-3 rounded-xl text-center" style={{
                background: 'linear-gradient(145deg, #f5f0ea, #e0d8d0)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.1)',
                border: '1px solid #c4bbb2',
              }}>
                <p className="text-[10px]" style={{ color: '#8a7f75', textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}>
                  Built by Mohd Haziq
                </p>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-14" style={{
        background: 'linear-gradient(135deg, #e8e0d8 0%, #d4ccc4 50%, #c8bfb5 100%)',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  )
}
