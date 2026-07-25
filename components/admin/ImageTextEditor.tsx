'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type Region = {
  id: string
  text: string
  x: number; y: number; w: number; h: number
  size: number; color: string; bold: boolean
  align: 'left' | 'center' | 'right'
}

// ==================== SVG ICONS (no emojis) ====================
const Icon = {
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /></svg>,
  Copy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>,
  Undo: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6M21 17a9 9 0 00-15-6.7L3 13" /></svg>,
  Bold: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 010 8H6zM6 12h9a4 4 0 010 8H6z" /></svg>,
  AlignL: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 10H3M21 6H3M21 14H3M17 18H3" /></svg>,
  AlignC: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 10H6M21 6H3M21 14H3M18 18H6" /></svg>,
  AlignR: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10H7M21 6H3M21 14H3M21 18H7" /></svg>,
  Fullscreen: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" /></svg>,
  Close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>,
  Image: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>,
  Edit: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
}

const PRESETS = [
  { key: 'heading', label: 'Heading', size: 130, bold: true, color: '#111111' },
  { key: 'body', label: 'Body', size: 70, bold: false, color: '#222222' },
  { key: 'caption', label: 'Caption', size: 45, bold: false, color: '#555555' },
]

export default function ImageTextEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imgName, setImgName] = useState('image')
  const [regions, setRegions] = useState<Region[]>([])
  const [selId, setSelId] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [history, setHistory] = useState<Region[][]>([])

  const displayRef = useRef<HTMLCanvasElement>(null)
  const workingRef = useRef<HTMLCanvasElement | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const moveRef = useRef<{ id: string; offX: number; offY: number } | null>(null)
  const movedRef = useRef(false)

  // ==================== HISTORY (undo) ====================
  const snapshot = useCallback(() => setHistory(h => [...h.slice(-19), regions]), [regions])
  const undo = () => {
    if (!history.length) return
    const prev = history[history.length - 1]
    setRegions(prev); setHistory(h => h.slice(0, -1))
  }

  // ==================== LOAD IMAGE ====================
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => { setImage(img); setImgName(file.name.replace(/\.[^.]+$/, '') || 'image'); setRegions([]); setSelId(null); setHistory([]) }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  // ==================== INPAINT + TEXT ====================
  const eraseBox = (ctx: CanvasRenderingContext2D, rx: number, ry: number, rw: number, rh: number) => {
    const x0 = Math.max(0, Math.floor(rx)), y0 = Math.max(0, Math.floor(ry))
    const x1 = Math.min(ctx.canvas.width, Math.ceil(rx + rw)), y1 = Math.min(ctx.canvas.height, Math.ceil(ry + rh))
    for (let y = y0; y < y1; y++) {
      const lX = Math.max(0, x0 - 3), rX = Math.min(ctx.canvas.width - 1, x1 + 3)
      const li = ctx.getImageData(lX, y, 1, 1).data, ri = ctx.getImageData(rX, y, 1, 1).data
      const g = ctx.createLinearGradient(x0, y, x1, y)
      g.addColorStop(0, `rgb(${li[0]},${li[1]},${li[2]})`); g.addColorStop(1, `rgb(${ri[0]},${ri[1]},${ri[2]})`)
      ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, 1)
    }
  }

  const drawRegionText = (ctx: CanvasRenderingContext2D, r: Region, cw: number, ch: number) => {
    if (!r.text.trim()) return
    const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch
    let fontSize = (r.size / 100) * rh * 1.15
    ctx.font = `${r.bold ? 'bold ' : ''}${fontSize}px Arial, sans-serif`
    // shrink to fit width
    for (let i = 0; i < 10; i++) {
      if (ctx.measureText(r.text).width <= rw * 0.96) break
      fontSize *= 0.92; ctx.font = `${r.bold ? 'bold ' : ''}${fontSize}px Arial, sans-serif`
    }
    ctx.fillStyle = r.color; ctx.textBaseline = 'middle'
    const lines = r.text.split('\n'), lh = fontSize * 1.15
    const startY = ry + rh / 2 - ((lines.length - 1) * lh) / 2
    lines.forEach((line, i) => {
      if (r.align === 'center') { ctx.textAlign = 'center'; ctx.fillText(line, rx + rw / 2, startY + i * lh) }
      else if (r.align === 'right') { ctx.textAlign = 'right'; ctx.fillText(line, rx + rw - 4, startY + i * lh) }
      else { ctx.textAlign = 'left'; ctx.fillText(line, rx + 4, startY + i * lh) }
    })
  }

  // ==================== RENDER ====================
  const render = useCallback(() => {
    if (!image) return
    const W = image.naturalWidth, H = image.naturalHeight
    const maxDim = 2000
    const sc = Math.min(1, maxDim / Math.max(W, H))
    const cw = Math.round(W * sc), ch = Math.round(H * sc)
    const work = document.createElement('canvas'); work.width = cw; work.height = ch
    const wctx = work.getContext('2d', { willReadFrequently: true })!
    wctx.drawImage(image, 0, 0, cw, ch)
    regions.forEach(r => { eraseBox(wctx, r.x * cw, r.y * ch, r.w * cw, r.h * ch); drawRegionText(wctx, r, cw, ch) })
    workingRef.current = work

    const disp = displayRef.current
    if (disp) {
      disp.width = cw; disp.height = ch
      const dctx = disp.getContext('2d')!
      dctx.drawImage(work, 0, 0)
      regions.forEach(r => {
        const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch
        dctx.strokeStyle = r.id === selId ? '#0d9488' : 'rgba(13,148,136,0.45)'
        dctx.lineWidth = r.id === selId ? 3 : 1.5
        dctx.setLineDash(r.id === selId ? [] : [5, 4])
        dctx.strokeRect(rx, ry, rw, rh); dctx.setLineDash([])
        if (r.id === selId) { dctx.fillStyle = '#0d9488'; dctx.fillRect(rx, ry, 8, 8); dctx.fillRect(rx + rw - 8, ry, 8, 8); dctx.fillRect(rx, ry + rh - 8, 8, 8); dctx.fillRect(rx + rw - 8, ry + rh - 8, 8, 8) }
      })
    }
  }, [image, regions, selId])

  useEffect(() => { if (image) render() }, [render, image])

  // ==================== POINTER (tap-add / tap-select / drag) ====================
  const relPos = (e: React.PointerEvent) => {
    const c = displayRef.current!; const rect = c.getBoundingClientRect()
    return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!image) return
    const p = relPos(e)
    let hit: Region | null = null
    for (let i = regions.length - 1; i >= 0; i--) { const r = regions[i]; if (p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) { hit = r; break } }
    movedRef.current = false
    if (hit) {
      setSelId(hit.id)
      moveRef.current = { id: hit.id, offX: p.x - hit.x, offY: p.y - hit.y }
    } else {
      // tap empty area -> add new text region centered at tap
      snapshot()
      const id = Math.random().toString(36).slice(2)
      const w = 0.5, h = 0.07
      const nr: Region = { id, text: 'New text', x: Math.min(Math.max(0, p.x - w / 2), 1 - w), y: Math.min(Math.max(0, p.y - h / 2), 1 - h), w, h, size: 80, color: '#111111', bold: true, align: 'center' }
      setRegions(prev => [...prev, nr]); setSelId(id)
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!moveRef.current) return
    movedRef.current = true
    const p = relPos(e), m = moveRef.current
    setRegions(prev => prev.map(r => r.id === m.id ? { ...r, x: Math.max(0, Math.min(1 - r.w, p.x - m.offX)), y: Math.max(0, Math.min(1 - r.h, p.y - m.offY)) } : r))
  }

  const onPointerUp = () => { moveRef.current = null }

  // ==================== ACTIONS ====================
  const updateRegion = (id: string, patch: Partial<Region>) => setRegions(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
  const deleteRegion = (id: string) => { snapshot(); setRegions(prev => prev.filter(r => r.id !== id)); setSelId(null) }
  const duplicateRegion = (id: string) => {
    snapshot()
    const r = regions.find(x => x.id === id); if (!r) return
    const nid = Math.random().toString(36).slice(2)
    setRegions(prev => [...prev, { ...r, id: nid, x: Math.min(0.9, r.x + 0.03), y: Math.min(0.9, r.y + 0.03) }]); setSelId(nid)
  }
  const applyPreset = (id: string, p: { size: number; bold: boolean; color: string }) => { snapshot(); updateRegion(id, { size: p.size, bold: p.bold, color: p.color }) }

  // ==================== EXPORT ====================
  const download = (type: 'png' | 'jpeg') => {
    if (!workingRef.current) return
    const prev = selId; setSelId(null)
    setTimeout(() => {
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
          <div className="w-14 h-14 mx-auto bg-brand-light text-brand rounded-2xl flex items-center justify-center mb-3"><Icon.Edit /></div>
          <h2 className="text-lg font-bold text-text-primary">Image Text Editor</h2>
          <p className="text-text-tertiary text-sm mt-1 mb-4 px-4">Upload an image, tap anywhere to add text, change font size & color, erase or replace. Works on every image.</p>
          <button onClick={() => fileRef.current?.click()} className="btn-primary">Choose Image</button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    )
  }

  return (
    <div className={fullscreen ? 'fixed inset-0 z-[100] bg-white flex flex-col' : ''}>
      {/* Top bar */}
      <div className={`flex items-center justify-between px-3 py-2 ${fullscreen ? 'border-b border-border-light' : 'mb-2'}`}>
        <div className="flex items-center gap-2">
          <button onClick={() => fileRef.current?.click()} className="w-9 h-9 rounded-lg bg-surface text-text-secondary flex items-center justify-center" title="New image"><Icon.Image /></button>
          <span className="text-sm font-bold text-text-primary">Text Editor</span>
          <span className="text-[10px] text-text-tertiary">{regions.length} layer{regions.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={!history.length} className="w-9 h-9 rounded-lg bg-surface text-text-secondary flex items-center justify-center disabled:opacity-30" title="Undo"><Icon.Undo /></button>
          <button onClick={() => setFullscreen(f => !f)} className="w-9 h-9 rounded-lg bg-surface text-text-secondary flex items-center justify-center" title="Full screen">{fullscreen ? <Icon.Close /> : <Icon.Fullscreen />}</button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Canvas */}
      <div className={`bg-slate-900 flex justify-center ${fullscreen ? 'flex-1 overflow-auto p-3' : 'rounded-xl p-3 mb-2 mx-3'}`}>
        <canvas
          ref={displayRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className={`${fullscreen ? 'max-h-full' : 'max-w-full max-h-[40vh]'} rounded-lg`}
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Hint when nothing selected */}
      {!sel && (
        <p className="text-[11px] text-accent text-center py-2 px-4">
          Tap on the image to add text &middot; tap a text box to edit it &middot; drag to move
        </p>
      )}

      {/* Region list (when nothing selected) */}
      {!sel && regions.length > 0 && (
        <div className="px-3 pb-2 space-y-1.5">
          {regions.map(r => (
            <button key={r.id} onClick={() => setSelId(r.id)} className="w-full text-left py-2 px-3 bg-surface rounded-lg text-xs truncate flex items-center justify-between">
              <span className="truncate">{r.text || <span className="text-text-tertiary italic">empty</span>}</span>
              <span className="text-[9px] text-text-tertiary ml-2">{r.size}px &middot; {r.color}</span>
            </button>
          ))}
        </div>
      )}

      {/* BOTTOM CONTROL PANEL (when a region is selected) */}
      {sel && (
        <div className={`border-t border-border-light bg-white ${fullscreen ? '' : 'mx-3 mb-3 rounded-xl border'}`}>
          <div className="p-3 space-y-3">
            {/* quick actions */}
            <div className="flex gap-1.5">
              <button onClick={() => duplicateRegion(sel.id)} className="flex-1 py-2 bg-surface rounded-lg text-text-secondary flex items-center justify-center" title="Duplicate"><Icon.Copy /></button>
              <button onClick={() => deleteRegion(sel.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex items-center justify-center" title="Delete"><Icon.Trash /></button>
              <button onClick={() => setSelId(null)} className="flex-1 py-2 bg-brand text-white rounded-lg text-xs font-semibold">Done</button>
            </div>

            {/* text input */}
            <textarea value={sel.text} onChange={e => { snapshot(); updateRegion(sel.id, { text: e.target.value }) }} rows={2} placeholder="Type new text (empty = erase)" className="input resize-none text-sm" />

            {/* font size — value visible */}
            <div>
              <div className="flex justify-between mb-1"><span className="text-[11px] font-semibold text-text-secondary">Font size</span><span className="text-[11px] text-accent font-mono">{sel.size}</span></div>
              <input type="range" min={20} max={200} value={sel.size} onChange={e => updateRegion(sel.id, { size: Number(e.target.value) })} className="w-full accent-accent" />
            </div>

            {/* color — value visible */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-text-secondary flex-1">Text color</span>
              <input type="color" value={sel.color} onChange={e => updateRegion(sel.id, { color: e.target.value })} className="w-12 h-9 rounded-lg border border-border cursor-pointer" />
              <span className="text-[11px] text-text-tertiary font-mono uppercase w-16">{sel.color}</span>
            </div>

            {/* alignment + bold */}
            <div className="flex gap-1.5">
              {([['left', <Icon.AlignL key="l" />], ['center', <Icon.AlignC key="c" />], ['right', <Icon.AlignR key="r" />]] as const).map(([a, icon]) => (
                <button key={a} onClick={() => updateRegion(sel.id, { align: a })} className={`flex-1 py-2 rounded-lg flex items-center justify-center ${sel.align === a ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}>{icon}</button>
              ))}
              <button onClick={() => updateRegion(sel.id, { bold: !sel.bold })} className={`flex-1 py-2 rounded-lg flex items-center justify-center ${sel.bold ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}><Icon.Bold /></button>
            </div>

            {/* presets */}
            <div>
              <p className="text-[11px] font-semibold text-text-secondary mb-1.5">Quick styles</p>
              <div className="flex gap-1.5">
                {PRESETS.map(p => (
                  <button key={p.key} onClick={() => applyPreset(sel.id, p)} className="flex-1 py-2 bg-surface rounded-lg text-[11px] font-semibold text-text-secondary">{p.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export bar */}
      <div className={`grid grid-cols-2 gap-2 px-3 ${fullscreen ? 'pb-4' : 'pb-3'}`}>
        <button onClick={() => download('jpeg')} className="py-2.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"><Icon.Download /> JPG</button>
        <button onClick={() => download('png')} className="py-2.5 bg-brand text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"><Icon.Download /> PNG</button>
      </div>
    </div>
  )
}
