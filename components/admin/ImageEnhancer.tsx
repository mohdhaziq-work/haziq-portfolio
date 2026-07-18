'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface EnhanceSettings {
  upscale: number
  sharpen: number
  contrast: number
  brightness: number
  saturation: number
  denoise: number
  clarity: number
  shadows: number
  highlights: number
}

const DEFAULT_SETTINGS: EnhanceSettings = {
  upscale: 2,
  sharpen: 35,
  contrast: 12,
  brightness: 3,
  saturation: 20,
  denoise: 10,
  clarity: 25,
  shadows: 10,
  highlights: -5,
}

type Preset = 'social' | 'photo' | 'sharp' | 'clear' | 'portrait' | 'reset'

const PRESETS: Record<string, { label: string; settings: EnhanceSettings }> = {
  social: { label: 'Social', settings: { upscale: 2, sharpen: 40, contrast: 15, brightness: 5, saturation: 30, denoise: 0, clarity: 30, shadows: 15, highlights: -5 } },
  photo: { label: 'Photo', settings: { upscale: 2, sharpen: 25, contrast: 8, brightness: 0, saturation: 15, denoise: 20, clarity: 20, shadows: 10, highlights: -3 } },
  sharp: { label: 'Sharp', settings: { upscale: 1, sharpen: 70, contrast: 20, brightness: 0, saturation: 0, denoise: 0, clarity: 50, shadows: 0, highlights: 0 } },
  clear: { label: 'Clear', settings: { upscale: 2, sharpen: 20, contrast: 10, brightness: 10, saturation: 15, denoise: 30, clarity: 15, shadows: 15, highlights: -5 } },
  portrait: { label: 'Portrait', settings: { upscale: 2, sharpen: 15, contrast: 5, brightness: 5, saturation: 10, denoise: 25, clarity: 10, shadows: 20, highlights: -10 } },
  reset: { label: 'Reset', settings: { upscale: 1, sharpen: 0, contrast: 0, brightness: 0, saturation: 0, denoise: 0, clarity: 0, shadows: 0, highlights: 0 } },
}

// Max output dimension - prevents extreme slowness on mobile
const MAX_DIMENSION = 2048

