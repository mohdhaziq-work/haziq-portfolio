'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTutorial, Language } from './TutorialContext'
import { cn } from '@/lib/utils'

const LANG_LABELS: Record<Language, string> = { en: 'English', hi: 'Hindi', hing: 'Hinglish' }

export default function TourOverlay() {
  const {
    isTourActive, currentStep, currentStepIndex, totalSteps,
    language, nextStep, prevStep, stopTutorial, setLanguage, isNavigating,
  } = useTutorial()

  const router = useRouter()
  const pathname = usePathname()

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({})
  const [resolvedPos, setResolvedPos] = useState<'top' | 'bottom' | 'left' | 'right' | 'center'>('bottom')
  const [isAnimating, setIsAnimating] = useState(false)
  const [waitingForNav, setWaitingForNav] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const spotPadding = 8
  const navigatedRef = useRef<string>('')

  // Find the target element on the page
  const findTarget = useCallback((): Element | null => {
    if (!currentStep || !currentStep.target) return null
    return document.querySelector(`[data-tour="${currentStep.target}"]`)
  }, [currentStep])

  // Update positions
  const updatePositions = useCallback(() => {
    if (!isTourActive || !currentStep) return

    const target = findTarget()

    if (!target) {
      setTargetRect(null)
      setResolvedPos('center')
      setTooltipStyle({
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      })
      setArrowStyle({})
      return
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

    setTimeout(() => {
      const rect = target.getBoundingClientRect()
      setTargetRect(rect)

      const isMobile = window.innerWidth < 768
      const gap = 12
      const vw = window.innerWidth
      const vh = window.innerHeight
      const tooltipW = Math.min(380, vw - 32)
      const tooltipH = 220

      let pos: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'auto' = currentStep.position || 'auto'
      if (pos === 'auto') {
        if (isMobile) {
          pos = rect.top > vh * 0.6 ? 'top' : 'bottom'
        } else {
          const spaceBelow = vh - rect.bottom
          const spaceAbove = rect.top
          if (spaceBelow > tooltipH + gap * 2) pos = 'bottom'
          else if (spaceAbove > tooltipH + gap * 2) pos = 'top'
          else if (rect.right + tooltipW + gap < vw) pos = 'right'
          else if (rect.left - tooltipW - gap > 0) pos = 'left'
          else pos = 'bottom'
        }
      }
      setResolvedPos(pos)

      let top = 0, left = 0

      switch (pos) {
        case 'bottom':
          top = rect.bottom + spotPadding + gap
          left = rect.left + rect.width / 2 - tooltipW / 2
          break
        case 'top':
          top = rect.top - spotPadding - gap - tooltipH
          left = rect.left + rect.width / 2 - tooltipW / 2
          break
        case 'right':
          top = rect.top + rect.height / 2 - tooltipH / 2
          left = rect.right + spotPadding + gap
          break
        case 'left':
          top = rect.top + rect.height / 2 - tooltipH / 2
          left = rect.left - spotPadding - gap - tooltipW
          break
        case 'center':
          top = vh / 2 - tooltipH / 2
          left = vw / 2 - tooltipW / 2
          break
      }

      left = Math.max(16, Math.min(left, vw - tooltipW - 16))
      top = Math.max(16, Math.min(top, vh - tooltipH - 16))

      setTooltipStyle({ top, left, width: tooltipW })

      const arrowSize = 8
      let aStyle: React.CSSProperties = {}
      switch (pos) {
        case 'bottom':
          aStyle = {
            top: -arrowSize, left: Math.max(20, Math.min(rect.left + rect.width / 2 - left - arrowSize, tooltipW - 40)),
            borderLeft: `${arrowSize}px solid transparent`, borderRight: `${arrowSize}px solid transparent`,
            borderBottom: `${arrowSize}px solid white`,
          }
          break
        case 'top':
          aStyle = {
            bottom: -arrowSize, left: Math.max(20, Math.min(rect.left + rect.width / 2 - left - arrowSize, tooltipW - 40)),
            borderLeft: `${arrowSize}px solid transparent`, borderRight: `${arrowSize}px solid transparent`,
            borderTop: `${arrowSize}px solid white`,
          }
          break
        case 'right':
          aStyle = {
            left: -arrowSize, top: Math.max(20, Math.min(rect.top + rect.height / 2 - top - arrowSize, tooltipH - 40)),
            borderTop: `${arrowSize}px solid transparent`, borderBottom: `${arrowSize}px solid transparent`,
            borderRight: `${arrowSize}px solid white`,
          }
          break
        case 'left':
          aStyle = {
            right: -arrowSize, top: Math.max(20, Math.min(rect.top + rect.height / 2 - top - arrowSize, tooltipH - 40)),
            borderTop: `${arrowSize}px solid transparent`, borderBottom: `${arrowSize}px solid transparent`,
            borderLeft: `${arrowSize}px solid white`,
          }
          break
      }
      setArrowStyle(aStyle)
    }, 350)
  }, [isTourActive, currentStep, findTarget, spotPadding])

  // Handle page navigation using Next.js router (no full reload!)
  useEffect(() => {
    if (!isTourActive || !currentStep?.page) return

    const targetPage = currentStep.page
    const currentPage = pathname

    if (currentPage !== targetPage && navigatedRef.current !== targetPage) {
      navigatedRef.current = targetPage
      setWaitingForNav(true)
      setTargetRect(null)

      // Use Next.js router for client-side navigation (preserves React state!)
      router.push(targetPage)
    }
  }, [isTourActive, currentStep, pathname, router])

  // After navigation completes, update positions
  useEffect(() => {
    if (!isTourActive || !currentStep) return

    // Small delay after page change to let DOM render
    const timer = setTimeout(() => {
      setWaitingForNav(false)
      navigatedRef.current = ''
      updatePositions()
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname, isTourActive, currentStepIndex, updatePositions])

  // Run position updates on resize/scroll
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

  if (!isTourActive || !currentStep) return null

  const isCenter = resolvedPos === 'center' || !currentStep.target || waitingForNav

  return (
    <>
      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      />

      {/* Spotlight around target element */}
      {targetRect && !waitingForNav && (
        <div
          className="fixed z-[9999] rounded-lg pointer-events-none"
          style={{
            top: targetRect.top - spotPadding,
            left: targetRect.left - spotPadding,
            width: targetRect.width + spotPadding * 2,
            height: targetRect.height + spotPadding * 2,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
            border: '2px solid rgba(26,115,232,0.8)',
            transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              boxShadow: '0 0 0 2px rgba(26,115,232,0.3), 0 0 20px rgba(26,115,232,0.15)',
              animation: 'tourPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={cn(
          'fixed z-[10001] bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300',
          (isAnimating || waitingForNav) && 'opacity-0 scale-95',
          !isAnimating && !waitingForNav && 'opacity-100 scale-100',
        )}
        style={{
          ...tooltipStyle,
          width: isCenter ? 'min(380px, calc(100vw - 32px))' : tooltipStyle.width,
          ...(isCenter ? { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' } : {}),
        }}
      >
        {/* Arrow (not for center) */}
        {!isCenter && (
          <div className="absolute z-10" style={arrowStyle} />
        )}

        {/* Tooltip Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-accent rounded-md flex items-center justify-center text-white text-[11px] font-bold">
              {currentStepIndex + 1}
            </span>
            <span className="text-[11px] text-text-tertiary font-medium">
              {currentStepIndex + 1} / {totalSteps}
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-0.5 bg-surface-2 rounded-md p-0.5">
            {(['en', 'hi', 'hing'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-semibold transition-all',
                  language === lang
                    ? 'bg-white text-accent shadow-sm'
                    : 'text-text-tertiary hover:text-text-secondary'
                )}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Step Title */}
        <div className="px-5 pb-2">
          <h4 className="text-sm font-bold text-text-primary leading-snug">
            {currentStep.title[language] || currentStep.title.en}
          </h4>
        </div>

        {/* Step Description */}
        <div className="px-5 pb-4">
          <p className="text-[13px] text-text-secondary leading-relaxed">
            {currentStep.description[language] || currentStep.description.en}
          </p>
          {waitingForNav && (
            <div className="flex items-center gap-2 mt-3 text-accent">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-[11px] font-medium">
                {language === 'hi' ? 'पेज लोड हो रहा है...' : language === 'hing' ? 'Page load ho raha hai...' : 'Loading page...'}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="px-5 pb-3">
          <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface/50 border-t border-border">
          <button
            onClick={stopTutorial}
            className="text-[11px] font-semibold text-text-tertiary hover:text-red-500 transition-colors"
          >
            {language === 'hi' ? 'बंद करें' : language === 'hing' ? 'Close' : 'Skip Tour'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-1.5 bg-accent text-white rounded-full text-[12px] font-semibold hover:bg-accent-hover transition-all"
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
