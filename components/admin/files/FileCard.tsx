'use client'

interface AdminFile {
  id: string
  name: string
  originalName: string
  type: string
  size: number
  downloadUrl: string
  folder: string
  tags: string[]
  isStarred: boolean
  downloadCount: number
  uploadedAt: number
}

interface FileCardProps {
  file: AdminFile
  onPreview: () => void
  onDownload: () => void
  onStar: () => void
  onDelete: () => void
  formatSize: (bytes: number) => string
  getFileIcon: (type: string) => React.ReactNode
}

// SVG Icons
const IconStar = ({ filled }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

export default function FileCard({ file, onPreview, onDownload, onStar, onDelete, formatSize, getFileIcon }: FileCardProps) {
  const isImage = file.type === 'image'

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
      {/* Preview area */}
      <div
        className="relative h-32 bg-gray-50 flex items-center justify-center cursor-pointer"
        onClick={onPreview}
      >
        {isImage && file.downloadUrl ? (
          <img
            src={file.downloadUrl}
            alt={file.originalName}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                const iconDiv = document.createElement('div')
                iconDiv.className = 'flex items-center justify-center w-full h-full text-text-secondary'
                iconDiv.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
                parent.appendChild(iconDiv)
              }
            }}
          />
        ) : (
          <span className="text-text-secondary">{getFileIcon(file.type)}</span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview() }}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors text-text-primary"
            title="Preview"
          >
            <IconEye />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDownload() }}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors text-text-primary"
            title="Download"
          >
            <IconDownload />
          </button>
        </div>

        {/* Star button */}
        <button
          onClick={(e) => { e.stopPropagation(); onStar() }}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm ${
            file.isStarred ? 'text-yellow-500' : 'text-gray-400 opacity-0 group-hover:opacity-100'
          } transition-opacity`}
        >
          <IconStar filled={file.isStarred} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-text-primary truncate" title={file.originalName}>
          {file.originalName}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-tertiary">{formatSize(file.size)}</span>
          <span className="text-xs text-text-tertiary">{file.downloadCount} downloads</span>
        </div>

        {/* Tags */}
        {file.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {file.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-text-tertiary">
                {tag}
              </span>
            ))}
            {file.tags.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-text-tertiary">
                +{file.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <button
            onClick={onPreview}
            className="flex-1 px-2 py-1.5 text-xs font-medium bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
          >
            <IconEye />
            <span>Preview</span>
          </button>
          <button
            onClick={onDownload}
            className="flex-1 px-2 py-1.5 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors flex items-center justify-center gap-1"
          >
            <IconDownload />
            <span>Download</span>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  )
}
