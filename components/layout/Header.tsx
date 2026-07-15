'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
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
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                H
              </div>
              <span className="font-bold text-lg text-text-primary tracking-tight">
                {SITE.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
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

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-caption py-2 px-4"
              >
                <InstagramIcon />
                DM Me
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-surface-2 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-elevated animate-slide-down">
            <nav className="section-container py-6 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-body-md font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent-light text-accent'
                        : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-border-light">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-body-sm"
                >
                  <InstagramIcon />
                  DM Me on Instagram
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}
