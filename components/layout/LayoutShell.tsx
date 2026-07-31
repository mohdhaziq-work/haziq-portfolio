'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import UserPanel from '@/components/layout/UserPanel'
import LoginPopup from '@/components/auth/LoginPopup'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { TutorialProvider } from '@/lib/tutorial/TutorialContext'
import TourOverlay from '@/lib/tutorial/TourOverlay'

// Demo sites that should NOT show portfolio header/footer
const DEMO_ROUTES = ['/skeuomorphism', '/neomorphism']

function isDemoRoute(pathname: string) {
  return DEMO_ROUTES.some(route => pathname.startsWith(route))
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const demo = isDemoRoute(pathname)

  if (demo) {
    // Demo sites: no header, footer, user panel, etc. — standalone layout
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    )
  }

  // Main portfolio: full layout with header, footer, etc.
  return (
    <AuthProvider>
      <TutorialProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <UserPanel />
        <LoginPopup />
        <TourOverlay />
      </TutorialProvider>
    </AuthProvider>
  )
}
