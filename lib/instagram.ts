/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              INSTAGRAM DM ROUTING ENGINE                     ║
 * ║                                                              ║
 * ║  📌 Ye file handle karti hai:                                ║
 * ║     - Instagram DM direct open (app ya web)                  ║
 * ║     - Profile open (app ya web)                              ║
 * ║     - Smart mobile/desktop detection                         ║
 * ║     - App deep link with web fallback                        ║
 * ║                                                              ║
 * ║  🔥 FLOW:                                                   ║
 * ║     Mobile + App installed → Opens Instagram App (DM)        ║
 * ║     Mobile + No app        → Opens Instagram Web (DM)        ║
 * ║     Desktop                → Opens Instagram Web (DM)        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { CONTACT, SOCIAL_LINKS } from '@/config/site-config'

// ==================== USERNAME EXTRACTION ====================

/**
 * Instagram URL se username extract karta hai
 * Works with all URL formats:
 * - https://instagram.com/username
 * - https://www.instagram.com/username?igsh=xxx
 * - https://instagram.com/username/
 */
function extractUsername(instagramUrl: string): string {
  if (!instagramUrl) return ''
  
  try {
    const url = new URL(instagramUrl)
    const pathParts = url.pathname.split('/').filter(Boolean)
    return pathParts[0] || ''
  } catch {
    // If URL parsing fails, try regex
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
 * Instagram DM URL generate karta hai — mobile app ke liye
 * Deep link: instagram://direct-create?text=message
 */
function getAppDMUrl(message?: string): string {
  const text = message || CONTACT.dmMessage
  return `instagram://direct-create?text=${encodeURIComponent(text)}`
}

/**
 * Instagram Profile URL generate karta hai — mobile app ke liye
 * Deep link: instagram://user?username=xxx
 */
function getAppProfileUrl(username: string): string {
  return `instagram://user?username=${encodeURIComponent(username)}`
}

/**
 * Instagram DM URL — web browser ke liye
 * Opens Instagram messages page
 */
function getWebDMUrl(message?: string): string {
  const text = message || CONTACT.dmMessage
  return `https://ig.me/m?text=${encodeURIComponent(text)}`
}

/**
 * Instagram Profile URL — web browser ke liye
 */
function getWebProfileUrl(username: string): string {
  return `https://instagram.com/${username}/`
}

/**
 * Android Intent URL — Instagram DM ke liye
 * This is the most reliable method on Android
 */
function getAndroidIntentUrl(message?: string): string {
  const text = message || CONTACT.dmMessage
  return `intent://instagram.com/direct-create?text=${encodeURIComponent(text)}#Intent;package=com.instagram.android;scheme=https;end`
}

// ==================== PUBLIC FUNCTIONS ====================

/**
 * 🔥 MAIN FUNCTION: Open Instagram DM
 * 
 * Smart routing:
 * - Mobile + App → Opens directly in Instagram app DM
 * - Mobile + No app → Opens Instagram web DM
 * - Desktop → Opens Instagram web DM
 * 
 * Usage:
 *   openInstagramDM()                    // Default DM message
 *   openInstagramDM('Hello!')            // Custom message
 */
export function openInstagramDM(message?: string): void {
  const device = detectDevice()
  const dmMessage = message || CONTACT.dmMessage

  if (device.isAndroid) {
    // Android: Try intent URL first (most reliable)
    // If app not installed, it falls back to Play Store
    try {
      window.location.href = getAndroidIntentUrl(dmMessage)
    } catch {
      // Fallback to web
      window.open(getWebDMUrl(dmMessage), '_blank', 'noopener,noreferrer')
    }
  } else if (device.isIOS) {
    // iOS: Try app deep link, fallback to web
    const appUrl = getAppDMUrl(dmMessage)
    const webUrl = getWebDMUrl(dmMessage)
    
    // Try opening the app
    window.location.href = appUrl
    
    // If app doesn't open in 1.5 seconds, redirect to web
    const startTime = Date.now()
    setTimeout(() => {
      // If the page is still visible after 1.5s, app didn't open
      if (Date.now() - startTime < 2000) {
        window.location.href = webUrl
      }
    }, 1500)
  } else {
    // Desktop: Open Instagram web DM
    window.open(getWebDMUrl(dmMessage), '_blank', 'noopener,noreferrer')
  }
}

/**
 * Open Instagram Profile
 * 
 * Smart routing:
 * - Mobile + App → Opens in Instagram app
 * - Mobile + No app → Opens in browser
 * - Desktop → Opens in browser
 */
export function openInstagramProfile(): void {
  const device = detectDevice()
  const username = extractUsername(SOCIAL_LINKS.instagram)

  if (!username) {
    // Fallback: Just open the URL directly
    window.open(SOCIAL_LINKS.instagram, '_blank', 'noopener,noreferrer')
    return
  }

  if (device.isAndroid) {
    try {
      window.location.href = `intent://instagram.com/_u/${username}#Intent;package=com.instagram.android;scheme=https;end`
    } catch {
      window.open(getWebProfileUrl(username), '_blank', 'noopener,noreferrer')
    }
  } else if (device.isIOS) {
    window.location.href = getAppProfileUrl(username)
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
 * Returns the best URL based on device
 * 
 * Use this in <a> tags where you can't use onClick
 */
export function getInstagramDMLink(message?: string): string {
  const dmMessage = message || CONTACT.dmMessage
  // For href, we use web URL (app routing requires JS)
  // The web URL will auto-redirect to app on mobile
  return getWebDMUrl(dmMessage)
}

/**
 * Get Instagram profile link (for href attributes)
 */
export function getInstagramProfileLink(): string {
  const username = extractUsername(SOCIAL_LINKS.instagram)
  return username ? getWebProfileUrl(username) : SOCIAL_LINKS.instagram
}
