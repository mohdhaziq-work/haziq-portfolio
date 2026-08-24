'use client'

export default function ChromeDownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="#4285F4" />
              <circle cx="24" cy="24" r="8" fill="white" />
              <path d="M24 16 L24 8 A16 16 0 0 1 40 24 L32 24 A8 8 0 0 0 24 16Z" fill="#EA4335" />
              <path d="M24 32 L24 40 A16 16 0 0 1 8 24 L16 24 A8 8 0 0 0 24 32Z" fill="#34A853" />
              <path d="M16 24 L8 24 A16 16 0 0 1 24 8 L24 16 A8 8 0 0 0 16 24Z" fill="#FBBC05" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">APK Install Fix</h1>
          <p className="text-blue-200">Download hota hai, install nahi hota? Ye karo!</p>
        </div>

        {/* THE REAL SOLUTION */}
        <div className="bg-green-500/20 rounded-2xl p-6 border-2 border-green-500 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✅</span>
            <h2 className="text-xl font-bold text-green-200">SOLUTION: JioSphere ko Permission Do</h2>
          </div>
          
          <p className="text-green-100 text-sm mb-4">
            Problem ye hai ki JioSphere ko permission nahi hai APK install karne ki. Ye setting ON karo:
          </p>

          <div className="bg-black/30 rounded-xl p-4 space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <p className="text-white font-bold">Settings kholo</p>
                <p className="text-green-200 text-xs">Jio box ki Settings (gear icon)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <p className="text-white font-bold">"Apps" ya "Applications" me jao</p>
                <p className="text-green-200 text-xs">Apps section dhundho</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <p className="text-white font-bold">"Special App Access" dhundho</p>
                <p className="text-green-200 text-xs">Ya "Advanced" → "Special Access"</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
              <div>
                <p className="text-white font-bold">"Install Unknown Apps" pe click karo</p>
                <p className="text-green-200 text-xs">Ye option dhundho</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</span>
              <div>
                <p className="text-white font-bold">"JioSphere" dhundho</p>
                <p className="text-green-200 text-xs">List me JioSphere browser dhundho</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</span>
              <div>
                <p className="text-white font-bold text-yellow-300">"Allow" ya "ON" karo</p>
                <p className="text-yellow-200 text-xs font-bold">Ye sabse important step hai!</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-500/20 rounded-lg p-3 border border-yellow-500/30">
            <p className="text-yellow-200 text-sm font-bold">
              Ab wapas jao → JioSphere → Downloads → APK file pe click karo → INSTALL HO JAYEGA!
            </p>
          </div>
        </div>

        {/* Alternative if above doesn't work */}
        <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-500 mb-6">
          <h2 className="text-lg font-bold text-blue-200 mb-3">Agar Upar Wala Kaam Na Kare:</h2>
          
          <div className="space-y-4">
            <div className="bg-black/30 rounded-xl p-4">
              <p className="text-white font-bold mb-2">Method A: Notification se Install</p>
              <ol className="text-blue-100 text-sm space-y-2">
                <li>1. APK download hone do</li>
                <li>2. JioSphere band karo</li>
                <li>3. Notification bar neeche swipe karo</li>
                <li>4. "Download complete" notification pe click karo</li>
                <li>5. Install button aayega</li>
              </ol>
            </div>

            <div className="bg-black/30 rounded-xl p-4">
              <p className="text-white font-bold mb-2">Method B: Settings se Install</p>
              <ol className="text-blue-100 text-sm space-y-2">
                <li>1. Settings → Storage → Files</li>
                <li>2. "Download" folder dhundho</li>
                <li>3. APK file pe click karo</li>
                <li>4. Install button click karo</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Download Links */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Browser Download Karo:</h2>
          
          <div className="space-y-3">
            <a
              href="https://www.apkmirror.com/apk/mozilla/firefox/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-orange-500/20 rounded-xl p-4 hover:bg-orange-500/30 transition-colors border border-orange-500/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦊</span>
                <div className="flex-1">
                  <p className="text-white font-bold">Firefox Browser</p>
                  <p className="text-orange-200 text-xs">Fast, private, best for Jio box</p>
                </div>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Best</span>
              </div>
            </a>

            <a
              href="https://www.apkmirror.com/apk/brave-software/brave-browser/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-red-500/20 rounded-xl p-4 hover:bg-red-500/30 transition-colors border border-red-500/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦁</span>
                <div className="flex-1">
                  <p className="text-white font-bold">Brave Browser</p>
                  <p className="text-red-200 text-xs">Blocks all ads automatically</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.apkmirror.com/apk/google-inc/chrome/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-500/20 rounded-xl p-4 hover:bg-blue-500/30 transition-colors border border-blue-500/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔵</span>
                <div className="flex-1">
                  <p className="text-white font-bold">Chrome Browser</p>
                  <p className="text-blue-200 text-xs">Google's official browser</p>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-4 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
            <p className="text-yellow-200 text-xs text-center font-bold">
              APKMirror pe "Download APK" click karna, "Google Play" nahi!
            </p>
          </div>
        </div>

        {/* Quick Fix Summary */}
        <div className="bg-green-500/20 rounded-xl p-4 border border-green-500 mb-6">
          <h3 className="text-green-200 font-bold text-center mb-3">QUICK FIX:</h3>
          <div className="text-center">
            <p className="text-white text-lg font-bold">Settings → Apps → Special Access → Install Unknown Apps → JioSphere → ALLOW</p>
            <p className="text-green-200 text-sm mt-2">Bas ye karo, phir koi bhi APK install ho jayega!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <a href="/" className="text-blue-300 text-sm hover:text-white transition-colors">
            ← Back to Mohd Haziq Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
