'use client'

import { useState } from 'react'

// Chrome APK download links (official sources)
const CHROME_DOWNLOADS = [
  {
    name: 'Chrome for Android (ARM64)',
    description: 'Most Android devices, Smart TVs, Set-Top Boxes',
    size: '~100 MB',
    url: 'https://www.google.com/chrome/',
    icon: '📱',
    recommended: true,
  },
  {
    name: 'Chrome for Android (ARM)',
    description: 'Older Android devices',
    size: '~90 MB',
    url: 'https://www.google.com/chrome/',
    icon: '📱',
    recommended: false,
  },
  {
    name: 'Chrome Lite (APKMirror)',
    description: 'Lighter version for low-end devices',
    size: '~50 MB',
    url: 'https://www.apkmirror.com/apk/google-inc/chrome/',
    icon: '⚡',
    recommended: false,
  },
]

export default function ChromeDownloadPage() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (url: string, name: string) => {
    setDownloading(name)
    // Open in new tab (works on Jio Set-Top Box)
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
          <p className="text-blue-200">Fast, secure browser for your device</p>
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

        {/* Instructions */}
        <div className="mt-8 bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-white font-semibold mb-2">How to Install:</h3>
          <ol className="text-blue-200 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
              <span>Click the download button above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
              <span>Wait for the APK to download</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
              <span>Open the downloaded file</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
              <span>Allow installation from unknown sources if prompted</span>
            </li>
          </ol>
        </div>

        {/* Jio Box specific note */}
        <div className="mt-4 bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <p className="text-yellow-200 text-sm">
            <strong>Jio Set-Top Box Users:</strong> If download doesn't start, try long-pressing the link and select "Save link as..."
          </p>
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
