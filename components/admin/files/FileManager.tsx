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

  const getFileIcon = (type: string): string => {
    switch (type) {
      case 'apk': return '📱'
      case 'pdf': return '📄'
      case 'image': return '🖼️'
      case 'video': return '🎥'
      case 'document': return '📝'
      case 'archive': return '📦'
      default: return '📁'
    }
  }

  if (!isAdmin) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">File Manager</h2>
          <p className="text-sm text-text-secondary">Upload and manage your files</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload File
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
      <div className="flex flex-wrap items-center gap-3">
        {/* Type filters */}
        <div className="flex gap-2">
          {['apk', 'pdf', 'image', 'video', 'document', 'archive'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveType(activeType === type ? null : type)
                setActiveFolder(null)
                setShowStarred(false)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeType === type
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {getFileIcon(type)} {type.toUpperCase()}
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
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            showStarred
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          ⭐ Starred
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>

        {/* View mode */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
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
          <p className="text-4xl mb-3">📁</p>
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
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
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
                      <span className="text-xl">{getFileIcon(file.type)}</span>
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
                        {file.isStarred ? '★' : '☆'}
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
