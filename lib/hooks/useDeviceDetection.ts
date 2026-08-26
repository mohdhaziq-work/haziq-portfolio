'use client'

import { useState, useEffect } from 'react'

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'tv'

interface DeviceInfo {
  type: DeviceType
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTV: boolean
  orientation: 'portrait' | 'landscape'
  pixelRatio: number
  touchDevice: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    width: 1024,
    height: 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTV: false,
    orientation: 'landscape',
    pixelRatio: 1,
    touchDevice: false,
  })

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio || 1
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      // Device type detection based on screen width
      let type: DeviceType
      if (width < 768) {
        type = 'mobile'
      } else if (width < 1024) {
        type = 'tablet'
      } else if (width < 1920) {
        type = 'desktop'
      } else {
        type = 'tv'
      }

      // Orientation
      const orientation = width > height ? 'landscape' : 'portrait'

      setDeviceInfo({
        type,
        width,
        height,
        isMobile: type === 'mobile',
        isTablet: type === 'tablet',
        isDesktop: type === 'desktop',
        isTV: type === 'tv',
        orientation,
        pixelRatio,
        touchDevice,
      })
    }

    // Initial detection
    updateDeviceInfo()

    // Listen for resize events
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}

// Helper function to get device-specific tutorials
export function getDeviceTutorials(deviceType: DeviceType) {
  // This will be used to filter tutorials based on device
  return deviceType
}

// Helper function to get device label
export function getDeviceLabel(deviceType: DeviceType): string {
  switch (deviceType) {
    case 'mobile':
      return 'Mobile'
    case 'tablet':
      return 'Tablet'
    case 'desktop':
      return 'Desktop'
    case 'tv':
      return 'TV/Large Screen'
    default:
      return 'Desktop'
  }
}

// Helper function to get device icon
export function getDeviceIcon(deviceType: DeviceType): string {
  switch (deviceType) {
    case 'mobile':
      return 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
    case 'tablet':
      return 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
    case 'desktop':
      return 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    case 'tv':
      return 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    default:
      return 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  }
}
