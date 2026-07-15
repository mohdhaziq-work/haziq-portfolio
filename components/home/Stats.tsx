'use client'

import { STATS } from '@/lib/constants'
import Section from '@/components/ui/Section'

export default function Stats() {
  return (
    <Section background="surface" padding="small">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div key={stat.label} className="text-center py-6" style={{ animationDelay: `${index * 100}ms` }}>
            <p className="text-display-sm text-text-primary font-bold">{stat.value}</p>
            <p className="text-overline text-text-tertiary mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
