'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SkeuoServices() {
  const [activePlan, setActivePlan] = useState<number | null>(null)

  const skeuoPanel = {
    background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
    boxShadow: '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 1px 0 rgba(255,255,255,0.6)',
    border: '1px solid #c4bbb2',
    borderRadius: '24px',
  }

  const plans = [
    {
      name: 'Bronze',
      price: '5,000',
      color: '#cd7f32',
      features: ['Skeuomorphic Landing Page', '3D Button Interactions', 'Realistic Shadows', '1 Revision Round', '5-Day Delivery'],
    },
    {
      name: 'Silver',
      price: '12,000',
      color: '#c0c0c0',
      features: ['Multi-Page Skeuo Design', 'Interactive Controls', 'Tactile Form Elements', 'Custom Textures', '3 Revision Rounds', '10-Day Delivery'],
      popular: true,
    },
    {
      name: 'Gold',
      price: '25,000',
      color: '#ffd700',
      features: ['Full Skeuomorphic App', 'Animated 3D Elements', 'Physical Metaphors', 'Custom Material Design', 'Sound Effects', 'Priority Support', 'Unlimited Revisions', '21-Day Delivery'],
    },
  ]

  const services = [
    { title: 'Skeuomorphic UI Design', desc: 'Realistic interfaces with depth, shadows, and textures that make digital feel physical.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { title: 'Neumorphic Interfaces', desc: 'Soft, extruded plastic aesthetics with subtle shadows that create gentle depth illusions.', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { title: '3D Interactive Elements', desc: 'Buttons that press, switches that toggle, dials that rotate — every element responds like real.', icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
    { title: 'Material & Texture Design', desc: 'Leather, metal, glass, wood, fabric — custom textures that add warmth and character.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ]

  return (
    <div className="min-h-screen">
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="p-6 md:p-8 mb-8" style={skeuoPanel}>
            <div className="p-6 mb-6" style={{
              background: 'linear-gradient(145deg, #6b5540, #5a4a35)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.3)',
              borderRadius: '16px',
              border: '1px solid #4a3a25',
            }}>
              <h1 className="text-3xl md:text-4xl font-bold text-center" style={{
                color: '#f0ebe5',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontFamily: 'Georgia, serif',
              }}>
                Services & Pricing
              </h1>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {services.map((service, i) => (
                <div key={i} className="p-5" style={{
                  background: 'linear-gradient(145deg, #f5f0ea, #e8e0d8)',
                  boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
                  borderRadius: '16px',
                  border: '1px solid #d0c8c0',
                }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{
                      background: 'linear-gradient(145deg, #8b7355, #6b5540)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                      border: '1px solid #5a4a35',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="2" strokeLinecap="round">
                        <path d={service.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{
                        color: '#3a2f25',
                        textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                      }}>{service.title}</h3>
                      <p className="text-sm" style={{ color: '#6a5f55' }}>{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <h2 className="text-2xl font-bold text-center mb-6" style={{
            color: '#3a2f25',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
            fontFamily: 'Georgia, serif',
          }}>
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, i) => (
              <div key={i} className="p-6 relative" style={{
                background: activePlan === i
                  ? 'linear-gradient(145deg, #8b7355, #6b5540)'
                  : 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
                boxShadow: activePlan === i
                  ? '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 2px 4px rgba(0,0,0,0.2)'
                  : '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 1px 0 rgba(255,255,255,0.6)',
                border: activePlan === i ? '1px solid #5a4a35' : '1px solid #c4bbb2',
                borderRadius: '24px',
                transition: 'all 0.3s ease',
              }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full" style={{
                    background: 'linear-gradient(180deg, #ffd700, #daa520)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
                    border: '1px solid #b8860b',
                  }}>
                    <span className="text-xs font-bold" style={{ color: '#3a2f25', textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}>POPULAR</span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{
                    background: activePlan === i
                      ? 'linear-gradient(145deg, #f0ebe5, #ddd5cd)'
                      : `linear-gradient(145deg, ${plan.color}, ${plan.color}cc)`,
                    boxShadow: activePlan === i
                      ? 'inset 0 2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)',
                    border: activePlan === i ? '1px solid #c4bbb2' : '1px solid rgba(0,0,0,0.2)',
                  }}>
                    <span className="font-bold text-lg" style={{
                      color: activePlan === i ? '#6b5540' : '#fff',
                      textShadow: activePlan === i ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
                    }}>{plan.name[0]}</span>
                  </div>
                  <h3 className="font-bold text-lg" style={{
                    color: activePlan === i ? '#f0ebe5' : '#3a2f25',
                    textShadow: activePlan === i ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 0 rgba(255,255,255,0.5)',
                    fontFamily: 'Georgia, serif',
                  }}>{plan.name}</h3>
                  <p className="text-3xl font-bold mt-1" style={{
                    color: activePlan === i ? '#f0ebe5' : '#3a2f25',
                    textShadow: activePlan === i ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 0 rgba(255,255,255,0.5)',
                  }}>
                    <span className="text-sm font-normal" style={{ color: activePlan === i ? '#c4b8a8' : '#8a7f75' }}>Rs</span> {plan.price}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{
                      background: activePlan === i
                        ? 'rgba(255,255,255,0.1)'
                        : 'linear-gradient(145deg, #f5f0ea, #e8e0d8)',
                      boxShadow: activePlan === i
                        ? 'inset 0 1px 2px rgba(0,0,0,0.1)'
                        : 'inset 1px 1px 2px #d0c8c0, inset -1px -1px 2px #ffffff',
                      borderRadius: '8px',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activePlan === i ? '#8b7355' : '#8b7355'} strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs" style={{
                        color: activePlan === i ? '#e8e0d8' : '#5a4f45',
                      }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActivePlan(i)}
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{
                    background: activePlan === i
                      ? 'linear-gradient(180deg, #f0ebe5, #ddd5cd)'
                      : 'linear-gradient(180deg, #8b7355, #6b5540)',
                    boxShadow: activePlan === i
                      ? '0 4px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)'
                      : '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    border: activePlan === i ? '1px solid #c4bbb2' : '1px solid #5a4a35',
                    color: activePlan === i ? '#5a4f45' : '#f5f0ea',
                    textShadow: activePlan === i ? '0 1px 0 rgba(255,255,255,0.5)' : '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {activePlan === i ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link href="/skeuomorphism/about" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
              boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
              border: '1px solid #c4bbb2',
              color: '#5a4f45',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
            }}>
              About
            </Link>
            <Link href="/skeuomorphism/gallery" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(180deg, #8b7355, #6b5540)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #5a4a35',
              color: '#f5f0ea',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}>
              Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
