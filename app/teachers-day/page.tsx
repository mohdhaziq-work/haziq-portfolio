'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function TeachersDayPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('teachers-day-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setTimeout(() => setShowConfetti(true), 500)
      setTimeout(() => setShowImage(true), 1000)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '1962') {
      setIsAuthenticated(true)
      sessionStorage.setItem('teachers-day-auth', 'true')
      setError('')
      setTimeout(() => setShowConfetti(true), 300)
      setTimeout(() => setShowImage(true), 800)
    } else {
      setError('Wrong password! Try again.')
      setPassword('')
      inputRef.current?.focus()
    }
  }

  // Confetti particles
  const confettiColors = ['#FFD700', '#FF6B35', '#4ECDC4', '#E74C3C', '#9B59B6', '#2ECC71', '#F39C12']
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    color: confettiColors[i % confettiColors.length],
    size: 6 + Math.random() * 8,
  }))

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
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl mb-6 transform hover:rotate-12 transition-transform duration-300">
              <span className="text-5xl">🎓</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Teachers&apos; Day Special
            </h1>
            <p className="text-purple-200 text-sm">
              Enter the secret code to unlock the surprise
            </p>
          </div>

          {/* Password Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-3 text-center">
                  🔐 Secret Password
                </label>
                <input
                  ref={inputRef}
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
                Unlock Surprise 🎁
              </button>
            </form>

            {/* Hint */}
            <div className="mt-6 text-center">
              <p className="text-purple-300 text-xs">
                Hint: A very special year in history
              </p>
            </div>
          </div>

          {/* Footer */}
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
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-confetti-fall"
              style={{
                left: `${particle.left}%`,
                top: '-5%',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particle.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl mb-4 animate-bounce-slow">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 mb-4">
            Happy Teachers&apos; Day!
          </h1>
          <p className="text-xl sm:text-2xl text-purple-200 font-medium">
            5th September 2026
          </p>
        </div>

        {/* Main Image */}
        <div className={`relative w-full max-w-4xl transition-all duration-1000 delay-500 ${showImage ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {/* Decorative Frame */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl opacity-75 blur-lg animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-2 shadow-2xl">
            <Image
              src="/teachers-day.png"
              alt="Happy Teachers' Day - A tribute to our amazing teachers"
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Message */}
        <div className={`mt-8 text-center max-w-2xl transition-all duration-1000 delay-1000 ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8">
            <p className="text-lg sm:text-xl text-white leading-relaxed">
              🙏 <em>&quot;The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.&quot;</em>
            </p>
            <p className="mt-4 text-purple-300 text-sm">
              — William Arthur Ward
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-yellow-300 font-semibold text-lg">
                Thank you for being our inspiration! 🌟
              </p>
              <p className="text-purple-200 text-sm mt-2">
                From your loving students
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={`flex items-center gap-4 mt-8 transition-all duration-1000 delay-1500 ${showImage ? 'opacity-100' : 'opacity-0'}`}>
          {['📚', '🍎', '✏️', '🎒', '🎓'].map((emoji, i) => (
            <span
              key={i}
              className="text-3xl sm:text-4xl animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-8 transition-all duration-1000 delay-2000 ${showImage ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-purple-400 text-sm">
            Made with ❤️ by Mohd Haziq | For the best teachers in the world
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
