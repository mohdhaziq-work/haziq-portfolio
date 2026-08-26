'use client'

import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import { TUTORIALS } from '@/lib/tutorial/data'
import { useTutorial, Language } from '@/lib/tutorial/TutorialContext'
import { cn } from '@/lib/utils'
import { useDeviceDetection, getDeviceLabel, getDeviceIcon, type DeviceType } from '@/lib/hooks/useDeviceDetection'
import { useState, useMemo } from 'react'

const LANG_LABELS: Record<Language, string> = { en: 'English', hi: 'Hindi', hing: 'Hinglish' }

export default function TutorialsPage() {
  const { startTutorial, language, setLanguage } = useTutorial()
  const deviceInfo = useDeviceDetection()
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | 'all'>('all')

  // Filter tutorials based on selected device
  const filteredTutorials = useMemo(() => {
    if (selectedDevice === 'all') {
      return TUTORIALS
    }
    return TUTORIALS.filter(tutorial => 
      !tutorial.device || tutorial.device === 'all' || tutorial.device === selectedDevice
    )
  }, [selectedDevice])

  // Device options for filter
  const deviceOptions: { value: DeviceType | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All Devices', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { value: 'mobile', label: 'Mobile', icon: getDeviceIcon('mobile') },
    { value: 'tablet', label: 'Tablet', icon: getDeviceIcon('tablet') },
    { value: 'desktop', label: 'Desktop', icon: getDeviceIcon('desktop') },
    { value: 'tv', label: 'TV/Large Screen', icon: getDeviceIcon('tv') },
  ]

  return (
    <div className="pt-24">
      {/* Header */}
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Video Guides</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            See How <span className="text-accent">It Works</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary mb-8">
            Interactive walkthrough guides on the live website. No screenshots — see real elements highlighted right where they are.
          </AnimatedText>

          {/* Device Detection Info */}
          <AnimatedText as="div" delay={250} className="mb-6">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-body-sm font-medium">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d={getDeviceIcon(deviceInfo.type)} />
              </svg>
              Detected: {getDeviceLabel(deviceInfo.type)} ({deviceInfo.width}x{deviceInfo.height})
            </div>
          </AnimatedText>

          {/* Device Filter */}
          <AnimatedText as="div" delay={275} className="flex items-center justify-center gap-2 mb-6">
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
          <AnimatedText as="div" delay={300} className="flex items-center justify-center gap-2 mb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, index) => (
            <AnimatedText as="div" key={tutorial.id} delay={index * 100}>
              <button
                onClick={() => startTutorial(tutorial)}
                className="w-full text-left elevated-card p-0 overflow-hidden group cursor-pointer"
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
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Step count badge */}
                  <span className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {tutorial.steps.length} steps
                  </span>

                  {/* Device badge */}
                  {tutorial.device && tutorial.device !== 'all' && (
                    <span className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d={getDeviceIcon(tutorial.device as DeviceType)} />
                      </svg>
                      {getDeviceLabel(tutorial.device as DeviceType)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-text-primary text-headline mb-2 group-hover:text-accent transition-colors">
                    {tutorial.title[language] || tutorial.title.en}
                  </h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed mb-4">
                    {tutorial.description[language] || tutorial.description.en}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-caption text-accent font-semibold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      Start Tour
                    </span>
                  </div>
                </div>
              </button>
            </AnimatedText>
          ))}
        </div>

        {/* No tutorials found */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary">
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-headline text-text-primary mb-2">No tutorials found</h3>
            <p className="text-body-md text-text-secondary">
              No tutorials available for {getDeviceLabel(selectedDevice as DeviceType)} device. Try selecting &quot;All Devices&quot;.
            </p>
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
              },
              {
                step: '2',
                title: language === 'hi' ? 'लाइव हाइलाइट देखें' : language === 'hing' ? 'Live highlight dekho' : 'See Live Highlights',
                desc: language === 'hi' ? 'असली वेबसाइट पर तीर और हाइलाइट दिखेगा जो सही एलिमेंट पर होगा।' : language === 'hing' ? 'Asli website pe arrow aur highlight dikhega jo sahi element par hoga.' : 'Arrows and highlights appear on the real website, pointing at actual elements.',
              },
              {
                step: '3',
                title: language === 'hi' ? 'भाषा बदलें कभी भी' : language === 'hing' ? 'Bhasha badlein kabhi bhi' : 'Switch Language Anytime',
                desc: language === 'hi' ? 'टूर चलते समय English, Hindi या Hinglish में बदलें।' : language === 'hing' ? 'Tour chalte waqt English, Hindi ya Hinglish mein badlein.' : 'Switch between English, Hindi, and Hinglish while the tour is running.',
              },
              {
                step: '4',
                title: language === 'hi' ? 'हर डिवाइस पर काम करता है' : language === 'hing' ? 'Har device par kaam karta hai' : 'Works on Every Device',
                desc: language === 'hi' ? 'मोबाइल, टैबलेट, लैपटॉप — आपकी स्क्रीन के हिसाब से टूर दिखेगा।' : language === 'hing' ? 'Mobile, tablet, laptop — aapki screen ke hisaab se tour dikhega.' : 'Mobile, tablet, laptop — the tour adapts to your screen size automatically.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{item.step}</span>
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
