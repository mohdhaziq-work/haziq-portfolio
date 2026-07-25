'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ==================== TYPES ====================
type Region = {
  id: string
  text: string
  // relative coords (0-1) on the image
  x: number; y: number; w: number; h: number
  size: number   // relative font size (0.5-5)
  color: string
  bold: boolean
  align: 'left' | 'center' | 'right'
}

export default function ImageTextEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imgName, setImgName] = useState('image')
  const [regions, setRegions] = useState<Region[]>([])
  const [selId, setSelId] = useState<string | null>(null)
  const [drawMode, setDrawMode] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const displayRef = useRef<HTMLCanvasElement>(null)
  const workingRef = useRef<HTMLCanvasElement | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // drawing state
  const drawRef = useRef<{ startX: number; startY: number } | null>(null)
  const [dragBox, setDragBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  // dragging existing region
  const moveRef = useRef<{ id: string; offX: number; offY: number } | null>(null)

  // ==================== LOAD IMAGE ====================
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => { setImage(img); setImgName(file.name.replace(/\.[^.]+$/, '') || 'image'); setRegions([]); setSelId(null) }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  // ==================== INPAINT HELPERS ====================
  const eraseBox = (ctx: CanvasRenderingContext2D, rx: number, ry: number, rw: number, rh: number) => {
    // per-row gradient fill from left/right border samples -> blends background
    const x0 = Math.max(0, Math.floor(rx))
    const y0 = Math.max(0, Math.floor(ry))
    const x1 = Math.min(ctx.canvas.width, Math.ceil(rx + rw))
    const y1 = Math.min(ctx.canvas.height, Math.ceil(ry + rh))
    for (let y = y0; y < y1; y++) {
      const lX = Math.max(0, x0 - 3)
      const rX = Math.min(ctx.canvas.width - 1, x1 + 3)
      const li = ctx.getImageData(lX, y, 1, 1).data
      const ri = ctx.getImageData(rX, y, 1, 1).data
      const grad = ctx.createLinearGradient(x0, y, x1, y)
      grad.addColorStop(0, `rgb(${li[0]},${li[1]},${li[2]})`)
      grad.addColorStop(1, `rgb(${ri[0]},${ri[1]},${ri[2]})`)
      ctx.fillStyle = grad
      ctx.fillRect(x0, y, x1 - x0, 1)
    }
  }

  const drawRegionText = (ctx: CanvasRenderingContext2D, r: Region, cw: number, ch: number) => {
    if (!r.text.trim()) return
    const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch
    const fontSize = (r.size / 100) * rh * 1.1
    ctx.font = `${r.bold ? 'bold ' : ''}${fontSize}px Arial, sans-serif`
    ctx.fillStyle = r.color
    ctx.textBaseline = 'middle'
    const lines = r.text.split('\n')
    const lh = fontSize * 1.15
    const totalH = lines.length * lh
    const startY = ry + rh / 2 - totalH / 2 + lh / 2
    lines.forEach((line, i) => {
      let tx = rx + 4
      if (r.align === 'center') { ctx.textAlign = 'center'; tx = rx + rw / 2 }
      else if (r.align === 'right') { ctx.textAlign = 'right'; tx = rx + rw - 4 }
      else { ctx.textAlign = 'left'; tx = rx + 4 }
      ctx.fillText(line, tx, startY + i * lh)
    })
  }

  // ==================== RENDER ====================
  const render = useCallback(() => {
    if (!image) return
    const W = image.naturalWidth, H = image.naturalHeight
    const maxDim = 2000
    const sc = Math.min(1, maxDim / Math.max(W, H))
    const cw = Math.round(W * sc), ch = Math.round(H * sc)

    const work = document.createElement('canvas')
    work.width = cw; work.height = ch
    const wctx = work.getContext('2d', { willReadFrequently: true })!
    wctx.drawImage(image, 0, 0, cw, ch)
    // erase + draw each region
    regions.forEach(r => {
      eraseBox(wctx, r.x * cw, r.y * ch, r.w * cw, r.h * ch)
      drawRegionText(wctx, r, cw, ch)
    })
    workingRef.current = work

    // display
    const disp = displayRef.current
    if (disp) {
      disp.width = cw; disp.height = ch
      const dctx = disp.getContext('2d')!
      dctx.drawImage(work, 0, 0)
      // overlay region boxes
      regions.forEach(r => {
        const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch
        dctx.strokeStyle = r.id === selId ? '#0d9488' : 'rgba(13,148,136,0.5)'
        dctx.lineWidth = r.id === selId ? 3 : 2
        dctx.setLineDash(r.id === selId ? [] : [6, 4])
        dctx.strokeRect(rx, ry, rw, rh)
        dctx.setLineDash([])
      })
      // drag preview box
      if (dragBox) {
        dctx.strokeStyle = '#ef4444'
        dctx.lineWidth = 2
        dctx.setLineDash([4, 4])
        dctx.strokeRect(dragBox.x * cw, dragBox.y * ch, dragBox.w * cw, dragBox.h * ch)
        dctx.fillStyle = 'rgba(239,68,68,0.1)'
        dctx.fillRect(dragBox.x * cw, dragBox.y * ch, dragBox.w * cw, dragBox.h * ch)
        dctx.setLineDash([])
      }
    }
  }, [image, regions, selId, dragBox])

  useEffect(() => { if (image) render() }, [render, image])

  // ==================== POINTER (draw + move) ====================
  const relPos = (e: React.PointerEvent) => {
    const c = displayRef.current!
    const rect = c.getBoundingClientRect()
    return { x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)) }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!image) return
    const p = relPos(e)
    if (drawMode) {
      drawRef.current = { startX: p.x, startY: p.y }
      setDragBox({ x: p.x, y: p.y, w: 0, h: 0 })
    } else {
      // try grab an existing region
      let hit: Region | null = null
      for (let i = regions.length - 1; i >= 0; i--) {
        const r = regions[i]
        if (p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) { hit = r; break }
      }
      if (hit) {
        setSelId(hit.id)
        moveRef.current = { id: hit.id, offX: p.x - hit.x, offY: p.y - hit.y }
      } else setSelId(null)
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const p = relPos(e)
    if (drawRef.current) {
      const s = drawRef.current
      const x = Math.min(s.startX, p.x), y = Math.min(s.startY, p.y)
      setDragBox({ x, y, w: Math.abs(p.x - s.startX), h: Math.abs(p.y - s.startY) })
    } else if (moveRef.current) {
      const m = moveRef.current
      setRegions(prev => prev.map(r => r.id === m.id ? { ...r, x: Math.max(0, Math.min(1 - r.w, p.x - m.offX)), y: Math.max(0, Math.min(1 - r.h, p.y - m.offY)) } : r))
    }
  }

  const onPointerUp = () => {
    if (drawRef.current && dragBox && dragBox.w > 0.02 && dragBox.h > 0.01) {
      const id = Math.random().toString(36).slice(2)
      setRegions(prev => [...prev, { id, text: '', x: dragBox.x, y: dragBox.y, w: dragBox.w, h: dragBox.h, size: 70, color: '#111111', bold: true, align: 'center' }])
      setSelId(id)
      setDrawMode(false)
    }
    drawRef.current = null
    setDragBox(null)
    moveRef.current = null
  }

  // ==================== ACTIONS ====================
  const updateRegion = (id: string, patch: Partial<Region>) => setRegions(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
  const deleteRegion = (id: string) => { setRegions(prev => prev.filter(r => r.id !== id)); setSelId(null) }

  // ==================== OCR AUTO-SCAN (optional bonus) ====================
  const autoScan = async () => {
    if (!image) return
    setScanning(true); setProgress(0)
    try {
      const Tesseract = await import('tesseract.js')
      const worker = await Tesseract.createWorker('eng', 1, {
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        logger: (m: { status: string; progress: number }) => { if (m.status === 'recognizing text') setProgress(Math.round(m.progress * 100)) },
      })
      const maxDim = 2000
      const sc = Math.min(1, maxDim / Math.max(image.naturalWidth, image.naturalHeight))
      const ow = Math.round(image.naturalWidth * sc), oh = Math.round(image.naturalHeight * sc)
      const oc = document.createElement('canvas'); oc.width = ow; oc.height = oh
      oc.getContext('2d')!.drawImage(image, 0, 0, ow, oh)
      const { data } = await worker.recognize(oc)
      await worker.terminate()
      const words = (data as { words?: { text: string; bbox: { x0: number; y0: number; x1: number; y1: number } }[] }).words || []
      const inv = 1 / sc
      const newRegions: Region[] = words
        .filter(w => w.text && w.text.trim())
        .map(w => ({
          id: Math.random().toString(36).slice(2),
          text: w.text.trim(),
          x: Math.max(0, w.bbox.x0 * inv / image.naturalWidth),
          y: Math.max(0, w.bbox.y0 * inv / image.naturalHeight),
          w: Math.min(1, ((w.bbox.x1 - w.bbox.x0) * inv) / image.naturalWidth + 0.01),
          h: Math.min(1, ((w.bbox.y1 - w.bbox.y0) * inv) / image.naturalHeight + 0.01),
          size: 80, color: '#111111', bold: true, align: 'left',
        }))
      if (newRegions.length) { setRegions(prev => [...prev, ...newRegions]); setSelId(newRegions[0].id) }
      else alert('Auto-scan found no text. Use "Draw Box" to select text manually — that always works.')
    } catch (err) {
      console.error('OCR error:', err)
      alert('Auto-scan failed to load. Use "Draw Box" to select text manually — that always works.')
    } finally { setScanning(false) }
  }

  // ==================== EXPORT ====================
  const download = (type: 'png' | 'jpeg') => {
    if (!workingRef.current) return
    const prev = selId; setSelId(null)
    setTimeout(() => {
      render()
      const url = workingRef.current!.toDataURL(type === 'png' ? 'image/png' : 'image/jpeg', 0.92)
      const a = document.createElement('a'); a.href = url; a.download = `${imgName}-edited.${type === 'png' ? 'png' : 'jpg'}`; a.click()
      setSelId(prev)
    }, 60)
  }

  const sel = regions.find(r => r.id === selId)

  // ==================== UI ====================
  if (!image) {
    return (
      <div className="p-4">
        <div className="card text-center py-12">
          <div className="text-5xl mb-3">📝</div>
          <h2 className="text-lg font-bold text-text-primary">Image Text Editor</h2>
          <p className="text-text-tertiary text-sm mt-1 mb-4 px-4">Upload an image. Draw a box over any text, then type new text to replace it. Or erase it.</p>
          <button onClick={() => fileRef.current?.click()} className="btn-primary">Choose Image</button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    )
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-text-primary">📝 Text Editor</h2>
        <button onClick={() => fileRef.current?.click()} className="text-xs text-accent font-semibold">New Image</button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Canvas */}
      <div className="bg-slate-900 rounded-xl p-3 mb-3 flex justify-center">
        <canvas
          ref={displayRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="max-w-full max-h-[45vh] rounded-lg"
          style={{ touchAction: 'none', cursor: drawMode ? 'crosshair' : 'default' }}
        />
      </div>

      {/* Action bar */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={() => setDrawMode(d => !d)}
          className={`py-2.5 rounded-lg text-xs font-semibold ${drawMode ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}
        >
          {drawMode ? '✏️ Draw box over text' : '✏️ Draw Box'}
        </button>
        <button onClick={autoScan} disabled={scanning} className="py-2.5 bg-surface text-text-secondary rounded-lg text-xs font-semibold">
          {scanning ? `Auto ${progress}%` : '🔍 Auto-scan'}
        </button>
      </div>
      {drawMode && <p className="text-[10px] text-accent text-center mb-2">👆 Drag over the text you want to change</p>}
      {scanning && (
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Selected region editor */}
      {sel ? (
        <div className="card space-y-2.5">
          <p className="text-xs font-semibold text-accent">Editing selected text</p>
          <textarea value={sel.text} onChange={e => updateRegion(sel.id, { text: e.target.value })} rows={2} placeholder="Type new text (empty = erase)" className="input resize-none text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-text-secondary">Font size: {sel.size}</label>
              <input type="range" min={30} max={150} value={sel.size} onChange={e => updateRegion(sel.id, { size: Number(e.target.value) })} className="w-full accent-accent" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-text-secondary">Color</label>
              <input type="color" value={sel.color} onChange={e => updateRegion(sel.id, { color: e.target.value })} className="w-full h-8 rounded-lg border border-border" />
            </div>
          </div>
          <div className="flex gap-1.5">
            {(['left', 'center', 'right'] as const).map(a => (
              <button key={a} onClick={() => updateRegion(sel.id, { align: a })} className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold ${sel.align === a ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}>{a}</button>
            ))}
            <button onClick={() => updateRegion(sel.id, { bold: !sel.bold })} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold ${sel.bold ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}>B</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => deleteRegion(sel.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">Delete</button>
            <button onClick={() => setSelId(null)} className="flex-1 py-2 bg-surface text-text-secondary rounded-lg text-xs font-semibold">Done</button>
          </div>
          <p className="text-[10px] text-text-tertiary text-center">💡 Drag the box on image to move it</p>
        </div>
      ) : (
        regions.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-text-secondary px-1">{regions.length} text region{regions.length > 1 ? 's' : ''} — tap to edit</p>
            {regions.map(r => (
              <button key={r.id} onClick={() => setSelId(r.id)} className="w-full text-left py-2 px-3 bg-surface rounded-lg text-xs truncate">
                {r.text ? (r.text.length > 30 ? r.text.slice(0, 30) + '...' : r.text) : <span className="text-text-tertiary italic">(empty = erase)</span>}
              </button>
            ))}
          </div>
        )
      )}

      {/* Export */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={() => download('jpeg')} className="py-2.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">⬇ JPG</button>
        <button onClick={() => download('png')} className="py-2.5 bg-brand text-white rounded-lg text-xs font-semibold">⬇ PNG</button>
      </div>
    </div>
  )
}
