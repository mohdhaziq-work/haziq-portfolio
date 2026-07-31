'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SkeuoGallery() {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null)

  const skeuoPanel = {
    background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
    boxShadow: '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 1px 0 rgba(255,255,255,0.6)',
    border: '1px solid #c4bbb2',
    borderRadius: '24px',
  }

  const galleryItems = [
    { title: 'Leather Dashboard', desc: 'Stitched leather texture with embossed gauges and chrome accents', color: '#6b5540', texture: 'leather' },
    { title: 'Wood Grain Panel', desc: 'Natural wood texture with carved inset controls and brass fittings', color: '#8b6914', texture: 'wood' },
    { title: 'Brushed Metal', desc: 'Industrial steel with brushed finish, rivets, and LED indicators', color: '#708090', texture: 'metal' },
    { title: 'Glass Interface', desc: 'Frosted glass panels with subtle refraction and depth effects', color: '#4a8090', texture: 'glass' },
    { title: 'Fabric Canvas', desc: 'Woven textile with embroidered patterns and soft tactile buttons', color: '#8b4570', texture: 'fabric' },
    { title: 'Stone Tablet', desc: 'Carved stone surface with chiseled text and natural patina', color: '#7a7a6a', texture: 'stone' },
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
                Material Gallery
              </h1>
              <p className="text-center mt-2" style={{ color: '#c4b8a8', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                Explore different textures and materials
              </p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="p-1 cursor-pointer"
                onClick={() => setSelectedFrame(selectedFrame === i ? null : i)}
                style={{
                  background: 'linear-gradient(145deg, #8b7355, #5a4a35)',
                  boxShadow: selectedFrame === i
                    ? '8px 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '6px 6px 12px #b8b0a8, -6px -6px 12px #ffffff, inset 0 1px 0 rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  border: selectedFrame === i ? '2px solid #ffd700' : '1px solid #4a3a25',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Frame Inner */}
                <div className="p-3" style={{
                  background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
                  borderRadius: '8px',
                }}>
                  {/* Texture Preview */}
                  <div className="aspect-video rounded-lg mb-3 flex items-center justify-center relative overflow-hidden" style={{
                    background: `linear-gradient(145deg, ${item.color}, ${item.color}cc)`,
                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), inset 0 -2px 0 rgba(255,255,255,0.1)',
                  }}>
                    {/* Texture Overlay */}
                    {item.texture === 'leather' && (
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
                      }} />
                    )}
                    {item.texture === 'wood' && (
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.08) 8px, rgba(0,0,0,0.08) 10px)',
                      }} />
                    )}
                    {item.texture === 'metal' && (
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)',
                      }} />
                    )}
                    {item.texture === 'glass' && (
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                      }} />
                    )}
                    {item.texture === 'fabric' && (
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px)',
                      }} />
                    )}
                    {item.texture === 'stone' && (
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.1) 1px, transparent 1px), radial-gradient(circle at 60% 70%, rgba(0,0,0,0.08) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.06) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }} />
                    )}
                    {/* Center Icon */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center" style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(4px)',
                    }}>
                      <span className="text-2xl font-bold" style={{
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        fontFamily: 'Georgia, serif',
                      }}>{item.title[0]}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-1">
                    <h3 className="font-bold" style={{
                      color: '#3a2f25',
                      textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                      fontFamily: 'Georgia, serif',
                    }}>{item.title}</h3>
                    <p className="text-xs mt-1" style={{ color: '#6a5f55' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Material Palette */}
          <div className="p-6 md:p-8" style={skeuoPanel}>
            <h2 className="text-xl font-bold text-center mb-6" style={{
              color: '#3a2f25',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              fontFamily: 'Georgia, serif',
            }}>
              Color Palette
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'Saddle Brown', color: '#8b4513' },
                { name: 'Antique Brass', color: '#cd953f' },
                { name: 'Dark Slate', color: '#2f4f4f' },
                { name: 'Burgundy', color: '#800020' },
                { name: 'Forest Green', color: '#228b22' },
                { name: 'Navy Steel', color: '#4682b4' },
              ].map((swatch, i) => (
                <div key={i} className="text-center">
                  <div className="w-full aspect-square rounded-xl mb-2" style={{
                    background: `linear-gradient(145deg, ${swatch.color}, ${swatch.color}cc)`,
                    boxShadow: `3px 3px 6px #b8b0a8, -3px -3px 6px #ffffff, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)`,
                    border: '1px solid rgba(0,0,0,0.2)',
                  }} />
                  <p className="text-[10px] font-semibold" style={{
                    color: '#5a4f45',
                    textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                  }}>{swatch.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Link href="/skeuomorphism/services" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
              boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
              border: '1px solid #c4bbb2',
              color: '#5a4f45',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
            }}>
              Services
            </Link>
            <Link href="/skeuomorphism/contact" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(180deg, #8b7355, #6b5540)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #5a4a35',
              color: '#f5f0ea',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}>
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
