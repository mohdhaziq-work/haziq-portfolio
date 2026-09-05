'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  { src: '/td-landscape-1-blue-gold.png', title: 'Royal Blue & Gold', style: 'Classic Elegant' },
  { src: '/td-landscape-2-white-minimal.png', title: 'White Minimal', style: 'Clean Minimalist' },
  { src: '/td-landscape-3-indian-traditional.png', title: 'Indian Traditional', style: 'Cultural Festive' },
  { src: '/td-landscape-4-pink-floral.png', title: 'Pink Floral', style: 'Floral Romance' },
  { src: '/td-landscape-5-green-nature.png', title: 'Green Nature', style: 'Nature Garden' },
  { src: '/td-landscape-6-purple-galaxy.png', title: 'Purple Galaxy', style: 'Space Cosmic' },
  { src: '/td-landscape-7-chalkboard.png', title: 'Chalkboard', style: 'Classroom Classic' },
  { src: '/td-landscape-8-neon-dark.png', title: 'Neon Glow', style: 'Modern Futuristic' },
  { src: '/td-landscape-9-orange-warm.png', title: 'Sunset Warm', style: 'Warm Emotional' },
  { src: '/td-landscape-10-red-rose.png', title: 'Red Rose', style: 'Floral Elegant' },
]

export default function TeachersDayPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('teachers-day-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setTimeout(() => setShowGallery(true), 500)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '1962') {
      setIsAuthenticated(true)
      sessionStorage.setItem('teachers-day-auth', 'true')
      setError('')
      setTimeout(() => setShowGallery(true), 300)
    } else {
      setError('Wrong password! Try again.')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{ background: 'linear-gradient(135deg, #1a73e8, #1557b0)' }}>
              <span className="text-white text-4xl font-bold">H</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Teachers&apos; Day Special
            </h1>
            <p className="text-sm text-gray-500">
              Enter password to unlock gallery
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 1px 3px 0 rgba(60,64,67,0.15), 0 4px 8px 3px rgba(60,64,67,0.1)', border: '1px solid #e8eaed' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 text-center text-xl tracking-[0.3em] placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoFocus
                  maxLength={10}
                  style={{ background: '#f8f9fa' }}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 text-white font-medium rounded-full transition-all hover:shadow-lg active:scale-[0.98]"
                style={{ background: '#1a73e8', boxShadow: '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)' }}
              >
                Unlock Gallery
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              Hint: A special year
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Mohd Haziq &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Full Screen Image - NO borders, fills entire screen */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-white cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Teachers' Day"
            fill
            className="object-contain"
            priority
          />
          <button 
            className="absolute top-4 right-4 z-50 bg-gray-900/80 hover:bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all text-sm"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Header - Portfolio Style */}
      <div className="border-b" style={{ borderColor: '#e8eaed' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a73e8, #1557b0)' }}>
              <span className="text-white font-bold">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Teachers&apos; Day Gallery</h1>
              <p className="text-xs text-gray-500">5th September 2026 &middot; Smart Board Ready</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Click any image for full screen view &middot; All images are landscape (16:9) for smart board
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className={`max-w-7xl mx-auto px-6 py-8 transition-all duration-700 ${showGallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: '0 1px 3px 0 rgba(60,64,67,0.1)', border: '1px solid #e8eaed' }}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full">
                        Full Screen
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm">{image.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{image.style}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className={`max-w-3xl mx-auto px-6 pb-12 transition-all duration-700 delay-300 ${showGallery ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center py-8 border-t" style={{ borderColor: '#e8eaed' }}>
          <p className="text-gray-600 italic text-lg">
            &quot;The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.&quot;
          </p>
          <p className="text-gray-400 text-sm mt-3">— William Arthur Ward</p>
          <p className="text-blue-600 font-medium mt-4">Thank you, Teachers! 🙏</p>
        </div>
      </div>
    </div>
  )
}
