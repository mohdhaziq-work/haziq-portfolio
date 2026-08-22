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
import { DATABASE } from '@/config/site-config'
import { openInstagramDM } from '@/lib/instagram'
import ImageEnhancer from '@/components/admin/ImageEnhancer'
import ImageStudio from '@/components/admin/ImageStudio'
import ImageTextEditor from '@/components/admin/ImageTextEditor'
import EmailTest from '@/components/admin/EmailTest'
import { getAuthToken } from '@/lib/auth/clientAuth'

/* ============================================================
   DESIGN SYSTEM — shared UI primitives for a consistent, clean UI
   ============================================================ */

function StatCard({ label, value, tone = 'default' }: { label: string; value: number | string; tone?: 'default' | 'accent' | 'info' }) {
  const tones = {
    default: 'bg-white border border-border',
    accent: 'bg-accent text-white',
    info: 'bg-blue-50 border border-blue-100',
  }
  return (
    <div className={`rounded-2xl p-4 text-center shadow-sm ${tones[tone]}`}>
      <p className={`text-[10px] uppercase font-semibold tracking-wide mb-1 ${tone === 'accent' ? 'text-white/80' : tone === 'info' ? 'text-blue-600' : 'text-text-tertiary'}`}>
        {label}
      </p>
      <p className={`text-2xl font-bold ${tone === 'accent' ? 'text-white' : tone === 'info' ? 'text-blue-700' : 'text-text-primary'}`}>{value}</p>
    </div>
  )
}

