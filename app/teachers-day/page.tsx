'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  { src: '/teachers-day-board.png', title: 'Smart Board', style: 'Classroom Board' },
  { src: '/teachers-day-1-minimal.png', title: 'Minimal Clean', style: 'Minimalist' },
  { src: '/teachers-day-2-traditional.png', title: 'Indian Traditional', style: 'Traditional' },
  { src: '/teachers-day-3-watercolor.png', title: 'Watercolor Art', style: 'Watercolor' },
  { src: '/teachers-day-4-neon.png', title: 'Neon Glow', style: 'Neon' },
  { src: '/teachers-day-5-vintage.png', title: 'Vintage Retro', style: 'Vintage' },
  { src: '/teachers-day-6-nature.png', title: 'Nature Garden', style: 'Nature' },
  { src: '/teachers-day-7-galaxy.png', title: 'Galaxy Space', style: 'Space' },
  { src: '/teachers-day-8-chalkboard.png', title: 'Chalkboard', style: 'Chalkboard' },
  { src: '/teachers-day-9-geometric.png', title: 'Geometric', style: 'Modern' },
  { src: '/teachers-day-10-3d.png', title: '3D Render', style: '3D' },
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

  const confettiColors = ['#FFD700', '#FF6B35', '#4ECDC4', '#E74C3C', '#9B59B6', '#2ECC71', '#F39C12']

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                width: `${10 + Math.random() * 30}px`,
                height: `${10 + Math.random() * 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(135deg, ${confettiColors[i % confettiColors.length]}, transparent)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl mb-6 animate-bounce-slow">
              <span className="text-5xl">🎓</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Teachers&apos; Day Special
            </h1>
            <p className="text-purple-200 text-sm">
              Enter the secret code to unlock
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-3 text-center">
                  🔐 Secret Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter password..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white text-center text-2xl tracking-[0.5em] placeholder:text-white/30 placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  autoFocus
                  maxLength={10}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-center">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-500/30"
              >
                Unlock Gallery 🎁
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-purple-300 text-xs">
                Hint: A very special year in history
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-purple-400 text-xs">
              Made with ❤️ by Mohd Haziq
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={selectedImage}
              alt="Teachers' Day Full Screen"
              fill
              className="object-contain"
              priority
            />
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl z-50 bg-black/50 w-12 h-12 rounded-full flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: '#FFD700',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className={`text-center py-8 sm:py-12 transition-all duration-1000 ${showGallery ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl mb-4 animate-bounce-slow">
            <span className="text-3xl sm:text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 mb-3">
            Happy Teachers&apos; Day!
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 font-medium">
            5th September 2026
          </p>
          <p className="text-sm text-purple-300 mt-2">
            Click any image for full screen view
          </p>
        </div>

        {/* Image Gallery */}
        <div className={`max-w-7xl mx-auto px-4 pb-12 transition-all duration-1000 delay-500 ${showGallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => setSelectedImage(image.src)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-yellow-400/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">
                          Click for full screen
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      {image.title}
                    </h3>
                    <p className="text-purple-300 text-xs sm:text-sm mt-1">
                      {image.style}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className={`max-w-3xl mx-auto px-4 pb-12 transition-all duration-1000 delay-1000 ${showGallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-lg sm:text-xl text-white leading-relaxed italic">
              🙏 &quot;The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.&quot;
            </p>
            <p className="mt-4 text-purple-300 text-sm">
              — William Arthur Ward
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-yellow-300 font-semibold text-lg">
                Thank you for being our inspiration! 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center pb-8 transition-all duration-1000 delay-1500 ${showGallery ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-purple-400 text-sm">
            Made with ❤️ by Mohd Haziq
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
