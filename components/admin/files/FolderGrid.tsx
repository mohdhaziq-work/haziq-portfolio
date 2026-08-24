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

export default function FolderGrid({ folders, activeFolder, onFolderClick }: FolderGridProps) {
  // Default folders if none exist
  const defaultFolders = [
    { id: 'apps', name: 'Apps', icon: '📱', color: '#6366f1', fileCount: 0 },
    { id: 'documents', name: 'Documents', icon: '📄', color: '#10b981', fileCount: 0 },
    { id: 'images', name: 'Images', icon: '🖼️', color: '#f59e0b', fileCount: 0 },
    { id: 'videos', name: 'Videos', icon: '🎥', color: '#ef4444', fileCount: 0 },
    { id: 'archives', name: 'Archives', icon: '📦', color: '#8b5cf6', fileCount: 0 },
    { id: 'other', name: 'Other', icon: '📁', color: '#6b7280', fileCount: 0 },
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
            <span className="text-3xl">{folder.icon}</span>
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