export default function ImageEnhancer() {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [enhancedUrl, setEnhancedUrl] = useState<string>('')
  const [settings, setSettings] = useState<EnhanceSettings>({ ...DEFAULT_SETTINGS })
  const [processing, setProcessing] = useState(false)
  const [progressStep, setProgressStep] = useState('')
  const [progressPercent, setProgressPercent] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fullscreenCompare, setFullscreenCompare] = useState(false)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [imageInfo, setImageInfo] = useState({ w: 0, h: 0, downscaled: false })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const compareContainerRef = useRef<HTMLDivElement>(null)
  const workerRef = useRef<Worker | null>(null)

  // Initialize Web Worker
  useEffect(() => {
    try {
      const worker = new Worker('/image-worker.js')
      worker.onmessage = (e) => {
        const { type } = e.data
        if (type === 'progress') {
          setProgressStep(e.data.step)
          setProgressPercent(e.data.percent)
        } else if (type === 'result') {
          const { buffer, width, height } = e.data
          // Put result on canvas and generate URL
          const canvas = canvasRef.current
          if (canvas) {
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d', { willReadFrequently: true })
            if (ctx) {
              const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height)
              ctx.putImageData(imageData, 0, 0)
              const url = canvas.toDataURL('image/png', 1.0)
              setEnhancedUrl(url)
            }
          }
          setProcessing(false)
          setProgressStep('')
          setProgressPercent(0)
        } else if (type === 'error') {
          console.error('Worker error:', e.data.message)
          setProcessing(false)
          setProgressStep('')
          setProgressPercent(0)
        }
      }
      worker.onerror = (err) => {
        console.error('Worker error:', err)
        setProcessing(false)
        setProgressStep('')
        setProgressPercent(0)
      }
      workerRef.current = worker
      return () => worker.terminate()
    } catch (err) {
      console.error('Failed to create Web Worker:', err)
    }
  }, [])

  // Cancel processing
  const cancelProcessing = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'cancel' })
    }
    setProcessing(false)
    setProgressStep('')
    setProgressPercent(0)
  }, [])

  // Load image from file
  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    // Cancel any in-progress work
    cancelProcessing()
    setFileName(file.name)
    setEnhancedUrl('')

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        setOriginalImage(img)
        setOriginalUrl(e.target?.result as string)
        setSettings({ ...PRESETS.social.settings })
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [cancelProcessing])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadImage(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) loadImage(file)
  }, [loadImage])

  // ===== MAIN ENHANCE - Runs in Web Worker =====
  const enhanceImage = useCallback(() => {
    if (!originalImage || !workerRef.current) return

    // Cancel any previous processing
    workerRef.current.postMessage({ type: 'cancel' })

    setProcessing(true)
    setProgressStep('Preparing...')
    setProgressPercent(2)
    setEnhancedUrl('')

    // Use requestAnimationFrame to let UI update before heavy work starts
    requestAnimationFrame(() => {
      try {
        // Draw original image onto canvas to get pixel data
        const canvas = canvasRef.current
        if (!canvas) return

        let drawW = originalImage.width
        let drawH = originalImage.height
        let downscaled = false

        // Auto-downscale if too large for mobile processing
        if (drawW > MAX_DIMENSION || drawH > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / drawW, MAX_DIMENSION / drawH)
          drawW = Math.round(drawW * ratio)
          drawH = Math.round(drawH * ratio)
          downscaled = true
        }

        canvas.width = drawW
        canvas.height = drawH
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(originalImage, 0, 0, drawW, drawH)

        setImageInfo({ w: drawW, h: drawH, downscaled })

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, drawW, drawH)
        const buffer = imageData.data.buffer.slice(0)

        // Send to Web Worker
        if (!workerRef.current) return
        workerRef.current.postMessage(
          {
            type: 'enhance',
            buffer,
            width: drawW,
            height: drawH,
            settings: { ...settings },
          },
          [buffer] // Transfer buffer (zero-copy)
        )
      } catch (err) {
        console.error('Enhancement error:', err)
        setProcessing(false)
        setProgressStep('')
        setProgressPercent(0)
      }
    })
  }, [originalImage, settings])

  // Download enhanced image
  const downloadEnhanced = () => {
    if (!enhancedUrl) return
    const a = document.createElement('a')
    const baseName = fileName.replace(/\.[^.]+$/, '')
    a.download = `${baseName}_enhanced.png`
    a.href = enhancedUrl
    a.click()
  }

  // Fullscreen compare controls
  const handleCompareMove = useCallback((clientX: number) => {
    if (!compareContainerRef.current) return
    const rect = compareContainerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)))
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      handleCompareMove(clientX)
    }
    const onUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [isDragging, handleCompareMove])

  // Close fullscreen on Escape
  useEffect(() => {
    if (!fullscreenCompare) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFullscreenCompare(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreenCompare])

  const resetAll = () => {
    cancelProcessing()
    setOriginalImage(null)
    setOriginalUrl('')
    setEnhancedUrl('')
    setSettings({ ...PRESETS.social.settings })
    setFileName('')
    setFullscreenCompare(false)
    setImageInfo({ w: 0, h: 0, downscaled: false })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Calculate output dimensions for display
  const getOutputDims = () => {
    if (!originalImage) return ''
    const baseW = imageInfo.downscaled ? imageInfo.w : originalImage.width
    const baseH = imageInfo.downscaled ? imageInfo.h : originalImage.height
    if (settings.upscale > 1) {
      return `${Math.round(baseW * settings.upscale)}x${Math.round(baseH * settings.upscale)}`
    }
    return `${baseW}x${baseH}`
  }

  return (
    <>
      <div className="border-t border-border">
        {/* Header */}
        <div className="px-4 py-3 bg-surface/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-accent to-blue-400 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary">Image Enhancer</p>
              <p className="text-[9px] text-text-tertiary">Lanczos3, CLAHE, bilateral denoise</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {!originalImage ? (
            /* Upload Area */
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-accent bg-accent-light/30' : 'border-border hover:border-accent/50 hover:bg-surface'}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary">
                  <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-text-primary mb-1">Drop image here or tap to upload</p>
              <p className="text-[10px] text-text-tertiary">PNG, JPG, WEBP</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          ) : (
            <>
              {/* Preview */}
              <div className="relative bg-surface rounded-xl overflow-hidden">
                {enhancedUrl && !fullscreenCompare ? (
                  <div className="relative">
                    <img src={enhancedUrl} alt="Enhanced" className="w-full" style={{ maxHeight: 250, objectFit: 'contain' }} />
                    {processing && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-[10px] text-accent font-semibold">{progressStep}</p>
                          <p className="text-[10px] text-accent font-bold">{progressPercent}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : !fullscreenCompare ? (
                  <div className="relative">
                    <img src={originalUrl} alt="Original" className="w-full" style={{ maxHeight: 250, objectFit: 'contain' }} />
                    {processing && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <p className="text-[10px] text-accent font-semibold">{progressStep}</p>
                          <p className="text-[10px] text-accent font-bold">{progressPercent}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Processing overlay with progress bar */}
                {processing && !fullscreenCompare && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Info bar */}
              <div className="flex items-center justify-between text-[9px] text-text-tertiary">
                <span className="truncate max-w-[60%]">{fileName}</span>
                <span>{getOutputDims()}{settings.upscale > 1 ? ` (${settings.upscale}x)` : ''}{imageInfo.downscaled ? ' auto-scaled' : ''}</span>
              </div>

              {/* Big warning if image was auto-downscaled */}
              {imageInfo.downscaled && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-[10px] text-yellow-700">
                  Large image auto-scaled to {MAX_DIMENSION}px max for mobile processing. Output quality remains high.
                </div>
              )}

              {/* Presets */}
              <div>
                <p className="text-[9px] text-text-tertiary uppercase font-semibold mb-1.5">Quick Presets</p>
                <div className="grid grid-cols-6 gap-1">
                  {Object.entries(PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => setSettings({ ...preset.settings })}
                      disabled={processing}
                      className={`px-1 py-2 rounded-lg text-center transition-all disabled:opacity-40 ${key === 'reset' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-surface hover:bg-accent-light hover:text-accent'}`}
                    >
                      <p className="text-[10px] font-bold">{preset.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-2">
                <p className="text-[9px] text-text-tertiary uppercase font-semibold">Controls</p>

                {/* Upscale */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-medium text-text-primary">Upscale (Lanczos3)</label>
                    <span className="text-[10px] font-bold text-accent">{settings.upscale}x</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 1.5, 2, 3, 4].map(v => (
                      <button key={v} onClick={() => setSettings(s => ({ ...s, upscale: v }))}
                        disabled={processing}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all disabled:opacity-40 ${settings.upscale === v ? 'bg-accent text-white' : 'bg-surface text-text-secondary hover:bg-accent-light'}`}
                      >{v}x</button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                {[
                  { key: 'sharpen' as const, label: 'Sharpen', min: 0, max: 100 },
                  { key: 'contrast' as const, label: 'Contrast', min: -50, max: 50 },
                  { key: 'brightness' as const, label: 'Brightness', min: -50, max: 50 },
                  { key: 'saturation' as const, label: 'Vibrance', min: 0, max: 100 },
                  { key: 'clarity' as const, label: 'Clarity', min: 0, max: 100 },
                  { key: 'denoise' as const, label: 'Denoise', min: 0, max: 100 },
                  { key: 'shadows' as const, label: 'Shadows', min: -50, max: 50 },
                  { key: 'highlights' as const, label: 'Highlights', min: -50, max: 50 },
                ].map(ctrl => (
                  <div key={ctrl.key}>
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="text-[10px] font-medium text-text-primary">{ctrl.label}</label>
                      <span className="text-[10px] font-bold text-text-secondary">{settings[ctrl.key] > 0 ? '+' : ''}{settings[ctrl.key]}</span>
                    </div>
                    <input type="range" min={ctrl.min} max={ctrl.max} value={settings[ctrl.key]}
                      disabled={processing}
                      onChange={e => setSettings(s => ({ ...s, [ctrl.key]: parseInt(e.target.value) }))}
                      className="w-full h-1 accent-accent disabled:opacity-40" />
                  </div>
                ))}
              </div>

              {/* ENHANCE / CANCEL Button */}
              {processing ? (
                <button
                  onClick={cancelProcessing}
                  className="w-full py-3.5 rounded-xl text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <rect x="6" y="6" width="12" height="12" rx="1" />
                  </svg>
                  Cancel Processing
                </button>
              ) : (
                <button
                  onClick={enhanceImage}
                  disabled={!originalImage}
                  className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-accent to-blue-500 text-white hover:from-accent-hover hover:to-blue-600 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                  Enhance Image
                </button>
              )}

              {/* Processing progress detail */}
              {processing && (
                <div className="bg-accent-light/30 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-semibold text-accent">{progressStep}</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-text-tertiary mt-1">{progressPercent}% complete</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => enhancedUrl ? setFullscreenCompare(true) : null}
                  disabled={!enhancedUrl || processing}
                  className="py-2.5 rounded-lg text-[10px] font-semibold bg-surface text-text-secondary hover:bg-accent-light hover:text-accent disabled:opacity-40 flex items-center justify-center gap-1"
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                  Compare
                </button>
                <button
                  onClick={downloadEnhanced}
                  disabled={!enhancedUrl || processing}
                  className="py-2.5 rounded-lg text-[10px] font-semibold bg-accent text-white disabled:opacity-40 hover:bg-accent-hover flex items-center justify-center gap-1"
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  Download
                </button>
                <button
                  onClick={resetAll}
                  disabled={processing}
                  className="py-2.5 rounded-lg text-[10px] font-semibold bg-surface text-red-500 hover:bg-red-50 disabled:opacity-40 flex items-center justify-center gap-1"
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg>
                  New
                </button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      {/* ===== FULLSCREEN COMPARE MODE ===== */}
      {fullscreenCompare && enhancedUrl && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 z-10">
            <div className="flex items-center gap-3">
              <span className="text-white text-xs font-bold">Before / After</span>
              <span className="text-white/50 text-[10px]">Slide left-right to compare</span>
            </div>
            <button
              onClick={() => setFullscreenCompare(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Compare area */}
          <div
            ref={compareContainerRef}
            className="flex-1 relative select-none overflow-hidden"
            style={{ touchAction: 'none' }}
            onMouseDown={(e) => { setIsDragging(true); handleCompareMove(e.clientX) }}
            onTouchStart={(e) => { setIsDragging(true); handleCompareMove(e.touches[0].clientX) }}
          >
            {/* Enhanced (full background) */}
            <img src={enhancedUrl} alt="Enhanced" className="absolute inset-0 w-full h-full object-contain" />

            {/* Original (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src={originalUrl} alt="Original" className="w-full h-full object-contain" style={{ width: compareContainerRef.current ? `${compareContainerRef.current.offsetWidth}px` : '100%' }} />
            </div>

            {/* Slider line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab">
                <svg width="16" height="16" fill="none" stroke="#1a73e8" viewBox="0 0 24 24" strokeWidth="3">
                  <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white text-xs rounded-lg font-semibold z-20">ORIGINAL</div>
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent text-white text-xs rounded-lg font-semibold z-20">ENHANCED</div>
          </div>

          {/* Bottom info */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/80">
            <span className="text-white/50 text-[10px]">{originalImage?.width}x{originalImage?.height} original</span>
            <span className="text-white/50 text-[10px]">{getOutputDims()} enhanced ({settings.upscale}x)</span>
          </div>
        </div>
      )}
    </>
  )
}
