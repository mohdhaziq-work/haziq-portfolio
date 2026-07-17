'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'white' | 'surface' | 'gradient'
  padding?: 'default' | 'small' | 'large'
  'data-tour'?: string
}

export default function Section({ children, className, id, background = 'white', padding = 'default', 'data-tour': dataTour }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const bgClass = {
    white: 'bg-background',
    surface: 'bg-surface',
    gradient: 'bg-gradient-to-b from-background to-surface',
  }[background]

  const paddingClass = {
    small: 'py-section-sm',
    default: 'py-section',
    large: 'py-40',
  }[padding]

  return (
    <section
      ref={ref}
      id={id}
      data-tour={dataTour}
      className={cn(bgClass, paddingClass, className)}
    >
      <div className={cn(
        'section-container transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        {children}
      </div>
    </section>
  )
}
