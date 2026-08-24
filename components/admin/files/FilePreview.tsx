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

export default function FilePreview({ file, onClose, onDownload, formatSize }: FilePreviewProps) {
  const isImage = file.type === 'image'
  const isPdf = file.type === 'pdf'
  const isVideo = file.type === 'video'

  const renderPreview = () => {
    if (isImage) {
      return (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden max-h-[60vh]">
          <img
            src={file.downloadUrl}
            alt={file.originalName}
            className="max-w-full max-h-[60vh] object-contain"
          />
        </div>
      )
    }

    if (isPdf) {
      return (
        <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '60vh' }}>
          <iframe
            src={`${file.downloadUrl}#toolbar=0`}
            className="w-full h-full"
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
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    // Generic file
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-12">
        <span className="text-6xl mb-4">
          {file.type === 'apk' ? '📱' : file.type === 'archive' ? '📦' : '📄'}
        </span>
        <p className="text-lg font-medium text-text-primary">{file.originalName}</p>
        <p className="text-sm text-text-secondary mt-1">{formatSize(file.size)}</p>
        <p className="text-xs text-text-tertiary mt-2">
          Preview not available for this file type
        </p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0">
              {file.type === 'apk' ? '📱' : file.type === 'pdf' ? '📄' : file.type === 'image' ? '🖼️' : file.type === 'video' ? '🎥' : '📁'}
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
