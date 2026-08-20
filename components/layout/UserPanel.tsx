'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import {
  getAllContacts,
  getAllProjects,
  getProjectsByClientEmail,
  updateContactStatus,
  deleteContact,
  addProjectInquiry,
  updateProjectStatus,
  updateProjectDetails,
  deleteProject,
  submitClientProject,
  getUploadedImages,
  deleteUpload,
  addSSHKey,
  getSSHKeys,
  deleteSSHKey,
  getVideos,
  addVideo,
  deleteVideo,
  addClientUpload,
  getAllClientUploads,
  getClientUploadsByEmail,
  deleteClientUpload,
  type ContactSubmission,
  type ProjectInquiry,
  type ContactStatus,
  type ProjectStatus,
  type UploadedImage,
  type SSHKey,
  type VideoEntry,
  type VideoPlatform,
  type ClientUpload,
} from '@/lib/firebase/firestore'
import { PERSONAL, DATABASE } from '@/config/site-config'
import { openInstagramDM } from '@/lib/instagram'
import ImageEnhancer from '@/components/admin/ImageEnhancer'
import ImageStudio from '@/components/admin/ImageStudio'
import ImageTextEditor from '@/components/admin/ImageTextEditor'
import AdminAIChat from '@/components/admin/AdminAIChat'

// ==================== MAIN USER PANEL ====================

export default function UserPanel() {
  const { user, isAdmin, isClient, isUserPanelOpen, setUserPanelOpen, signOut } = useAuth()

  // Lock body scroll when panel open
  useEffect(() => {
    if (isUserPanelOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isUserPanelOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setUserPanelOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [setUserPanelOpen])

  if (!isUserPanelOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setUserPanelOpen(false)}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[480px] md:w-[560px] max-w-[100vw] bg-white flex flex-col shadow-2xl"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-body-sm font-semibold text-text-primary truncate">
                {isAdmin ? 'Admin Dashboard' : user?.displayName || 'My Portal'}
              </p>
              <p className="text-[11px] text-text-tertiary truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => { await signOut(); setUserPanelOpen(false) }}
              className="text-[11px] font-semibold text-text-tertiary hover:text-red-500 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
            >
              Sign Out
            </button>
            <button
              onClick={() => setUserPanelOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
              aria-label="Close panel"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Panel Body */}
        <div className="flex-1 overflow-y-auto">
          {isAdmin && <AdminDashboard />}
          {isAdmin && <ImageEnhancer />}
          {isClient && <ClientPortal />}
        </div>
      </div>

      {/* Animations handled via globals.css */}
    </>
  )
}

// ==================== STUDIO WRAPPER (toggle between editors) ====================

function StudioWrapper() {
  const [mode, setMode] = useState<'text' | 'design'>('text')
  return (
    <div>
      <div className="flex gap-1 mb-3 bg-surface rounded-lg p-1 mx-3 mt-3">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold ${mode === 'text' ? 'bg-white text-accent shadow-sm' : 'text-text-secondary'}`}
        >
          Text Editor
        </button>
        <button
          onClick={() => setMode('design')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold ${mode === 'design' ? 'bg-white text-accent shadow-sm' : 'text-text-secondary'}`}
        >
          Design Studio
        </button>
      </div>
      {mode === 'text' ? <ImageTextEditor /> : <ImageStudio />}
    </div>
  )
}

// ==================== ADMIN DASHBOARD ====================

