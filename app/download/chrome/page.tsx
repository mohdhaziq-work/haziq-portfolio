'use client'

import { useState } from 'react'

export default function ChromeDownloadPage() {
  const [activeMethod, setActiveMethod] = useState<number>(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl font-bold text-white mb-2">APK Install Karo</h1>
          <p className="text-blue-200">Jio Set-Top Box - Complete Solution</p>
        </div>

        {/* Problem Statement */}
        <div className="mb-6 bg-red-500/20 rounded-xl p-4 border border-red-500/30">
          <h3 className="text-red-200 font-bold mb-2">Problem:</h3>
          <p className="text-red-100 text-sm">
            "APK download ho gayi hai but JioSphere ke Downloads me click karne par install nahi ho raha"
          </p>
        </div>

        {/* Solution Steps */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Solution: File Manager se Install Karo</h2>
          
          <div className="space-y-6">
            {/* Step 1: Install File Manager */}
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</span>
                <h3 className="text-green-200 font-bold text-lg">Pehle File Manager Install Karo</h3>
              </div>
              
              <p className="text-green-100 text-sm mb-4">
                JioSphere browser APK files open nahi kar sakta. Isliye pehle ek File Manager app install karo.
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.apkmirror.com/apk/google-inc/files-by-google/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📁</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">Files by Google</p>
                      <p className="text-green-200 text-xs">Best file manager - easy to use</p>
                      <p className="text-yellow-300 text-xs mt-1">Click → Download APK → Install</p>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                </a>

                <a
                  href="https://www.apkmirror.com/apk/lonely-cat/x-plore-file-manager/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📂</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">X-plore File Manager</p>
                      <p className="text-green-200 text-xs">Works great on TV boxes</p>
                      <p className="text-yellow-300 text-xs mt-1">Click → Download APK → Install</p>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="mt-3 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                <p className="text-yellow-200 text-xs">
                  <strong>Kaise install karo:</strong> Upar click karo → APKMirror pe "Download APK" click karo → JioSphere me download hone do → Settings → Downloads → File pe click karo
                </p>
              </div>
            </div>

            {/* Step 2: Enable Unknown Sources */}
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</span>
                <h3 className="text-blue-200 font-bold text-lg">"Unknown Sources" ON Karo</h3>
              </div>
              
              <p className="text-blue-100 text-sm mb-3">
                APK install karne ke liye ye setting ON karni padegi:
              </p>

              <div className="bg-white/10 rounded-lg p-4">
                <ol className="text-blue-100 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 font-bold">1.</span>
                    <span>Jio box ki <strong>Settings</strong> me jao</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 font-bold">2.</span>
                    <span><strong>Security</strong> ya <strong>Privacy</strong> option dhundho</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 font-bold">3.</span>
                    <span><strong>"Unknown Sources"</strong> ya <strong>"Install Unknown Apps"</strong> ON karo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 font-bold">4.</span>
                    <span>Agar puche to <strong>"Allow"</strong> click karo</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Step 3: Install APK using File Manager */}
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</span>
                <h3 className="text-purple-200 font-bold text-lg">File Manager se APK Install Karo</h3>
              </div>
              
              <p className="text-purple-100 text-sm mb-3">
                Ab jo APK download hui hai (Firefox/Chrome), use File Manager se install karo:
              </p>

              <div className="bg-white/10 rounded-lg p-4">
                <ol className="text-purple-100 text-sm space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    <span><strong>Files by Google</strong> ya <strong>X-plore</strong> app kholo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    <span><strong>"Downloads"</strong> folder me jao</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    <span>APK file dhundho (jaise <strong>org.mozilla.firefox...apk</strong>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                    <span>APK file pe <strong>click</strong> karo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                    <span><strong>"Install"</strong> button click karo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
                    <span>Install hone do → <strong>"Open"</strong> click karo</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Step 4: Download Browser */}
            <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</span>
                <h3 className="text-orange-200 font-bold text-lg">Browser Download Karo</h3>
              </div>
              
              <p className="text-orange-100 text-sm mb-4">
                Ab browser download karo (Firefox/Chrome/Brave):
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.apkmirror.com/apk/mozilla/firefox/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🦊</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">Firefox Browser</p>
                      <p className="text-orange-200 text-xs">Fast, private, ad-blocker</p>
                    </div>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Recommended</span>
                  </div>
                </a>

                <a
                  href="https://www.apkmirror.com/apk/brave-software/brave-browser/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🦁</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">Brave Browser</p>
                      <p className="text-orange-200 text-xs">Super fast, blocks all ads</p>
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.apkmirror.com/apk/google-inc/chrome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🔵</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">Chrome Browser</p>
                      <p className="text-orange-200 text-xs">Google's official browser</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-3 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                <p className="text-yellow-200 text-xs">
                  <strong>Yaad rakho:</strong> APKMirror pe "Download APK" click karna, "Google Play" nahi!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mt-6 bg-green-500/20 rounded-xl p-4 border border-green-500/30">
          <h3 className="text-green-200 font-bold mb-3">Quick Summary (4 Steps):</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">📁</span>
              <p className="text-white text-xs font-bold">1. File Manager</p>
              <p className="text-green-200 text-[10px]">Install karo</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">🔓</span>
              <p className="text-white text-xs font-bold">2. Unknown Sources</p>
              <p className="text-green-200 text-[10px]">ON karo</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">🌐</span>
              <p className="text-white text-xs font-bold">3. Browser APK</p>
              <p className="text-green-200 text-[10px]">Download karo</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">✅</span>
              <p className="text-white text-xs font-bold">4. Install</p>
              <p className="text-green-200 text-[10px]">File Manager se</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6 bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <h3 className="text-red-200 font-bold mb-3">FAQ:</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-red-200 font-bold">Q: File Manager bhi install nahi ho raha?</p>
              <p className="text-red-100">A: Pehle "Unknown Sources" ON karo Settings me, phir try karo</p>
            </div>
            <div>
              <p className="text-red-200 font-bold">Q: Downloads folder nahi mil raha?</p>
              <p className="text-red-100">A: File Manager me "Internal Storage" → "Download" folder me jao</p>
            </div>
            <div>
              <p className="text-red-200 font-bold">Q: "App not installed" aa raha?</p>
              <p className="text-red-100">A: Purani file delete karo, naya download karo, phir install karo</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center pb-8">
          <a href="/" className="text-blue-300 text-sm hover:text-white transition-colors">
            ← Back to Mohd Haziq Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
