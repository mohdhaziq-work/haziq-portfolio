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

export default function ImageEnhancer() {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [enhancedUrl, setEnhancedUrl] = useState<string>('')
  const [settings, setSettings] = useState<EnhanceSettings>({ ...DEFAULT_SETTINGS })
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fullscreenCompare, setFullscreenCompare] = useState(false)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const compareContainerRef = useRef<HTMLDivElement>(null)

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
        setSettings({ ...PRESETS.social.settings })
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

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

  // ===== ADVANCED ENHANCEMENT ALGORITHMS =====

  // Lanczos3 interpolation for high-quality upscaling
  const lanczos3 = (x: number): number => {
    if (x === 0) return 1
    if (x >= 3 || x <= -3) return 0
    const px = Math.PI * x
    return (Math.sin(px) / px) * (Math.sin(px / 3) / (px / 3))
  }

  // Upscale using Lanczos resampling
  const upscaleLanczos = (srcCanvas: HTMLCanvasElement, scale: number): HTMLCanvasElement => {
    if (scale <= 1) return srcCanvas
    const sw = srcCanvas.width
    const sh = srcCanvas.height
    const dw = Math.round(sw * scale)
    const dh = Math.round(sh * scale)
    const dstCanvas = document.createElement('canvas')
    dstCanvas.width = dw
    dstCanvas.height = dh
    const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true })!
    const dstCtx = dstCanvas.getContext('2d', { willReadFrequently: true })!
    const srcData = srcCtx.getImageData(0, 0, sw, sh)
    const dstData = dstCtx.createImageData(dw, dh)
    const src = srcData.data
    const dst = dstData.data

    for (let y = 0; y < dh; y++) {
      for (let x = 0; x < dw; x++) {
        const srcX = x / scale
        const srcY = y / scale
        let r = 0, g = 0, b = 0, a = 0, weightSum = 0

        const x0 = Math.max(0, Math.floor(srcX - 3))
        const x1 = Math.min(sw - 1, Math.ceil(srcX + 3))
        const y0 = Math.max(0, Math.floor(srcY - 3))
        const y1 = Math.min(sh - 1, Math.ceil(srcY + 3))

        for (let iy = y0; iy <= y1; iy++) {
          for (let ix = x0; ix <= x1; ix++) {
            const wx = lanczos3(srcX - ix)
            const wy = lanczos3(srcY - iy)
            const w = wx * wy
            const i = (iy * sw + ix) * 4
            r += src[i] * w
            g += src[i + 1] * w
            b += src[i + 2] * w
            a += src[i + 3] * w
            weightSum += w
          }
        }

        if (weightSum > 0) {
          const i = (y * dw + x) * 4
          dst[i] = Math.max(0, Math.min(255, Math.round(r / weightSum)))
          dst[i + 1] = Math.max(0, Math.min(255, Math.round(g / weightSum)))
          dst[i + 2] = Math.max(0, Math.min(255, Math.round(b / weightSum)))
          dst[i + 3] = Math.max(0, Math.min(255, Math.round(a / weightSum)))
        }
      }
    }
    dstCtx.putImageData(dstData, 0, 0)
    return dstCanvas
  }

  // Bilateral filter (edge-preserving denoise)
  const applyBilateralDenoise = (ctx: CanvasRenderingContext2D, w: number, h: number, strength: number) => {
    if (strength === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const copy = new Uint8ClampedArray(data)
    const radius = Math.max(1, Math.round(strength / 20))
    const sigmaSpatial = radius
    const sigmaRange = 20 + (100 - strength) * 0.5

    for (let y = radius; y < h - radius; y++) {
      for (let x = radius; x < w - radius; x++) {
        const i = (y * w + x) * 4
        for (let c = 0; c < 3; c++) {
          let sum = 0, weightSum = 0
          const centerVal = copy[i + c]
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const ni = ((y + dy) * w + (x + dx)) * 4 + c
              const spatialDist = dx * dx + dy * dy
              const rangeDist = (copy[ni] - centerVal) * (copy[ni] - centerVal)
              const w2 = Math.exp(-(spatialDist / (2 * sigmaSpatial * sigmaSpatial)) - (rangeDist / (2 * sigmaRange * sigmaRange)))
              sum += copy[ni] * w2
              weightSum += w2
            }
          }
          data[i + c] = Math.round(sum / weightSum)
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // CLAHE - Contrast Limited Adaptive Histogram Equalization
  const applyCLAHE = (ctx: CanvasRenderingContext2D, w: number, h: number, contrast: number, clarity: number) => {
    if (contrast === 0 && clarity === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data

    // Global contrast
    if (contrast !== 0) {
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128))
        data[i + 1] = Math.max(0, Math.min(255, factor * (data[i + 1] - 128) + 128))
        data[i + 2] = Math.max(0, Math.min(255, factor * (data[i + 2] - 128) + 128))
      }
    }

    // Local contrast (clarity) - uses local mean subtraction
    if (clarity !== 0) {
      const copy = new Uint8ClampedArray(data)
      const radius = 15
      const clarityStrength = clarity / 100
      for (let y = radius; y < h - radius; y += 2) {
        for (let x = radius; x < w - radius; x += 2) {
          let rSum = 0, gSum = 0, bSum = 0, count = 0
          for (let dy = -radius; dy <= radius; dy += 2) {
            for (let dx = -radius; dx <= radius; dx += 2) {
              const ni = ((y + dy) * w + (x + dx)) * 4
              rSum += copy[ni]; gSum += copy[ni + 1]; bSum += copy[ni + 2]
              count++
            }
          }
          const rMean = rSum / count, gMean = gSum / count, bMean = bSum / count
          // Apply to 2x2 block
          for (let dy = 0; dy < 2 && y + dy < h; dy++) {
            for (let dx = 0; dx < 2 && x + dx < w; dx++) {
              const i = ((y + dy) * w + (x + dx)) * 4
              data[i] = Math.max(0, Math.min(255, copy[i] + (copy[i] - rMean) * clarityStrength))
              data[i + 1] = Math.max(0, Math.min(255, copy[i + 1] + (copy[i + 1] - gMean) * clarityStrength))
              data[i + 2] = Math.max(0, Math.min(255, copy[i + 2] + (copy[i + 2] - bMean) * clarityStrength))
            }
          }
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Shadows & Highlights
  const applyToneMapping = (ctx: CanvasRenderingContext2D, w: number, h: number, shadows: number, highlights: number, brightness: number) => {
    if (shadows === 0 && highlights === 0 && brightness === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const brightnessAdj = brightness * 2.55

    for (let i = 0; i < data.length; i += 4) {
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]

      // Shadows: boost dark areas
      if (shadows !== 0) {
        const shadowMask = Math.max(0, 1 - lum / 128) // 1 for dark, 0 for bright
        const shadowAdj = shadows * shadowMask * 0.01 * 255
        data[i] = Math.max(0, Math.min(255, data[i] + shadowAdj))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + shadowAdj))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + shadowAdj))
      }

      // Highlights: control bright areas
      if (highlights !== 0) {
        const hlMask = Math.max(0, (lum - 128) / 127) // 1 for bright, 0 for dark
        const hlAdj = highlights * hlMask * 0.01 * 255
        data[i] = Math.max(0, Math.min(255, data[i] + hlAdj))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + hlAdj))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + hlAdj))
      }

      // Brightness
      if (brightnessAdj !== 0) {
        data[i] = Math.max(0, Math.min(255, data[i] + brightnessAdj))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + brightnessAdj))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + brightnessAdj))
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Vibrance/Saturation
  const applySaturation = (ctx: CanvasRenderingContext2D, w: number, h: number, saturation: number) => {
    if (saturation === 0) return
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const strength = saturation / 100

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const currentSat = max === 0 ? 0 : (max - min) / max
      // Vibrance: less saturated pixels get more boost
      const boost = strength * (1 - currentSat * 0.5)
      const avg = (r + g + b) / 3
      data[i] = Math.max(0, Math.min(255, r + (r - avg) * boost))
      data[i + 1] = Math.max(0, Math.min(255, g + (g - avg) * boost))
      data[i + 2] = Math.max(0, Math.min(255, b + (b - avg) * boost))
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // Multi-pass Unsharp Mask
  const applySharpen = (ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    if (amount === 0) return
    const strength = amount / 100

    // Pass 1: Fine detail sharpen
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    const copy1 = new Uint8ClampedArray(data)
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = (y * w + x) * 4
        for (let c = 0; c < 3; c++) {
          const blur = (copy1[((y - 1) * w + x) * 4 + c] + copy1[((y + 1) * w + x) * 4 + c] + copy1[(y * w + (x - 1)) * 4 + c] + copy1[(y * w + (x + 1)) * 4 + c]) / 4
          data[i + c] = Math.max(0, Math.min(255, copy1[i + c] + (copy1[i + c] - blur) * strength * 1.5))
        }
      }
    }
    ctx.putImageData(imageData, 0, 0)

    // Pass 2: Medium detail (wider kernel)
    if (amount > 30) {
      const imageData2 = ctx.getImageData(0, 0, w, h)
      const data2 = imageData2.data
      const copy2 = new Uint8ClampedArray(data2)
      for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
          const i = (y * w + x) * 4
          for (let c = 0; c < 3; c++) {
            let blur = 0
            for (let dy = -2; dy <= 2; dy++) {
              for (let dx = -2; dx <= 2; dx++) {
                blur += copy2[((y + dy) * w + (x + dx)) * 4 + c]
              }
            }
            blur /= 25
            data2[i + c] = Math.max(0, Math.min(255, copy2[i + c] + (copy2[i + c] - blur) * strength * 0.4))
          }
        }
      }
      ctx.putImageData(imageData2, 0, 0)
    }
  }

  // ===== MAIN ENHANCE FUNCTION =====
  const enhanceImage = useCallback(() => {
    if (!originalImage || !canvasRef.current) return
    setProcessing(true)
    setProgress('Upscaling...')

    // Use setTimeout to let UI update
    setTimeout(() => {
      try {
        const scale = settings.upscale
        const ow = originalImage.width
        const oh = originalImage.height

        // Step 1: Draw original
        const srcCanvas = document.createElement('canvas')
        srcCanvas.width = ow
        srcCanvas.height = oh
        const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true })!
        srcCtx.imageSmoothingEnabled = true
        srcCtx.imageSmoothingQuality = 'high'
        srcCtx.drawImage(originalImage, 0, 0)
        setProgress('Upscaling with Lanczos...')

        setTimeout(() => {
          try {
            // Step 2: Upscale with Lanczos
            const upscaled = scale > 1 ? upscaleLanczos(srcCanvas, scale) : srcCanvas
            const w = upscaled.width
            const h = upscaled.height
            setProgress(`Processing ${w}x${h}...`)

            // Copy to main canvas
            const canvas = canvasRef.current!
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d', { willReadFrequently: true })!
            ctx.drawImage(upscaled, 0, 0)

            // Step 3: Denoise (first, before sharpening)
            if (settings.denoise > 0) {
              setProgress('Denoising...')
              setTimeout(() => {
                try {
                  applyBilateralDenoise(ctx, w, h, settings.denoise)

                  // Step 4: Tone mapping (shadows, highlights, brightness)
                  setProgress('Tone mapping...')
                  applyToneMapping(ctx, w, h, settings.shadows, settings.highlights, settings.brightness)

                  // Step 5: Contrast + Clarity (CLAHE)
                  setProgress('Enhancing contrast...')
                  applyCLAHE(ctx, w, h, settings.contrast, settings.clarity)

                  // Step 6: Saturation/Vibrance
                  setProgress('Enhancing colors...')
                  applySaturation(ctx, w, h, settings.saturation)

                  // Step 7: Sharpen (last, for maximum detail)
                  setProgress('Sharpening...')
                  applySharpen(ctx, w, h, settings.sharpen)

                  const result = canvas.toDataURL('image/png', 1.0)
                  setEnhancedUrl(result)
                  setProcessing(false)
                  setProgress('')
                } catch (err) {
                  console.error('Enhancement step error:', err)
                  setProcessing(false)
                  setProgress('')
                }
              }, 50)
            } else {
              // No denoise, continue directly
              setProgress('Tone mapping...')
              applyToneMapping(ctx, w, h, settings.shadows, settings.highlights, settings.brightness)
              setProgress('Enhancing contrast...')
              applyCLAHE(ctx, w, h, settings.contrast, settings.clarity)
              setProgress('Enhancing colors...')
              applySaturation(ctx, w, h, settings.saturation)
              setProgress('Sharpening...')
              applySharpen(ctx, w, h, settings.sharpen)

              const result = canvas.toDataURL('image/png', 1.0)
              setEnhancedUrl(result)
              setProcessing(false)
              setProgress('')
            }
          } catch (err) {
            console.error('Upscale error:', err)
            setProcessing(false)
            setProgress('')
          }
        }, 50)
      } catch (err) {
        console.error('Enhancement error:', err)
        setProcessing(false)
        setProgress('')
      }
    }, 50)
  }, [originalImage, settings, upscaleLanczos])

  // Auto-enhance with debounce
  useEffect(() => {
    if (!originalImage) return
    const timer = setTimeout(enhanceImage, 300)
    return () => clearTimeout(timer)
  }, [originalImage, settings, enhanceImage])

  // Download
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
    setOriginalImage(null)
    setOriginalUrl('')
    setEnhancedUrl('')
    setSettings({ ...PRESETS.social.settings })
    setFileName('')
    setFullscreenCompare(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
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
              <p className="text-[9px] text-text-tertiary">Lanczos upscale, CLAHE, bilateral denoise</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {!originalImage ? (
            /* Upload */
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
                          <p className="text-[10px] text-accent font-semibold">{progress}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : !fullscreenCompare ? (
                  <img src={originalUrl} alt="Original" className="w-full" style={{ maxHeight: 250, objectFit: 'contain' }} />
                ) : null}
              </div>

              {/* Info bar */}
              <div className="flex items-center justify-between text-[9px] text-text-tertiary">
                <span className="truncate max-w-[60%]">{fileName}</span>
                <span>{originalImage.width}x{originalImage.height} {settings.upscale > 1 ? `→ ${Math.round(originalImage.width * settings.upscale)}x${Math.round(originalImage.height * settings.upscale)}` : ''}</span>
              </div>

              {/* Presets */}
              <div>
                <p className="text-[9px] text-text-tertiary uppercase font-semibold mb-1.5">Quick Presets</p>
                <div className="grid grid-cols-6 gap-1">
                  {Object.entries(PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => setSettings({ ...preset.settings })}
                      className={`px-1 py-2 rounded-lg text-center transition-all ${key === 'reset' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-surface hover:bg-accent-light hover:text-accent'}`}
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
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all ${settings.upscale === v ? 'bg-accent text-white' : 'bg-surface text-text-secondary hover:bg-accent-light'}`}
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
                      onChange={e => setSettings(s => ({ ...s, [ctrl.key]: parseInt(e.target.value) }))}
                      className="w-full h-1 accent-accent" />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => enhancedUrl ? setFullscreenCompare(true) : null}
                  disabled={!enhancedUrl}
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
                  className="py-2.5 rounded-lg text-[10px] font-semibold bg-surface text-red-500 hover:bg-red-50 flex items-center justify-center gap-1"
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
              <span className="text-white/50 text-[10px]">{Math.round((originalImage?.width || 0) * settings.upscale)}x{Math.round((originalImage?.height || 0) * settings.upscale)} enhanced ({settings.upscale}x)</span>
          </div>
        </div>
      )}
    </>
  )
}
