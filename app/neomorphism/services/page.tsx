'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NeuoServices() {
  const [activePlan, setActivePlan] = useState<number | null>(null)
  const bg = '#e0e5ec'; const sl = '#ffffff'; const sd = '#a3b1c6'; const accent = '#6c63ff'
  const raised = { background: bg, boxShadow: `8px 8px 16px ${sd}, -8px -8px 16px ${sl}`, borderRadius: '24px' }
  const inset = { background: bg, boxShadow: `inset 4px 4px 8px ${sd}, inset -4px -4px 8px ${sl}`, borderRadius: '16px' }

  const plans = [
    { name: 'Soft', price: '4,000', color: '#48bb78', features: ['Neumorphic Landing Page', 'Soft Toggle Controls', 'Gentle Shadow System', '1 Revision Round', '5-Day Delivery'] },
    { name: 'Raised', price: '10,000', color: accent, features: ['Multi-Page Neumorphic Design', 'Interactive Soft Controls', 'Animated Transitions', 'Accessibility-Optimized', '3 Revision Rounds', '10-Day Delivery'], popular: true },
    { name: 'Premium', price: '20,000', color: '#8b5cf6', features: ['Full Neumorphic App', 'Custom Soft UI Kit', 'Glassmorphism Hybrid', 'Micro-Animations', 'Dark Mode Variant', 'Priority Support', 'Unlimited Revisions', '21-Day Delivery'] },
  ]

  const services = [
    { title: 'Neumorphic UI Design', desc: 'Soft, extruded interfaces with dual-shadow depth that feel tactile and approachable.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { title: 'Soft UI Components', desc: 'Custom toggles, buttons, sliders, and inputs designed with the neumorphic philosophy.', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { title: 'Glassmorphism Hybrid', desc: 'Combining neumorphic depth with frosted glass effects for a modern, layered aesthetic.', icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
    { title: 'Accessibility-Optimized', desc: 'Neumorphic designs with enhanced contrast and focus states for inclusive experiences.', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
  ]

  return (
    <div className="min-h-screen">
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 mb-8" style={raised}>
            <div className="p-6 mb-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 8px 24px ${accent}40` }}>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-white">Services & Pricing</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {services.map((s, i) => (
                <div key={i} className="p-5" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, borderRadius: '16px' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={inset}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2"><path d={s.icon} /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: '#4a5568' }}>{s.title}</h3>
                      <p className="text-sm" style={{ color: '#718096' }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#4a5568' }}>Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, i) => (
              <div key={i} className="p-6 relative" style={{
                background: bg,
                boxShadow: activePlan === i
                  ? `inset 6px 6px 12px ${sd}, inset -6px -6px 12px ${sl}`
                  : `8px 8px 16px ${sd}, -8px -8px 16px ${sl}`,
                borderRadius: '24px',
                transition: 'all 0.3s ease',
              }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full" style={{
                    background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 2px 8px ${accent}40`,
                  }}>
                    <span className="text-xs font-bold text-white">POPULAR</span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{
                    background: bg, boxShadow: `inset 4px 4px 8px ${sd}, inset -4px -4px 8px ${sl}`,
                  }}>
                    <span style={{ color: plan.color, fontWeight: 700, fontSize: '18px' }}>{plan.name[0]}</span>
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: '#4a5568' }}>{plan.name}</h3>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#4a5568' }}>
                    <span className="text-sm font-normal" style={{ color: '#a0aec0' }}>Rs</span> {plan.price}
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={inset}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xs" style={{ color: '#4a5568' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActivePlan(i)} className="w-full py-3 rounded-xl font-bold text-sm" style={{
                  background: activePlan === i ? bg : `linear-gradient(135deg, ${accent}, #8b5cf6)`,
                  boxShadow: activePlan === i ? `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}` : `0 4px 12px ${accent}40`,
                  color: activePlan === i ? '#4a5568' : '#fff',
                }}>
                  {activePlan === i ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Link href="/neomorphism/about" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, color: '#4a5568' }}>About</Link>
            <Link href="/neomorphism/gallery" className="px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 4px 12px ${accent}40` }}>Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