type AdminTab = 'overview' | 'contacts' | 'projects' | 'images' | 'reels' | 'clientfiles' | 'studio' | 'ssh' | 'assistant'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [projects, setProjects] = useState<ProjectInquiry[]>([])
  const [loading, setLoading] = useState(false)

  // New Project Form
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProject, setNewProject] = useState({
    clientName: '', clientEmail: '', businessName: '', projectType: 'business',
    budget: '', deadline: '', notes: '', contactId: '',
  })

  // Edit Project
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editData, setEditData] = useState({
    status: '' as ProjectStatus, progress: 0, deliveryDate: '', adminNotes: '',
  })

  // Image Uploader
  const [uploads, setUploads] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadLabel, setUploadLabel] = useState('')
  const [uploadCategory, setUploadCategory] = useState('general')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // SSH Keys
  const [sshKeys, setSshKeys] = useState<SSHKey[]>([])
  const [showAddKey, setShowAddKey] = useState(false)
  const [newKey, setNewKey] = useState({ name: '', type: 'deploy', host: '', privateKey: '' })
  const [addingKey, setAddingKey] = useState(false)

  // Videos / Reels
  const [videos, setVideos] = useState<VideoEntry[]>([])
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [newVideoDesc, setNewVideoDesc] = useState('')
  const [addingVideo, setAddingVideo] = useState(false)

  // Client Uploads (files/images sent by clients)
  const [clientUploads, setClientUploads] = useState<ClientUpload[]>([])
  const [clientUploadFilter, setClientUploadFilter] = useState<string>('all')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [contactsData, projectsData, uploadsData, sshKeysData, videosData, clientUploadsData] = await Promise.all([
        getAllContacts(),
        getAllProjects(),
        getUploadedImages(),
        getSSHKeys(),
        getVideos(),
        getAllClientUploads(),
      ])
      setContacts(contactsData)
      setProjects(projectsData)
      setUploads(uploadsData)
      setSshKeys(sshKeysData)
      setVideos(videosData)
      setClientUploads(clientUploadsData)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ===== IMAGE UPLOAD HANDLER =====
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      // Step 1: Upload to ImgBB via API route (server reads IMGBB_API_KEY from env)
      const formData = new FormData()
      formData.append('image', file)
      
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      // Step 2: Save to Firestore using the existing db instance
      const { db } = await import('@/lib/firebase/config')
      const { addDoc, collection, Timestamp } = await import('firebase/firestore')
      if (!db) {
        throw new Error('Firebase not initialized. Check your Firebase configuration.')
      }
      await addDoc(collection(db, DATABASE.collections.uploads), {
        url: data.url,
        thumb: data.thumb || data.url,
        deleteUrl: data.deleteUrl || '',
        label: uploadLabel,
        category: uploadCategory,
        originalName: file.name,
        size: data.size || file.size,
        type: data.type || file.type,
        createdAt: Timestamp.now(),
      })

      setUploadLabel('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      fetchData()
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed: ' + String(error))
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteUpload = async (uploadId: string) => {
    if (!confirm('Delete this image?')) return
    await deleteUpload(uploadId)
    fetchData()
  }

  // ===== SSH KEY HANDLERS =====
  const handleAddSSHKey = async () => {
    if (!newKey.name || !newKey.privateKey) {
      alert('Name and Key content are required')
      return
    }
    setAddingKey(true)
    try {
      const result = await addSSHKey(newKey.name, newKey.type, newKey.host, newKey.privateKey)
      if (result) {
        setNewKey({ name: '', type: 'deploy', host: '', privateKey: '' })
        setShowAddKey(false)
        fetchData()
      } else {
        alert('Failed to save SSH key. Check if Firebase is configured.')
      }
    } catch (error) {
      console.error('Add SSH key error:', error)
      alert('Failed to add SSH key: ' + String(error))
    } finally {
      setAddingKey(false)
    }
  }

  const handleDeleteSSHKey = async (keyId: string) => {
    if (!confirm('Delete this SSH key? This cannot be undone.')) return
    const result = await deleteSSHKey(keyId)
    if (!result) {
      alert('Failed to delete SSH key')
    }
    fetchData()
  }

  // ===== VIDEO / REEL HANDLERS =====
  const handleAddVideo = async () => {
    if (!newVideoUrl) {
      alert('Video URL is required')
      return
    }
    setAddingVideo(true)
    try {
      const result = await addVideo(newVideoUrl, newVideoTitle, newVideoDesc)
      if (result) {
        setNewVideoUrl('')
        setNewVideoTitle('')
        setNewVideoDesc('')
        setShowAddVideo(false)
        fetchData()
      } else {
        alert('Failed to save video. Check if Firebase is configured and Firestore rules are deployed.')
      }
    } catch (error) {
      console.error('Add video error:', error)
      alert('Failed to add video: ' + String(error))
    } finally {
      setAddingVideo(false)
    }
  }

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm('Delete this video/reel?')) return
    const result = await deleteVideo(videoId)
    if (!result) {
      alert('Failed to delete video')
    }
    fetchData()
  }

  const handleStatusChange = async (contactId: string, status: ContactStatus) => {
    await updateContactStatus(contactId, status)
    fetchData()
  }

  const handleDeleteContact = async (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      await deleteContact(contactId)
      fetchData()
    }
  }

  const handleAddProject = async () => {
    const id = await addProjectInquiry({
      ...newProject,
      status: 'inquiry',
      progress: 0,
      deliveryDate: '',
      adminNotes: '',
    })
    if (id) {
      setShowNewProject(false)
      setNewProject({ clientName: '', clientEmail: '', businessName: '', projectType: 'business', budget: '', deadline: '', notes: '', contactId: '' })
      fetchData()
    }
  }

  const handleProjectStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
    // If marking as delivered, also set progress to 100
    if (newStatus === 'delivered') {
      await updateProjectDetails(projectId, { status: newStatus, progress: 100 })
    } else {
      await updateProjectStatus(projectId, newStatus)
    }
    // Close edit form if open for this project
    if (editingProject === projectId) {
      setEditingProject(null)
    }

    // Send email notification to client about status change
    try {
      const project = projects.find(p => p.id === projectId)
      if (project?.clientEmail) {
        await fetch('/api/email/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: project.clientEmail,
            clientName: project.clientName,
            projectName: project.businessName || project.projectType,
            status: newStatus,
            progress: newStatus === 'delivered' ? 100 : (project.progress || 0),
          }),
        })
      }
    } catch (err) {
      console.error('[Admin] Failed to send status update email:', err)
    }

    fetchData()
  }

  const handleSaveProjectDetails = async (projectId: string) => {
    await updateProjectDetails(projectId, editData)

    // Send email notification to client about progress update
    try {
      const project = projects.find(p => p.id === projectId)
      if (project?.clientEmail) {
        await fetch('/api/email/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: project.clientEmail,
            clientName: project.clientName,
            projectName: project.businessName || project.projectType,
            status: editData.status || project.status,
            progress: editData.progress,
            message: editData.adminNotes || undefined,
          }),
        })
      }
    } catch (err) {
      console.error('[Admin] Failed to send update email:', err)
    }

    setEditingProject(null)
    fetchData()
  }

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId)
      fetchData()
    }
  }

  // Stats
  const newContacts = contacts.filter(c => c.status === 'new').length
  const activeProjects = projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).length

  const formatDate = (timestamp: { seconds: number; nanoseconds: number } | null) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700'
      case 'read': return 'bg-yellow-100 text-yellow-700'
      case 'replied': return 'bg-green-100 text-green-700'
      case 'inquiry': return 'bg-purple-100 text-purple-700'
      case 'discussion': return 'bg-blue-100 text-blue-700'
      case 'confirmed': return 'bg-emerald-100 text-emerald-700'
      case 'in-progress': return 'bg-orange-100 text-orange-700'
      case 'review': return 'bg-cyan-100 text-cyan-700'
      case 'delivered': return 'bg-gray-100 text-gray-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const progressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-gray-400'
  }

  return (
    <div className="p-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface rounded-lg p-3 text-center">
          <p className="text-[10px] text-text-tertiary uppercase font-semibold mb-1">Contacts</p>
          <p className="text-xl font-bold text-text-primary">{contacts.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-[10px] text-blue-600 uppercase font-semibold mb-1">New</p>
          <p className="text-xl font-bold text-blue-600">{newContacts}</p>
        </div>
        <div className="bg-accent-light rounded-lg p-3 text-center">
          <p className="text-[10px] text-accent uppercase font-semibold mb-1">Active</p>
          <p className="text-xl font-bold text-accent">{activeProjects}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-4 bg-surface rounded-lg p-1">
        {(['overview', 'contacts', 'projects', 'images', 'reels', 'clientfiles', 'studio', 'ssh', 'assistant'] as AdminTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab ? 'bg-white text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab === 'reels' ? 'Reels' : tab === 'ssh' ? 'SSH' : tab === 'clientfiles' ? 'Client Files' : tab === 'studio' ? 'Studio' : tab === 'assistant' ? 'AI Assistant' : tab}
            {tab === 'contacts' && newContacts > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full">{newContacts}</span>
            )}
            {tab === 'clientfiles' && clientUploads.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-accent text-white text-[9px] rounded-full">{clientUploads.length}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-text-tertiary text-xs">Loading...</p>
        </div>
      ) : (
        <>
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Recent Contacts */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">Recent Contacts</h3>
                {contacts.length === 0 ? (
                  <p className="text-xs text-text-tertiary text-center py-6">No contacts yet.</p>
                ) : (
                  <div className="space-y-2">
                    {contacts.slice(0, 5).map(contact => (
                      <div key={contact.id} className="flex items-center justify-between bg-surface rounded-lg p-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 bg-accent-light rounded-full flex items-center justify-center text-accent font-bold text-xs flex-shrink-0">
                            {contact.fullName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-text-primary truncate">{contact.fullName}</p>
                            <p className="text-[10px] text-text-tertiary truncate">{contact.businessName || contact.service}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex-shrink-0 ${statusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Projects */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">Active Projects</h3>
                {projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).length === 0 ? (
                  <p className="text-xs text-text-tertiary text-center py-6">No active projects.</p>
                ) : (
                  <div className="space-y-2">
                    {projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).map(project => (
                      <div key={project.id} className="bg-surface rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">{project.clientName}</p>
                            <p className="text-[10px] text-text-tertiary truncate">{project.businessName}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex-shrink-0 ${statusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${progressColor(project.progress || 0)}`}
                              style={{ width: `${project.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-text-tertiary font-medium">{project.progress || 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== CONTACTS TAB ===== */}
          {activeTab === 'contacts' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-primary">All Contacts ({contacts.length})</h3>
              {contacts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xs text-text-tertiary">No contacts yet.</p>
                </div>
              ) : (
                contacts.map(contact => (
                  <div key={contact.id} className="bg-surface rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 bg-accent-light rounded-full flex items-center justify-center text-accent font-bold text-xs flex-shrink-0">
                          {contact.fullName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-text-primary truncate">{contact.fullName}</p>
                          <p className="text-[10px] text-text-tertiary truncate">{contact.businessName || 'No business'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <select
                          value={contact.status}
                          onChange={e => handleStatusChange(contact.id!, e.target.value as ContactStatus)}
                          className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase border-0 cursor-pointer ${statusColor(contact.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button
                          onClick={() => handleDeleteContact(contact.id!)}
                          className="w-6 h-6 rounded flex items-center justify-center text-text-tertiary hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="bg-white rounded-md p-2">
                        <p className="text-[9px] text-text-tertiary uppercase mb-0.5">Service</p>
                        <p className="text-[10px] font-medium text-text-primary truncate">{contact.service || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-md p-2">
                        <p className="text-[9px] text-text-tertiary uppercase mb-0.5">Instagram</p>
                        <p className="text-[10px] font-medium text-accent truncate">{contact.instagramHandle || 'N/A'}</p>
                      </div>
                      <div className="bg-white rounded-md p-2">
                        <p className="text-[9px] text-text-tertiary uppercase mb-0.5">Date</p>
                        <p className="text-[10px] font-medium text-text-primary">{formatDate(contact.createdAt as unknown as { seconds: number; nanoseconds: number })}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-md p-2 mb-2">
                      <p className="text-[10px] text-text-secondary leading-relaxed">{contact.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openInstagramDM()} className="text-[10px] font-semibold text-accent hover:underline">Reply on Instagram</button>
                      <button
                        onClick={() => {
                          setNewProject(prev => ({
                            ...prev,
                            clientName: contact.fullName,
                            clientEmail: '',
                            businessName: contact.businessName || '',
                            contactId: contact.id || '',
                          }))
                          setShowNewProject(true)
                        }}
                        className="text-[10px] font-semibold text-text-tertiary hover:text-accent"
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== PROJECTS TAB ===== */}
          {activeTab === 'projects' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Projects ({projects.length})</h3>
                <button
                  onClick={() => setShowNewProject(true)}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  + New
                </button>
              </div>

              {/* New Project Form */}
              {showNewProject && (
                <div className="bg-accent-light/50 border border-accent/20 rounded-lg p-3">
                  <p className="text-xs font-semibold text-text-primary mb-2">New Project</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="text" placeholder="Client Name *" value={newProject.clientName} onChange={e => setNewProject(prev => ({ ...prev, clientName: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30" />
                    <input type="email" placeholder="Client Email" value={newProject.clientEmail} onChange={e => setNewProject(prev => ({ ...prev, clientEmail: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30" />
                    <input type="text" placeholder="Business Name" value={newProject.businessName} onChange={e => setNewProject(prev => ({ ...prev, businessName: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30" />
                    <select value={newProject.projectType} onChange={e => setNewProject(prev => ({ ...prev, projectType: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30">
                      <option value="starter">Starter</option>
                      <option value="business">Business</option>
                      <option value="premium">Premium</option>
                      <option value="custom">Custom</option>
                    </select>
                    <input type="text" placeholder="Budget" value={newProject.budget} onChange={e => setNewProject(prev => ({ ...prev, budget: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30" />
                    <input type="date" value={newProject.deadline} onChange={e => setNewProject(prev => ({ ...prev, deadline: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30" />
                  </div>
                  <textarea placeholder="Notes..." value={newProject.notes} onChange={e => setNewProject(prev => ({ ...prev, notes: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-md border border-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-accent/30 mb-2 resize-none" />
                  <div className="flex gap-2">
                    <button onClick={handleAddProject} className="px-3 py-1.5 bg-accent text-white rounded-md text-[11px] font-semibold">Add</button>
                    <button onClick={() => setShowNewProject(false)} className="px-3 py-1.5 bg-white border border-border rounded-md text-[11px] font-semibold text-text-secondary">Cancel</button>
                  </div>
                </div>
              )}

              {projects.length === 0 && !showNewProject ? (
                <div className="text-center py-10">
                  <p className="text-xs text-text-tertiary">No projects yet.</p>
                </div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="bg-surface rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-text-primary truncate">{project.clientName}</p>
                        <p className="text-[10px] text-text-tertiary truncate">{project.businessName} / {project.projectType} / {project.budget || 'No budget'}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <select
                          value={project.status}
                          onChange={e => handleProjectStatusChange(project.id!, e.target.value as ProjectStatus)}
                          className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase border-0 cursor-pointer ${statusColor(project.status)}`}
                        >
                          <option value="inquiry">Inquiry</option>
                          <option value="discussion">Discussion</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleDeleteProject(project.id!)}
                          className="w-6 h-6 rounded flex items-center justify-center text-text-tertiary hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${progressColor(project.progress || 0)}`}
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-text-tertiary font-medium w-8 text-right">{project.progress || 0}%</span>
                    </div>

                    {/* Quick details */}
                    <div className="flex gap-3 text-[10px] text-text-tertiary mb-2">
                      <span>Deadline: {project.deadline || 'Not set'}</span>
                      {project.deliveryDate && <span>Delivery: {project.deliveryDate}</span>}
                    </div>

                    {project.adminNotes && (
                      <div className="bg-white rounded-md p-2 mb-2">
                        <p className="text-[9px] text-text-tertiary uppercase mb-0.5">Admin Notes</p>
                        <p className="text-[10px] text-text-secondary">{project.adminNotes}</p>
                      </div>
                    )}

                    {project.notes && (
                      <div className="bg-white rounded-md p-2 mb-2">
                        <p className="text-[10px] text-text-secondary">{project.notes}</p>
                      </div>
                    )}

                    {/* Edit Details Button - ONLY for active projects */}
                    {!['delivered', 'cancelled'].includes(project.status) && (
                      <button
                        onClick={() => {
                          if (editingProject === project.id) {
                            setEditingProject(null)
                          } else {
                            setEditingProject(project.id!)
                            setEditData({
                              status: project.status,
                              progress: project.progress || 0,
                              deliveryDate: project.deliveryDate || '',
                              adminNotes: project.adminNotes || '',
                            })
                          }
                        }}
                        className="text-[10px] font-semibold text-accent hover:underline"
                      >
                        {editingProject === project.id ? 'Close Edit' : 'Edit Progress'}
                      </button>
                    )}

                    {/* Delivered / Cancelled badge */}
                    {['delivered', 'cancelled'].includes(project.status) && (
                      <div className="flex items-center gap-1.5 mt-1">
                        {project.status === 'delivered' ? (
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-emerald-500"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                        ) : (
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-red-500"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                        )}
                        <span className="text-[10px] font-medium text-text-tertiary">
                          {project.status === 'delivered' ? 'Project completed and delivered' : 'Project cancelled'}
                        </span>
                      </div>
                    )}

                    {/* Edit Form - ONLY for active projects */}
                    {editingProject === project.id && !['delivered', 'cancelled'].includes(project.status) && (
                      <div className="mt-2 bg-white rounded-md p-3 border border-accent/20">
                        <div className="space-y-2">
                          <div>
                            <label className="text-[9px] text-text-tertiary uppercase font-semibold">Progress %</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={editData.progress}
                              onChange={e => setEditData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                              className="w-full h-1.5 accent-accent"
                            />
                            <p className="text-[10px] text-text-tertiary text-center">{editData.progress}%</p>
                          </div>
                          <div>
                            <label className="text-[9px] text-text-tertiary uppercase font-semibold">Expected Delivery</label>
                            <input
                              type="date"
                              value={editData.deliveryDate}
                              onChange={e => setEditData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                              className="w-full px-3 py-1.5 rounded-md border border-border text-xs focus:outline-none focus:ring-1 focus:ring-accent/30"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-text-tertiary uppercase font-semibold">Admin Notes (visible to client)</label>
                            <textarea
                              value={editData.adminNotes}
                              onChange={e => setEditData(prev => ({ ...prev, adminNotes: e.target.value }))}
                              rows={2}
                              className="w-full px-3 py-1.5 rounded-md border border-border text-xs focus:outline-none focus:ring-1 focus:ring-accent/30 resize-none"
                              placeholder="Update for client..."
                            />
                          </div>
                          <button
                            onClick={() => handleSaveProjectDetails(project.id!)}
                            className="w-full px-3 py-1.5 bg-accent text-white rounded-md text-[11px] font-semibold"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== IMAGES TAB ===== */}
          {activeTab === 'images' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-primary">Image Gallery ({uploads.length})</h3>

              {/* Upload Form */}
              <div className="bg-surface rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-text-primary">Upload New Image</p>
                <input
                  type="text"
                  placeholder="Image label (e.g. spice-garden-home)"
                  value={uploadLabel}
                  onChange={(e) => setUploadLabel(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="general">General</option>
                  <option value="project">Project Screenshot</option>
                  <option value="profile">Profile Photo</option>
                  <option value="logo">Logo</option>
                  <option value="hero">Hero Image</option>
                </select>
                <label className={`flex items-center justify-center w-full py-2.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${uploading ? 'bg-gray-200 text-gray-500' : 'bg-accent text-white hover:bg-accent-dark'}`}>
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    'Select Image & Upload'
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Uploaded Images Grid */}
              {uploads.length === 0 ? (
                <p className="text-xs text-text-tertiary text-center py-8">No images uploaded yet. Upload your first image above.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {uploads.map(img => (
                    <div key={img.id} className="bg-surface rounded-lg overflow-hidden border border-border">
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={img.thumb || img.url}
                          alt={img.label || img.originalName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-[10px] font-semibold text-text-primary truncate">
                          {img.label || img.originalName || 'Untitled'}
                        </p>
                        <p className="text-[9px] text-text-tertiary">{img.category}</p>
                        {/* Copy URL button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(img.url)
                            alert('URL copied: ' + img.url)
                          }}
                          className="mt-1 w-full px-2 py-1 bg-blue-50 text-blue-600 rounded text-[9px] font-semibold hover:bg-blue-100"
                        >
                          Copy URL
                        </button>
                        {/* View Full */}
                        <a
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-1 w-full px-2 py-1 bg-green-50 text-green-600 rounded text-[9px] font-semibold hover:bg-green-100 text-center"
                        >
                          Open Full
                        </a>
                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteUpload(img.id)}
                          className="mt-1 w-full px-2 py-1 bg-red-50 text-red-600 rounded text-[9px] font-semibold hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== REELS / VIDEOS TAB ===== */}
          {activeTab === 'reels' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Reels & Videos ({videos.length})</h3>
                <button
                  onClick={() => setShowAddVideo(!showAddVideo)}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  {showAddVideo ? 'Cancel' : '+ Add'}
                </button>
              </div>

              {/* Add Video Form */}
              {showAddVideo && (
                <div className="bg-surface rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-text-primary mb-1">Paste Video/Reel URL</p>
                  <div className="bg-blue-50 rounded-md p-2 mb-2">
                    <p className="text-[10px] text-blue-700">
                      Supported: Instagram Reels, YouTube Videos, YouTube Shorts. Just paste the URL and the platform is auto-detected.
                    </p>
                  </div>
                  <input
                    type="url"
                    placeholder="Paste URL here (e.g. https://www.instagram.com/reel/xxxxx/)"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="Title (e.g. Spice Garden Demo Reel)"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={newVideoDesc}
                    onChange={(e) => setNewVideoDesc(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                  {/* URL Preview */}
                  {newVideoUrl && (
                    <div className="bg-gray-50 rounded-md p-2">
                      <p className="text-[9px] text-text-tertiary uppercase font-semibold mb-1">Auto-Detected Platform:</p>
                      {newVideoUrl.match(/(?:youtube\.com|youtu\.be)/) ? (
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-500"><rect width="20" height="14" x="2" y="5" rx="2"/><polygon points="10,9 10,15 16,12" fill="currentColor"/></svg>
                          <span className="text-[10px] font-semibold text-red-500">YouTube</span>
                        </div>
                      ) : newVideoUrl.match(/instagram\.com/) ? (
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                          <span className="text-[10px] font-semibold text-purple-500">Instagram Reel</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-text-tertiary">Other / Unknown</span>
                      )}
                    </div>
                  )}
                  <button
                    onClick={handleAddVideo}
                    disabled={addingVideo || !newVideoUrl}
                    className="w-full px-3 py-2 bg-accent text-white rounded-md text-xs font-semibold hover:bg-accent-dark disabled:opacity-50"
                  >
                    {addingVideo ? 'Adding...' : 'Add Video/Reel'}
                  </button>
                </div>
              )}

              {/* Videos List */}
              {videos.length === 0 ? (
                <p className="text-xs text-text-tertiary text-center py-8">No reels or videos added yet. Paste your first Instagram or YouTube URL above.</p>
              ) : (
                <div className="space-y-3">
                  {videos.map(video => (
                    <div key={video.id} className="bg-surface rounded-lg overflow-hidden border border-border">
                      {/* Video Embed */}
                      <div className="w-full bg-gray-900">
                        {video.platform === 'youtube' ? (
                          <iframe
                            src={video.embedUrl}
                            title={video.title || 'Video'}
                            className="w-full aspect-video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        ) : video.platform === 'instagram' ? (
                          <iframe
                            src={video.embedUrl}
                            title={video.title || 'Reel'}
                            className="w-full aspect-square max-h-[400px] mx-auto"
                            allowTransparency={true}
                            allowFullScreen
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full aspect-video flex items-center justify-center text-white text-xs">
                            <a href={video.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                              Open Video Link
                            </a>
                          </div>
                        )}
                      </div>
                      {/* Video Info */}
                      <div className="p-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">{video.title || 'Untitled'}</p>
                            {video.description && (
                              <p className="text-[10px] text-text-secondary truncate">{video.description}</p>
                            )}
                            <div className="flex items-center gap-1.5 mt-1">
                              {video.platform === 'youtube' ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-red-500"><rect width="20" height="14" x="2" y="5" rx="2"/><polygon points="10,9 10,15 16,12" fill="currentColor"/></svg>
                              ) : video.platform === 'instagram' ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                              ) : null}
                              <span className="text-[9px] text-text-tertiary capitalize">{video.platform}</span>
                              {video.createdAt && (
                                <span className="text-[9px] text-text-tertiary">{new Date(video.createdAt).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="px-2 py-1 bg-red-50 text-red-600 rounded text-[9px] font-semibold hover:bg-red-100 flex-shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                        {/* Open original URL */}
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-1.5 w-full px-2 py-1 bg-accent-light text-accent rounded text-[9px] font-semibold hover:bg-accent/10 text-center"
                        >
                          Open Original Link
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== CLIENT FILES TAB ===== */}
          {activeTab === 'clientfiles' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-primary">Client Files ({clientUploads.length})</h3>

              {clientUploads.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xs text-text-tertiary">No files uploaded by clients yet.</p>
                  <p className="text-[10px] text-text-tertiary mt-1">Clients can upload images from their portal.</p>
                </div>
              ) : (
                <>
                  {/* Filter by client */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setClientUploadFilter('all')}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${clientUploadFilter === 'all' ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}
                    >
                      All ({clientUploads.length})
                    </button>
                    {Array.from(new Set(clientUploads.map(u => u.clientEmail))).map(email => {
                      const count = clientUploads.filter(u => u.clientEmail === email).length
                      return (
                        <button
                          key={email}
                          onClick={() => setClientUploadFilter(email)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${clientUploadFilter === email ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}
                        >
                          {email.split('@')[0]} ({count})
                        </button>
                      )
                    })}
                  </div>

                  <div className="space-y-3">
                    {clientUploads
                      .filter(u => clientUploadFilter === 'all' || u.clientEmail === clientUploadFilter)
                      .map(file => (
                      <div key={file.id} className="bg-surface rounded-lg overflow-hidden border border-border">
                        <div className="aspect-video bg-gray-100">
                          <img
                            src={file.thumb || file.url}
                            alt={file.label || file.fileName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2.5">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-text-primary truncate">{file.label || file.fileName || 'Untitled'}</p>
                              <p className="text-[10px] text-text-tertiary truncate">
                                From: {file.clientName} ({file.clientEmail})
                              </p>
                            </div>
                            <span className="text-[9px] text-text-tertiary flex-shrink-0">
                              {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <div className="flex gap-1.5 mt-2">
                            {/* Download */}
                            <a
                              href={file.url}
                              download={file.fileName || 'client-file'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-2 py-1.5 bg-green-50 text-green-600 rounded text-[10px] font-semibold hover:bg-green-100 text-center"
                            >
                              Download
                            </a>
                            {/* Open */}
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-2 py-1.5 bg-blue-50 text-blue-600 rounded text-[10px] font-semibold hover:bg-blue-100 text-center"
                            >
                              Open
                            </a>
                            {/* Delete */}
                            <button
                              onClick={async () => {
                                if (confirm('Delete this client file?')) {
                                  await deleteClientUpload(file.id)
                                  fetchData()
                                }
                              }}
                              className="px-2 py-1.5 bg-red-50 text-red-600 rounded text-[10px] font-semibold hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ===== STUDIO TAB (Image Editors) ===== */}
          {activeTab === 'studio' && <StudioWrapper />}

          {/* ===== SSH KEYS TAB ===== */}
          {activeTab === 'ssh' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">SSH Keys ({sshKeys.length})</h3>
                <button
                  onClick={() => setShowAddKey(!showAddKey)}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  {showAddKey ? 'Cancel' : '+ Add Key'}
                </button>
              </div>

              {/* Add SSH Key Form */}
              {showAddKey && (
                <div className="bg-surface rounded-lg p-3 space-y-2">
                  <input
                    type="text"
                    placeholder="Key name (e.g. portfolio-deploy)"
                    value={newKey.name}
                    onChange={(e) => setNewKey({...newKey, name: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <select
                    value={newKey.type}
                    onChange={(e) => setNewKey({...newKey, type: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="deploy">Deploy Key</option>
                    <option value="github">GitHub Key</option>
                    <option value="server">Server Access</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Host (e.g. github.com)"
                    value={newKey.host}
                    onChange={(e) => setNewKey({...newKey, host: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <textarea
                    placeholder="Paste your PRIVATE KEY here (starts with -----BEGIN...)"
                    value={newKey.privateKey}
                    onChange={(e) => setNewKey({...newKey, privateKey: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    onClick={handleAddSSHKey}
                    disabled={addingKey}
                    className="w-full px-3 py-2 bg-accent text-white rounded-md text-xs font-semibold hover:bg-accent-dark disabled:opacity-50"
                  >
                    {addingKey ? 'Adding...' : 'Add SSH Key'}
                  </button>
                </div>
              )}

              {/* SSH Keys List */}
              {sshKeys.length === 0 ? (
                <p className="text-xs text-text-tertiary text-center py-8">No SSH keys added yet.</p>
              ) : (
                <div className="space-y-2">
                  {sshKeys.map(key => (
                    <div key={key.id} className="bg-surface rounded-lg p-3 border border-border">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold text-text-primary">{key.name}</p>
                          <p className="text-[10px] text-text-tertiary">Type: {key.type} | Host: {key.host || 'N/A'}</p>
                          <p className="text-[9px] text-text-tertiary font-mono mt-1 break-all">{key.keyPreview}</p>
                          {key.createdAt && (
                            <p className="text-[9px] text-text-tertiary mt-1">
                              Added: {new Date(key.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteSSHKey(key.id)}
                          className="px-2 py-1 bg-red-50 text-red-600 rounded text-[9px] font-semibold hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-[10px] text-blue-700">
                  SSH keys are stored securely in Firestore (base64 encoded). Use them for deployment and git operations. Never share your private keys.
                </p>
              </div>
            </div>
          )}

          {/* ===== AI ASSISTANT TAB (admin only) ===== */}
          {activeTab === 'assistant' && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-text-primary">AI Assistant</h3>
              <p className="text-[10px] text-text-tertiary">
                Private chat assistant for Haziq. Helps with replies, content, ideas, and client onboarding.
              </p>
              <AdminAIChat />
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ==================== CLIENT PORTAL ====================

type ClientTab = 'projects' | 'new' | 'uploads'

function ClientPortal() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<ClientTab>('projects')
  const [projects, setProjects] = useState<ProjectInquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    projectType: 'business',
    budget: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  // Client Uploads (their own files)
  const [myUploads, setMyUploads] = useState<ClientUpload[]>([])
  const [uploadingFile, setUploadingFile] = useState(false)
  const [fileLabel, setFileLabel] = useState('')
  const clientFileInputRef = useRef<HTMLInputElement>(null)

  const fetchProjects = useCallback(async () => {
    if (!user?.email) return
    setLoading(true)
    try {
      const data = await getProjectsByClientEmail(user.email)
      setProjects(data)
    } catch (error) {
      console.error('Fetch client projects error:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.email])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Fetch client's own uploads
  const fetchMyUploads = useCallback(async () => {
    if (!user?.email) return
    try {
      const data = await getClientUploadsByEmail(user.email)
      setMyUploads(data)
    } catch (error) {
      console.error('Fetch my uploads error:', error)
    }
  }, [user?.email])

  useEffect(() => {
    if (activeTab === 'uploads') fetchMyUploads()
  }, [activeTab, fetchMyUploads])

  // Handle file upload (client uploads image for admin)
  const handleClientUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFile(true)
    try {
      // Step 1: Upload to ImgBB via API route
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      // Step 2: Save to Firestore clientUploads collection with client email
      const result = await addClientUpload({
        clientEmail: user?.email || '',
        clientName: user?.displayName || user?.email?.split('@')[0] || 'Client',
        url: data.url,
        thumb: data.thumb || data.url,
        label: fileLabel,
        fileName: file.name,
        size: data.size || file.size,
        type: data.type || file.type,
      })

      if (result) {
        setFileLabel('')
        if (clientFileInputRef.current) clientFileInputRef.current.value = ''
        fetchMyUploads()
      } else {
        alert('Failed to save file. Please try again.')
      }
    } catch (error) {
      console.error('Client upload error:', error)
      alert('Upload failed: ' + String(error))
    } finally {
      setUploadingFile(false)
    }
  }

  const handleDeleteMyUpload = async (id: string) => {
    if (!confirm('Delete this file?')) return
    await deleteClientUpload(id)
    fetchMyUploads()
  }

  const handleSubmitProject = async () => {
    if (!user?.email || !user?.displayName) return
    setSubmitting(true)
    try {
      await submitClientProject({
        clientName: user.displayName || user.email.split('@')[0],
        clientEmail: user.email,
        businessName: formData.businessName,
        projectType: formData.projectType,
        budget: formData.budget,
        notes: formData.notes,
      })
      setShowForm(false)
      setFormData({ businessName: '', projectType: 'business', budget: '', notes: '' })
      fetchProjects()
      setActiveTab('projects')
    } catch (error) {
      console.error('Submit project error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const statusLabel = (status: string) => {
    switch (status) {
      case 'inquiry': return 'Inquiry Received'
      case 'discussion': return 'Under Discussion'
      case 'confirmed': return 'Confirmed'
      case 'in-progress': return 'In Progress'
      case 'review': return 'Ready for Review'
      case 'delivered': return 'Delivered'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'inquiry': return 'bg-purple-100 text-purple-700'
      case 'discussion': return 'bg-blue-100 text-blue-700'
      case 'confirmed': return 'bg-emerald-100 text-emerald-700'
      case 'in-progress': return 'bg-orange-100 text-orange-700'
      case 'review': return 'bg-cyan-100 text-cyan-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const progressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-gray-400'
  }

  const progressLabel = (progress: number) => {
    if (progress >= 90) return 'Almost Done!'
    if (progress >= 70) return 'Getting Close'
    if (progress >= 50) return 'Halfway There'
    if (progress >= 25) return 'Making Progress'
    if (progress > 0) return 'Just Started'
    return 'Not Started Yet'
  }

  return (
    <div className="p-4">
      {/* Welcome */}
      <div className="bg-accent-light/50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-text-primary">{user?.displayName || 'Welcome!'}</p>
            <p className="text-[10px] text-text-tertiary">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-4 bg-surface rounded-lg p-1">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'projects' ? 'bg-white text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'new' ? 'bg-white text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          New Project
        </button>
        <button
          onClick={() => setActiveTab('uploads')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'uploads' ? 'bg-white text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Upload Files
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-text-tertiary text-xs">Loading your projects...</p>
        </div>
      ) : (
        <>
          {/* ===== MY PROJECTS TAB ===== */}
          {activeTab === 'projects' && (
            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <p className="text-xs text-text-secondary mb-1">No projects yet</p>
                  <p className="text-[10px] text-text-tertiary mb-3">Start a new project to track its progress here.</p>
                  <button
                    onClick={() => setActiveTab('new')}
                    className="px-4 py-2 bg-accent text-white rounded-full text-xs font-semibold"
                  >
                    Start a Project
                  </button>
                </div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="bg-surface rounded-lg p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{project.businessName || project.projectType}</p>
                        <p className="text-[10px] text-text-tertiary">{project.projectType} plan / {project.budget || 'Budget TBD'}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase flex-shrink-0 ${statusColor(project.status)}`}>
                        {statusLabel(project.status)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-medium text-text-secondary">{progressLabel(project.progress || 0)}</p>
                        <p className="text-[10px] font-bold text-accent">{project.progress || 0}%</p>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${progressColor(project.progress || 0)}`}
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {project.deliveryDate && (
                        <div className="bg-white rounded-md p-2">
                          <p className="text-[9px] text-text-tertiary uppercase mb-0.5">Expected Delivery</p>
                          <p className="text-[11px] font-medium text-text-primary">{new Date(project.deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      )}
                      <div className="bg-white rounded-md p-2">
                        <p className="text-[9px] text-text-tertiary uppercase mb-0.5">Submitted</p>
                        <p className="text-[11px] font-medium text-text-primary">
                          {project.createdAt ? new Date((project.createdAt as unknown as { seconds: number }).seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    {project.adminNotes && (
                      <div className="bg-accent-light/30 rounded-md p-3 border border-accent/10">
                        <div className="flex items-start gap-2">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent flex-shrink-0 mt-0.5">
                            <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                          </svg>
                          <div>
                            <p className="text-[9px] text-accent uppercase font-semibold mb-0.5">Update from Haziq</p>
                            <p className="text-[11px] text-text-secondary leading-relaxed">{project.adminNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== NEW PROJECT TAB ===== */}
          {activeTab === 'new' && (
            <div className="space-y-3">
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-accent-light rounded-lg flex items-center justify-center">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent">
                      <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Start a New Project</p>
                    <p className="text-[10px] text-text-tertiary">Tell us about your business and we will get back to you</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-text-primary mb-1">Business Name *</label>
                    <input
                      type="text"
                      placeholder="Your business name"
                      value={formData.businessName}
                      onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-text-primary mb-1">Plan / Package *</label>
                    <select
                      value={formData.projectType}
                      onChange={e => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    >
                      <option value="starter">Starter -- 2,500</option>
                      <option value="business">Business -- 6,000</option>
                      <option value="premium">Premium -- 12,000</option>
                      <option value="custom">Custom Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-text-primary mb-1">Budget</label>
                    <input
                      type="text"
                      placeholder="e.g., 6,000"
                      value={formData.budget}
                      onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-text-primary mb-1">Project Details *</label>
                    <textarea
                      placeholder="Describe what you need, your business type, any specific requirements..."
                      value={formData.notes}
                      onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmitProject}
                    disabled={submitting || !formData.businessName || !formData.notes}
                    className="w-full py-3 bg-accent text-white rounded-full text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Submit Project Request'}
                  </button>

                  <p className="text-center text-[9px] text-text-tertiary">
                    Your request will be reviewed and you can track progress here.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===== UPLOAD FILES TAB ===== */}
          {activeTab === 'uploads' && (
            <div className="space-y-3">
              <div className="bg-accent-light/40 rounded-lg p-3 mb-1">
                <p className="text-xs font-semibold text-text-primary mb-0.5">Share Files with Haziq</p>
                <p className="text-[10px] text-text-tertiary">
                  Upload images (logos, photos, references). Only Haziq can view and download them.
                </p>
              </div>

              {/* Upload Form */}
              <div className="bg-surface rounded-lg p-3 space-y-2">
                <input
                  type="text"
                  placeholder="File label (e.g. my-logo, business-photo)"
                  value={fileLabel}
                  onChange={(e) => setFileLabel(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <label className={`flex items-center justify-center w-full py-2.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${uploadingFile ? 'bg-gray-200 text-gray-500' : 'bg-accent text-white hover:bg-accent-dark'}`}>
                  {uploadingFile ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    'Select Image & Upload'
                  )}
                  <input
                    ref={clientFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleClientUpload}
                    disabled={uploadingFile}
                  />
                </label>
              </div>

              {/* My Uploaded Files */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">My Files ({myUploads.length})</h3>
                {myUploads.length === 0 ? (
                  <p className="text-xs text-text-tertiary text-center py-6">No files uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {myUploads.map(file => (
                      <div key={file.id} className="bg-surface rounded-lg overflow-hidden border border-border">
                        <div className="aspect-video bg-gray-100">
                          <img
                            src={file.thumb || file.url}
                            alt={file.label || file.fileName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-[10px] font-semibold text-text-primary truncate">
                            {file.label || file.fileName || 'Untitled'}
                          </p>
                          <p className="text-[9px] text-text-tertiary">
                            {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : ''}
                          </p>
                          <button
                            onClick={() => handleDeleteMyUpload(file.id)}
                            className="mt-1 w-full px-2 py-1 bg-red-50 text-red-600 rounded text-[9px] font-semibold hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
