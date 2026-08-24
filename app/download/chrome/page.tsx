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
          <h1 className="text-3xl font-bold text-white mb-2">Chrome Install Karo</h1>
          <p className="text-blue-200">Jio Set-Top Box ke liye - 3 Easy Methods</p>
        </div>

        {/* Method Selector */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setActiveMethod(num)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeMethod === num
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Method {num}
            </button>
          ))}
        </div>

        {/* Method 1: Direct APK Download */}
        {activeMethod === 1 && (
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📱</span>
              <div>
                <h2 className="text-xl font-bold text-white">Method 1: Direct APK Download</h2>
                <p className="text-blue-200 text-sm">Sabse easy - seedha APK download karo</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                <p className="text-green-200 font-semibold mb-2">Step-by-Step:</p>
                <ol className="text-green-100 text-sm space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="font-semibold">Neeche button click karo</p>
                      <p className="text-green-200 text-xs">APKMirror website khulega</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="font-semibold">Page load hone do</p>
                      <p className="text-green-200 text-xs">2-3 second wait karo</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="font-semibold"><strong className="text-yellow-300">"Download APK"</strong> button dhundho</p>
                      <p className="text-red-300 text-xs font-bold">⚠️ "Google Play" button MAT click karna!</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="font-semibold">"Download APK" click karo</p>
                      <p className="text-green-200 text-xs">File download hogi (~100 MB)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="font-semibold">Downloaded file open karo</p>
                      <p className="text-green-200 text-xs">Install button click karo</p>
                    </div>
                  </li>
                </ol>
              </div>

              <a
                href="https://www.apkmirror.com/apk/google-inc/chrome/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-xl font-bold text-lg transition-colors"
              >
                Download Chrome APK
              </a>

              <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/30">
                <p className="text-yellow-200 text-xs text-center">
                  <strong>Yaad rakho:</strong> "Download APK" button click karna, "Google Play" nahi!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Method 2: USB se Install */}
        {activeMethod === 2 && (
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💾</span>
              <div>
                <h2 className="text-xl font-bold text-white">Method 2: USB se Install</h2>
                <p className="text-blue-200 text-sm">PC pe download karo, USB se transfer karo</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
                <p className="text-purple-200 font-semibold mb-3">PC pe kya karo:</p>
                <ol className="text-purple-100 text-sm space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="font-semibold">PC ka browser kholo</p>
                      <p className="text-purple-200 text-xs">Chrome, Firefox, Edge - koi bhi</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="font-semibold">APKMirror pe jao</p>
                      <a href="https://www.apkmirror.com/apk/google-inc/chrome/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline text-xs">www.apkmirror.com/apk/google-inc/chrome/</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="font-semibold">Chrome APK download karo</p>
                      <p className="text-purple-200 text-xs">~100 MB file</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="font-semibold">USB drive me copy karo</p>
                      <p className="text-purple-200 text-xs">APK file ko USB pe daalo</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
                <p className="text-blue-200 font-semibold mb-3">Jio Box pe kya karo:</p>
                <ol className="text-blue-100 text-sm space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="font-semibold">USB Jio box me lagao</p>
                      <p className="text-blue-200 text-xs">USB port pe connect karo</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="font-semibold">File Manager app kholo</p>
                      <p className="text-blue-200 text-xs">Agar nahi hai to "Files by Google" install karo</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">7</span>
                    <div>
                      <p className="font-semibold">USB me jao → APK file dhundho</p>
                      <p className="text-blue-200 text-xs">Chrome APK file click karo</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">8</span>
                    <div>
                      <p className="font-semibold">Install button click karo</p>
                      <p className="text-blue-200 text-xs">Chrome install ho jayega!</p>
                    </div>
                  </li>
                </ol>
              </div>

              <a
                href="https://www.apkmirror.com/apk/google-inc/chrome/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-purple-500 hover:bg-purple-600 text-white text-center rounded-xl font-bold text-lg transition-colors"
              >
                PC pe Download Karo
              </a>
            </div>
          </div>
        )}

        {/* Method 3: Alternative Browser */}
        {activeMethod === 3 && (
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌐</span>
              <div>
                <h2 className="text-xl font-bold text-white">Method 3: Easy Browser Install</h2>
                <p className="text-blue-200 text-sm">Chrome se bhi easy - direct install</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
                <p className="text-orange-200 font-semibold mb-3">Ye browsers Chrome se bhi better hain:</p>
                
                <div className="space-y-3">
                  <a
                    href="https://www.apkmirror.com/apk/mozilla/firefox/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🦊</span>
                      <div>
                        <p className="text-white font-bold">Firefox Browser</p>
                        <p className="text-orange-200 text-xs">Fast, private, ad-blocker built-in</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.apkmirror.com/apk/brave-software/brave-browser/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🦁</span>
                      <div>
                        <p className="text-white font-bold">Brave Browser</p>
                        <p className="text-orange-200 text-xs">Super fast, blocks all ads automatically</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.apkmirror.com/apk/operasoftware/opera/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔴</span>
                      <div>
                        <p className="text-white font-bold">Opera Browser</p>
                        <p className="text-orange-200 text-xs">Built-in VPN, data saver</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                <p className="text-green-200 font-semibold mb-2">Kaise install karo:</p>
                <ol className="text-green-100 text-sm space-y-2">
                  <li>1. Upar koi bhi browser click karo</li>
                  <li>2. APKMirror pe jao</li>
                  <li>3. "Download APK" click karo</li>
                  <li>4. File download hone do</li>
                  <li>5. Open karo → Install karo</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Common Help */}
        <div className="mt-6 bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <h3 className="text-red-200 font-semibold mb-2">Problem aa rahi hai?</h3>
          <div className="text-red-100 text-sm space-y-2">
            <p><strong>Q: "Install nahi ho raha"</strong></p>
            <p className="text-red-200">A: Settings → Security → "Unknown Sources" ON karo</p>
            
            <p className="mt-3"><strong>Q: "Download nahi ho raha"</strong></p>
            <p className="text-red-200">A: Method 2 try karo (USB se install)</p>
            
            <p className="mt-3"><strong>Q: "Play Store open ho raha"</strong></p>
            <p className="text-red-200">A: "Download APK" button click karo, "Google Play" nahi</p>
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
