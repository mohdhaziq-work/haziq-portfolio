'use client'

interface AdminFolder {
  id: string
  name: string
  icon: string
  color: string
  fileCount: number
}

interface FolderGridProps {
  folders: AdminFolder[]
  activeFolder: string | null
  onFolderClick: (folderId: string) => void
}

// SVG Icons for folders
const FolderIcons: Record<string, React.ReactNode> = {
  apps: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  documents: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  images: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  videos: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  archives: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  other: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
}

export default function FolderGrid({ folders, activeFolder, onFolderClick }: FolderGridProps) {
  // Default folders if none exist
  const defaultFolders = [
    { id: 'apps', name: 'Apps', icon: 'apps', color: '#6366f1', fileCount: 0 },
    { id: 'documents', name: 'Documents', icon: 'documents', color: '#10b981', fileCount: 0 },
    { id: 'images', name: 'Images', icon: 'images', color: '#f59e0b', fileCount: 0 },
    { id: 'videos', name: 'Videos', icon: 'videos', color: '#ef4444', fileCount: 0 },
    { id: 'archives', name: 'Archives', icon: 'archives', color: '#8b5cf6', fileCount: 0 },
    { id: 'other', name: 'Other', icon: 'other', color: '#6b7280', fileCount: 0 },
  ]

  const displayFolders = folders.length > 0 ? folders : defaultFolders

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary mb-3">Folders</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayFolders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onFolderClick(folder.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              activeFolder === folder.id
                ? 'border-accent bg-accent/5 shadow-sm'
                : 'border-border hover:border-accent/50 hover:bg-gray-50'
            }`}
          >
            <span style={{ color: folder.color }}>
              {FolderIcons[folder.icon] || FolderIcons.other}
            </span>
            <span className="text-xs font-medium text-text-primary">{folder.name}</span>
            {folder.fileCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-text-tertiary">
                {folder.fileCount} files
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
