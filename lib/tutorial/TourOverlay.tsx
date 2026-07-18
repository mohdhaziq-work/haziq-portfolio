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
    spotPad: 6,
    borderRadius: 12,
    fontSize: { title: 13, desc: 12, meta: 10 },
    arrowSize: 6,
  },
  tablet: {
    tooltipMaxW: 360,
    tooltipMinW: 300,
    gap: 12,
    spotPad: 8,
    borderRadius: 14,
    fontSize: { title: 14, desc: 13, meta: 11 },
    arrowSize: 7,
  },
  desktop: {
    tooltipMaxW: 400,
    tooltipMinW: 340,
    gap: 14,
    spotPad: 10,
    borderRadius: 16,
    fontSize: { title: 14, desc: 13, meta: 11 },
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
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigatedRef = useRef<string>('')
  const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Device detection on resize
  useEffect(() => {
    const check = () => setDevice(getDevice())
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

    // If step specifies a position, try to respect it but validate
    let preferred = currentStep?.position || 'auto'

    if (preferred !== 'auto') {
      // On mobile, force top/bottom only (left/right not practical)
      if (isMobile && (preferred === 'left' || preferred === 'right')) {
        preferred = rect.top > vh * 0.45 ? 'top' : 'bottom'
      }
      return preferred as TooltipPos
    }

    // Auto: calculate best position based on space
    const spaceBelow = vh - rect.bottom
    const spaceAbove = rect.top
    const tooltipH = isMobile ? 200 : 240
    const tooltipW = Math.min(cfg.tooltipMaxW, vw - 32)

    if (isMobile) {
      // Mobile: prefer bottom, fallback to top
      return spaceBelow > tooltipH + cfg.gap * 2 ? 'bottom' : 'top'
    }

    // Desktop/Tablet: check all 4 sides
    if (spaceBelow > tooltipH + cfg.gap * 2) return 'bottom'
    if (spaceAbove > tooltipH + cfg.gap * 2) return 'top'
    if (rect.right + tooltipW + cfg.gap * 2 < vw) return 'right'
    if (rect.left - tooltipW - cfg.gap * 2 > 0) return 'left'
    // Fallback: whichever has more space
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

    // Scroll target into view
    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

    // Wait for scroll + any layout shifts
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
          // Tooltip above the target
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

      // Clamp horizontal
      left = Math.max(16, Math.min(left, vw - tooltipW - 16))

      // Clamp vertical — for top position, make sure tooltip doesn't go above viewport
      // For bottom, make sure it doesn't go below
      if (pos === 'bottom') {
        top = Math.max(16, top)
        // If tooltip goes below viewport, switch to top
        if (top + 240 > vh - 16) {
          top = Math.max(16, rect.top - cfg.spotPad - cfg.gap - 240)
        }
      } else if (pos === 'top') {
        top = Math.max(16, top - 240)
      } else if (pos === 'left' || pos === 'right') {
        top = Math.max(16, Math.min(top - 80, vh - 260))
      }

      setTooltipPos({ top, left, width: tooltipW })

      // Arrow positioning
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
    return () => { if (updateTimerRef.current) clearTimeout(updateTimerRef.current) }
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

  return (
    <>
      {/* ===== OVERLAY WITH CUTOUT (NO BLUR inside spotlight) ===== */}
      {/* We use 4 dark rectangles around the spotlight to create the cutout effect.
          This avoids backdrop-filter blur bleeding into the spotlight area. */}
      <div className="fixed inset-0 z-[9998]" style={{ pointerEvents: 'auto' }}>
        {/* Top bar */}
        {targetRect && !waitingForNav ? (
          <>
            <div
              className="absolute left-0 right-0"
              style={{
                top: 0,
                height: holeTop,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {/* Bottom bar */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: holeTop + holeH,
                bottom: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                transition: 'top 0.35s cubic-bezier(0.4,0,0.2,1)',
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
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
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
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          </>
        ) : (
          /* Full overlay when no target (center mode or navigating) */
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
            }}
          />
        )}
      </div>

      {/* ===== SPOTLIGHT BORDER + PULSE ===== */}
      {targetRect && !waitingForNav && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            top: holeTop,
            left: holeLeft,
            width: holeW,
            height: holeH,
            borderRadius: cfg.borderRadius,
            border: `2px solid rgba(26,115,232,0.8)`,
            transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Animated pulse ring */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: cfg.borderRadius,
              animation: 'tourPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* ===== TOOLTIP ===== */}
      <div
        ref={tooltipRef}
        className={cn(
          'fixed z-[10001] bg-white overflow-hidden transition-all duration-300',
          isMobile ? 'rounded-xl shadow-xl' : 'rounded-xl shadow-2xl',
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
        }}
      >
        {/* Arrow */}
        {!isCenter && (
          <div className="absolute z-10" style={arrowStyle} />
        )}

        {/* Tooltip Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1.5" style={{ gap: 8 }}>
          <div className="flex items-center" style={{ gap: 6 }}>
            <span
              className="flex items-center justify-center text-white font-bold rounded-md"
              style={{
                width: isMobile ? 20 : 24,
                height: isMobile ? 20 : 24,
                fontSize: cfg.fontSize.meta,
                background: 'var(--accent)',
              }}
            >
              {currentStepIndex + 1}
            </span>
            <span className="font-medium" style={{ fontSize: cfg.fontSize.meta, color: 'var(--text-tertiary)' }}>
              {currentStepIndex + 1} / {totalSteps}
            </span>
          </div>

          {/* Language Selector */}
          <div
            className="flex items-center p-0.5 rounded-md"
            style={{ gap: 2, background: 'var(--surface-2)' }}
          >
            {(['en', 'hi', 'hing'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'rounded font-semibold transition-all',
                  language === lang
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white/50'
                )}
                style={{
                  padding: isMobile ? '1px 5px' : '2px 8px',
                  fontSize: isMobile ? 9 : 10,
                  color: language === lang ? 'var(--accent)' : 'var(--text-tertiary)',
                }}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Step Title */}
        <div className="px-4 pb-1">
          <h4 className="font-bold leading-snug" style={{ fontSize: cfg.fontSize.title, color: 'var(--text-primary)' }}>
            {currentStep.title[language] || currentStep.title.en}
          </h4>
        </div>

        {/* Step Description */}
        <div className="px-4 pb-3">
          <p className="leading-relaxed" style={{ fontSize: cfg.fontSize.desc, color: 'var(--text-secondary)' }}>
            {currentStep.description[language] || currentStep.description.en}
          </p>
          {waitingForNav && (
            <div className="flex items-center mt-2" style={{ gap: 6, color: 'var(--accent)' }}>
              <div className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
              <span className="font-medium" style={{ fontSize: cfg.fontSize.meta }}>
                {language === 'hi' ? 'पेज लोड हो रहा है...' : language === 'hing' ? 'Page load ho raha hai...' : 'Loading page...'}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                background: 'var(--accent)',
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: 'var(--surface, #f8f9fa)', borderTop: '1px solid var(--border, #e8eaed)' }}
        >
          <button
            onClick={stopTutorial}
            className="font-semibold transition-colors hover:text-red-500"
            style={{ fontSize: cfg.fontSize.meta, color: 'var(--text-tertiary)' }}
          >
            {language === 'hi' ? 'बंद करें' : language === 'hing' ? 'Close' : 'Skip Tour'}
          </button>

          <div className="flex items-center" style={{ gap: 8 }}>
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center justify-center rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
              style={{
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                color: 'var(--text-secondary)',
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={nextStep}
              className="font-semibold rounded-full text-white transition-all hover:opacity-90"
              style={{
                padding: isMobile ? '5px 14px' : '6px 18px',
                fontSize: isMobile ? 11 : 12,
                background: 'var(--accent)',
              }}
            >
              {currentStepIndex === totalSteps - 1
                ? (language === 'hi' ? 'हो गया!' : language === 'hing' ? 'Done!' : 'Finish')
                : (language === 'hi' ? 'आगे' : language === 'hing' ? 'Next' : 'Next')
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