function TabButton({ active, onClick, children, badge }: { active: boolean; onClick: () => void; children: React.ReactNode; badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
        active ? 'bg-white text-accent shadow-md' : 'text-text-secondary hover:text-text-primary hover:bg-white/50'
      }`}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-border p-4 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-yellow-100 text-yellow-700',
    replied: 'bg-green-100 text-green-700',
    inquiry: 'bg-purple-100 text-purple-700',
    discussion: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    'in-progress': 'bg-orange-100 text-orange-700',
    review: 'bg-cyan-100 text-cyan-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status.replace('-', ' ')}
    </span>
  )
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-text-secondary mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all'

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-bold text-text-primary">{title}</h3>
      {subtitle && <p className="text-[11px] text-text-tertiary mt-0.5">{subtitle}</p>}
    </div>
  )
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

const formatDate = (timestamp: { seconds: number; nanoseconds: number } | null) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp.seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ============================================================
   MAIN USER PANEL
   ============================================================ */

export default function UserPanel() {
  const { user, isAdmin, isClient, isUserPanelOpen, setUserPanelOpen, signOut } = useAuth()

  useEffect(() => {
    if (isUserPanelOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isUserPanelOpen])

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
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={() => setUserPanelOpen(false)}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[520px] md:w-[620px] max-w-[100vw] bg-[#f7f8fa] flex flex-col shadow-2xl"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border-2 border-accent/30" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-body-sm font-bold text-text-primary truncate">
                {isAdmin ? 'Admin Dashboard' : user?.displayName || 'My Portal'}
              </p>
              <p className="text-[11px] text-text-tertiary truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => { await signOut(); setUserPanelOpen(false) }}
              className="text-[11px] font-semibold text-text-tertiary hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={() => setUserPanelOpen(false)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
              aria-label="Close panel"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {isAdmin && <AdminDashboard />}
          {isClient && <ClientPortal />}
        </div>
      </div>
    </>
  )
}

/* ============================================================
   STUDIO WRAPPER
   ============================================================ */

function StudioWrapper() {
  const [mode, setMode] = useState<'text' | 'design'>('text')
  return (
    <div>
      <div className="flex gap-1 mb-4 bg-white rounded-xl p-1 shadow-sm border border-border">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold ${mode === 'text' ? 'bg-accent text-white shadow' : 'text-text-secondary'}`}
        >
          Text Editor
        </button>
        <button
          onClick={() => setMode('design')}
          className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold ${mode === 'design' ? 'bg-accent text-white shadow' : 'text-text-secondary'}`}
        >
          Design Studio
        </button>
      </div>
      {mode === 'text' ? <ImageTextEditor /> : <ImageStudio />}
    </div>
  )
}

/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */

type AdminTab = 'overview' | 'contacts' | 'projects' | 'images' | 'reels' | 'clientfiles' | 'studio' | 'ssh' | 'email'

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

  // Client Uploads
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

  // ===== IMAGE UPLOAD =====
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const token = await getAuthToken()
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      const { db } = await import('@/lib/firebase/config')
      const { addDoc, collection, Timestamp } = await import('firebase/firestore')
      if (!db) throw new Error('Firebase not initialized.')
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

  // ===== SSH KEY =====
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
    await deleteSSHKey(keyId)
    fetchData()
  }

  // ===== VIDEO / REEL =====
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
        alert('Failed to save video. Check if Firebase is configured.')
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
    await deleteVideo(videoId)
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
    if (newStatus === 'delivered') {
      await updateProjectDetails(projectId, { status: newStatus, progress: 100 })
    } else {
      await updateProjectStatus(projectId, newStatus)
    }
    if (editingProject === projectId) setEditingProject(null)
    try {
      const token = await getAuthToken()
      const project = projects.find(p => p.id === projectId)
      if (project?.clientEmail && token) {
        // If status becomes confirmed, send the Order Confirmed email
        if (newStatus === 'confirmed') {
          await fetch('/api/email/order-confirmed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              email: project.clientEmail,
              clientName: project.clientName,
              projectName: project.businessName || project.projectType,
              projectType: project.projectType,
              budget: project.budget || '',
              deliveryDate: project.deliveryDate || '',
            }),
          })
        } else {
          await fetch('/api/email/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              email: project.clientEmail,
              clientName: project.clientName,
              projectName: project.businessName || project.projectType,
              status: newStatus,
              progress: newStatus === 'delivered' ? 100 : (project.progress || 0),
            }),
          })
        }
      }
    } catch (err) {
      console.error('[Admin] Failed to send status update email:', err)
    }
    fetchData()
  }

  const handleSaveProjectDetails = async (projectId: string) => {
    await updateProjectDetails(projectId, editData)
    try {
      const token = await getAuthToken()
      const project = projects.find(p => p.id === projectId)
      if (project?.clientEmail && token) {
        await fetch('/api/email/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            email: project.clientEmail,
            clientName: project.clientName,
            projectName: project.businessName || project.projectType,
            status: editData.status || project.status,
            progress: editData.progress,
            message: editData.adminNotes || undefined,
            deliveryDate: editData.deliveryDate || project.deliveryDate || undefined,
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

  const newContacts = contacts.filter(c => c.status === 'new').length
  const activeProjects = projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).length

  const TAB_LABELS: Record<string, string> = {
    overview: 'Overview',
    contacts: 'Contacts',
    projects: 'Projects',
    images: 'Images',
    reels: 'Reels',
    clientfiles: 'Client Files',
    studio: 'Studio',
    ssh: 'SSH',
    email: 'Email',
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Contacts" value={contacts.length} />
        <StatCard label="New" value={newContacts} tone="info" />
        <StatCard label="Active" value={activeProjects} tone="accent" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 border border-border shadow-sm overflow-x-auto">
        {(Object.keys(TAB_LABELS) as AdminTab[]).map(tab => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            badge={tab === 'contacts' ? newContacts : tab === 'clientfiles' ? clientUploads.length : undefined}
          >
            {TAB_LABELS[tab]}
          </TabButton>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-text-tertiary text-xs">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* ===== OVERVIEW ===== */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <Card>
                <SectionTitle title="Recent Contacts" />
                {contacts.length === 0 ? (
                  <p className="text-xs text-text-tertiary text-center py-6">No contacts yet.</p>
                ) : (
                  <div className="space-y-2">
                    {contacts.slice(0, 5).map(contact => (
                      <div key={contact.id} className="flex items-center justify-between bg-surface rounded-xl p-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xs flex-shrink-0">
                            {contact.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">{contact.fullName}</p>
                            <p className="text-[10px] text-text-tertiary truncate">{contact.businessName || contact.service}</p>
                          </div>
                        </div>
                        <Badge status={contact.status} />
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <SectionTitle title="Active Projects" />
                {projects.length === 0 ? (
                  <p className="text-xs text-text-tertiary text-center py-6">No projects yet.</p>
                ) : (
                  <div className="space-y-2">
                    {projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).slice(0, 5).map(project => (
                      <div key={project.id} className="flex items-center justify-between bg-surface rounded-xl p-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-text-primary truncate">{project.businessName || project.projectType}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full ${progressColor(project.progress || 0)}`} style={{ width: `${project.progress || 0}%` }} />
                            </div>
                            <span className="text-[9px] text-text-tertiary">{project.progress || 0}%</span>
                          </div>
                        </div>
                        <Badge status={project.status} />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ===== CONTACTS ===== */}
          {activeTab === 'contacts' && (
            <div className="space-y-3">
              <SectionTitle title={`All Contacts (${contacts.length})`} />
              {contacts.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-6">No contacts yet.</p></Card>
              ) : (
                <div className="space-y-2">
                  {contacts.map(contact => (
                    <Card key={contact.id}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-text-primary truncate">{contact.fullName}</p>
                          <p className="text-[10px] text-text-tertiary">{contact.businessName || 'N/A'}</p>
                          <p className="text-[10px] text-text-tertiary truncate">{contact.instagramHandle || ''}</p>
                        </div>
                        <Badge status={contact.status} />
                      </div>
                      {contact.message && (
                        <p className="text-[11px] text-text-secondary bg-surface rounded-lg p-2.5 mb-2">{contact.message}</p>
                      )}
                      <p className="text-[9px] text-text-tertiary mb-2">{formatDate(contact.createdAt)}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => openInstagramDM()} className="px-2.5 py-1.5 bg-accent text-white rounded-lg text-[10px] font-semibold hover:bg-accent-dark">
                          Reply on Instagram
                        </button>
                        <select
                          value={contact.status || 'new'}
                          onChange={(e) => contact.id && handleStatusChange(contact.id, e.target.value as ContactStatus)}
                          className="px-2.5 py-1.5 rounded-lg border border-border text-[10px] font-semibold bg-white"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button onClick={() => contact.id && handleDeleteContact(contact.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-semibold hover:bg-red-100">
                          Delete
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== PROJECTS ===== */}
          {activeTab === 'projects' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionTitle title={`Projects (${projects.length})`} />
                <button onClick={() => setShowNewProject(!showNewProject)} className="px-3 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark">
                  {showNewProject ? 'Cancel' : '+ New Project'}
                </button>
              </div>

              {showNewProject && (
                <Card className="space-y-3">
                  <SectionTitle title="Add New Project" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Client Name" required><input value={newProject.clientName} onChange={e => setNewProject({ ...newProject, clientName: e.target.value })} className={inputCls} /></Field>
                    <Field label="Client Email" required><input type="email" value={newProject.clientEmail} onChange={e => setNewProject({ ...newProject, clientEmail: e.target.value })} className={inputCls} /></Field>
                  </div>
                  <Field label="Business Name"><input value={newProject.businessName} onChange={e => setNewProject({ ...newProject, businessName: e.target.value })} className={inputCls} /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Plan">
                      <select value={newProject.projectType} onChange={e => setNewProject({ ...newProject, projectType: e.target.value })} className={inputCls}>
                        <option value="starter">Starter</option>
                        <option value="business">Business</option>
                        <option value="premium">Premium</option>
                        <option value="custom">Custom</option>
                      </select>
                    </Field>
                    <Field label="Budget"><input value={newProject.budget} onChange={e => setNewProject({ ...newProject, budget: e.target.value })} className={inputCls} /></Field>
                  </div>
                  <Field label="Notes"><textarea rows={3} value={newProject.notes} onChange={e => setNewProject({ ...newProject, notes: e.target.value })} className={`${inputCls} resize-none`} /></Field>
                  <div className="flex gap-2">
                    <button onClick={handleAddProject} className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark">Add Project</button>
                    <button onClick={() => setShowNewProject(false)} className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-semibold text-text-secondary">Cancel</button>
                  </div>
                </Card>
              )}

              {projects.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-6">No projects yet.</p></Card>
              ) : (
                <div className="space-y-2">
                  {projects.map(project => (
                    <Card key={project.id}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-text-primary truncate">{project.businessName || project.projectType}</p>
                          <p className="text-[10px] text-text-tertiary">{project.clientName} · {project.clientEmail}</p>
                          <p className="text-[10px] text-text-tertiary">{project.projectType} · {project.budget || 'Budget TBD'} · {formatDate(project.createdAt)}</p>
                        </div>
                        <Badge status={project.status} />
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-text-secondary font-medium">Progress</span>
                          <span className="font-bold text-accent">{project.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${progressColor(project.progress || 0)}`} style={{ width: `${project.progress || 0}%` }} />
                        </div>
                      </div>

                      {project.adminNotes && (
                        <div className="bg-accent-light/40 rounded-lg p-2.5 mb-3">
                          <p className="text-[9px] text-accent uppercase font-semibold mb-0.5">Admin Notes</p>
                          <p className="text-[11px] text-text-secondary">{project.adminNotes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-1.5">
                        <select
                          value={project.status || 'inquiry'}
                          onChange={(e) => project.id && handleProjectStatusChange(project.id, e.target.value as ProjectStatus)}
                          className="px-2.5 py-1.5 rounded-lg border border-border text-[10px] font-semibold bg-white"
                        >
                          <option value="inquiry">Inquiry</option>
                          <option value="discussion">Discussion</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {!['delivered', 'cancelled'].includes(project.status) && (
                          <button
                            onClick={() => {
                              project.id && setEditingProject(project.id)
                              setEditData({ status: project.status, progress: project.progress || 0, deliveryDate: '', adminNotes: project.adminNotes || '' })
                            }}
                            className="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-semibold hover:bg-blue-100"
                          >
                            Edit Details
                          </button>
                        )}
                        <button onClick={() => project.id && handleDeleteProject(project.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-semibold hover:bg-red-100">
                          Delete
                        </button>
                      </div>

                      {/* Edit form */}
                      {editingProject === project.id && (
                        <div className="mt-3 bg-surface rounded-xl p-3 space-y-3 border border-border">
                          <SectionTitle title="Edit Project Details" />
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Progress">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={editData.progress}
                                onChange={e => setEditData({ ...editData, progress: Number(e.target.value) })}
                                className={inputCls}
                              />
                            </Field>
                            <Field label="Delivery Date">
                              <input
                                type="date"
                                value={editData.deliveryDate}
                                onChange={e => setEditData({ ...editData, deliveryDate: e.target.value })}
                                className={inputCls}
                              />
                            </Field>
                          </div>
                          <Field label="Admin Notes (visible to client)">
                            <textarea
                              rows={3}
                              value={editData.adminNotes}
                              onChange={e => setEditData({ ...editData, adminNotes: e.target.value })}
                              className={`${inputCls} resize-none`}
                            />
                          </Field>
                          <div className="flex gap-2">
                            <button onClick={() => project.id && handleSaveProjectDetails(project.id)} className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark">
                              Save
                            </button>
                            <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-semibold text-text-secondary">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== IMAGES ===== */}
          {activeTab === 'images' && (
            <div className="space-y-3">
              <SectionTitle title={`Image Gallery (${uploads.length})`} />
              <Card className="space-y-3">
                <Field label="Image Label"><input value={uploadLabel} onChange={e => setUploadLabel(e.target.value)} placeholder="e.g. spice-garden-home" className={inputCls} /></Field>
                <Field label="Category">
                  <select value={uploadCategory} onChange={e => setUploadCategory(e.target.value)} className={inputCls}>
                    <option value="general">General</option>
                    <option value="project">Project Screenshot</option>
                    <option value="profile">Profile Photo</option>
                    <option value="logo">Logo</option>
                    <option value="hero">Hero Image</option>
                  </select>
                </Field>
                <label className={`flex items-center justify-center w-full py-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${uploading ? 'bg-gray-200 text-gray-500' : 'bg-accent text-white hover:bg-accent-dark'}`}>
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    'Select Image & Upload'
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </Card>

              {uploads.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-8">No images uploaded yet.</p></Card>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {uploads.map(img => (
                    <Card key={img.id} className="!p-0 overflow-hidden">
                      <div className="aspect-video bg-gray-100">
                        <img src={img.thumb || img.url} alt={img.label || img.originalName} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-2.5">
                        <p className="text-[10px] font-semibold text-text-primary truncate">{img.label || img.originalName || 'Untitled'}</p>
                        <p className="text-[9px] text-text-tertiary mb-2">{img.category}</p>
                        <div className="space-y-1.5">
                          <button onClick={() => { navigator.clipboard.writeText(img.url); alert('URL copied!') }} className="w-full px-2 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-semibold hover:bg-blue-100">Copy URL</button>
                          <a href={img.url} target="_blank" rel="noopener noreferrer" className="block w-full px-2 py-1.5 bg-green-50 text-green-600 rounded-lg text-[9px] font-semibold hover:bg-green-100 text-center">Open Full</a>
                          <button onClick={() => handleDeleteUpload(img.id)} className="w-full px-2 py-1.5 bg-red-50 text-red-600 rounded-lg text-[9px] font-semibold hover:bg-red-100">Delete</button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== REELS ===== */}
          {activeTab === 'reels' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionTitle title={`Reels & Videos (${videos.length})`} />
                <button onClick={() => setShowAddVideo(!showAddVideo)} className="px-3 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark">
                  {showAddVideo ? 'Cancel' : '+ Add'}
                </button>
              </div>

              {showAddVideo && (
                <Card className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-2.5">
                    <p className="text-[10px] text-blue-700">Supported: Instagram Reels, YouTube Videos, YouTube Shorts. Platform auto-detected.</p>
                  </div>
                  <Field label="Video URL" required><input type="url" value={newVideoUrl} onChange={e => setNewVideoUrl(e.target.value)} placeholder="https://..." className={inputCls} /></Field>
                  <Field label="Title"><input value={newVideoTitle} onChange={e => setNewVideoTitle(e.target.value)} placeholder="e.g. Spice Garden Demo Reel" className={inputCls} /></Field>
                  <Field label="Description"><textarea rows={2} value={newVideoDesc} onChange={e => setNewVideoDesc(e.target.value)} className={`${inputCls} resize-none`} /></Field>
                  {newVideoUrl && (
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-[9px] text-text-tertiary uppercase font-semibold mb-1">Detected:</p>
                      <span className="text-[10px] font-semibold text-accent">
                        {newVideoUrl.match(/(?:youtube\.com|youtu\.be)/) ? 'YouTube' : newVideoUrl.match(/instagram\.com/) ? 'Instagram Reel' : 'Other'}
                      </span>
                    </div>
                  )}
                  <button onClick={handleAddVideo} disabled={addingVideo || !newVideoUrl} className="w-full px-3 py-2.5 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark disabled:opacity-50">
                    {addingVideo ? 'Adding...' : 'Add Video/Reel'}
                  </button>
                </Card>
              )}

              {videos.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-8">No reels or videos yet.</p></Card>
              ) : (
                <div className="space-y-3">
                  {videos.map(video => (
                    <Card key={video.id} className="!p-0 overflow-hidden">
                      <div className="w-full bg-gray-900">
                        {video.platform === 'youtube' ? (
                          <iframe src={video.embedUrl} title={video.title || 'Video'} className="w-full aspect-video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                        ) : video.platform === 'instagram' ? (
                          <iframe src={video.embedUrl} title={video.title || 'Reel'} className="w-full aspect-square max-h-[400px] mx-auto" allowTransparency={true} allowFullScreen loading="lazy" />
                        ) : (
                          <div className="w-full aspect-video flex items-center justify-center">
                            <a href={video.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 text-white text-xs rounded-md hover:bg-white/20">Open Video Link</a>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">{video.title || 'Untitled'}</p>
                            {video.description && <p className="text-[10px] text-text-secondary truncate">{video.description}</p>}
                            <p className="text-[9px] text-text-tertiary capitalize mt-1">{video.platform}</p>
                          </div>
                          <button onClick={() => handleDeleteVideo(video.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg text-[9px] font-semibold hover:bg-red-100">Delete</button>
                        </div>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="block mt-2 w-full px-2 py-1.5 bg-accent-light text-accent rounded-lg text-[9px] font-semibold hover:bg-accent/10 text-center">Open Original Link</a>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== CLIENT FILES ===== */}
          {activeTab === 'clientfiles' && (
            <div className="space-y-3">
              <SectionTitle title={`Client Files (${clientUploads.length})`} />
              {clientUploads.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-8">No files uploaded by clients yet.</p></Card>
              ) : (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => setClientUploadFilter('all')} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold ${clientUploadFilter === 'all' ? 'bg-accent text-white' : 'bg-white border border-border text-text-secondary'}`}>
                      All ({clientUploads.length})
                    </button>
                    {Array.from(new Set(clientUploads.map(u => u.clientEmail))).map(email => {
                      const count = clientUploads.filter(u => u.clientEmail === email).length
                      return (
                        <button key={email} onClick={() => setClientUploadFilter(email)} className={`px-3 py-1.5 rounded-full text-[10px] font-semibold ${clientUploadFilter === email ? 'bg-accent text-white' : 'bg-white border border-border text-text-secondary'}`}>
                          {email.split('@')[0]} ({count})
                        </button>
                      )
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {clientUploads.filter(u => clientUploadFilter === 'all' || u.clientEmail === clientUploadFilter).map(file => (
                      <Card key={file.id} className="!p-0 overflow-hidden">
                        <div className="aspect-video bg-gray-100">
                          <img src={file.thumb || file.url} alt={file.label || file.fileName} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="p-2.5">
                          <p className="text-[10px] font-semibold text-text-primary truncate">{file.label || file.fileName || 'Untitled'}</p>
                          <p className="text-[9px] text-text-tertiary truncate">From: {file.clientName}</p>
                          <div className="flex gap-1.5 mt-2">
                            <a href={file.url} download={file.fileName || 'client-file'} target="_blank" rel="noopener noreferrer" className="flex-1 px-2 py-1.5 bg-green-50 text-green-600 rounded-lg text-[9px] font-semibold hover:bg-green-100 text-center">Download</a>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex-1 px-2 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-semibold hover:bg-blue-100 text-center">Open</a>
                            <button onClick={async () => { if (confirm('Delete this client file?')) { await deleteClientUpload(file.id); fetchData() } }} className="px-2 py-1.5 bg-red-50 text-red-600 rounded-lg text-[9px] font-semibold hover:bg-red-100">Delete</button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ===== STUDIO ===== */}
          {activeTab === 'studio' && <StudioWrapper />}

          {/* ===== SSH ===== */}
          {activeTab === 'ssh' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionTitle title={`SSH Keys (${sshKeys.length})`} />
                <button onClick={() => setShowAddKey(!showAddKey)} className="px-3 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark">
                  {showAddKey ? 'Cancel' : '+ Add Key'}
                </button>
              </div>

              {showAddKey && (
                <Card className="space-y-3">
                  <SectionTitle title="Add SSH Key" />
                  <Field label="Key Name" required><input value={newKey.name} onChange={e => setNewKey({ ...newKey, name: e.target.value })} placeholder="e.g. portfolio-deploy" className={inputCls} /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Type">
                      <select value={newKey.type} onChange={e => setNewKey({ ...newKey, type: e.target.value })} className={inputCls}>
                        <option value="deploy">Deploy Key</option>
                        <option value="github">GitHub Key</option>
                        <option value="server">Server Access</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                    <Field label="Host"><input value={newKey.host} onChange={e => setNewKey({ ...newKey, host: e.target.value })} placeholder="e.g. github.com" className={inputCls} /></Field>
                  </div>
                  <Field label="Private Key" required>
                    <textarea rows={5} value={newKey.privateKey} onChange={e => setNewKey({ ...newKey, privateKey: e.target.value })} placeholder="-----BEGIN..." className={`${inputCls} font-mono resize-none`} />
                  </Field>
                  <button onClick={handleAddSSHKey} disabled={addingKey} className="w-full px-3 py-2.5 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark disabled:opacity-50">
                    {addingKey ? 'Adding...' : 'Add SSH Key'}
                  </button>
                </Card>
              )}

              {sshKeys.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-8">No SSH keys added yet.</p></Card>
              ) : (
                <div className="space-y-2">
                  {sshKeys.map(key => (
                    <Card key={key.id}>
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-text-primary">{key.name}</p>
                          <p className="text-[10px] text-text-tertiary">Type: {key.type} · Host: {key.host || 'N/A'}</p>
                          <p className="text-[9px] text-text-tertiary font-mono break-all mt-1">{key.keyPreview}</p>
                        </div>
                        <button onClick={() => handleDeleteSSHKey(key.id)} className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg text-[9px] font-semibold hover:bg-red-100">Delete</button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-[10px] text-blue-700">SSH keys are stored securely in Firestore (base64 encoded). Use them for deployment and git operations. Never share your private keys.</p>
              </div>
            </div>
          )}

          {/* ===== EMAIL TEST TAB (admin only) ===== */}
          {activeTab === 'email' && (
            <div className="space-y-2">
              <SectionTitle title="Email Test" subtitle="Check if the email system (Gmail SMTP) is working and send a test email." />
              <EmailTest />
            </div>
          )}
        </>
      )}
    </div>
  )
}

/* ============================================================
   CLIENT PORTAL
   ============================================================ */

type ClientTab = 'projects' | 'new' | 'uploads'

function ClientPortal() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<ClientTab>('projects')
  const [projects, setProjects] = useState<ProjectInquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '', projectType: 'business', budget: '', notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

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

  useEffect(() => { fetchProjects() }, [fetchProjects])

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

  const handleClientUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFile(true)
    try {
      const token = await getAuthToken()
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
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

  const statusColorC = (status: string) => {
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

  const progressLabel = (progress: number) => {
    if (progress >= 90) return 'Almost Done!'
    if (progress >= 70) return 'Getting Close'
    if (progress >= 50) return 'Halfway There'
    if (progress >= 25) return 'Making Progress'
    if (progress > 0) return 'Just Started'
    return 'Not Started Yet'
  }

  return (
    <div className="space-y-4">
      {/* Welcome */}
      <Card className="flex items-center gap-3">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="" className="w-11 h-11 rounded-full border-2 border-accent/30" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-11 h-11 bg-accent rounded-full flex items-center justify-center text-white font-bold">
            {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-sm font-bold text-text-primary">{user?.displayName || 'Welcome!'}</p>
          <p className="text-[11px] text-text-tertiary">{user?.email}</p>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 border border-border shadow-sm">
        <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>My Projects</TabButton>
        <TabButton active={activeTab === 'new'} onClick={() => setActiveTab('new')}>New Project</TabButton>
        <TabButton active={activeTab === 'uploads'} onClick={() => setActiveTab('uploads')}>Upload Files</TabButton>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-text-tertiary text-xs">Loading your projects...</p>
        </div>
      ) : (
        <>
          {/* MY PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-3">
              {projects.length === 0 ? (
                <Card className="text-center py-8">
                  <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-text-tertiary">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <p className="text-xs text-text-secondary mb-1">No projects yet</p>
                  <p className="text-[10px] text-text-tertiary mb-3">Start a new project to track its progress here.</p>
                  <button onClick={() => setActiveTab('new')} className="px-4 py-2 bg-accent text-white rounded-full text-xs font-semibold">Start a Project</button>
                </Card>
              ) : (
                projects.map(project => (
                  <Card key={project.id}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text-primary truncate">{project.businessName || project.projectType}</p>
                        <p className="text-[10px] text-text-tertiary">{project.projectType} plan / {project.budget || 'Budget TBD'}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase flex-shrink-0 ${statusColorC(project.status)}`}>
                        {statusLabel(project.status)}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-medium text-text-secondary">{progressLabel(project.progress || 0)}</p>
                        <p className="text-[10px] font-bold text-accent">{project.progress || 0}%</p>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${progressColor(project.progress || 0)}`} style={{ width: `${project.progress || 0}%` }} />
                      </div>
                    </div>
                    {project.adminNotes && (
                      <div className="bg-accent-light/30 rounded-lg p-3 border border-accent/10">
                        <p className="text-[9px] text-accent uppercase font-semibold mb-1">Update from Haziq</p>
                        <p className="text-[11px] text-text-secondary leading-relaxed">{project.adminNotes}</p>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          )}

          {/* NEW PROJECT */}
          {activeTab === 'new' && (
            <Card className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 bg-accent-light rounded-xl flex items-center justify-center">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-accent">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Start a New Project</p>
                  <p className="text-[10px] text-text-tertiary">Tell us about your business and we will get back to you</p>
                </div>
              </div>
              <div className="space-y-3">
                <Field label="Business Name" required>
                  <input type="text" placeholder="Your business name" value={formData.businessName} onChange={e => setFormData(p => ({ ...p, businessName: e.target.value }))} className={inputCls} />
                </Field>
                <Field label="Plan / Package" required>
                  <select value={formData.projectType} onChange={e => setFormData(p => ({ ...p, projectType: e.target.value }))} className={inputCls}>
                    <option value="starter">Starter — ₹2,500</option>
                    <option value="business">Business — ₹6,000</option>
                    <option value="premium">Premium — ₹12,000</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </Field>
                <Field label="Budget">
                  <input type="text" placeholder="e.g., 6,000" value={formData.budget} onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))} className={inputCls} />
                </Field>
                <Field label="Project Details" required>
                  <textarea placeholder="Describe what you need..." value={formData.notes} onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))} rows={4} className={`${inputCls} resize-none`} />
                </Field>
                <button onClick={handleSubmitProject} disabled={submitting || !formData.businessName || !formData.notes} className="w-full py-3 bg-accent text-white rounded-full text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors">
                  {submitting ? 'Submitting...' : 'Submit Project Request'}
                </button>
              </div>
            </Card>
          )}

          {/* UPLOAD FILES */}
          {activeTab === 'uploads' && (
            <div className="space-y-3">
              <Card className="bg-accent-light/40 border-accent/20">
                <p className="text-xs font-bold text-text-primary mb-0.5">Share Files with Haziq</p>
                <p className="text-[10px] text-text-tertiary">Upload images (logos, photos, references). Only Haziq can view and download them.</p>
              </Card>
              <Card className="space-y-3">
                <Field label="File Label"><input type="text" placeholder="e.g. my-logo, business-photo" value={fileLabel} onChange={e => setFileLabel(e.target.value)} className={inputCls} /></Field>
                <label className={`flex items-center justify-center w-full py-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${uploadingFile ? 'bg-gray-200 text-gray-500' : 'bg-accent text-white hover:bg-accent-dark'}`}>
                  {uploadingFile ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : 'Select Image & Upload'}
                  <input ref={clientFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleClientUpload} disabled={uploadingFile} />
                </label>
              </Card>
              <SectionTitle title={`My Files (${myUploads.length})`} />
              {myUploads.length === 0 ? (
                <Card><p className="text-xs text-text-tertiary text-center py-6">No files uploaded yet.</p></Card>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {myUploads.map(file => (
                    <Card key={file.id} className="!p-0 overflow-hidden">
                      <div className="aspect-video bg-gray-100">
                        <img src={file.thumb || file.url} alt={file.label || file.fileName} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-2.5">
                        <p className="text-[10px] font-semibold text-text-primary truncate">{file.label || file.fileName || 'Untitled'}</p>
                        <p className="text-[9px] text-text-tertiary mb-2">{file.createdAt ? new Date(file.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'N/A'}</p>
                        <button onClick={() => handleDeleteMyUpload(file.id)} className="w-full px-2 py-1.5 bg-red-50 text-red-600 rounded-lg text-[9px] font-semibold hover:bg-red-100">Delete</button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
