'use client'

import { useState, useRef, useCallback } from 'react'
import { getAuthToken } from '@/lib/auth/clientAuth'

interface FileUploadProps {
  onClose: () => void
  onUploadComplete: () => void
}

// SVG Icons
const IconUpload = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconFile = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
)

export default function FileUpload({ onClose, onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [folder, setFolder] = useState('')
  const [tags, setTags] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getFileType = (name: string): string => {
    const ext = name.split('.').pop()?.toLowerCase() || ''
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) return 'image'
    if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(ext)) return 'video'
    if (ext === 'pdf') return 'pdf'
    if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext)) return 'archive'
    if (['apk', 'xapk', 'aab'].includes(ext)) return 'apk'
    if (['md', 'markdown', 'txt', 'doc', 'docx', 'rtf'].includes(ext)) return 'document'
    return 'other'
  }

  const getFolder = (type: string): string => {
    switch (type) {
      case 'apk': return 'apps'
      case 'image': return 'images'
      case 'video': return 'videos'
      case 'pdf':
      case 'document': return 'documents'
      case 'archive': return 'archives'
      default: return 'other'
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)
    setError('')
    setStatusText('Starting upload...')

    try {
      const token = await getAuthToken()
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
      const fileType = getFileType(file.name)
      const fileFolder = folder || getFolder(fileType)

      // For files > 4MB, upload directly to GitHub from browser
      if (file.size > 4 * 1024 * 1024) {
        setStatusText('Large file detected. Getting upload token...')
        setProgress(5)

        // Get upload token from our server
        const tokenRes = await fetch('/api/admin/files/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
        })

        if (!tokenRes.ok) {
          const tokenData = await tokenRes.json()
          throw new Error(tokenData.error || 'Failed to get upload token')
        }

        const { token: githubToken, repoOwner, repoName, releaseId, uploadUrl } = await tokenRes.json()

        setProgress(15)
        setStatusText('Uploading directly to GitHub...')

        // Generate unique filename
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).slice(2, 8)
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const uniqueName = `${timestamp}_${randomId}_${safeName}`

        // Upload directly to GitHub Releases from browser
        const uploadRes = await fetch(`${uploadUrl}?name=${encodeURIComponent(uniqueName)}`, {
          method: 'POST',
          headers: {
            Authorization: `token ${githubToken}`,
            'Content-Type': 'application/octet-stream',
            Accept: 'application/vnd.github.v3+json',
          },
          body: file,
        })

        if (!uploadRes.ok) {
          const errorText = await uploadRes.text()
          throw new Error(`GitHub upload failed: ${errorText}`)
        }

        const assetData = await uploadRes.json()
        const downloadUrl = assetData.browser_download_url

        setProgress(90)
        setStatusText('Saving metadata...')

        // Save metadata to our server
        const metaRes = await fetch('/api/admin/files/save-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          body: JSON.stringify({
            fileName: uniqueName,
            originalName: file.name,
            fileType,
            fileSize: file.size,
            folder: fileFolder,
            tags: tags || undefined,
            downloadUrl,
            githubPath: `releases/files/${uniqueName}`,
          }),
        })

        if (!metaRes.ok) {
          const metaData = await metaRes.json()
          throw new Error(metaData.error || 'Failed to save metadata')
        }

        setProgress(100)
        setStatusText('Upload complete!')
      } else {
        // For small files, use regular server upload
        setStatusText('Uploading file...')
        setProgress(20)

        const formData = new FormData()
        formData.append('file', file)
        if (folder) formData.append('folder', folder)
        if (tags) formData.append('tags', tags)

        setProgress(50)

        const res = await fetch('/api/admin/files/upload', {
          method: 'POST',
          headers,
          body: formData,
        })

        setProgress(90)
        setStatusText('Saving metadata...')

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Upload failed')
        }

        setProgress(100)
        setStatusText('Upload complete!')
      }

      // Success
      setTimeout(() => {
        onUploadComplete()
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setProgress(0)
      setStatusText('')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-lg font-bold text-text-primary">Upload File</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IconClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              dragActive
                ? 'border-accent bg-accent/5'
                : file
                ? 'border-green-500 bg-green-50'
                : 'border-border hover:border-accent'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {file ? (
              <div className="space-y-2">
                <div className="flex justify-center text-text-secondary">
                  <IconFile />
                </div>
                <p className="font-medium text-text-primary">{file.name}</p>
                <p className="text-sm text-text-secondary">{formatSize(file.size)}</p>
                {file.size > 4 * 1024 * 1024 && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block">
                    Large file — will upload directly to GitHub
                  </p>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <IconUpload />
                </div>
                <p className="text-text-secondary font-medium">
                  Drag & drop file here
                </p>
                <p className="text-sm text-text-tertiary">
                  or click to browse
                </p>
                <p className="text-xs text-text-tertiary">
                  Max file size: 2 GB (via GitHub Releases)
                </p>
              </div>
            )}
          </div>

          {/* Folder selection */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Folder (optional)
            </label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">Auto-detect</option>
              <option value="apps">Apps</option>
              <option value="documents">Documents</option>
              <option value="images">Images</option>
              <option value="videos">Videos</option>
              <option value="archives">Archives</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Tags (optional)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="android, instagram, mod (comma separated)"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{statusText}</span>
                <span className="text-accent font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="px-6 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  )
}
