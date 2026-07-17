'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

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

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [activeTutorial, setActiveTutorial] = useState<TutorialData | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [language, setLanguageState] = useState<Language>('en')
  const [isTourActive, setIsTourActive] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tutorial-lang') as Language
      if (saved && ['en', 'hi', 'hing'].includes(saved)) {
        setLanguageState(saved)
      }
    } catch {}
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try { localStorage.setItem('tutorial-lang', lang) } catch {}
  }, [])

  const startTutorial = useCallback((tutorial: TutorialData) => {
    setActiveTutorial(tutorial)
    setCurrentStepIndex(0)
    setIsTourActive(true)
  }, [])

  const stopTutorial = useCallback(() => {
    setActiveTutorial(null)
    setCurrentStepIndex(0)
    setIsTourActive(false)
  }, [])

  const nextStep = useCallback(() => {
    if (!activeTutorial) return
    if (currentStepIndex < activeTutorial.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      stopTutorial()
    }
  }, [activeTutorial, currentStepIndex, stopTutorial])

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }, [currentStepIndex])

  const currentStep = activeTutorial?.steps[currentStepIndex] || null
  const totalSteps = activeTutorial?.steps.length || 0

  return (
    <TutorialContext.Provider value={{
      activeTutorial, currentStepIndex, language, isTourActive,
      startTutorial, stopTutorial, nextStep, prevStep, setLanguage,
      currentStep, totalSteps,
    }}>
      {children}
    </TutorialContext.Provider>
  )
}
