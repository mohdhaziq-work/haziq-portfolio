'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ==================== TYPES ====================
type TextLayer = {
  id: string
  text: string
  x: number // 0-1 relative
  y: number // 0-1 relative
  size: number // px relative to image width
  color: string
  font: string
  bold: boolean
}

const FILTERS: Record<string, string> = {
  none: '',
  bw: 'grayscale(1)',
  sepia: 'sepia(0.8)',
  vintage: 'sepia(0.4) contrast(1.1) saturate(1.3)',
  cool: 'saturate(1.2) hue-rotate(-15deg) brightness(1.05)',
  warm: 'saturate(1.2) hue-rotate(15deg) brightness(1.05)',
  dramatic: 'contrast(1.4) saturate(1.3) brightness(0.95)',
  fade: 'contrast(0.85) brightness(1.1) saturate(0.8)',
  noir: 'grayscale(1) contrast(1.5) brightness(0.9)',
}

const CROP_RATIOS = [
  { key: 'free', label: 'Free', w: 0, h: 0 },
  { key: '1:1', label: '1:1', w: 1, h: 1 },
  { key: '4:3', label: '4:3', w: 4, h: 3 },
  { key: '3:4', label: '3:4', w: 3, h: 4 },
  { key: '16:9', label: '16:9', w: 16, h: 9 },
  { key: '9:16', label: '9:16', w: 9, h: 16 },
]

const FONTS = ['Inter', 'Georgia', 'Courier New', 'Impact', 'Arial', 'Times New Roman']

