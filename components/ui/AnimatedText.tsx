'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export default function AnimatedText({ children, className, delay = 0, as: Tag = 'p' }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref}>
      <Tag
        className={cn(
          'transition-all duration-700 ease-google',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          className
        )}
      >
        {children}
      </Tag>
    </div>
  )
}
