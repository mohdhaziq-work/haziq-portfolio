'use client'

interface AdminFile {
  id: string
  name: string
  originalName: string
  type: string
  mimeType: string
  size: number
  downloadUrl: string
  folder: string
  tags: string[]
  isStarred: boolean
  downloadCount: number
  uploadedAt: number
}

interface FilePreviewProps {
  file: AdminFile
  onClose: () => void
  onDownload: () => void
  formatSize: (bytes: number) => string
}

// SVG Icons
const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconFile = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
)

const IconApk = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const IconArchive = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
)

export default function FilePreview({ file, onClose, onDownload, formatSize }: FilePreviewProps) {
  const isImage = file.type === 'image'
  const isPdf = file.type === 'pdf'
  const isVideo = file.type === 'video'

  const renderPreview = () => {
    // If no download URL, show error
    if (!file.downloadUrl) {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-12">
          <IconFile />
          <p className="text-lg font-medium text-text-primary mt-4">{file.originalName}</p>
          <p className="text-sm text-red-500 mt-2">Preview not available - no download URL</p>
        </div>
      )
    }

    if (isImage) {
      return (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden min-h-[300px] max-h-[60vh]">
          <img
            src={file.downloadUrl}
            alt={file.originalName}
            className="max-w-full max-h-[60vh] object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                const errorDiv = document.createElement('div')
                errorDiv.className = 'flex flex-col items-center justify-center p-8 text-center'
                errorDiv.innerHTML = `
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gray-300">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p class="text-sm text-text-secondary mt-4">Image failed to load</p>
                  <a href="${file.downloadUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent mt-2 hover:underline">Open in new tab</a>
                `
                parent.appendChild(errorDiv)
              }
            }}
          />
        </div>
      )
    }

    if (isPdf) {
      return (
        <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '60vh' }}>
          <iframe
            src={file.downloadUrl}
            className="w-full h-full border-0"
            title={file.originalName}
          />
        </div>
      )
    }

    if (isVideo) {
      return (
        <div className="bg-black rounded-lg overflow-hidden">
          <video
            src={file.downloadUrl}
            controls
            className="w-full max-h-[60vh]"
            onError={(e) => {
              const target = e.target as HTMLVideoElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                const errorDiv = document.createElement('div')
                errorDiv.className = 'flex flex-col items-center justify-center p-8 text-center bg-gray-900'
                errorDiv.innerHTML = `
                  <p class="text-white">Video failed to load</p>
                  <a href="${file.downloadUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent mt-2 hover:underline">Download instead</a>
                `
                parent.appendChild(errorDiv)
              }
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    // Generic file
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-12">
        <span className="text-text-secondary">
          {file.type === 'apk' ? <IconApk /> : file.type === 'archive' ? <IconArchive /> : <IconFile />}
        </span>
        <p className="text-lg font-medium text-text-primary mt-4">{file.originalName}</p>
        <p className="text-sm text-text-secondary mt-1">{formatSize(file.size)}</p>
        <p className="text-xs text-text-tertiary mt-2">
          Preview not available for this file type
        </p>
        <a
          href={file.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-dark transition-colors"
        >
          Open File
        </a>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-text-secondary flex-shrink-0">
              {file.type === 'apk' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              ) : file.type === 'pdf' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              ) : file.type === 'image' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ) : file.type === 'video' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              )}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-text-primary truncate">{file.originalName}</h3>
              <p className="text-sm text-text-secondary">
                {formatSize(file.size)} • {file.downloadCount} downloads
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <IconClose />
          </button>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto p-6">
          {renderPreview()}
        </div>

        {/* Info */}
        <div className="px-6 py-4 border-t border-border bg-gray-50 flex-shrink-0">
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <div>
              <span className="font-medium">Type:</span> {file.type.toUpperCase()}
            </div>
            <div>
              <span className="font-medium">Folder:</span> {file.folder}
            </div>
            <div>
              <span className="font-medium">Uploaded:</span>{' '}
              {new Date(file.uploadedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>

          {/* Tags */}
          {file.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {file.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-white border border-border rounded-full text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors flex items-center gap-2"
          >
            <IconDownload />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
