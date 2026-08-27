'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Track custom events
export function event({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track specific user actions
export const trackEvent = {
  // Auth events
  signIn: () => event({ action: 'sign_in', category: 'auth' }),
  signOut: () => event({ action: 'sign_out', category: 'auth' }),
  
  // Contact events
  contactSubmit: () => event({ action: 'contact_submit', category: 'engagement' }),
  mockupRequest: () => event({ action: 'mockup_request', category: 'engagement' }),
  dmClick: () => event({ action: 'dm_click', category: 'engagement' }),
  
  // Project events
  projectView: (name: string) => event({ action: 'project_view', category: 'projects', label: name }),
  projectLink: (name: string) => event({ action: 'project_link_click', category: 'projects', label: name }),
  
  // Service events
  planView: (plan: string) => event({ action: 'plan_view', category: 'services', label: plan }),
  planSelect: (plan: string) => event({ action: 'plan_select', category: 'services', label: plan }),
  
  // Design events
  designView: (name: string) => event({ action: 'design_view', category: 'designs', label: name }),
  
  // Tutorial events
  tutorialStart: (name: string) => event({ action: 'tutorial_start', category: 'tutorials', label: name }),
  tutorialComplete: (name: string) => event({ action: 'tutorial_complete', category: 'tutorials', label: name }),
  
  // Bug report
  bugReport: () => event({ action: 'bug_report', category: 'feedback' }),
}

// Google Analytics component
export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    pageview(url)
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
