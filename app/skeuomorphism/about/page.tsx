'use client'

import Link from 'next/link'

export default function SkeuoAbout() {
  const skeuoPanel = {
    background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
    boxShadow: '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 1px 0 rgba(255,255,255,0.6)',
    border: '1px solid #c4bbb2',
    borderRadius: '24px',
  }

  const skeuoInset = {
    background: 'linear-gradient(145deg, #d8d0c8, #e8e0d8)',
    boxShadow: 'inset 4px 4px 8px #b8b0a8, inset -4px -4px 8px #ffffff',
    borderRadius: '16px',
  }

  const timeline = [
    { year: '2012', title: 'The Golden Era', desc: 'Apple iOS 6 popularized skeuomorphism with stitched leather, green felt, and wood grain textures across every system app.' },
    { year: '2013', title: 'The Flat Revolution', desc: 'iOS 7 stripped away textures and depth. Flat design took over, prioritizing minimalism over realism.' },
    { year: '2018', title: 'Neumorphism Emerges', desc: 'A soft, subtle take on skeuomorphism. Extruded plastic shapes with gentle shadows, neither fully flat nor fully realistic.' },
    { year: '2024', title: 'New Skeuomorphism', desc: 'The return of depth and texture, but refined. Modern skeuomorphism blends realism with clean aesthetics for the best of both worlds.' },
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
                About Skeuomorphism
              </h1>
            </div>

            <p className="text-center text-base leading-relaxed mb-6" style={{
              color: '#5a4f45',
              textShadow: '0 1px 0 rgba(255,255,255,0.3)',
            }}>
              Skeuomorphism is a design principle where digital interfaces mimic the appearance and behavior of their real-world counterparts. A notebook app looks like a real notebook with lined paper and leather binding. A calculator app has embossed buttons that appear to press down when tapped.
            </p>

            <div className="p-6" style={skeuoInset}>
              <h2 className="text-xl font-bold mb-4 text-center" style={{
                color: '#3a2f25',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                fontFamily: 'Georgia, serif',
              }}>
                Why Skeuomorphism Matters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Intuitive', desc: 'Users instantly understand how to interact because it mirrors physical objects they already know.' },
                  { title: 'Emotional', desc: 'Realistic textures and materials create warmth and connection that flat interfaces lack.' },
                  { title: 'Accessible', desc: 'Depth and shadows provide clear visual hierarchy, making interfaces easier to navigate.' },
                  { title: 'Memorable', desc: 'Rich, tactile designs leave lasting impressions and create distinctive brand identities.' },
                ].map((item, i) => (
                  <div key={i} className="p-4" style={{
                    background: 'linear-gradient(145deg, #f5f0ea, #e8e0d8)',
                    boxShadow: '3px 3px 6px #b8b0a8, -3px -3px 6px #ffffff',
                    borderRadius: '12px',
                    border: '1px solid #d0c8c0',
                  }}>
                    <h3 className="font-bold mb-1" style={{
                      color: '#3a2f25',
                      textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                    }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: '#6a5f55' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 md:p-8" style={skeuoPanel}>
            <h2 className="text-2xl font-bold text-center mb-8" style={{
              color: '#3a2f25',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              fontFamily: 'Georgia, serif',
            }}>
              Evolution of Skeuomorphism
            </h2>

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{
                      background: 'linear-gradient(145deg, #8b7355, #6b5540)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)',
                      border: '1px solid #5a4a35',
                    }}>
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4" style={{
                    background: 'linear-gradient(145deg, #f5f0ea, #e8e0d8)',
                    boxShadow: '3px 3px 6px #b8b0a8, -3px -3px 6px #ffffff',
                    borderRadius: '12px',
                    border: '1px solid #d0c8c0',
                  }}>
                    <h3 className="font-bold mb-1" style={{
                      color: '#3a2f25',
                      textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                    }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: '#6a5f55' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Link href="/skeuomorphism" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
              boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
              border: '1px solid #c4bbb2',
              color: '#5a4f45',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
            }}>
              Home
            </Link>
            <Link href="/skeuomorphism/services" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(180deg, #8b7355, #6b5540)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #5a4a35',
              color: '#f5f0ea',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}>
              Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
