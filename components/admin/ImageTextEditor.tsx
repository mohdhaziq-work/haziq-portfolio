'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ==================== TYPES ====================
type Line = {
  text: string
  bbox: { x0: number; y0: number; x1: number; y1: number }
  confidence: number
}

export default function ImageTextEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imgName, setImgName] = useState('image')
  const [lines, setLines] = useState<Line[]>([])
  const [edits, setEdits] = useState<Record<number, string>>({}) // line index -> new text
  const [hidden, setHidden] = useState<Record<number, boolean>>({}) // line index -> hidden
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [editingOrigCanvas, setEditingOrigCanvas] = useState<HTMLCanvasElement | null>(null)

  const displayRef = useRef<HTMLCanvasElement>(null)
  const workingRef = useRef<HTMLCanvasElement | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const ocrCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // ==================== LOAD IMAGE ====================
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setImgName(file.name.replace(/\.[^.]+$/, '') || 'image')
        setLines([])
        setEdits({})
        setHidden({})
        setSelected(null)
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  // ==================== SCAN TEXT (OCR) ====================
  const scanText = async () => {
    if (!image) return
    setScanning(true)
    setProgress(0)
    try {
      const maxDim = 2200
      const scale = Math.min(1, maxDim / Math.max(image.naturalWidth, image.naturalHeight))
      const ow = Math.round(image.naturalWidth * scale)
      const oh = Math.round(image.naturalHeight * scale)
      const oc = document.createElement('canvas')
      oc.width = ow
      oc.height = oh
      const octx = oc.getContext('2d')!
      octx.drawImage(image, 0, 0, ow, oh)
      ocrCanvasRef.current = oc

      const Tesseract = await import('tesseract.js')
      const tryLang = async (l: string) => {
        const result = await Tesseract.recognize(oc, l, {
          logger: (m: { status: string; progress: number }) => {
            if (m.status === 'recognizing text') setProgress(Math.round(m.progress * 100))
          },
        })
        const data = result.data as { text?: string; lines?: Line[]; words?: Line[]; paragraphs?: Line[] }
        let raw: Line[] = []
        const fromArr = (arr?: Line[]) =>
          (arr || []).filter((x) => x && x.text && x.text.trim().length > 0).map((x) => ({ text: x.text.trim(), bbox: x.bbox, confidence: x.confidence || 50 }))
        if (data.lines && data.lines.length) raw = fromArr(data.lines)
        else if (data.paragraphs && data.paragraphs.length) raw = fromArr(data.paragraphs)
        else if (data.words && data.words.length) raw = fromArr(data.words)
        return raw
      }

      let raw = await tryLang('eng')
      if (raw.length === 0) { setProgress(10); raw = await tryLang('eng+hin') }

      console.log('[OCR] detected blocks:', raw.length)
      raw.sort((a, b) => (a.bbox.y0 - b.bbox.y0) || (a.bbox.x0 - b.bbox.x0))
      const inv = 1 / scale
      raw = raw.map((l) => ({ ...l, bbox: { x0: l.bbox.x0 * inv, y0: l.bbox.y0 * inv, x1: l.bbox.x1 * inv, y1: l.bbox.y1 * inv } }))
      setLines(raw)
      setEdits({})
      setHidden({})
      if (raw.length === 0) {
        alert('No text detected. TIP: use a clear, high-contrast image with readable text (poster, document, screenshot). Handwritten or very small text is hard to read.')
      }
    } catch (err) {
      console.error('OCR error:', err)
      alert('Scan failed. OCR engine may have failed to load. Error: ' + String(err))
    } finally {
      setScanning(false)
    }
  }

  // ==================== COLOR HELPERS ====================
  const medianColor = (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) => {
    // sample border pixels just outside the box to get background color
    const img = ctx.getImageData(Math.max(0, x0 - 4), Math.max(0, y0 - 4), Math.min(ctx.canvas.width, x1 + 4) - Math.max(0, x0 - 4), Math.min(ctx.canvas.height, y1 + 4) - Math.max(0, y0 - 4))
    const px: number[][] = []
    const d = img.data
    const w = img.width
    const h = img.height
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (y < 3 || y > h - 4 || x < 3 || x > w - 4) {
        const i = (y * w + x) * 4
        px.push([d[i], d[i + 1], d[i + 2]])
      }
    }
    if (!px.length) return [255, 255, 255]
    return px.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]))[Math.floor(px.length / 2)]
  }

  const textColorForBg = (bg: number[]) => {
    const lum = (0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]) / 255
    return lum > 0.5 ? '#111111' : '#ffffff'
  }

  const eraseBox = (ctx: CanvasRenderingContext2D, bbox: Line['bbox']) => {
    const x0 = Math.floor(bbox.x0), y0 = Math.floor(bbox.y0), x1 = Math.ceil(bbox.x1), y1 = Math.ceil(bbox.y1)
    const bg = medianColor(ctx, x0, y0, x1, y1)
    // per-row gradient fill: interpolate between left & right border samples
    for (let y = y0; y <= y1; y++) {
      // sample left & right border
      const lX = Math.max(0, x0 - 3)
      const rX = Math.min(ctx.canvas.width - 1, x1 + 3)
      const li = ctx.getImageData(lX, y, 1, 1).data
      const ri = ctx.getImageData(rX, y, 1, 1).data
      const grad = ctx.createLinearGradient(x0, y, x1, y)
      grad.addColorStop(0, `rgb(${li[0]},${li[1]},${li[2]})`)
      grad.addColorStop(1, `rgb(${ri[0]},${ri[1]},${ri[2]})`)
      ctx.fillStyle = grad
      ctx.fillRect(x0, y, x1 - x0 + 1, 1)
    }
  }

  const drawText = (ctx: CanvasRenderingContext2D, text: string, bbox: Line['bbox']) => {
    if (!text.trim()) return
    const x0 = bbox.x0, y0 = bbox.y0, x1 = bbox.x1, y1 = bbox.y1
    const boxW = x1 - x0
    const boxH = y1 - y0
    // auto-fit font size
    let fontSize = Math.max(8, boxH * 0.85)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    const sampleBg = medianColor(ctx, x0, y0, x1, y1)
    const color = textColorForBg(sampleBg)
    // reduce font until fits width
    for (let i = 0; i < 12; i++) {
      ctx.font = `${fontSize}px Arial, sans-serif`
      if (ctx.measureText(text).width <= boxW * 0.98) break
      fontSize *= 0.9
    }
    ctx.fillStyle = color
    ctx.fillText(text, x0, (y0 + y1) / 2)
  }

  // ==================== RENDER EDITS ====================
  const renderEdits = useCallback(() => {
    if (!image) return
    const W = image.naturalWidth
    const H = image.naturalHeight
    const maxDim = 2000
    const sc = Math.min(1, maxDim / Math.max(W, H))
    const cw = Math.round(W * sc)
    const ch = Math.round(H * sc)

    // working canvas at display scale
    const work = document.createElement('canvas')
    work.width = cw
    work.height = ch
    const wctx = work.getContext('2d')!
    wctx.drawImage(image, 0, 0, cw, ch)

    // apply edits — bbox coords are in original image space, scale to work canvas
    const toWork = (v: number) => v * sc
    lines.forEach((line, idx) => {
      const isHidden = hidden[idx]
      const newText = edits[idx]
      const hasEdit = newText !== undefined && newText !== line.text
      if (!isHidden && !hasEdit) return
      const wbbox = { x0: toWork(line.bbox.x0), y0: toWork(line.bbox.y0), x1: toWork(line.bbox.x1), y1: toWork(line.bbox.y1) }
      // erase original text
      eraseBox(wctx, wbbox)
      // draw new text (if not just hidden)
      if (!isHidden && newText !== undefined) {
        drawText(wctx, newText, wbbox)
      }
    })

    workingRef.current = work

    // draw to display canvas (scaled to fit)
    const disp = displayRef.current
    if (disp) {
      disp.width = cw
      disp.height = ch
      const dctx = disp.getContext('2d')!
      dctx.drawImage(work, 0, 0)
      // overlay bounding boxes + selection
      lines.forEach((line, idx) => {
        const wb = { x0: toWork(line.bbox.x0), y0: toWork(line.bbox.y0), x1: toWork(line.bbox.x1), y1: toWork(line.bbox.y1) }
        if (idx === selected) {
          dctx.strokeStyle = '#0d9488'
          dctx.lineWidth = 3
          dctx.strokeRect(wb.x0, wb.y0, wb.x1 - wb.x0, wb.y1 - wb.y0)
        }
      })
    }
    setEditingOrigCanvas(work)
  }, [image, lines, edits, hidden, selected])

  useEffect(() => {
    if (image) renderEdits()
  }, [renderEdits, image])

  // ==================== EXPORT ====================
  const download = (type: 'png' | 'jpeg') => {
    if (!workingRef.current) return
    // re-render without selection box
    const prev = selected
    setSelected(null)
    setTimeout(() => {
      const url = workingRef.current!.toDataURL(type === 'png' ? 'image/png' : 'image/jpeg', 0.92)
      const a = document.createElement('a')
      a.href = url
      a.download = `${imgName}-edited.${type === 'png' ? 'png' : 'jpg'}`
      a.click()
      setSelected(prev)
    }, 60)
  }

  const editedCount = Object.keys(edits).length + Object.keys(hidden).length

  // ==================== UI ====================
  if (!image) {
    return (
      <div className="p-4">
        <div className="card text-center py-12">
          <div className="text-5xl mb-3">📝</div>
          <h2 className="text-lg font-bold text-text-primary">Image Text Editor</h2>
          <p className="text-text-tertiary text-sm mt-1 mb-4 px-4">Upload an image with text. The tool scans the text so you can edit, change, or remove it.</p>
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

      {/* Image preview */}
      <div className="bg-slate-900 rounded-xl p-3 mb-3 flex justify-center">
        <canvas ref={displayRef} className="max-w-full max-h-[45vh] rounded-lg" />
      </div>

      {/* Scan controls */}
      <div className="card mb-3 space-y-2">
        <button onClick={scanText} disabled={scanning} className="btn-primary w-full">
          {scanning ? `Scanning ${progress}%` : lines.length ? 'Re-scan Text' : '🔍 Scan Text'}
        </button>
        {scanning && (
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
        {lines.length > 0 && !scanning && (
          <p className="text-[11px] text-text-tertiary text-center">
            {lines.length} text block{lines.length > 1 ? 's' : ''} found · {editedCount} edited
          </p>
        )}
        {!lines.length && !scanning && (
          <p className="text-[10px] text-text-tertiary text-center">Auto-detects English + Hindi text</p>
        )}
      </div>

      {/* Detected text list */}
      {lines.length > 0 && (
        <div className="space-y-2 mb-3">
          <p className="text-xs font-semibold text-text-secondary px-1">Tap a text to edit · change it · or hide it</p>
          {lines.map((line, idx) => {
            const isEdited = edits[idx] !== undefined
            const isHidden = hidden[idx]
            const currentText = isEdited ? edits[idx] : line.text
            return (
              <div key={idx} className={`card p-2.5 ${selected === idx ? 'ring-2 ring-accent' : ''}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] text-text-tertiary bg-slate-100 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                  {isEdited && <span className="text-[9px] text-green-600 font-semibold">EDITED</span>}
                  {isHidden && <span className="text-[9px] text-red-500 font-semibold">HIDDEN</span>}
                  <span className="text-[9px] text-text-tertiary ml-auto">{Math.round(line.confidence)}%</span>
                </div>
                <input
                  type="text"
                  value={isHidden ? '' : currentText}
                  placeholder={isHidden ? '(hidden)' : ''}
                  onChange={(e) => {
                    setEdits((p) => ({ ...p, [idx]: e.target.value }))
                    if (isHidden) setHidden((p) => { const c = { ...p }; delete c[idx]; return c })
                  }}
                  onFocus={() => setSelected(idx)}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <div className="flex gap-1.5 mt-1.5">
                  <button
                    onClick={() => {
                      setEdits((p) => { const c = { ...p }; delete c[idx]; return c })
                      setHidden((p) => { const c = { ...p }; delete c[idx]; return c })
                    }}
                    className="flex-1 py-1 bg-slate-100 text-text-secondary rounded text-[10px] font-semibold"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setHidden((p) => ({ ...p, [idx]: !p[idx] }))}
                    className={`flex-1 py-1 rounded text-[10px] font-semibold ${isHidden ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-text-secondary'}`}
                  >
                    {isHidden ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Export */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={() => download('jpeg')} className="py-2.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">⬇ JPG</button>
        <button onClick={() => download('png')} className="py-2.5 bg-brand text-white rounded-lg text-xs font-semibold">⬇ PNG</button>
      </div>

      <p className="text-[10px] text-text-tertiary text-center mt-3">
        💡 Works best on clear text (posters, documents, screenshots). For messy backgrounds, edits may not look perfect.
      </p>
    </div>
  )
}
