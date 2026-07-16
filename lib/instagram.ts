/**
 * Instagram DM Routing Engine
 * 
 * Opens DM directly to haziq.built — not just the Instagram home page.
 * 
 * FLOW:
 *   Mobile + App installed -> Opens Instagram App DM to haziq.built
 *   Mobile + No app        -> Opens Instagram Web DM to haziq.built
 *   Desktop                -> Opens Instagram Web DM to haziq.built
 */

import { CONTACT, SOCIAL_LINKS } from '@/config/site-config'

// ==================== USERNAME EXTRACTION ====================

function extractUsername(instagramUrl: string): string {
  if (!instagramUrl) return ''
  try {
    const url = new URL(instagramUrl)
    const pathParts = url.pathname.split('/').filter(Boolean)
    return pathParts[0] || ''
  } catch {
    const match = instagramUrl.match(/instagram\.com\/([a-zA-Z0-9_.]+)/)
    return match ? match[1] : ''
  }
}

// ==================== DEVICE DETECTION ====================

interface DeviceInfo {
  isMobile: boolean
  isAndroid: boolean
  isIOS: boolean
  isDesktop: boolean
}

function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return { isMobile: false, isAndroid: false, isIOS: false, isDesktop: true }
  }
  const ua = navigator.userAgent || ''
  const isAndroid = /Android/i.test(ua)
  const isIOS = /iPhone|iPad|iPod/i.test(ua)
  const isMobile = isAndroid || isIOS
  const isDesktop = !isMobile
  return { isMobile, isAndroid, isIOS, isDesktop }
}

// ==================== URL GENERATORS ====================

/**
 * Instagram DM deep link for APP (iOS/Android)
 * Opens DM thread directly with the user
 * Format: instagram://user?username=haziq.built
 * This opens the user's profile IN the app, where DM button is right there
 */
function getAppDMUrl(username: string): string {
  return `instagram://user?username=${encodeURIComponent(username)}`
}

/**
 * Instagram DM URL for WEB browser
 * Opens direct message page to specific user
 * Format: https://ig.me/m/haziq.built?text=message
 * This is Instagram's official DM web link
 */
function getWebDMUrl(username: string, message?: string): string {
  const text = message || CONTACT.dmMessage
  return `https://ig.me/m/${encodeURIComponent(username)}?text=${encodeURIComponent(text)}`
}

/**
 * Android Intent URL — Instagram DM
 * Opens the user's profile in Instagram app
 */
function getAndroidIntentUrl(username: string): string {
  return `intent://instagram.com/_u/${encodeURIComponent(username)}#Intent;package=com.instagram.android;scheme=https;end`
}

/**
 * Instagram web profile URL (fallback)
 */
function getWebProfileUrl(username: string): string {
  return `https://instagram.com/${username}/`
}

// ==================== PUBLIC FUNCTIONS ====================

/**
 * MAIN FUNCTION: Open Instagram DM to haziq.built
 * 
 * Smart routing:
 * - Android + App -> Opens profile in Instagram app (DM button right there)
 * - iOS + App     -> Opens profile in Instagram app (DM button right there)  
 * - Mobile no app -> Opens ig.me/m/haziq.built (web DM)
 * - Desktop       -> Opens ig.me/m/haziq.built (web DM)
 */
export function openInstagramDM(message?: string): void {
  const device = detectDevice()
  const username = extractUsername(SOCIAL_LINKS.instagram)

  if (!username) {
    window.open(SOCIAL_LINKS.instagram, '_blank', 'noopener,noreferrer')
    return
  }

  if (device.isAndroid) {
    // Android: Try intent URL first (most reliable for opening app)
    // Opens the user's profile in Instagram app where DM button is visible
    try {
      window.location.href = getAndroidIntentUrl(username)
    } catch {
      window.open(getWebDMUrl(username, message), '_blank', 'noopener,noreferrer')
    }
  } else if (device.isIOS) {
    // iOS: Try app deep link, fallback to web
    const appUrl = getAppDMUrl(username)
    const webUrl = getWebDMUrl(username, message)

    // Try opening the Instagram app
    window.location.href = appUrl

    // If app doesn't open in 1.5 seconds, fall back to web DM
    const startTime = Date.now()
    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = webUrl
      }
    }, 1500)
  } else {
    // Desktop: Open Instagram web DM directly
    window.open(getWebDMUrl(username, message), '_blank', 'noopener,noreferrer')
  }
}

/**
 * Open Instagram Profile (not DM)
 */
export function openInstagramProfile(): void {
  const device = detectDevice()
  const username = extractUsername(SOCIAL_LINKS.instagram)

  if (!username) {
    window.open(SOCIAL_LINKS.instagram, '_blank', 'noopener,noreferrer')
    return
  }

  if (device.isAndroid) {
    try {
      window.location.href = getAndroidIntentUrl(username)
    } catch {
      window.open(getWebProfileUrl(username), '_blank', 'noopener,noreferrer')
    }
  } else if (device.isIOS) {
    window.location.href = getAppDMUrl(username)
    const startTime = Date.now()
    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = getWebProfileUrl(username)
      }
    }, 1500)
  } else {
    window.open(getWebProfileUrl(username), '_blank', 'noopener,noreferrer')
  }
}

/**
 * Get Instagram DM link (for href attributes)
 * Returns web DM URL that works everywhere
 */
export function getInstagramDMLink(message?: string): string {
  const username = extractUsername(SOCIAL_LINKS.instagram)
  if (!username) return SOCIAL_LINKS.instagram
  return getWebDMUrl(username, message)
}

/**
 * Get Instagram profile link (for href attributes)
 */
export function getInstagramProfileLink(): string {
  const username = extractUsername(SOCIAL_LINKS.instagram)
  return username ? getWebProfileUrl(username) : SOCIAL_LINKS.instagram
}
