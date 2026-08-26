'use client'

import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { TUTORIALS } from '@/lib/tutorial/data'
import { useTutorial, Language } from '@/lib/tutorial/TutorialContext'
import { cn } from '@/lib/utils'
import { useDeviceDetection, getDeviceLabel, getDeviceIcon, type DeviceType } from '@/lib/hooks/useDeviceDetection'
import { useState, useMemo, useEffect, useCallback } from 'react'

const LANG_LABELS: Record<Language, string> = { en: 'English', hi: 'Hindi', hing: 'Hinglish' }

// Tutorial categories
const CATEGORIES = [
  { id: 'all', label: { en: 'All', hi: 'सभी', hing: 'Saare' }, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { id: 'getting-started', label: { en: 'Getting Started', hi: 'शुरू करें', hing: 'Shuru karo' }, icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  { id: 'services', label: { en: 'Services', hi: 'सेवाएं', hing: 'Services' }, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'designs', label: { en: 'Designs', hi: 'डिज़ाइन', hing: 'Designs' }, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'project', label: { en: 'Project', hi: 'प्रोजेक्ट', hing: 'Project' }, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
]

// Tutorial category mapping
const TUTORIAL_CATEGORIES: Record<string, string> = {
  'website-tour': 'getting-started',
  'free-mockup': 'getting-started',
  'how-to-contact': 'getting-started',
  'choose-plan': 'services',
  'delivery-process': 'services',
  'design-showcase': 'designs',
  'track-project': 'project',
}

// Estimated time per tutorial (in minutes)
const TUTORIAL_TIMES: Record<string, number> = {
  'website-tour': 3,
  'free-mockup': 2,
  'how-to-contact': 2,
  'choose-plan': 3,
  'delivery-process': 4,
  'design-showcase': 3,
  'track-project': 3,
}

// Difficulty levels
const TUTORIAL_DIFFICULTY: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
  'website-tour': 'beginner',
  'free-mockup': 'beginner',
  'how-to-contact': 'beginner',
  'choose-plan': 'intermediate',
  'delivery-process': 'intermediate',
  'design-showcase': 'beginner',
  'track-project': 'intermediate',
}

const DIFFICULTY_LABELS: Record<string, Record<Language, string>> = {
  beginner: { en: 'Beginner', hi: 'शुरुआती', hing: 'Beginner' },
  intermediate: { en: 'Intermediate', hi: 'मध्यम', hing: 'Intermediate' },
  advanced: { en: 'Advanced', hi: 'उन्नत', hing: 'Advanced' },
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

export default function TutorialsPage() {
  const { startTutorial, language, setLanguage } = useTutorial()
  const deviceInfo = useDeviceDetection()
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | 'all'>('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([])
  const [hoveredTutorial, setHoveredTutorial] = useState<string | null>(null)

  // Load completed tutorials from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('completed-tutorials')
      if (saved) {
        setCompletedTutorials(JSON.parse(saved))
      }
    } catch {}
  }, [])

  // Save completed tutorials to localStorage
  const markAsCompleted = useCallback((tutorialId: string) => {
    setCompletedTutorials(prev => {
      const updated = [...prev, tutorialId]
      try {
        localStorage.setItem('completed-tutorials', JSON.stringify(updated))
      } catch {}
      return updated
    })
  }, [])

  // Filter tutorials based on selected device, category, and search
  const filteredTutorials = useMemo(() => {
    let filtered = TUTORIALS

    // Device filter
    if (selectedDevice !== 'all') {
      filtered = filtered.filter(tutorial => 
        !tutorial.device || tutorial.device === 'all' || tutorial.device === selectedDevice
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => 
        TUTORIAL_CATEGORIES[tutorial.id] === selectedCategory
      )
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tutorial => 
        tutorial.title.en.toLowerCase().includes(query) ||
        tutorial.title.hi?.toLowerCase().includes(query) ||
        tutorial.title.hing?.toLowerCase().includes(query) ||
        tutorial.description.en.toLowerCase().includes(query) ||
        tutorial.description.hi?.toLowerCase().includes(query) ||
        tutorial.description.hing?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [selectedDevice, selectedCategory, searchQuery])

  // Device options for filter
  const deviceOptions: { value: DeviceType | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All Devices', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { value: 'mobile', label: 'Mobile', icon: getDeviceIcon('mobile') },
    { value: 'tablet', label: 'Tablet', icon: getDeviceIcon('tablet') },
    { value: 'desktop', label: 'Desktop', icon: getDeviceIcon('desktop') },
    { value: 'tv', label: 'TV/Large Screen', icon: getDeviceIcon('tv') },
  ]

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.getElementById('tutorial-search')
        if (searchInput) {
          searchInput.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Calculate progress
  const progress = useMemo(() => {
    if (TUTORIALS.length === 0) return 0
    return Math.round((completedTutorials.length / TUTORIALS.length) * 100)
  }, [completedTutorials])

  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Interactive Guides</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            Learn How <span className="text-accent">It Works</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary mb-8">
            Step-by-step interactive walkthrough guides. See real elements highlighted on the live website — no screenshots.
          </AnimatedText>

          {/* Progress Bar */}
          <AnimatedText as="div" delay={250} className="mb-6">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-sm text-text-secondary font-medium">Your Progress</span>
                <span className="text-body-sm text-accent font-semibold">{completedTutorials.length}/{TUTORIALS.length} completed</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </AnimatedText>

          {/* Device Detection Info */}
          <AnimatedText as="div" delay={275} className="mb-6">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-body-sm font-medium">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d={getDeviceIcon(deviceInfo.type)} />
              </svg>
              Detected: {getDeviceLabel(deviceInfo.type)} ({deviceInfo.width}x{deviceInfo.height})
              {deviceInfo.touchDevice && (
                <span className="ml-2 px-2 py-0.5 bg-accent/20 rounded-full text-[10px]">Touch</span>
              )}
            </div>
          </AnimatedText>

          {/* Search Bar */}
          <AnimatedText as="div" delay={300} className="mb-6">
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-text-tertiary">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="tutorial-search"
                type="text"
                placeholder="Search tutorials... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-body-md text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-text-tertiary hover:text-text-primary">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </AnimatedText>

          {/* Category Filter */}
          <AnimatedText as="div" delay={325} className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-body-sm font-semibold transition-all flex items-center gap-2',
                  selectedCategory === category.id
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-white text-text-secondary hover:bg-gray-50 border border-gray-200'
                )}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d={category.icon} />
                </svg>
                {category.label[language] || category.label.en}
              </button>
            ))}
          </AnimatedText>

          {/* Device Filter */}
          <AnimatedText as="div" delay={350} className="flex items-center justify-center gap-2 mb-6">
            <span className="text-body-sm text-text-tertiary font-medium">Device:</span>
            <div className="flex items-center gap-1 bg-surface-2 rounded-lg p-1 flex-wrap justify-center">
              {deviceOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDevice(option.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-body-sm font-semibold transition-all flex items-center gap-1.5',
                    selectedDevice === option.value
                      ? 'bg-white text-accent shadow-sm'
                      : 'text-text-tertiary hover:text-text-secondary'
                  )}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d={option.icon} />
                  </svg>
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
          </AnimatedText>

          {/* Language Selector */}
          <AnimatedText as="div" delay={375} className="flex items-center justify-center gap-2 mb-2">
            <span className="text-body-sm text-text-tertiary font-medium">Language:</span>
            <div className="flex items-center gap-1 bg-surface-2 rounded-lg p-1">
              {(['en', 'hi', 'hing'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-body-sm font-semibold transition-all',
                    language === lang
                      ? 'bg-white text-accent shadow-sm'
                      : 'text-text-tertiary hover:text-text-secondary'
                  )}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
          </AnimatedText>
        </div>
      </Section>

      {/* Tutorial Grid */}
      <Section background="surface">
        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-body-sm text-text-secondary">
            Showing {filteredTutorials.length} of {TUTORIALS.length} tutorials
          </p>
          {(searchQuery || selectedCategory !== 'all' || selectedDevice !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedDevice('all')
              }}
              className="text-body-sm text-accent hover:underline font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, index) => {
            const isCompleted = completedTutorials.includes(tutorial.id)
            const category = TUTORIAL_CATEGORIES[tutorial.id] || 'getting-started'
            const estimatedTime = TUTORIAL_TIMES[tutorial.id] || 3
            const difficulty = TUTORIAL_DIFFICULTY[tutorial.id] || 'beginner'

            return (
              <AnimatedText as="div" key={tutorial.id} delay={index * 100}>
                <button
                  onClick={() => {
                    startTutorial(tutorial)
                    markAsCompleted(tutorial.id)
                  }}
                  onMouseEnter={() => setHoveredTutorial(tutorial.id)}
                  onMouseLeave={() => setHoveredTutorial(null)}
                  className={cn(
                    'w-full text-left elevated-card p-0 overflow-hidden group cursor-pointer transition-all duration-300',
                    hoveredTutorial === tutorial.id && 'ring-2 ring-accent/20 shadow-lg',
                    isCompleted && 'opacity-75'
                  )}
                >
                  {/* Thumbnail - colored gradient with icon */}
                  <div className={cn('relative aspect-[2/1] flex items-center justify-center overflow-hidden', tutorial.color)}>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-lg rotate-12" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full" />
                    </div>

                    {/* Play icon */}
                    <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {isCompleted ? (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>

                    {/* Step count badge */}
                    <span className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {tutorial.steps.length} steps
                    </span>

                    {/* Time estimate badge */}
                    <span className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {estimatedTime} min
                    </span>

                    {/* Completed badge */}
                    {isCompleted && (
                      <span className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        Completed
                      </span>
                    )}

                    {/* Device badge */}
                    {tutorial.device && tutorial.device !== 'all' && (
                      <span className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path d={getDeviceIcon(tutorial.device as DeviceType)} />
                        </svg>
                        {getDeviceLabel(tutorial.device as DeviceType)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    {/* Category & Difficulty */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                        {CATEGORIES.find(c => c.id === category)?.label[language] || CATEGORIES.find(c => c.id === category)?.label.en}
                      </span>
                      <span className="text-text-tertiary">•</span>
                      <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full', DIFFICULTY_COLORS[difficulty])}>
                        {DIFFICULTY_LABELS[difficulty][language] || DIFFICULTY_LABELS[difficulty].en}
                      </span>
                    </div>

                    <h3 className="font-semibold text-text-primary text-headline mb-2 group-hover:text-accent transition-colors">
                      {tutorial.title[language] || tutorial.title.en}
                    </h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed mb-4">
                      {tutorial.description[language] || tutorial.description.en}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-caption text-accent font-semibold">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        {isCompleted ? 'Replay Tour' : 'Start Tour'}
                      </span>
                      <span className="text-[11px] text-text-tertiary">
                        {tutorial.steps.length} steps • {estimatedTime} min
                      </span>
                    </div>
                  </div>
                </button>
              </AnimatedText>
            )
          })}
        </div>

        {/* No tutorials found */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-surface-2 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary">
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-headline text-text-primary mb-3">No tutorials found</h3>
            <p className="text-body-md text-text-secondary mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `No tutorials match "${searchQuery}". Try different keywords.`
                : `No tutorials available for ${getDeviceLabel(selectedDevice as DeviceType)} device in this category.`
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedDevice('all')
              }}
              className="btn-primary px-6 py-3 text-body-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Section>

      {/* How It Works */}
      <Section background="white">
        <div className="max-w-2xl mx-auto">
          <AnimatedText as="h2" className="text-display-sm text-text-primary mb-8 text-center">
            How <span className="text-accent">Tours Work</span>
          </AnimatedText>

          <div className="space-y-6">
            {[
              {
                step: '1',
                title: language === 'hi' ? 'कोई भी टूर चुनें' : language === 'hing' ? 'Koi bhi tour chuno' : 'Pick a Tour',
                desc: language === 'hi' ? 'ऊपर से कोई भी गाइड चुनें जो आप देखना चाहते हैं।' : language === 'hing' ? 'Upar se koi bhi guide chuno jo aap dekhna chahte ho.' : 'Choose any guide above that you want to explore.',
                icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
              },
              {
                step: '2',
                title: language === 'hi' ? 'लाइव हाइलाइट देखें' : language === 'hing' ? 'Live highlight dekho' : 'See Live Highlights',
                desc: language === 'hi' ? 'असली वेबसाइट पर तीर और हाइलाइट दिखेगा जो सही एलिमेंट पर होगा।' : language === 'hing' ? 'Asli website pe arrow aur highlight dikhega jo sahi element par hoga.' : 'Arrows and highlights appear on the real website, pointing at actual elements.',
                icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
              },
              {
                step: '3',
                title: language === 'hi' ? 'भाषा बदलें कभी भी' : language === 'hing' ? 'Bhasha badlein kabhi bhi' : 'Switch Language Anytime',
                desc: language === 'hi' ? 'टूर चलते समय English, Hindi या Hinglish में बदलें।' : language === 'hing' ? 'Tour chalte waqt English, Hindi ya Hinglish mein badlein.' : 'Switch between English, Hindi, and Hinglish while the tour is running.',
                icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
              },
              {
                step: '4',
                title: language === 'hi' ? 'हर डिवाइस पर काम करता है' : language === 'hing' ? 'Har device par kaam karta hai' : 'Works on Every Device',
                desc: language === 'hi' ? 'मोबाइल, टैबलेट, लैपटॉप — आपकी स्क्रीन के हिसाब से टूर दिखेगा।' : language === 'hing' ? 'Mobile, tablet, laptop — aapki screen ke hisaab se tour dikhega.' : 'Mobile, tablet, laptop — the tour adapts to your screen size automatically.',
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-body-md mb-1">{item.title}</h4>
                  <p className="text-body-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Device-Specific Tips */}
      <Section background="surface">
        <div className="max-w-4xl mx-auto">
          <AnimatedText as="h2" className="text-display-sm text-text-primary mb-8 text-center">
            Device-Specific <span className="text-accent">Tips</span>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Tips */}
            <div className="elevated-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" strokeWidth="2">
                    <path d={getDeviceIcon('mobile')} />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-primary">Mobile Tips</h3>
              </div>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Swipe left/right to navigate between tutorial steps
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Tap on highlighted elements to interact
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Use pinch-to-zoom for detailed views
                </li>
              </ul>
            </div>

            {/* Tablet Tips */}
            <div className="elevated-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="#8b5cf6" viewBox="0 0 24 24" strokeWidth="2">
                    <path d={getDeviceIcon('tablet')} />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-primary">Tablet Tips</h3>
              </div>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Works in both portrait and landscape mode
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Split-screen support for multitasking
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Touch and stylus input supported
                </li>
              </ul>
            </div>

            {/* Desktop Tips */}
            <div className="elevated-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="#10b981" viewBox="0 0 24 24" strokeWidth="2">
                    <path d={getDeviceIcon('desktop')} />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-primary">Desktop Tips</h3>
              </div>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Use keyboard arrows to navigate steps
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Hover over elements for more info
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Full-screen mode available
                </li>
              </ul>
            </div>

            {/* TV Tips */}
            <div className="elevated-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="#f97316" viewBox="0 0 24 24" strokeWidth="2">
                    <path d={getDeviceIcon('tv')} />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-primary">TV/Large Screen Tips</h3>
              </div>
              <ul className="space-y-2 text-body-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Optimized for viewing from distance
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Larger text and UI elements
                </li>
                <li className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Remote control navigation support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Keyboard Shortcuts */}
      <Section background="white">
        <div className="max-w-2xl mx-auto">
          <AnimatedText as="h2" className="text-display-sm text-text-primary mb-8 text-center">
            Keyboard <span className="text-accent">Shortcuts</span>
          </AnimatedText>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { keys: ['Ctrl', 'K'], action: 'Focus search' },
              { keys: ['←'], action: 'Previous step' },
              { keys: ['→'], action: 'Next step' },
              { keys: ['Esc'], action: 'Close tour' },
            ].map((shortcut, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, j) => (
                    <span key={j}>
                      <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-body-sm font-mono text-text-primary shadow-sm">
                        {key}
                      </kbd>
                      {j < shortcut.keys.length - 1 && <span className="text-text-tertiary mx-1">+</span>}
                    </span>
                  ))}
                </div>
                <span className="text-body-sm text-text-secondary">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="surface">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedText as="h2" className="text-display-md text-text-primary mb-4">
            Ready to <span className="text-accent">Get Started?</span>
          </AnimatedText>
          <AnimatedText as="p" delay={100} className="text-body-lg text-text-secondary mb-8">
            {language === 'hi' ? 'अब जब सब समझ आ गया, तो अपनी वेबसाइट बनवाना शुरू करें।' : language === 'hing' ? 'Ab jab sab samajh aa gaya, toh apni website banwana shuru karo.' : 'Now that you know how everything works, take the first step towards your new website.'}
          </AnimatedText>
          <AnimatedText as="div" delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-primary px-8 py-4 text-body-md">
              {language === 'hi' ? 'प्रोजेक्ट शुरू करें' : language === 'hing' ? 'Project shuru karo' : 'Start Your Project'}
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
            </a>
            <a href="/services" className="btn-outline px-8 py-4 text-body-md">
              {language === 'hi' ? 'प्लान देखें' : language === 'hing' ? 'Plans dekho' : 'View Plans'}
            </a>
          </AnimatedText>
        </div>
      </Section>
    </div>
  )
}
