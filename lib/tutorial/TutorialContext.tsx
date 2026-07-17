'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { TUTORIALS } from './data'

export type Language = 'en' | 'hi' | 'hing'

export interface TourStep {
  target?: string
  page?: string
  title: Record<Language, string>
  description: Record<Language, string>
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

export interface TutorialData {
  id: string
  title: Record<Language, string>
  description: Record<Language, string>
  steps: TourStep[]
  color: string
}

interface TutorialContextType {
  activeTutorial: TutorialData | null
  currentStepIndex: number
  language: Language
  isTourActive: boolean
  isNavigating: boolean
  startTutorial: (tutorial: TutorialData) => void
  stopTutorial: () => void
  nextStep: () => void
  prevStep: () => void
  setLanguage: (lang: Language) => void
  currentStep: TourStep | null
  totalSteps: number
}

const TutorialContext = createContext<TutorialContextType | null>(null)

export function useTutorial() {
  const ctx = useContext(TutorialContext)
  if (!ctx) throw new Error('useTutorial must be used within TutorialProvider')
  return ctx
}

// Session storage keys
const TOUR_KEY = 'tour-active'
const TOUR_STEP_KEY = 'tour-step'
const TOUR_LANG_KEY = 'tour-lang'

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [activeTutorial, setActiveTutorial] = useState<TutorialData | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [language, setLanguageState] = useState<Language>('en')
  const [isTourActive, setIsTourActive] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  // Restore language from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tutorial-lang') as Language
      if (saved && ['en', 'hi', 'hing'].includes(saved)) {
        setLanguageState(saved)
      }
    } catch {}
  }, [])

  // Restore active tour from sessionStorage on mount (survives page navigation)
  useEffect(() => {
    try {
      const savedTourId = sessionStorage.getItem(TOUR_KEY)
      const savedStep = sessionStorage.getItem(TOUR_STEP_KEY)
      const savedLang = sessionStorage.getItem(TOUR_LANG_KEY)

      if (savedTourId) {
        const tutorial = TUTORIALS.find(t => t.id === savedTourId)
        if (tutorial && savedStep) {
          const stepIndex = parseInt(savedStep, 10)
          setActiveTutorial(tutorial)
          setCurrentStepIndex(stepIndex)
          setIsTourActive(true)
          if (savedLang && ['en', 'hi', 'hing'].includes(savedLang)) {
            setLanguageState(savedLang as Language)
          }
          // Clear after restoring so we don't re-restore on next mount
          // Keep it until tour ends naturally
        }
      }
    } catch {}
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try { localStorage.setItem('tutorial-lang', lang) } catch {}
    try { sessionStorage.setItem(TOUR_LANG_KEY, lang) } catch {}
  }, [])

  const startTutorial = useCallback((tutorial: TutorialData) => {
    setActiveTutorial(tutorial)
    setCurrentStepIndex(0)
    setIsTourActive(true)
    // Save to sessionStorage
    try {
      sessionStorage.setItem(TOUR_KEY, tutorial.id)
      sessionStorage.setItem(TOUR_STEP_KEY, '0')
      sessionStorage.setItem(TOUR_LANG_KEY, language)
    } catch {}
  }, [language])

  const stopTutorial = useCallback(() => {
    setActiveTutorial(null)
    setCurrentStepIndex(0)
    setIsTourActive(false)
    setIsNavigating(false)
    // Clear sessionStorage
    try {
      sessionStorage.removeItem(TOUR_KEY)
      sessionStorage.removeItem(TOUR_STEP_KEY)
      sessionStorage.removeItem(TOUR_LANG_KEY)
    } catch {}
  }, [])

  const nextStep = useCallback(() => {
    if (!activeTutorial) return
    if (currentStepIndex < activeTutorial.steps.length - 1) {
      const nextIndex = currentStepIndex + 1
      setCurrentStepIndex(nextIndex)
      // Save step to sessionStorage
      try { sessionStorage.setItem(TOUR_STEP_KEY, String(nextIndex)) } catch {}
    } else {
      stopTutorial()
    }
  }, [activeTutorial, currentStepIndex, stopTutorial])

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1
      setCurrentStepIndex(prevIndex)
      try { sessionStorage.setItem(TOUR_STEP_KEY, String(prevIndex)) } catch {}
    }
  }, [currentStepIndex])

  const currentStep = activeTutorial?.steps[currentStepIndex] || null
  const totalSteps = activeTutorial?.steps.length || 0

  return (
    <TutorialContext.Provider value={{
      activeTutorial, currentStepIndex, language, isTourActive, isNavigating,
      startTutorial, stopTutorial, nextStep, prevStep, setLanguage,
      currentStep, totalSteps,
    }}>
      {children}
    </TutorialContext.Provider>
  )
}
