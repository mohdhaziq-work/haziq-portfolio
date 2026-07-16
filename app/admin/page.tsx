'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import {
  getAllContacts,
  getAllProjects,
  updateContactStatus,
  deleteContact,
  addProjectInquiry,
  updateProjectStatus,
  deleteProject,
  type ContactSubmission,
  type ProjectInquiry,
  type ContactStatus,
} from '@/lib/firebase/firestore'
import { PERSONAL } from '@/config/site-config'
import { openInstagramDM } from '@/lib/instagram'

type Tab = 'contacts' | 'projects' | 'overview'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAdmin, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [signInError, setSignInError] = useState('')

  // Data
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [projects, setProjects] = useState<ProjectInquiry[]>([])
  const [loading, setLoading] = useState(false)

  // New Project Form
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProject, setNewProject] = useState({
    clientName: '',
    businessName: '',
    projectType: 'business',
    budget: '',
    deadline: '',
    notes: '',
    contactId: '',
  })

  // Fetch Data
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
    if (isAdmin) fetchData()
  }, [isAdmin, fetchData])

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    setSignInError('')
    try {
      await signInWithGoogle()
    } catch {
      setSignInError('Sign-in failed. Please try again.')
    }
  }

  // Logout
  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  // Contact Status Update
  const handleStatusChange = async (contactId: string, status: ContactStatus) => {
    await updateContactStatus(contactId, status)
    fetchData()
  }

  // Contact Delete
  const handleDeleteContact = async (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      await deleteContact(contactId)
      fetchData()
    }
  }

  // Project Add
  const handleAddProject = async () => {
    const id = await addProjectInquiry({
      ...newProject,
      status: 'inquiry',
    })
    if (id) {
      setShowNewProject(false)
      setNewProject({ clientName: '', businessName: '', projectType: 'business', budget: '', deadline: '', notes: '', contactId: '' })
      fetchData()
    }
  }

  // Project Status Update
  const handleProjectStatusChange = async (projectId: string, status: ProjectInquiry['status']) => {
    await updateProjectStatus(projectId, status)
    fetchData()
  }

  // Project Delete
  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId)
      fetchData()
    }
  }

  // Stats
  const newContacts = contacts.filter((c) => c.status === 'new').length
  const readContacts = contacts.filter((c) => c.status === 'read').length
  const repliedContacts = contacts.filter((c) => c.status === 'replied').length
  const activeProjects = projects.filter((p) => !['delivered', 'cancelled'].includes(p.status)).length

  // Format date
  const formatDate = (timestamp: { seconds: number; nanoseconds: number } | null) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  // Status color
  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700'
      case 'read': return 'bg-yellow-100 text-yellow-700'
      case 'replied': return 'bg-green-100 text-green-700'
      case 'inquiry': return 'bg-purple-100 text-purple-700'
      case 'discussion': return 'bg-blue-100 text-blue-700'
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-orange-100 text-orange-700'
      case 'delivered': return 'bg-gray-100 text-gray-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // ==================== LOADING STATE ====================
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-tertiary text-body-sm">Loading...</p>
        </div>
      </div>
    )
  }

  // ==================== SIGNED IN BUT NOT ADMIN ====================
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="elevated-card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" fill="none" stroke="#ef4444" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
          <h1 className="text-display-sm text-text-primary mb-2">Access Denied</h1>
          <p className="text-body-sm text-text-secondary mb-2">
            Signed in as <strong>{user.email}</strong>
          </p>
          <p className="text-body-sm text-text-tertiary mb-8">
            This admin panel is private. Only the site owner can access it.
          </p>
          <button onClick={handleLogout} className="btn-outline w-full py-3 justify-center">
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  // ==================== SIGN IN SCREEN ====================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="elevated-card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="text-accent"><path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
          </div>
          <h1 className="text-display-sm text-text-primary mb-2">Admin Access</h1>
          <p className="text-body-sm text-text-secondary mb-8">Sign in with Google to access the dashboard.</p>
          
          <button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-border rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-text-primary font-medium text-body-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          {signInError && (
            <p className="text-red-500 text-body-sm mt-4">{signInError}</p>
          )}
        </div>
      </div>
    )
  }

  // ==================== DASHBOARD (isAdmin = true) ====================
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">H</div>
            <div>
              <h1 className="font-bold text-text-primary text-body-md">Admin Dashboard</h1>
              <p className="text-caption text-text-tertiary">{PERSONAL.fullName}&apos;s Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* User info */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 rounded-lg">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-[10px] font-bold">{user.email?.charAt(0).toUpperCase()}</div>
              )}
              <span className="text-caption text-text-secondary hidden sm:block">{user.email}</span>
            </div>
            <button onClick={fetchData} className="btn-outline px-4 py-2 text-caption">
              ↻ Refresh
            </button>
            <button onClick={handleLogout} className="text-text-tertiary hover:text-error text-caption font-semibold transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="elevated-card p-5">
            <p className="text-overline text-text-tertiary mb-1">Total Contacts</p>
            <p className="text-display-sm text-text-primary">{contacts.length}</p>
          </div>
          <div className="elevated-card p-5">
            <p className="text-overline text-blue-600 mb-1">New</p>
            <p className="text-display-sm text-blue-600">{newContacts}</p>
          </div>
          <div className="elevated-card p-5">
            <p className="text-overline text-yellow-600 mb-1">Read</p>
            <p className="text-display-sm text-yellow-600">{readContacts}</p>
          </div>
          <div className="elevated-card p-5">
            <p className="text-overline text-green-600 mb-1">Replied</p>
            <p className="text-display-sm text-green-600">{repliedContacts}</p>
          </div>
          <div className="elevated-card p-5">
            <p className="text-overline text-accent mb-1">Active Projects</p>
            <p className="text-display-sm text-accent">{activeProjects}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {(['overview', 'contacts', 'projects'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-body-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-accent text-white' : 'bg-white text-text-secondary border border-border hover:bg-surface-2'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'contacts' && newContacts > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full">{newContacts}</span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-tertiary text-body-sm">Loading data...</p>
          </div>
        ) : (
          <>
            {/* ==================== OVERVIEW TAB ==================== */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Contacts */}
                <div>
                  <h2 className="text-headline text-text-primary mb-4">Recent Contacts</h2>
                  {contacts.length === 0 ? (
                    <div className="elevated-card p-8 text-center">
                      <p className="text-text-tertiary text-body-sm">No contacts yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.id} className="surface-card p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center text-accent font-bold text-sm">
                              {contact.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-text-primary text-body-sm">{contact.fullName}</p>
                              <p className="text-caption text-text-tertiary">{contact.businessName || contact.service}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Projects */}
                <div>
                  <h2 className="text-headline text-text-primary mb-4">Active Projects</h2>
                  {projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).length === 0 ? (
                    <div className="elevated-card p-8 text-center">
                      <p className="text-text-tertiary text-body-sm">No active projects.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {projects.filter(p => !['delivered', 'cancelled'].includes(p.status)).map((project) => (
                        <div key={project.id} className="surface-card p-4 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-text-primary text-body-sm">{project.clientName}</p>
                            <p className="text-caption text-text-tertiary">{project.businessName} &bull; {project.projectType} &bull; {project.budget || 'No budget'}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== CONTACTS TAB ==================== */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <h2 className="text-headline text-text-primary">All Contacts ({contacts.length})</h2>
                {contacts.length === 0 ? (
                  <div className="elevated-card p-16 text-center">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1" className="text-text-tertiary mx-auto mb-4"><path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                    <p className="text-text-tertiary text-body-sm">No contacts yet. When someone submits the contact form, they will appear here.</p>
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="elevated-card p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center text-accent font-bold">
                            {contact.fullName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-text-primary">{contact.fullName}</h3>
                            <p className="text-body-sm text-text-secondary">{contact.businessName || 'No business name'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={contact.status}
                            onChange={(e) => handleStatusChange(contact.id!, e.target.value as ContactStatus)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase border-0 cursor-pointer ${statusColor(contact.status)}`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                          <button
                            onClick={() => handleDeleteContact(contact.id!)}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 text-text-tertiary hover:text-red-500 transition-colors flex items-center justify-center"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className="bg-surface rounded-lg p-3">
                          <p className="text-overline text-text-tertiary mb-1">Service</p>
                          <p className="text-body-sm font-medium text-text-primary">{contact.service || 'N/A'}</p>
                        </div>
                        <div className="bg-surface rounded-lg p-3">
                          <p className="text-overline text-text-tertiary mb-1">Instagram</p>
                          <p className="text-body-sm font-medium text-accent">{contact.instagramHandle || 'N/A'}</p>
                        </div>
                        <div className="bg-surface rounded-lg p-3">
                          <p className="text-overline text-text-tertiary mb-1">Received</p>
                          <p className="text-body-sm font-medium text-text-primary">{formatDate(contact.createdAt as unknown as { seconds: number; nanoseconds: number })}</p>
                        </div>
                      </div>

                      <div className="bg-surface rounded-lg p-4">
                        <p className="text-overline text-text-tertiary mb-2">Message</p>
                        <p className="text-body-sm text-text-secondary leading-relaxed">{contact.message}</p>
                      </div>

                      <div className="flex gap-3 mt-4 pt-4 border-t border-border-light">
                        <button onClick={() => openInstagramDM()} className="btn-secondary px-4 py-2 text-caption">
                          Reply on Instagram
                        </button>
                        <button
                          onClick={() => {
                            setNewProject(prev => ({
                              ...prev,
                              clientName: contact.fullName,
                              businessName: contact.businessName || '',
                              contactId: contact.id || '',
                            }))
                            setShowNewProject(true)
                          }}
                          className="btn-outline px-4 py-2 text-caption"
                        >
                          Create Project
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ==================== PROJECTS TAB ==================== */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-headline text-text-primary">All Projects ({projects.length})</h2>
                  <button onClick={() => setShowNewProject(true)} className="btn-primary px-4 py-2 text-caption">
                    + New Project
                  </button>
                </div>

                {showNewProject && (
                  <div className="elevated-card p-6 border-2 border-accent/30">
                    <h3 className="font-semibold text-text-primary mb-4">New Project</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Client Name *" value={newProject.clientName} onChange={(e) => setNewProject(prev => ({ ...prev, clientName: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-body-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      <input type="text" placeholder="Business Name" value={newProject.businessName} onChange={(e) => setNewProject(prev => ({ ...prev, businessName: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-body-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      <select value={newProject.projectType} onChange={(e) => setNewProject(prev => ({ ...prev, projectType: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-body-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent">
                        <option value="starter">Starter — ₹2,500</option>
                        <option value="business">Business — ₹6,000</option>
                        <option value="premium">Premium — ₹12,000</option>
                        <option value="custom">Custom</option>
                      </select>
                      <input type="text" placeholder="Budget (e.g., ₹6,000)" value={newProject.budget} onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-body-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      <input type="date" value={newProject.deadline} onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-body-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      <textarea placeholder="Notes..." value={newProject.notes} onChange={(e) => setNewProject(prev => ({ ...prev, notes: e.target.value }))} rows={1} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-body-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={handleAddProject} className="btn-primary px-6 py-2.5 text-caption">Add Project</button>
                      <button onClick={() => setShowNewProject(false)} className="btn-outline px-6 py-2.5 text-caption">Cancel</button>
                    </div>
                  </div>
                )}

                {projects.length === 0 && !showNewProject ? (
                  <div className="elevated-card p-16 text-center">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1" className="text-text-tertiary mx-auto mb-4"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    <p className="text-text-tertiary text-body-sm">No projects yet. Create your first project to track client work.</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="surface-card p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-text-primary">{project.clientName}</h3>
                          <p className="text-body-sm text-text-secondary">{project.businessName || 'No business'} &bull; {project.projectType} &bull; {project.budget || 'No budget'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={project.status}
                            onChange={(e) => handleProjectStatusChange(project.id!, e.target.value as ProjectInquiry['status'])}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase border-0 cursor-pointer ${statusColor(project.status)}`}
                          >
                            <option value="inquiry">Inquiry</option>
                            <option value="discussion">Discussion</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleDeleteProject(project.id!)}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 text-text-tertiary hover:text-red-500 transition-colors flex items-center justify-center"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                          </button>
                        </div>
                      </div>
                      {project.notes && (
                        <div className="bg-surface rounded-lg p-3 mb-3">
                          <p className="text-body-sm text-text-secondary">{project.notes}</p>
                        </div>
                      )}
                      <div className="flex gap-4 text-caption text-text-tertiary">
                        <span>Deadline: {project.deadline || 'Not set'}</span>
                        <span>Updated: {formatDate(project.updatedAt as unknown as { seconds: number; nanoseconds: number })}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
