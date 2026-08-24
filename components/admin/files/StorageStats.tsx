'use client'

interface StorageStatsData {
  totalFiles: number
  totalSize: number
  byType: Record<string, { count: number; size: number }>
  byFolder: Record<string, { count: number; size: number }>
}

interface StorageStatsProps {
  stats: StorageStatsData
  formatSize: (bytes: number) => string
}

export default function StorageStats({ stats, formatSize }: StorageStatsProps) {
  const typeIcons: Record<string, string> = {
    apk: '📱',
    pdf: '📄',
    image: '🖼️',
    video: '🎥',
    document: '📝',
    archive: '📦',
    other: '📁',
  }

  return (
    <div className="bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-xl p-4 border border-accent/20">
      <div className="flex flex-wrap items-center gap-6">
        {/* Total files */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalFiles}</p>
            <p className="text-xs text-text-secondary">Total Files</p>
          </div>
        </div>

        {/* Total size */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{formatSize(stats.totalSize)}</p>
            <p className="text-xs text-text-secondary">Total Size</p>
          </div>
        </div>

        {/* By type */}
        <div className="flex flex-wrap gap-3 ml-auto">
          {Object.entries(stats.byType).map(([type, data]) => (
            <div
              key={type}
              className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-border"
            >
              <span className="text-sm">{typeIcons[type] || '📁'}</span>
              <span className="text-xs font-medium text-text-primary">{data.count}</span>
              <span className="text-xs text-text-tertiary">{type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
