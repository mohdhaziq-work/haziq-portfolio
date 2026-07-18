'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type EnhanceMode = 'sharpen' | 'upscale' | 'contrast' | 'denoise' | 'brighten' | 'vibrance'

interface EnhanceSettings {
  sharpen: number
  upscale: number
  contrast: number
  brightness: number
  vibrance: number
  denoise: number
}

const DEFAULT_SETTINGS: EnhanceSettings = {
  sharpen: 0,
  upscale: 1,
  contrast: 0,
  brightness: 0,
  vibrance: 0,
  denoise: 0,
}

export default function ImageEnhancer() {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [enhancedUrl, setEnhancedUrl] = useState<string>('')
  const [settings, setSettings] = useState<EnhanceSettings>({ ...DEFAULT_SETTINGS })
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [sliderPos, setSliderPos] = useState(50)
  const [fileName, setFileName] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const compareRef = useRef<HTMLDivElement>(null)

  // Load image from file
  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        setOriginalImage(img)
        setOriginalUrl(e.target?.result as string)
        setEnhancedUrl('')
        setSettings({ ...DEFAULT_SETTINGS })
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadImage(file)
  }

  // Drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) loadImage(file)
  }, [loadImage])

  // ---- ENHANCEMENT ALGORITHMS ----

  // Sharpen using unsharp mask technique
  const applySharpen = (ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    if (amount === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const copy = new Uint8ClampedArray(data)

    // Unsharp mask kernel
    const strength = amount / 100
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = (y * w + x) * 4
        for (let c = 0; c < 3; c++) {
          // Laplacian sharpening
          const center = copy[i + c] * 5
          const neighbors = copy[((y - 1) * w + x) * 4 + c]
            + copy[((y + 1) * w + x) * 4 + c]
            + copy[(y * w + (x - 1)) * 4 + c]
            + copy[(y * w + (x + 1)) * 4 + c]
          const sharpened = copy[i + c] + (center - neighbors) * strength
          data[i + c] = Math.max(0, Math.min(255, sharpened))
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Contrast + Brightness
  const applyContrastBrightness = (ctx: CanvasRenderingContext2D, w: number, h: number, contrast: number, brightness: number) => {
    if (contrast === 0 && brightness === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast))
    const brightnessOffset = brightness * 2.55

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.max(0, Math.min(255, contrastFactor * (data[i] - 128) + 128 + brightnessOffset))
      data[i + 1] = Math.max(0, Math.min(255, contrastFactor * (data[i + 1] - 128) + 128 + brightnessOffset))
      data[i + 2] = Math.max(0, Math.min(255, contrastFactor * (data[i + 2] - 128) + 128 + brightnessOffset))
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Vibrance (saturation boost with skin-tone protection)
  const applyVibrance = (ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    if (amount === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const vibranceStrength = amount / 100

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const sat = (max === 0) ? 0 : (max - min) / max
      // Less saturated pixels get more boost
      const boost = vibranceStrength * (1 - sat) * 0.5 + vibranceStrength * 0.3
      const avg = (r + g + b) / 3
      data[i] = Math.max(0, Math.min(255, r + (r - avg) * boost))
      data[i + 1] = Math.max(0, Math.min(255, g + (g - avg) * boost))
      data[i + 2] = Math.max(0, Math.min(255, b + (b - avg) * boost))
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Denoise (simple box blur with edge preservation)
  const applyDenoise = (ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    if (amount === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const copy = new Uint8ClampedArray(data)
    const radius = Math.max(1, Math.round(amount / 25))
    const threshold = 30 + (100 - amount) * 0.5

    for (let y = radius; y < h - radius; y++) {
      for (let x = radius; x < w - radius; x++) {
        const i = (y * w + x) * 4
        for (let c = 0; c < 3; c++) {
          let sum = 0, count = 0
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const ni = ((y + dy) * w + (x + dx)) * 4 + c
              // Edge-preserving: only average similar pixels
              if (Math.abs(copy[ni] - copy[i + c]) < threshold) {
                sum += copy[ni]
                count++
              }
            }
          }
          if (count > 0) {
            data[i + c] = Math.round(sum / count)
          }
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // ---- MAIN ENHANCE FUNCTION ----
  const enhanceImage = useCallback(() => {
    if (!originalImage || !canvasRef.current) return
    setProcessing(true)

    // Use requestAnimationFrame to let UI update
    requestAnimationFrame(() => {
      try {
        const canvas = canvasRef.current!
        const scale = settings.upscale
        const w = Math.round(originalImage.width * scale)
        const h = Math.round(originalImage.height * scale)
        canvas.width = w
        canvas.height = h

        const ctx = canvas.getContext('2d', { willReadFrequently: true })!

        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        // Draw original at new scale
        ctx.drawImage(originalImage, 0, 0, w, h)

        // Apply enhancements in order
        // 1. Denoise first (removes noise before sharpening)
        applyDenoise(ctx, w, h, settings.denoise)

        // 2. Contrast & Brightness
        applyContrastBrightness(ctx, w, h, settings.contrast, settings.brightness)

        // 3. Vibrance
        applyVibrance(ctx, w, h, settings.vibrance)

        // 4. Sharpen last (adds detail after everything else)
        applySharpen(ctx, w, h, settings.sharpen)

        // Get result
        const result = canvas.toDataURL('image/png', 1.0)
        setEnhancedUrl(result)
      } catch (err) {
        console.error('Enhancement error:', err)
      } finally {
        setProcessing(false)
      }
    })
  }, [originalImage, settings])

  // Auto-enhance when settings change (with debounce)
  useEffect(() => {
    if (!originalImage) return
    const timer = setTimeout(() => {
      enhanceImage()
    }, 150)
    return () => clearTimeout(timer)
  }, [originalImage, settings, enhanceImage])

  // Download enhanced image
  const downloadEnhanced = () => {
    if (!enhancedUrl) return
    const a = document.createElement('a')
    const ext = fileName.split('.').pop()?.toLowerCase()
    const baseName = fileName.replace(/\.[^.]+$/, '')
    a.download = `${baseName}_enhanced.png`
    a.href = enhancedUrl
    a.click()
  }

  // Quick preset
  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'social':
        setSettings({ sharpen: 40, upscale: 2, contrast: 15, brightness: 5, vibrance: 30, denoise: 0 })
        break
      case 'photo':
        setSettings({ sharpen: 30, upscale: 2, contrast: 10, brightness: 0, vibrance: 20, denoise: 20 })
        break
      case 'sharp':
        setSettings({ sharpen: 70, upscale: 1, contrast: 20, brightness: 0, vibrance: 0, denoise: 0 })
        break
      case 'clear':
        setSettings({ sharpen: 20, upscale: 2, contrast: 10, brightness: 10, vibrance: 15, denoise: 30 })
        break
      case 'reset':
        setSettings({ ...DEFAULT_SETTINGS })
        break
    }
  }

  // Compare slider
  const handleCompareMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!compareRef.current) return
    const rect = compareRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(pct)
  }

  const hasChanges = Object.entries(settings).some(([k, v]) =>
    k === 'upscale' ? v !== 1 : v !== 0
  )

  return (
    <div className="border-t border-border">
      {/* Section Header */}
      <div className="px-4 py-3 bg-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-accent to-blue-400 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-text-primary">Image Enhancer</p>
            <p className="text-[9px] text-text-tertiary">Sharpen, upscale & enhance images</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Upload Area */}
        {!originalImage ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragOver ? 'border-accent bg-accent-light/30' : 'border-border hover:border-accent/50 hover:bg-surface'
            }`}
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
            <p className="text-[10px] text-text-tertiary">PNG, JPG, WEBP supported</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <>
            {/* Image Preview */}
            <div className="relative bg-surface rounded-xl overflow-hidden">
              {enhancedUrl && compareMode ? (
                /* Compare Mode */
                <div
                  ref={compareRef}
                  className="relative select-none"
                  style={{ touchAction: 'none' }}
                  onMouseMove={handleCompareMove}
                  onTouchMove={handleCompareMove}
                >
                  {/* Enhanced (full) */}
                  <img src={enhancedUrl} alt="Enhanced" className="w-full" style={{ maxHeight: 280, objectFit: 'contain' }} />
                  {/* Original (clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img src={originalUrl} alt="Original" className="w-full" style={{ maxHeight: 280, objectFit: 'contain' }} />
                  </div>
                  {/* Slider line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <svg width="12" height="12" fill="none" stroke="#1a73e8" viewBox="0 0 24 24" strokeWidth="3">
                        <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
                      </svg>
                    </div>
                  </div>
                  {/* Labels */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[9px] rounded-md font-semibold">BEFORE</div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[9px] rounded-md font-semibold">AFTER</div>
                </div>
              ) : (
                /* Normal preview */
                <img
                  src={enhancedUrl || originalUrl}
                  alt={enhancedUrl ? 'Enhanced' : 'Original'}
                  className="w-full"
                  style={{ maxHeight: 280, objectFit: 'contain' }}
                />
              )}

              {/* Processing overlay */}
              {processing && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-[10px] text-accent font-semibold">Enhancing...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick info bar */}
            <div className="flex items-center justify-between text-[9px] text-text-tertiary">
              <span>{fileName}</span>
              <div className="flex items-center gap-3">
                <span>{originalImage.width}x{originalImage.height}</span>
                {settings.upscale > 1 && (
                  <span className="text-accent font-semibold">
                    Output: {Math.round(originalImage.width * settings.upscale)}x{Math.round(originalImage.height * settings.upscale)}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <p className="text-[9px] text-text-tertiary uppercase font-semibold mb-1.5">Quick Presets</p>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'social', label: 'Social', desc: 'Instagram/stories' },
                  { id: 'photo', label: 'Photo', desc: 'Photo quality' },
                  { id: 'sharp', label: 'Sharp', desc: 'Max sharpness' },
                  { id: 'clear', label: 'Clear', desc: 'Denoise+enhance' },
                  { id: 'reset', label: 'Reset', desc: 'Original' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className={`px-2 py-2 rounded-lg text-center transition-all ${
                      p.id === 'reset'
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-surface hover:bg-accent-light hover:text-accent'
                    }`}
                  >
                    <p className="text-[10px] font-bold">{p.label}</p>
                    <p className="text-[8px] opacity-60">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhancement Controls */}
            <div className="space-y-2.5">
              <p className="text-[9px] text-text-tertiary uppercase font-semibold">Fine Controls</p>

              {/* Upscale */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-medium text-text-primary">Upscale (Resolution)</label>
                  <span className="text-[10px] font-bold text-accent">{settings.upscale}x</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 1.5, 2, 3, 4].map(v => (
                    <button
                      key={v}
                      onClick={() => setSettings(s => ({ ...s, upscale: v }))}
                      className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
                        settings.upscale === v ? 'bg-accent text-white' : 'bg-surface text-text-secondary hover:bg-accent-light hover:text-accent'
                      }`}
                    >
                      {v}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Sharpen */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-medium text-text-primary">Sharpen</label>
                  <span className="text-[10px] font-bold text-text-secondary">{settings.sharpen}%</span>
                </div>
                <input
                  type="range" min="0" max="100" value={settings.sharpen}
                  onChange={e => setSettings(s => ({ ...s, sharpen: parseInt(e.target.value) }))}
                  className="w-full h-1.5 accent-accent"
                />
              </div>

              {/* Contrast */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-medium text-text-primary">Contrast</label>
                  <span className="text-[10px] font-bold text-text-secondary">{settings.contrast > 0 ? '+' : ''}{settings.contrast}%</span>
                </div>
                <input
                  type="range" min="-50" max="50" value={settings.contrast}
                  onChange={e => setSettings(s => ({ ...s, contrast: parseInt(e.target.value) }))}
                  className="w-full h-1.5 accent-accent"
                />
              </div>

              {/* Brightness */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-medium text-text-primary">Brightness</label>
                  <span className="text-[10px] font-bold text-text-secondary">{settings.brightness > 0 ? '+' : ''}{settings.brightness}%</span>
                </div>
                <input
                  type="range" min="-50" max="50" value={settings.brightness}
                  onChange={e => setSettings(s => ({ ...s, brightness: parseInt(e.target.value) }))}
                  className="w-full h-1.5 accent-accent"
                />
              </div>

              {/* Vibrance */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-medium text-text-primary">Vibrance</label>
                  <span className="text-[10px] font-bold text-text-secondary">{settings.vibrance}%</span>
                </div>
                <input
                  type="range" min="0" max="100" value={settings.vibrance}
                  onChange={e => setSettings(s => ({ ...s, vibrance: parseInt(e.target.value) }))}
                  className="w-full h-1.5 accent-accent"
                />
              </div>

              {/* Denoise */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-medium text-text-primary">Denoise</label>
                  <span className="text-[10px] font-bold text-text-secondary">{settings.denoise}%</span>
                </div>
                <input
                  type="range" min="0" max="100" value={settings.denoise}
                  onChange={e => setSettings(s => ({ ...s, denoise: parseInt(e.target.value) }))}
                  className="w-full h-1.5 accent-accent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex-1 py-2.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  compareMode ? 'bg-accent text-white' : 'bg-surface text-text-secondary hover:bg-accent-light hover:text-accent'
                }`}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                {compareMode ? 'Compare ON' : 'Compare'}
              </button>
              <button
                onClick={downloadEnhanced}
                disabled={!enhancedUrl || processing}
                className="flex-1 py-2.5 bg-accent text-white rounded-lg text-[11px] font-semibold disabled:opacity-40 hover:bg-accent-hover transition-all flex items-center justify-center gap-1.5"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download
              </button>
            </div>

            {/* New Image */}
            <button
              onClick={() => {
                setOriginalImage(null)
                setOriginalUrl('')
                setEnhancedUrl('')
                setSettings({ ...DEFAULT_SETTINGS })
                setFileName('')
                setCompareMode(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="w-full py-2 text-[10px] font-semibold text-text-tertiary hover:text-red-500 transition-colors"
            >
              Upload New Image
            </button>
          </>
        )}

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