export default function ImageStudio() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imgName, setImgName] = useState('image')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // adjustments
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [sepia, setSepia] = useState(0)
  const [grayscale, setGrayscale] = useState(0)
  const [hue, setHue] = useState(0)
  const [invert, setInvert] = useState(0)
  const [filterPreset, setFilterPreset] = useState('none')

  // transform
  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [cropRatio, setCropRatio] = useState('free')

  // text
  const [texts, setTexts] = useState<TextLayer[]>([])
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'adjust' | 'filters' | 'transform' | 'text'>('adjust')

  const draggingRef = useRef<{ id: string; startX: number; startY: number } | null>(null)

  // ==================== LOAD IMAGE ====================
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => { setImage(img); setImgName(file.name.replace(/\.[^.]+$/, '') || 'image') }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  // ==================== RENDER ====================
  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // base dimensions
    let iw = image.naturalWidth
    let ih = image.naturalHeight
    const rotated = rotation % 180 !== 0

    // compute crop bounds in source coords
    let sx = 0, sy = 0, sw = iw, sh = ih
    const ratio = CROP_RATIOS.find(r => r.key === cropRatio)
    if (ratio && ratio.w > 0) {
      const targetAR = ratio.w / ratio.h
      const imgAR = iw / ih
      if (imgAR > targetAR) {
        sw = ih * targetAR; sx = (iw - sw) / 2
      } else {
        sh = iw / targetAR; sy = (ih - sh) / 2
      }
    }

    // output canvas size
    const outW = rotated ? sh : sw
    const outH = rotated ? sw : sh
    // cap for performance
    const maxDim = 2000
    const scale = Math.min(1, maxDim / Math.max(outW, outH))
    canvas.width = Math.round(outW * scale)
    canvas.height = Math.round(outH * scale)

    // build filter string
    const preset = FILTERS[filterPreset] || ''
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) invert(${invert}%) ${preset}`.trim()

    // draw image with rotation/flip
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.drawImage(image, sx, sy, sw, sh, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
    ctx.restore()

    // reset filter for text
    ctx.filter = 'none'

    // draw text layers
    texts.forEach(t => {
      const fontSize = (t.size / 100) * canvas.width
      ctx.font = `${t.bold ? 'bold ' : ''}${fontSize}px ${t.font}, sans-serif`
      ctx.fillStyle = t.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const lines = t.text.split('\n')
      const lh = fontSize * 1.2
      const startY = t.y * canvas.height - ((lines.length - 1) * lh) / 2
      // shadow for readability
      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = fontSize * 0.1
      lines.forEach((line, i) => {
        ctx.fillText(line, t.x * canvas.width, startY + i * lh)
      })
      ctx.shadowBlur = 0
      // selection outline
      if (t.id === selectedText) {
        ctx.strokeStyle = '#0d9488'
        ctx.lineWidth = 2
        const metrics = ctx.measureText(t.text)
        const w = metrics.width + 20
        const h = lines.length * lh + 16
        ctx.strokeRect(t.x * canvas.width - w / 2, t.y * canvas.height - h / 2, w, h)
      }
    })
  }, [image, brightness, contrast, saturation, blur, sepia, grayscale, hue, invert, filterPreset, rotation, flipH, flipV, cropRatio, texts, selectedText])

  useEffect(() => { render() }, [render])

  // ==================== TEXT DRAG (pointer) ====================
  const getCanvasPos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    return { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!image) return
    const pos = getCanvasPos(e)
    // find topmost text under pointer (simple: check all, pick nearest within threshold)
    let hit: TextLayer | null = null
    for (let i = texts.length - 1; i >= 0; i--) {
      const t = texts[i]
      if (Math.abs(t.x - pos.x) < 0.15 && Math.abs(t.y - pos.y) < 0.08) { hit = t; break }
    }
    if (hit) {
      setSelectedText(hit.id)
      draggingRef.current = { id: hit.id, startX: pos.x - hit.x, startY: pos.y - hit.y }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    } else {
      setSelectedText(null)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const pos = getCanvasPos(e)
    setTexts(prev => prev.map(t => t.id === draggingRef.current!.id ? { ...t, x: pos.x - draggingRef.current!.startX, y: pos.y - draggingRef.current!.startY } : t))
  }

  const handlePointerUp = () => { draggingRef.current = null }

  // ==================== ACTIONS ====================
  const addText = () => {
    const id = Math.random().toString(36).slice(2)
    setTexts(prev => [...prev, { id, text: 'Your text', x: 0.5, y: 0.5, size: 8, color: '#ffffff', font: 'Inter', bold: true }])
    setSelectedText(id)
    setActiveTab('text')
  }

  const updateText = (id: string, patch: Partial<TextLayer>) => {
    setTexts(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
  }

  const deleteText = (id: string) => {
    setTexts(prev => prev.filter(t => t.id !== id))
    setSelectedText(null)
  }

  const reset = () => {
    setBrightness(100); setContrast(100); setSaturation(100); setBlur(0)
    setSepia(0); setGrayscale(0); setHue(0); setInvert(0); setFilterPreset('none')
    setRotation(0); setFlipH(false); setFlipV(false); setCropRatio('free'); setTexts([])
    setSelectedText(null)
  }

  const download = (type: 'png' | 'jpeg') => {
    const canvas = canvasRef.current
    if (!canvas) return
    // re-render without selection outline for clean export
    const prevSel = selectedText; setSelectedText(null)
    setTimeout(() => {
      const url = canvas.toDataURL(type === 'png' ? 'image/png' : 'image/jpeg', 0.92)
      const a = document.createElement('a')
      a.href = url
      a.download = `${imgName}-edited.${type === 'png' ? 'png' : 'jpg'}`
      a.click()
      setSelectedText(prevSel)
    }, 50)
  }

  const sel = texts.find(t => t.id === selectedText)

  // ==================== UI ====================
  if (!image) {
    return (
      <div className="p-4">
        <div className="card text-center py-12">
          <div className="text-5xl mb-3">🎨</div>
          <h2 className="text-lg font-bold text-text-primary">Image Studio</h2>
          <p className="text-text-tertiary text-sm mt-1 mb-5">Professional image editor — crop, filters, adjustments, text.</p>
          <button onClick={() => fileRef.current?.click()} className="btn-primary">
            Choose Image to Edit
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    )
  }

  const Slider = ({ label, value, min, max, onChange, suffix = '' }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix?: string }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <span className="text-xs text-text-tertiary">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-brand" />
    </div>
  )

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-text-primary">🎨 Image Studio</h2>
        <button onClick={() => fileRef.current?.click()} className="text-xs text-accent font-semibold">New Image</button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Canvas */}
      <div className="bg-slate-900 rounded-xl p-3 mb-3 flex justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="max-w-full max-h-[50vh] rounded-lg touch-none"
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 bg-surface rounded-lg p-1">
        {(['adjust', 'filters', 'transform', 'text'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-2 py-2 rounded-md text-xs font-semibold capitalize ${activeTab === tab ? 'bg-white text-accent shadow-sm' : 'text-text-secondary'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Adjust */}
      {activeTab === 'adjust' && (
        <div className="card">
          <Slider label="Brightness" value={brightness} min={0} max={200} onChange={setBrightness} suffix="%" />
          <Slider label="Contrast" value={contrast} min={0} max={200} onChange={setContrast} suffix="%" />
          <Slider label="Saturation" value={saturation} min={0} max={200} onChange={setSaturation} suffix="%" />
          <Slider label="Blur" value={blur} min={0} max={20} onChange={setBlur} suffix="px" />
          <Slider label="Sepia" value={sepia} min={0} max={100} onChange={setSepia} suffix="%" />
          <Slider label="B&W" value={grayscale} min={0} max={100} onChange={setGrayscale} suffix="%" />
          <Slider label="Hue" value={hue} min={-180} max={180} onChange={setHue} suffix="°" />
          <Slider label="Invert" value={invert} min={0} max={100} onChange={setInvert} suffix="%" />
        </div>
      )}

      {/* Filters */}
      {activeTab === 'filters' && (
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(FILTERS).map(key => (
            <button key={key} onClick={() => setFilterPreset(key)} className={`py-3 rounded-lg text-xs font-semibold capitalize ${filterPreset === key ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}>
              {key === 'bw' ? 'B&W' : key}
            </button>
          ))}
        </div>
      )}

      {/* Transform */}
      {activeTab === 'transform' && (
        <div className="card space-y-3">
          <div>
            <p className="text-xs font-semibold text-text-secondary mb-2">Rotate & Flip</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setRotation(r => (r + 270) % 360)} className="py-2.5 bg-surface rounded-lg text-xs font-semibold">↺ Rotate L</button>
              <button onClick={() => setRotation(r => (r + 90) % 360)} className="py-2.5 bg-surface rounded-lg text-xs font-semibold">↻ Rotate R</button>
              <button onClick={() => setFlipH(f => !f)} className={`py-2.5 rounded-lg text-xs font-semibold ${flipH ? 'bg-accent text-white' : 'bg-surface'}`}>⇄ Flip H</button>
              <button onClick={() => setFlipV(f => !f)} className={`py-2.5 rounded-lg text-xs font-semibold ${flipV ? 'bg-accent text-white' : 'bg-surface'}`}>⇅ Flip V</button>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary mb-2">Crop (aspect ratio)</p>
            <div className="grid grid-cols-3 gap-2">
              {CROP_RATIOS.map(r => (
                <button key={r.key} onClick={() => setCropRatio(r.key)} className={`py-2.5 rounded-lg text-xs font-semibold ${cropRatio === r.key ? 'bg-accent text-white' : 'bg-surface'}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Text */}
      {activeTab === 'text' && (
        <div className="space-y-3">
          <button onClick={addText} className="btn-primary w-full">+ Add Text Layer</button>
          {sel ? (
            <div className="card space-y-3">
              <textarea value={sel.text} onChange={e => updateText(sel.id, { text: e.target.value })} rows={2} className="input resize-none text-sm" placeholder="Type text (use Enter for new line)" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Size</label>
                  <input type="range" min={3} max={30} value={sel.size} onChange={e => updateText(sel.id, { size: Number(e.target.value) })} className="w-full accent-brand" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Color</label>
                  <input type="color" value={sel.color} onChange={e => updateText(sel.id, { color: e.target.value })} className="w-full h-9 rounded-lg border border-border" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary">Font</label>
                <select value={sel.font} onChange={e => updateText(sel.id, { font: e.target.value })} className="input mt-1 text-sm">
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateText(sel.id, { bold: !sel.bold })} className={`flex-1 py-2 rounded-lg text-xs font-bold ${sel.bold ? 'bg-accent text-white' : 'bg-surface'}`}>Bold</button>
                <button onClick={() => deleteText(sel.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">Delete</button>
              </div>
              <p className="text-[10px] text-text-tertiary text-center">💡 Drag text on image to position</p>
            </div>
          ) : (
            texts.length > 0 ? (
              <div className="space-y-1.5">
                {texts.map(t => (
                  <button key={t.id} onClick={() => setSelectedText(t.id)} className="w-full text-left py-2 px-3 bg-surface rounded-lg text-xs">
                    {t.text.slice(0, 30)} {t.text.length > 30 ? '...' : ''}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-tertiary text-center py-4">No text layers. Add one above.</p>
            )
          )}
        </div>
      )}

      {/* Bottom actions */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <button onClick={reset} className="py-2.5 bg-surface text-text-secondary rounded-lg text-xs font-semibold">Reset</button>
        <button onClick={() => download('jpeg')} className="py-2.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">JPG</button>
        <button onClick={() => download('png')} className="py-2.5 bg-brand text-white rounded-lg text-xs font-semibold">PNG</button>
      </div>
    </div>
  )
}
