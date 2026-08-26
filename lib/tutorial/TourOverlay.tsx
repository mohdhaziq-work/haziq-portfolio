'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTutorial, Language } from './TutorialContext'
import { cn } from '@/lib/utils'

const LANG_LABELS: Record<Language, string> = { en: 'English', hi: 'Hindi', hing: 'Hinglish' }

type DeviceType = 'mobile' | 'tablet' | 'desktop'
type TooltipPos = 'top' | 'bottom' | 'left' | 'right' | 'center'

interface DeviceConfig {
  tooltipMaxW: number
  tooltipMinW: number
  gap: number
  spotPad: number
  borderRadius: number
  fontSize: { title: number; desc: number; meta: number }
  arrowSize: number
}

const DEVICE_CONFIGS: Record<DeviceType, DeviceConfig> = {
  mobile: {
    tooltipMaxW: 320,
    tooltipMinW: 280,
    gap: 10,
    spotPad: 8,
    borderRadius: 12,
    fontSize: { title: 14, desc: 12, meta: 10 },
    arrowSize: 6,
  },
  tablet: {
    tooltipMaxW: 380,
    tooltipMinW: 320,
    gap: 14,
    spotPad: 10,
    borderRadius: 14,
    fontSize: { title: 15, desc: 13, meta: 11 },
    arrowSize: 7,
  },
  desktop: {
    tooltipMaxW: 420,
    tooltipMinW: 360,
    gap: 16,
    spotPad: 12,
    borderRadius: 16,
    fontSize: { title: 15, desc: 13, meta: 11 },
    arrowSize: 8,
  },
}

function getDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 640) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

// Step icons for visual feedback
const STEP_ICONS = [
  'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5', // Pointer
  'M15 12a3 3 0 11-6 0 3 3 0 016 0z', // Eye
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', // Clipboard
  'M13 10V3L4 14h7v7l9-11h-7z', // Lightning
  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', // Check
  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // Clock
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', // Heart
]

