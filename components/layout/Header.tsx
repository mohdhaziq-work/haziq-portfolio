'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { openInstagramDM } from '@/lib/instagram'
import { useAuth } from '@/lib/auth/AuthContext'

/* ─────────────────────────────────────────────
   Unique "Dual Arc" Hamburger Button
   - Two curved arcs (smile + frown shape)
   - Morphs into X on open
   ───────────────────────────────────────────── */

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const pathname = usePathname()
  const { user, isAdmin, isClient, toggleUserPanel, setUserPanelOpen, requireLogin, setShowLoginPopup } = useAuth()

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setUserPanelOpen(false)
  }, [pathname, setUserPanelOpen])

  // Lock body scroll when sidebar open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Staggered nav item animation
  useEffect(() => {
    if (!isMobileOpen) {
      setVisibleItems(new Set())
      return
    }
    const timers: NodeJS.Timeout[] = []
    NAV_LINKS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(i))
      }, 120 + i * 70))
    })
    return () => timers.forEach(clearTimeout)
  }, [isMobileOpen])

  const closeSidebar = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsMobileOpen(prev => !prev)
  }, [])

  const handleUserClick = useCallback(() => {
    if (user) {
      toggleUserPanel()
    } else {
      setShowLoginPopup(true)
    }
  }, [user, toggleUserPanel, setShowLoginPopup])

  // Get user initials
  const userInitial = user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <>
      {/* ─── Header Bar ─── */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-border-light shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="section-container">
          <div className="flex justify-between items-center h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo-haziq.svg"
                alt="Haziq Logo"
                className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
              <span className="font-bold text-lg text-text-primary tracking-tight">
                {SITE.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" data-tour="nav-links">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent-light text-accent'
                        : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Right Side: User Button + DM */}
            <div className="hidden md:flex items-center gap-2">
              {/* User Button */}
              <button
                onClick={handleUserClick}
                data-tour="user-btn"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200',
                  user
                    ? 'bg-surface-2 hover:bg-accent-light text-text-primary hover:text-accent'
                    : 'bg-white hover:bg-gray-50 text-text-primary border border-border hover:border-gray-300'
                )}
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                ) : user ? (
                  <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {userInitial}
                  </div>
                ) : (
                  <GoogleGIcon size={16} />
                )}
                <span className={cn('text-xs font-medium', !user && 'text-text-primary')}>
                  {user
                    ? (isAdmin ? 'Admin' : (user.displayName?.split(' ')[0] || 'My Portal'))
                    : 'Sign In'
                  }
                </span>
              </button>

              {/* DM Button */}
              <button
                onClick={() => openInstagramDM()}
                data-tour="dm-btn"
                className="btn-secondary text-caption py-2 px-4"
              >
                <InstagramIcon />
                DM Me
              </button>
            </div>

            {/* Mobile Right Side: User Button + Hamburger */}
            <div className="flex md:hidden items-center gap-1">
              {/* Mobile User Button */}
              <button
                onClick={handleUserClick}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200',
                  user
                    ? 'text-accent'
                    : 'text-text-secondary hover:bg-surface-2'
                )}
                aria-label={user ? 'Open portal' : 'Sign in'}
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                ) : user ? (
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {userInitial}
                  </div>
                ) : (
                  <GoogleGIcon size={18} />
                )}
              </button>

              {/* ─── UNIQUE Mobile Toggle: Dual Arc Button ─── */}
              <button
                onClick={toggleSidebar}
                className={cn(
                  'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                  isMobileOpen
                    ? 'bg-accent-light text-accent'
                    : 'hover:bg-surface-2 text-text-secondary'
                )}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  className="transition-transform duration-300"
                >
                  <path
                    d="M4 8 Q11 4 18 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-400 origin-center"
                    style={{
                      transform: isMobileOpen
                        ? 'rotate(45deg) translate(2px, 2px) scaleX(1.05)'
                        : 'rotate(0deg) translate(0, 0) scaleX(1)',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
                    }}
                  />
                  <path
                    d="M4 14 Q11 18 18 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-400 origin-center"
                    style={{
                      transform: isMobileOpen
                        ? 'rotate(-45deg) translate(2px, -2px) scaleX(1.05)'
                        : 'rotate(0deg) translate(0, 0) scaleX(1)',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
                    }}
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="1.5"
                    fill="currentColor"
                    style={{
                      opacity: isMobileOpen ? 0 : 1,
                      transform: isMobileOpen ? 'scale(0)' : 'scale(1)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Sidebar Overlay ─── */}
      <div
        className={cn(
          'sidebar-overlay',
          isMobileOpen && 'sidebar-overlay--open'
        )}
        style={{
          pointerEvents: isMobileOpen ? 'auto' : 'none',
        }}
        onClick={closeSidebar}
      />

      {/* ─── Mobile Sidebar Panel ─── */}
      <div
        className={cn(
          'sidebar-panel',
          isMobileOpen && 'sidebar-panel--open'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border-light">
          <Link href="/" onClick={closeSidebar} className="flex items-center gap-2">
            <img
              src="/logo-haziq.svg"
              alt="Haziq Logo"
              className="w-7 h-7 rounded-md"
            />
            <span className="font-bold text-base text-text-primary tracking-tight">
              {SITE.name}
            </span>
          </Link>

          {/* Close button inside sidebar */}
          <button
            onClick={closeSidebar}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href
            const icon = navIcons[link.label]
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={cn(
                  'sidebar-nav-item',
                  visibleItems.has(i) && 'sidebar-nav-item--visible',
                  isActive && 'sidebar-nav-item--active'
                )}
                style={{
                  transitionProperty: 'opacity, transform, background-color, color',
                  transitionDuration: '300ms, 300ms, 200ms, 200ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <span className="sidebar-nav-icon">{icon}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </Link>
            )
          })}

          {/* ─── User Section in Sidebar ─── */}
          {user && (
            <>
              <div className="mx-5 my-3 border-t border-border-light" />

              {/* Admin Section */}
              {isAdmin && (
                <button
                  onClick={() => { closeSidebar(); toggleUserPanel(); }}
                  className="sidebar-nav-item sidebar-nav-item--visible w-full text-left"
                >
                  <span className="sidebar-nav-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <span>Admin Dashboard</span>
                </button>
              )}

              {/* Client Section */}
              {isClient && (
                <button
                  onClick={() => { closeSidebar(); toggleUserPanel(); }}
                  className="sidebar-nav-item sidebar-nav-item--visible w-full text-left"
                >
                  <span className="sidebar-nav-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <span>My Projects</span>
                </button>
              )}
            </>
          )}
        </nav>

        {/* Sidebar Footer — CTA */}
        <div className="p-5 border-t border-border-light">
          {/* User Status */}
          {user ? (
            <div className="flex items-center gap-3 mb-4 px-1">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {userInitial}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-text-primary truncate">{user.displayName || user.email?.split('@')[0]}</p>
                <p className="text-[10px] text-text-tertiary">{isAdmin ? 'Admin Access' : 'Client'}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { closeSidebar(); setShowLoginPopup(true); }}
              className="flex items-center gap-2 w-full px-4 py-2.5 mb-3 rounded-lg border border-border bg-white text-text-primary text-xs font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <GoogleGIcon size={16} />
              Sign In with Google
            </button>
          )}

          {/* Availability Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
            <span className="text-caption text-text-tertiary font-medium">Available for projects</span>
          </div>

          {/* Instagram DM CTA */}
          <button
            onClick={() => { closeSidebar(); openInstagramDM(); }}
            className="btn-primary w-full justify-center text-body-sm py-3"
          >
            <InstagramIcon />
            DM Me on Instagram
          </button>

          {/* Quick Links Row */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href="https://github.com/mohdhaziq-work"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href="mailto:mohdhaziq1962@gmail.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
            >
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Navigation Icons (minimal, Google-style) ─── */

const navIcons: Record<string, React.ReactNode> = {
  Home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  About: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Projects: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Services: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  'Free Mockup': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Tutorials: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Contact: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
}

/* ─── Shared Icons ─── */

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  )
}

/* ─── Google Colored G Icon (for Sign-In button) ─── */

function GoogleGIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
