'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface TutorialStep {
  title: string
  description: string
  screenshotUrl: string
  highlight?: {
    top: string
    left: string
    width: string
    height: string
    label?: string
  }
  duration?: number
}

export interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  steps: TutorialStep[]
  color: string
}

interface TutorialPlayerProps {
  tutorial: Tutorial
  onClose: () => void
}

export default function TutorialPlayer({ tutorial, onClose }: TutorialPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const step = tutorial.steps[currentStep]
  const stepDuration = step.duration || 4000

  const totalSteps = tutorial.steps.length

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= totalSteps || isTransitioning) return
    setIsTransitioning(true)
    setProgress(0)
    setImageLoaded(false)
    setImageError(false)

    setTimeout(() => {
      setCurrentStep(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }, [totalSteps, isTransitioning])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1)
    } else {
      setIsPlaying(false)
    }
  }, [currentStep, totalSteps, goToStep])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1)
    }
  }, [currentStep, goToStep])

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
      return
    }

    const startTime = Date.now()
    const startProgress = progress

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((startProgress + (elapsed / stepDuration) * 100), 100)
      setProgress(currentProgress)
    }, 50)

    timerRef.current = setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        nextStep()
      } else {
        setIsPlaying(false)
        setProgress(100)
      }
    }, stepDuration * (1 - startProgress / 100))

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [isPlaying, currentStep, stepDuration, totalSteps, nextStep, progress])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextStep()
      if (e.key === 'ArrowLeft') prevStep()
      if (e.key === ' ') {
        e.preventDefault()
        setIsPlaying(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, nextStep, prevStep])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const resetAndPlay = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(true)
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden" style={{ animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>

        {/* Player Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={cn('w-2 h-2 rounded-full flex-shrink-0', tutorial.color)} />
            <h3 className="font-semibold text-text-primary text-sm truncate">{tutorial.title}</h3>
            <span className="text-caption text-text-tertiary flex-shrink-0">{tutorial.duration}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-caption text-text-tertiary">
              Step {currentStep + 1}/{totalSteps}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Browser Mockup + Content */}
        <div className="flex-1 overflow-hidden relative bg-surface">
          {/* Browser Chrome */}
          <div className="bg-surface-2 border-b border-border px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-text-tertiary border border-border max-w-md">
              haziq-portfolio.onrender.com
            </div>
          </div>

          {/* Screenshot Area */}
          <div className="relative w-full overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
            <div
              className={cn(
                'w-full h-full transition-all duration-300',
                isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
              )}
            >
              {!imageError ? (
                <img
                  src={step.screenshotUrl}
                  alt={step.title}
                  className="w-full h-full object-top object-contain bg-white"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
              ) : null}

              {(!imageLoaded && !imageError) && (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs text-text-tertiary">Loading screenshot...</p>
                  </div>
                </div>
              )}

              {imageError && (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary">
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">Live Preview</p>
                    <p className="text-xs text-text-tertiary">{step.title}</p>
                  </div>
                </div>
              )}

              {/* Highlight Overlay */}
              {step.highlight && imageLoaded && !imageError && (
                <div
                  className="absolute border-2 border-accent rounded-lg bg-accent/10 transition-all duration-300 pointer-events-none"
                  style={{
                    top: step.highlight.top,
                    left: step.highlight.left,
                    width: step.highlight.width,
                    height: step.highlight.height,
                    boxShadow: '0 0 0 4px rgba(26, 115, 232, 0.15), 0 0 20px rgba(26, 115, 232, 0.1)',
                  }}
                >
                  {step.highlight.label && (
                    <span className="absolute -top-7 left-0 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                      {step.highlight.label}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step Description Bar */}
        <div className="px-5 py-4 border-t border-border bg-white flex-shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white font-bold text-sm">{currentStep + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text-primary text-sm mb-1">{step.title}</h4>
              <p className="text-body-sm text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="px-5 py-3 border-t border-border bg-surface/50 flex-shrink-0">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-border rounded-full overflow-hidden mb-3 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const pct = (x / rect.width) * 100
              const stepIndex = Math.floor((pct / 100) * totalSteps)
              goToStep(Math.min(stepIndex, totalSteps - 1))
              setProgress(pct)
            }}
          >
            <div
              className="h-full bg-accent rounded-full transition-all duration-150"
              style={{ width: `${((currentStep + progress / 100) / totalSteps) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Left: Prev */}
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous step"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            {/* Center: Play/Pause + Restart */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentStep === totalSteps - 1 && !isPlaying) {
                    resetAndPlay()
                  } else {
                    setIsPlaying(prev => !prev)
                  }
                }}
                className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent-hover transition-all shadow-chip"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Right: Next */}
            <button
              onClick={nextStep}
              disabled={currentStep === totalSteps - 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next step"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          {/* Step Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {tutorial.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === currentStep ? 'bg-accent w-6' : i < currentStep ? 'bg-accent/50' : 'bg-border'
                )}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
