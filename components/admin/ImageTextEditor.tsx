'use client'

// AI Image Text Editor — 100% free, browser-only (Fabric.js + Tesseract.js + OpenCV.js)
// Runs as a standalone HTML page loaded in an iframe. No backend, no paid APIs.
// Click on auto-detected text to erase or rewrite it.

export default function ImageTextEditor() {
  return (
    <div className="p-3">
      <iframe
        src="/image-text-editor.html"
        title="Image Text Editor"
        className="w-full rounded-xl border border-border bg-white"
        style={{ height: 'min(85vh, 760px)' }}
        allow="clipboard-write"
      />
    </div>
  )
}
