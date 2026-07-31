'use client'
import Link from 'next/link'

export default function NeuoAbout() {
  const bg = '#e0e5ec'; const sl = '#ffffff'; const sd = '#a3b1c6'; const accent = '#6c63ff'
  const raised = { background: bg, boxShadow: `8px 8px 16px ${sd}, -8px -8px 16px ${sl}`, borderRadius: '24px' }
  const inset = { background: bg, boxShadow: `inset 4px 4px 8px ${sd}, inset -4px -4px 8px ${sl}`, borderRadius: '16px' }

  const timeline = [
    { year: '2018', title: 'Birth of Neumorphism', desc: 'Designer Alexander Plyuto published "Soft UI" on Dribbble, sparking the neumorphism movement with its soft, extruded plastic aesthetic.' },
    { year: '2019', title: 'Viral Explosion', desc: 'Neumorphism went viral across design communities. Thousands of designers experimented with soft shadows, creating clocks, calculators, and music players.' },
    { year: '2020', title: 'Accessibility Criticism', desc: 'Critics pointed out that low contrast ratios made neumorphic interfaces difficult for visually impaired users. The community debated inclusivity vs aesthetics.' },
    { year: '2022+', title: 'Modern Neumorphism', desc: 'Designers refined the style — higher contrast, better accessibility, and hybrid approaches combining neumorphism with glassmorphism and flat design.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 mb-8" style={raised}>
            <div className="p-6 mb-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 8px 24px ${accent}40` }}>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-white">About Neumorphism</h1>
            </div>
            <p className="text-center text-base leading-relaxed mb-6" style={{ color: '#4a5568' }}>
              Neumorphism (also called Soft UI) is a design style that combines flat design with subtle, extruded shadows to create a soft, plastic-like appearance. Elements appear to be pressed into or raised from a uniform background, creating a tactile 3D effect without harsh borders or strong contrast.
            </p>
            <div className="p-6" style={inset}>
              <h2 className="text-xl font-bold mb-4 text-center" style={{ color: '#4a5568' }}>Key Characteristics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { t: 'Same Background', d: 'Elements and background share the same base color, relying entirely on shadows for depth.' },
                  { t: 'Dual Shadows', d: 'One light shadow (top-left) and one dark shadow (bottom-right) create the 3D illusion.' },
                  { t: 'Soft Edges', d: 'Large border-radius and gentle curves reinforce the soft, plastic-like feel.' },
                  { t: 'Minimal Color', d: 'Accent colors are used sparingly. Most of the interface lives in a single color family.' },
                ].map((item, i) => (
                  <div key={i} className="p-4" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, borderRadius: '16px' }}>
                    <h3 className="font-bold mb-1" style={{ color: '#4a5568' }}>{item.t}</h3>
                    <p className="text-sm" style={{ color: '#718096' }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8" style={raised}>
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#4a5568' }}>Evolution Timeline</h2>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{
                      background: bg, boxShadow: `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}`,
                    }}>
                      <span style={{ color: accent, fontWeight: 700, fontSize: '13px' }}>{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, borderRadius: '16px' }}>
                    <h3 className="font-bold" style={{ color: '#4a5568' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: '#718096' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link href="/neomorphism" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, color: '#4a5568' }}>Home</Link>
            <Link href="/neomorphism/services" className="px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 4px 12px ${accent}40` }}>Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