export default function TourOverlay() {
  const {
    isTourActive, currentStep, currentStepIndex, totalSteps,
    language, nextStep, prevStep, stopTutorial, setLanguage, isNavigating,
  } = useTutorial()

  const router = useRouter()
  const pathname = usePathname()

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 340 })
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({})
  const [resolvedPos, setResolvedPos] = useState<TooltipPos>('bottom')
  const [isAnimating, setIsAnimating] = useState(false)
  const [waitingForNav, setWaitingForNav] = useState(false)
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [showStepList, setShowStepList] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(0)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigatedRef = useRef<string>('')
  const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Device detection on resize
  useEffect(() => {
    const check = () => setDevice(getDevice())
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Pulse animation effect
  useEffect(() => {
    if (!isTourActive || !targetRect) return
    
    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 100)
    }, 50)
    
    return () => clearInterval(interval)
  }, [isTourActive, targetRect])

  // Find the target element on the page
  const findTarget = useCallback((): Element | null => {
    if (!currentStep || !currentStep.target) return null
    return document.querySelector(`[data-tour="${currentStep.target}"]`)
  }, [currentStep])

  // Smart position calculation based on available space
  const calcBestPosition = useCallback((rect: DOMRect, cfg: DeviceConfig): TooltipPos => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const isMobile = device === 'mobile'

    let preferred = currentStep?.position || 'auto'

    if (preferred !== 'auto') {
      if (isMobile && (preferred === 'left' || preferred === 'right')) {
        preferred = rect.top > vh * 0.45 ? 'top' : 'bottom'
      }
      return preferred as TooltipPos
    }

    const spaceBelow = vh - rect.bottom
    const spaceAbove = rect.top
    const tooltipH = isMobile ? 200 : 260
    const tooltipW = Math.min(cfg.tooltipMaxW, vw - 32)

    if (isMobile) {
      return spaceBelow > tooltipH + cfg.gap * 2 ? 'bottom' : 'top'
    }

    if (spaceBelow > tooltipH + cfg.gap * 2) return 'bottom'
    if (spaceAbove > tooltipH + cfg.gap * 2) return 'top'
    if (rect.right + tooltipW + cfg.gap * 2 < vw) return 'right'
    if (rect.left - tooltipW - cfg.gap * 2 > 0) return 'left'
    return spaceBelow > spaceAbove ? 'bottom' : 'top'
  }, [currentStep, device])

  // Update all positions
  const updatePositions = useCallback(() => {
    if (!isTourActive || !currentStep) return

    const target = findTarget()
    const cfg = DEVICE_CONFIGS[device]

    if (!target) {
      setTargetRect(null)
      setResolvedPos('center')
      setTooltipPos({ top: 0, left: 0, width: Math.min(cfg.tooltipMaxW, window.innerWidth - 32) })
      setArrowStyle({})
      return
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

    if (updateTimerRef.current) clearTimeout(updateTimerRef.current)
    updateTimerRef.current = setTimeout(() => {
      const rect = target.getBoundingClientRect()
      setTargetRect(rect)

      const vw = window.innerWidth
      const vh = window.innerHeight
      const tooltipW = Math.min(cfg.tooltipMaxW, vw - 32)
      const pos = calcBestPosition(rect, cfg)
      setResolvedPos(pos)

      let top = 0, left = 0

      switch (pos) {
        case 'bottom':
          top = rect.bottom + cfg.spotPad + cfg.gap
          left = rect.left + rect.width / 2 - tooltipW / 2
          break
        case 'top':
          top = rect.top - cfg.spotPad - cfg.gap
          left = rect.left + rect.width / 2 - tooltipW / 2
          break
        case 'right':
          top = rect.top + rect.height / 2
          left = rect.right + cfg.spotPad + cfg.gap
          break
        case 'left':
          top = rect.top + rect.height / 2
          left = rect.left - cfg.spotPad - cfg.gap - tooltipW
          break
        case 'center':
          top = vh / 2
          left = vw / 2 - tooltipW / 2
          break
      }

      left = Math.max(16, Math.min(left, vw - tooltipW - 16))

      if (pos === 'bottom') {
        top = Math.max(16, top)
        if (top + 260 > vh - 16) {
          top = Math.max(16, rect.top - cfg.spotPad - cfg.gap - 260)
        }
      } else if (pos === 'top') {
        top = Math.max(16, top - 260)
      } else if (pos === 'left' || pos === 'right') {
        top = Math.max(16, Math.min(top - 100, vh - 280))
      }

      setTooltipPos({ top, left, width: tooltipW })

      const arrowSize = cfg.arrowSize
      let aStyle: React.CSSProperties = {}

      switch (pos) {
        case 'bottom':
          aStyle = {
            top: -arrowSize,
            left: Math.max(24, Math.min(rect.left + rect.width / 2 - left - arrowSize, tooltipW - 48)),
            borderLeft: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid white`,
          }
          break
        case 'top':
          aStyle = {
            bottom: -arrowSize,
            left: Math.max(24, Math.min(rect.left + rect.width / 2 - left - arrowSize, tooltipW - 48)),
            borderLeft: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid transparent`,
            borderTop: `${arrowSize}px solid white`,
          }
          break
        case 'right':
          aStyle = {
            left: -arrowSize,
            top: Math.max(24, Math.min(rect.top + rect.height / 2 - top - arrowSize, 80)),
            borderTop: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid white`,
          }
          break
        case 'left':
          aStyle = {
            right: -arrowSize,
            top: Math.max(24, Math.min(rect.top + rect.height / 2 - top - arrowSize, 80)),
            borderTop: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid transparent`,
            borderLeft: `${arrowSize}px solid white`,
          }
          break
      }
      setArrowStyle(aStyle)
    }, 400)
  }, [isTourActive, currentStep, device, findTarget, calcBestPosition])

  // Handle page navigation using Next.js router
  useEffect(() => {
    if (!isTourActive || !currentStep?.page) return
    const targetPage = currentStep.page
    if (pathname !== targetPage && navigatedRef.current !== targetPage) {
      navigatedRef.current = targetPage
      setWaitingForNav(true)
      setTargetRect(null)
      router.push(targetPage)
    }
  }, [isTourActive, currentStep, pathname, router])

  // After navigation completes, update positions
  useEffect(() => {
    if (!isTourActive || !currentStep) return
    const timer = setTimeout(() => {
      setWaitingForNav(false)
      navigatedRef.current = ''
      updatePositions()
    }, 600)
    return () => clearTimeout(timer)
  }, [pathname, isTourActive, currentStepIndex, updatePositions])

  // Run position updates on resize/scroll + initial
  useEffect(() => {
    if (!isTourActive) return
    setIsAnimating(true)
    const t1 = setTimeout(() => setIsAnimating(false), 50)
    updatePositions()
    const onResize = () => updatePositions()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    return () => {
      clearTimeout(t1)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
  }, [isTourActive, currentStep, currentStepIndex, updatePositions])

  // Keyboard controls
  useEffect(() => {
    if (!isTourActive) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stopTutorial()
      else if (e.key === 'ArrowRight' || e.key === 'Enter') nextStep()
      else if (e.key === 'ArrowLeft') prevStep()
      else if (e.key === 's' || e.key === 'S') setShowStepList(prev => !prev)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isTourActive, stopTutorial, nextStep, prevStep])

  // Lock body scroll
  useEffect(() => {
    if (isTourActive) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isTourActive])

  // Cleanup timer
  useEffect(() => {
    return () => { 
      if (updateTimerRef.current) clearTimeout(updateTimerRef.current)
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current)
    }
  }, [])

  if (!isTourActive || !currentStep) return null

  const cfg = DEVICE_CONFIGS[device]
  const isMobile = device === 'mobile'
  const isCenter = resolvedPos === 'center' || !currentStep.target || waitingForNav

  // Spotlight hole dimensions
  const holeTop = targetRect ? targetRect.top - cfg.spotPad : 0
  const holeLeft = targetRect ? targetRect.left - cfg.spotPad : 0
  const holeW = targetRect ? targetRect.width + cfg.spotPad * 2 : 0
  const holeH = targetRect ? targetRect.height + cfg.spotPad * 2 : 0

  // Pulse glow intensity
  const glowOpacity = 0.3 + Math.sin(pulseIntensity * 0.1) * 0.2
  const glowScale = 1 + Math.sin(pulseIntensity * 0.08) * 0.02

  return (
    <>
      {/* ===== ENHANCED OVERLAY WITH CUTOUT ===== */}
      <div className="fixed inset-0 z-[9998]" style={{ pointerEvents: 'auto' }}>
        {targetRect && !waitingForNav ? (
          <>
            {/* Top bar with gradient */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: 0,
                height: holeTop,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {/* Bottom bar with gradient */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: holeTop + holeH,
                bottom: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                transition: 'top 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {/* Left bar */}
            <div
              className="absolute"
              style={{
                top: holeTop,
                left: 0,
                width: holeLeft,
                height: holeH,
                background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {/* Right bar */}
            <div
              className="absolute"
              style={{
                top: holeTop,
                left: holeLeft + holeW,
                right: 0,
                height: holeH,
                background: 'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
        )}
      </div>

      {/* ===== ENHANCED SPOTLIGHT WITH GLOW EFFECTS ===== */}
      {targetRect && !waitingForNav && (
        <>
          {/* Outer glow ring */}
          <div
            className="fixed z-[9999] pointer-events-none"
            style={{
              top: holeTop - 8,
              left: holeLeft - 8,
              width: holeW + 16,
              height: holeH + 16,
              borderRadius: cfg.borderRadius + 4,
              background: `radial-gradient(ellipse at center, rgba(26,115,232,${glowOpacity}) 0%, transparent 70%)`,
              transform: `scale(${glowScale})`,
              transition: 'all 0.3s ease-out',
            }}
          />
          
          {/* Main spotlight border */}
          <div
            className="fixed z-[9999] pointer-events-none"
            style={{
              top: holeTop,
              left: holeLeft,
              width: holeW,
              height: holeH,
              borderRadius: cfg.borderRadius,
              border: '2px solid rgba(26,115,232,0.9)',
              boxShadow: '0 0 20px rgba(26,115,232,0.3), inset 0 0 20px rgba(26,115,232,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Animated pulse rings */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: cfg.borderRadius,
                animation: 'tourPulse 2s ease-in-out infinite',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                borderRadius: cfg.borderRadius,
                animation: 'tourPulse 2s ease-in-out infinite 0.5s',
              }}
            />
            
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent rounded-tl-sm" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent rounded-tr-sm" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent rounded-bl-sm" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent rounded-br-sm" />
          </div>
        </>
      )}

      {/* ===== ENHANCED TOOLTIP ===== */}
      <div
        ref={tooltipRef}
        className={cn(
          'fixed z-[10001] overflow-hidden transition-all duration-400',
          isMobile ? 'rounded-xl' : 'rounded-2xl',
          (isAnimating || waitingForNav) && 'opacity-0 scale-95 pointer-events-none',
          !isAnimating && !waitingForNav && 'opacity-100 scale-100',
        )}
        style={{
          ...(isCenter ? {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: Math.min(cfg.tooltipMaxW, window.innerWidth - 32),
          } : {
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: tooltipPos.width,
          }),
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.8)',
        }}
      >
        {/* Arrow */}
        {!isCenter && (
          <div className="absolute z-10" style={arrowStyle} />
        )}

        {/* Decorative top gradient bar */}
        <div 
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #1a73e8 0%, #34a853 50%, #fbbc05 100%)',
          }}
        />

        {/* Tooltip Header with enhanced design */}
        <div 
          className="flex items-center justify-between px-5 pt-4 pb-2"
          style={{ gap: 8 }}
        >
          <div className="flex items-center" style={{ gap: 10 }}>
            {/* Step number with icon */}
            <div
              className="flex items-center justify-center text-white font-bold rounded-lg"
              style={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                fontSize: cfg.fontSize.meta,
                background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)',
                boxShadow: '0 2px 8px rgba(26,115,232,0.3)',
              }}
            >
              {currentStepIndex + 1}
            </div>
            <div>
              <span className="font-semibold block" style={{ fontSize: cfg.fontSize.meta, color: 'var(--text-primary)' }}>
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% complete
              </span>
            </div>
          </div>

          {/* Language Selector with enhanced design */}
          <div
            className="flex items-center p-1 rounded-lg"
            style={{ gap: 2, background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            {(['en', 'hi', 'hing'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'rounded-md font-semibold transition-all',
                  language === lang
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white/50'
                )}
                style={{
                  padding: isMobile ? '2px 6px' : '3px 10px',
                  fontSize: isMobile ? 9 : 10,
                  color: language === lang ? 'var(--accent)' : 'var(--text-tertiary)',
                  border: language === lang ? '1px solid var(--accent)' : '1px solid transparent',
                }}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Step Title with enhanced typography */}
        <div className="px-5 pb-2">
          <h4 
            className="font-bold leading-snug"
            style={{ 
              fontSize: cfg.fontSize.title + 1, 
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {currentStep.title[language] || currentStep.title.en}
          </h4>
        </div>

        {/* Step Description with better readability */}
        <div className="px-5 pb-4">
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: cfg.fontSize.desc, 
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {currentStep.description[language] || currentStep.description.en}
          </p>
          {waitingForNav && (
            <div className="flex items-center mt-3 gap-2" style={{ color: 'var(--accent)' }}>
              <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
              <span className="font-medium text-sm">
                {language === 'hi' ? 'पेज लोड हो रहा है...' : language === 'hing' ? 'Page load ho raha hai...' : 'Loading page...'}
              </span>
            </div>
          )}
        </div>

        {/* Enhanced Progress Bar */}
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Progress</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
              {currentStepIndex + 1}/{totalSteps}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                background: 'linear-gradient(90deg, #1a73e8 0%, #34a853 100%)',
                boxShadow: '0 2px 4px rgba(26,115,232,0.3)',
              }}
            />
          </div>
          {/* Step dots */}
          <div className="flex items-center justify-center mt-2 gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === currentStepIndex ? 'scale-125' : i < currentStepIndex ? 'scale-100' : 'scale-75'
                )}
                style={{
                  background: i === currentStepIndex 
                    ? 'var(--accent)' 
                    : i < currentStepIndex 
                      ? '#34a853' 
                      : 'var(--border)',
                  boxShadow: i === currentStepIndex ? '0 0 8px rgba(26,115,232,0.4)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Controls */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ 
            background: 'linear-gradient(180deg, #f8f9fa 0%, #f1f3f4 100%)', 
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={stopTutorial}
              className="font-semibold transition-all hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50"
              style={{ fontSize: cfg.fontSize.meta, color: 'var(--text-tertiary)' }}
            >
              {language === 'hi' ? 'बंद करें' : language === 'hing' ? 'Close' : 'Skip Tour'}
            </button>
            <button
              onClick={() => setShowStepList(prev => !prev)}
              className="font-semibold transition-all hover:text-accent px-3 py-1.5 rounded-lg hover:bg-accent/10"
              style={{ fontSize: cfg.fontSize.meta, color: 'var(--text-tertiary)' }}
              title="Show all steps (S)"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="flex items-center" style={{ gap: 10 }}>
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center justify-center rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
              style={{
                width: isMobile ? 32 : 36,
                height: isMobile ? 32 : 36,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={nextStep}
              className="font-semibold rounded-xl text-white transition-all hover:opacity-90 flex items-center gap-2"
              style={{
                padding: isMobile ? '8px 18px' : '10px 24px',
                fontSize: isMobile ? 12 : 13,
                background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)',
                boxShadow: '0 4px 12px rgba(26,115,232,0.3)',
              }}
            >
              {currentStepIndex === totalSteps - 1
                ? (language === 'hi' ? 'हो गया!' : language === 'hing' ? 'Done!' : 'Finish')
                : (language === 'hi' ? 'आगे' : language === 'hing' ? 'Next' : 'Next')
              }
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Step List Panel (toggle with S key) */}
        {showStepList && (
          <div 
            className="px-5 py-3 border-t"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>
              All Steps:
            </p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {Array.from({ length: totalSteps }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    // Navigate to step i
                    while (i > currentStepIndex) nextStep()
                    while (i < currentStepIndex) prevStep()
                    setShowStepList(false)
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2',
                    i === currentStepIndex 
                      ? 'bg-accent/10 text-accent font-semibold' 
                      : i < currentStepIndex 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-text-secondary hover:bg-gray-50'
                  )}
                >
                  <span className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                    i === currentStepIndex 
                      ? 'bg-accent text-white' 
                      : i < currentStepIndex 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  )}>
                    {i < currentStepIndex ? '✓' : i + 1}
                  </span>
                  <span className="truncate">Step {i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== KEYBOARD SHORTCUTS HINT ===== */}
      {!isMobile && (
        <div 
          className="fixed bottom-4 left-4 z-[10001] flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ 
            background: 'rgba(0,0,0,0.7)', 
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] text-white font-mono">←→</kbd>
          <span className="text-[10px] text-white/70">Navigate</span>
          <span className="text-white/30">|</span>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] text-white font-mono">Esc</kbd>
          <span className="text-[10px] text-white/70">Close</span>
          <span className="text-white/30">|</span>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] text-white font-mono">S</kbd>
          <span className="text-[10px] text-white/70">Steps</span>
        </div>
      )}

      {/* ===== CSS ANIMATIONS ===== */}
      <style jsx global>{`
        @keyframes tourPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(26, 115, 232, 0);
            transform: scale(1.02);
          }
        }
        
        @keyframes tourGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  )
}
