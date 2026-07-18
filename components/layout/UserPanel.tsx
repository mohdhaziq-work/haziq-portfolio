'use client'

import { useState, useEffect, useCallback } from 'react'
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
  type ContactSubmission,
  type ProjectInquiry,
  type ContactStatus,
  type ProjectStatus,
} from '@/lib/firebase/firestore'
import { PERSONAL } from '@/config/site-config'
import { openInstagramDM } from '@/lib/instagram'
import ImageEnhancer from '@/components/admin/ImageEnhancer'

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

// ==================== ADMIN DASHBOARD ====================

type AdminTab = 'overview' | 'contacts' | 'projects'

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

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [contactsData, projectsData] = await Promise.all([
        getAllContacts(),
        getAllProjects(),
      ])
      setContacts(contactsData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
    fetchData()
  }

  const handleSaveProjectDetails = async (projectId: string) => {
    await updateProjectDetails(projectId, editData)
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
        {(['overview', 'contacts', 'projects'] as AdminTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab ? 'bg-white text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
            {tab === 'contacts' && newContacts > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full">{newContacts}</span>
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
        </>
      )}
    </div>
  )
}

// ==================== CLIENT PORTAL ====================

type ClientTab = 'projects' | 'new'

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
        </>
      )}
    </div>
  )
}
