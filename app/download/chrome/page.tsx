'use client'

import { useState } from 'react'

// Direct APK download links (no Play Store)
const CHROME_DOWNLOADS = [
  {
    name: 'Chrome APK (Latest)',
    description: 'Direct download - works on all Android devices',
    size: '~100 MB',
    url: 'https://www.apkmirror.com/apk/google-inc/chrome/',
    icon: '📱',
    recommended: true,
    note: 'Click link → Find latest version → Download APK',
  },
  {
    name: 'Chrome Lite',
    description: 'Smaller size, faster download',
    size: '~50 MB',
    url: 'https://www.apkmirror.com/apk/google-inc/chrome-lite/',
    icon: '⚡',
    recommended: false,
    note: 'Good for slow connections',
  },
  {
    name: 'Chrome Beta',
    description: 'Latest features, may have bugs',
    size: '~100 MB',
    url: 'https://www.apkmirror.com/apk/google-inc/chrome-beta/',
    icon: '🔬',
    recommended: false,
    note: 'For testing new features',
  },
]

export default function ChromeDownloadPage() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (url: string, name: string) => {
    setDownloading(name)
    window.open(url, '_blank')
    setTimeout(() => setDownloading(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="#4285F4" />
              <circle cx="24" cy="24" r="8" fill="white" />
              <path d="M24 16 L24 8 A16 16 0 0 1 40 24 L32 24 A8 8 0 0 0 24 16Z" fill="#EA4335" />
              <path d="M24 32 L24 40 A16 16 0 0 1 8 24 L16 24 A8 8 0 0 0 24 32Z" fill="#34A853" />
              <path d="M16 24 L8 24 A16 16 0 0 1 24 8 L24 16 A8 8 0 0 0 16 24Z" fill="#FBBC05" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Download Chrome</h1>
          <p className="text-blue-200">Direct APK download - No Play Store needed</p>
        </div>

        {/* Important Note */}
        <div className="mb-6 bg-green-500/20 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-200 text-sm font-semibold mb-2">How to download:</p>
          <ol className="text-green-100 text-xs space-y-1">
            <li>1. Click button below</li>
            <li>2. On APKMirror page, find "Download APK" button</li>
            <li>3. Click "Download APK" (not Play Store)</li>
            <li>4. Wait for download to complete</li>
            <li>5. Open downloaded file to install</li>
          </ol>
        </div>

        {/* Download Cards */}
        <div className="space-y-4">
          {CHROME_DOWNLOADS.map((item) => (
            <button
              key={item.name}
              onClick={() => handleDownload(item.url, item.name)}
              disabled={downloading === item.name}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                item.recommended
                  ? 'bg-white/10 border-blue-400 hover:bg-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } ${downloading === item.name ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    {item.recommended && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-blue-200 text-sm mt-1">{item.description}</p>
                  <p className="text-blue-300 text-xs mt-1">Size: {item.size}</p>
                  {item.note && (
                    <p className="text-yellow-300 text-xs mt-1">Note: {item.note}</p>
                  )}
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Jio Box specific instructions */}
        <div className="mt-6 bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <h3 className="text-yellow-200 font-semibold mb-2">Jio Set-Top Box Users:</h3>
          <ol className="text-yellow-100 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
              <span>Click the download button above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
              <span>On APKMirror page, <strong>DO NOT</strong> click "Google Play" button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
              <span>Scroll down and find <strong>"Download APK"</strong> button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
              <span>Click "Download APK" - file will download directly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">5</span>
              <span>Open downloaded file to install Chrome</span>
            </li>
          </ol>
        </div>

        {/* Alternative: Direct APK link */}
        <div className="mt-4 bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <h3 className="text-blue-200 font-semibold mb-2">Alternative Direct Links:</h3>
          <div className="space-y-2">
            <a
              href="https://www.apkmirror.com/apk/google-inc/chrome/chrome-128-0-6613-88-release/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-300 text-sm hover:text-white transition-colors underline"
            >
              Chrome 128 (Latest Stable) - Direct APK
            </a>
            <a
              href="https://www.apkmirror.com/apk/google-inc/chrome/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-300 text-sm hover:text-white transition-colors underline"
            >
              All Chrome Versions - APKMirror
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-300 text-sm hover:text-white transition-colors">
            ← Back to Mohd Haziq Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
