'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { getAuthToken } from '@/lib/auth/clientAuth'
import FileUpload from './FileUpload'
import FileCard from './FileCard'
import FilePreview from './FilePreview'
import FolderGrid from './FolderGrid'
import StorageStats from './StorageStats'

interface AdminFile {
  id: string
  name: string
  originalName: string
  type: string
  mimeType: string
  size: number
  githubPath: string
  downloadUrl: string
  folder: string
  tags: string[]
  isStarred: boolean
  downloadCount: number
  uploadedAt: number
}

interface AdminFolder {
  id: string
  name: string
  icon: string
  color: string
  fileCount: number
}

interface StorageStatsData {
  totalFiles: number
  totalSize: number
  byType: Record<string, { count: number; size: number }>
  byFolder: Record<string, { count: number; size: number }>
}

// SVG Icon components (no emojis)
const IconApk = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const IconPdf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const IconImage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

const IconVideo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
)

const IconDocument = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const IconArchive = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
)

const IconFolder = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const IconStar = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
)

const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const IconUpload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const IconFile = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
)

export default function FileManager() {
  const { isAdmin } = useAuth()
  const [files, setFiles] = useState<AdminFile[]>([])
  const [folders, setFolders] = useState<AdminFolder[]>([])
  const [stats, setStats] = useState<StorageStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [previewFile, setPreviewFile] = useState<AdminFile | null>(null)
  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)
  const [showStarred, setShowStarred] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const api = useCallback(async (url: string, opts: RequestInit = {}) => {
    const token = await getAuthToken()
    return fetch(url, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(opts.headers || {}),
      },
    })
  }, [])

  const loadFiles = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (activeFolder) params.set('folder', activeFolder)
      if (activeType) params.set('type', activeType)
      if (showStarred) params.set('starred', 'true')
      if (searchQuery) params.set('search', searchQuery)

      const res = await api(`/api/admin/files?${params.toString()}`)
      const data = await res.json()
      setFiles(data.files || [])
    } catch (err) {
      console.error('Load files error:', err)
    }
  }, [api, activeFolder, activeType, showStarred, searchQuery])

  const loadFolders = useCallback(async () => {
    try {
      const res = await api('/api/admin/folders')
      const data = await res.json()
      setFolders(data.folders || [])
    } catch (err) {
      console.error('Load folders error:', err)
    }
  }, [api])

  const loadStats = useCallback(async () => {
    try {
      const res = await api('/api/admin/files/stats')
      const data = await res.json()
      setStats(data.stats)
    } catch (err) {
      console.error('Load stats error:', err)
    }
  }, [api])

  useEffect(() => {
    if (isAdmin) {
      setLoading(true)
      Promise.all([loadFiles(), loadFolders(), loadStats()]).finally(() => setLoading(false))
    }
  }, [isAdmin, loadFiles, loadFolders, loadStats])

  const handleUploadComplete = () => {
    loadFiles()
    loadFolders()
    loadStats()
    setShowUpload(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this file?')) return
    try {
      await api(`/api/admin/files/${id}`, { method: 'DELETE' })
      loadFiles()
      loadStats()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleStar = async (id: string) => {
    try {
      await api(`/api/admin/files/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ action: 'star' }),
      })
      loadFiles()
    } catch (err) {
      console.error('Star error:', err)
    }
  }

  const handleDownload = async (file: AdminFile) => {
    try {
      const res = await api(`/api/admin/files/download/${file.id}`)
      const data = await res.json()
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank')
      }
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'apk': return <IconApk />
      case 'pdf': return <IconPdf />
      case 'image': return <IconImage />
      case 'video': return <IconVideo />
      case 'document': return <IconDocument />
      case 'archive': return <IconArchive />
      default: return <IconFolder />
    }
  }

  const typeFilters = [
    { id: 'apk', label: 'APK' },
    { id: 'pdf', label: 'PDF' },
    { id: 'image', label: 'Image' },
    { id: 'video', label: 'Video' },
    { id: 'document', label: 'Doc' },
    { id: 'archive', label: 'ZIP' },
  ]

  if (!isAdmin) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">File Manager</h2>
          <p className="text-sm text-text-secondary">Upload and manage your files</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2.5 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <IconUpload />
          <span>Upload File</span>
        </button>
      </div>

      {/* Storage Stats */}
      {stats && <StorageStats stats={stats} formatSize={formatSize} />}

      {/* Folders */}
      <FolderGrid
        folders={folders}
        activeFolder={activeFolder}
        onFolderClick={(folderId) => {
          setActiveFolder(activeFolder === folderId ? null : folderId)
          setActiveType(null)
          setShowStarred(false)
        }}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Type filters */}
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveType(activeType === filter.id ? null : filter.id)
                setActiveFolder(null)
                setShowStarred(false)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeType === filter.id
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              <span className="w-4 h-4">{getFileIcon(filter.id)}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Starred filter */}
        <button
          onClick={() => {
            setShowStarred(!showStarred)
            setActiveFolder(null)
            setActiveType(null)
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            showStarred
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          <IconStar filled={showStarred} />
          <span>Starred</span>
        </button>

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              <IconSearch />
            </span>
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {/* View mode */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 self-start">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            title="Grid view"
          >
            <IconGrid />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            title="List view"
          >
            <IconList />
          </button>
        </div>
      </div>

      {/* Files */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="flex justify-center mb-3">
            <IconFile />
          </div>
          <p className="text-text-secondary font-medium">No files found</p>
          <p className="text-sm text-text-tertiary mt-1">Upload your first file to get started</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onPreview={() => setPreviewFile(file)}
              onDownload={() => handleDownload(file)}
              onStar={() => handleStar(file.id)}
              onDelete={() => handleDelete(file.id)}
              formatSize={formatSize}
              getFileIcon={getFileIcon}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary">Size</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary">Downloads</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-t border-border hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-text-secondary">{getFileIcon(file.type)}</span>
                      <div>
                        <p className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                          {file.originalName}
                        </p>
                        {file.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {file.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-text-tertiary">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-secondary">
                      {file.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{formatSize(file.size)}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{file.downloadCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewFile(file)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary"
                        title="Preview"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary"
                        title="Download"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleStar(file.id)}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 ${file.isStarred ? 'text-yellow-500' : 'text-text-secondary'}`}
                        title="Star"
                      >
                        <IconStar filled={file.isStarred} />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                        title="Delete"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <FileUpload
          onClose={() => setShowUpload(false)}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {/* Preview Modal */}
      {previewFile && (
        <FilePreview
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          onDownload={() => handleDownload(previewFile)}
          formatSize={formatSize}
        />
      )}
    </div>
  )
}
