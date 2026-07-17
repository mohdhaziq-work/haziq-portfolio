/**
 * Firestore Service -- Contact Form, Admin Dashboard, Client Portal
 * 
 * Ye file handle karti hai:
 * 1. Contact form submissions save karna
 * 2. Admin dashboard ke liye data fetch karna
 * 3. Client portal ke liye project tracking
 * 4. Contact status update karna
 */

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'
import { DATABASE } from '@/config/site-config'
import { getInstagramDMLink } from '@/lib/instagram'

// ==================== TYPES ====================

export type ContactStatus = 'new' | 'read' | 'replied'

export interface ContactSubmission {
  id?: string
  fullName: string
  businessName: string
  instagramHandle: string
  service: string
  message: string
  status: ContactStatus
  createdAt: Timestamp
  source: 'contact-form' | 'instagram'
}

export type ProjectStatus = 'inquiry' | 'discussion' | 'confirmed' | 'in-progress' | 'review' | 'delivered' | 'cancelled'

export interface ProjectInquiry {
  id?: string
  contactId: string
  clientName: string
  clientEmail: string
  businessName: string
  projectType: string
  budget: string
  deadline: string
  status: ProjectStatus
  progress: number
  deliveryDate: string
  adminNotes: string
  notes: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ==================== HELPERS ====================

function getContactsCollection() {
  if (!db) throw new Error('Firestore not initialized')
  return collection(db, DATABASE.collections.contacts)
}

function getProjectsCollection() {
  if (!db) throw new Error('Firestore not initialized')
  return collection(db, DATABASE.collections.projects)
}

// ==================== CONTACT FORM OPERATIONS ====================

/**
 * Contact Form Submit:
 * - Firebase mein save karta hai
 * - Instagram DM link generate karta hai
 */
export async function submitContactForm(data: {
  fullName: string
  businessName: string
  instagramHandle: string
  service: string
  message: string
}): Promise<{ success: boolean; docId?: string; instagramDmUrl?: string; error?: string }> {
  if (!isFirebaseConfigured || !db) {
    // Firebase not configured, just return Instagram DM link
    const dmMessage = `Hi Haziq! I'm ${data.fullName} from ${data.businessName || 'my business'}. I'm interested in your ${data.service} plan. ${data.message}`
    const instagramDmUrl = getInstagramDMLink(dmMessage)
    return { success: true, instagramDmUrl }
  }

  try {
    const contactsCollection = getContactsCollection()
    const docRef = await addDoc(contactsCollection, {
      ...data,
      status: 'new' as ContactStatus,
      source: 'contact-form' as const,
      createdAt: Timestamp.now(),
    })

    // Instagram DM URL with pre-filled message
    const dmMessage = `Hi Haziq! I'm ${data.fullName} from ${data.businessName || 'my business'}. I'm interested in your ${data.service} plan. ${data.message}`
    const instagramDmUrl = getInstagramDMLink(dmMessage)

    return {
      success: true,
      docId: docRef.id,
      instagramDmUrl,
    }
  } catch (error) {
    console.error('Firebase submission error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// ==================== ADMIN: FETCH OPERATIONS ====================

/**
 * Get All Contacts (Admin Dashboard)
 */
export async function getAllContacts(): Promise<ContactSubmission[]> {
  if (!isFirebaseConfigured || !db) return []
  try {
    const contactsCollection = getContactsCollection()
    const q = query(contactsCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactSubmission[]
  } catch (error) {
    console.error('Fetch contacts error:', error)
    return []
  }
}

/**
 * Get New Contacts Count (Admin Dashboard Badge)
 */
export async function getNewContactsCount(): Promise<number> {
  if (!isFirebaseConfigured || !db) return 0
  try {
    const contactsCollection = getContactsCollection()
    const q = query(contactsCollection, where('status', '==', 'new'))
    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Fetch new contacts count error:', error)
    return 0
  }
}

/**
 * Get All Project Inquiries (Admin Dashboard)
 */
export async function getAllProjects(): Promise<ProjectInquiry[]> {
  if (!isFirebaseConfigured || !db) return []
  try {
    const projectsCollection = getProjectsCollection()
    const q = query(projectsCollection, orderBy('updatedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectInquiry[]
  } catch (error) {
    console.error('Fetch projects error:', error)
    return []
  }
}

/**
 * Get Projects by Client Email (Client Portal)
 * NOTE: We do NOT use orderBy here because that requires a composite index.
 * Instead, we sort client-side after fetching.
 */
export async function getProjectsByClientEmail(email: string): Promise<ProjectInquiry[]> {
  if (!isFirebaseConfigured || !db) return []
  try {
    const projectsCollection = getProjectsCollection()
    const q = query(
      projectsCollection,
      where('clientEmail', '==', email)
    )
    const snapshot = await getDocs(q)
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectInquiry[]
    // Sort client-side by updatedAt descending
    return projects.sort((a, b) => {
      const aTime = (a.updatedAt as unknown as { seconds: number } | null)?.seconds || 0
      const bTime = (b.updatedAt as unknown as { seconds: number } | null)?.seconds || 0
      return bTime - aTime
    })
  } catch (error) {
    console.error('Fetch client projects error:', error)
    return []
  }
}

// ==================== ADMIN: UPDATE OPERATIONS ====================

/**
 * Update Contact Status
 */
export async function updateContactStatus(
  contactId: string,
  status: ContactStatus
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    const docRef = doc(db, DATABASE.collections.contacts, contactId)
    await updateDoc(docRef, { status })
    return true
  } catch (error) {
    console.error('Update contact status error:', error)
    return false
  }
}

/**
 * Add Project Inquiry (Admin or Client)
 */
export async function addProjectInquiry(data: Omit<ProjectInquiry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null
  try {
    const projectsCollection = getProjectsCollection()
    const docRef = await addDoc(projectsCollection, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Add project inquiry error:', error)
    return null
  }
}

/**
 * Client submits a new project request
 */
export async function submitClientProject(data: {
  clientName: string
  clientEmail: string
  businessName: string
  projectType: string
  budget: string
  notes: string
}): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null
  try {
    const projectsCollection = getProjectsCollection()
    const docRef = await addDoc(projectsCollection, {
      contactId: '',
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      businessName: data.businessName,
      projectType: data.projectType,
      budget: data.budget,
      deadline: '',
      status: 'inquiry' as ProjectStatus,
      progress: 0,
      deliveryDate: '',
      adminNotes: '',
      notes: data.notes,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Submit client project error:', error)
    return null
  }
}

/**
 * Update Project Status
 */
export async function updateProjectStatus(
  projectId: string,
  status: ProjectStatus,
  notes?: string
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    const docRef = doc(db, DATABASE.collections.projects, projectId)
    await updateDoc(docRef, {
      status,
      ...(notes ? { notes } : {}),
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Update project status error:', error)
    return false
  }
}

/**
 * Update Project Details (Admin - progress, delivery, notes, etc.)
 */
export async function updateProjectDetails(
  projectId: string,
  updates: {
    status?: ProjectStatus
    progress?: number
    deliveryDate?: string
    adminNotes?: string
    budget?: string
    deadline?: string
    notes?: string
  }
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    const docRef = doc(db, DATABASE.collections.projects, projectId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Update project details error:', error)
    return false
  }
}

/**
 * Delete Contact
 */
export async function deleteContact(contactId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    const docRef = doc(db, DATABASE.collections.contacts, contactId)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Delete contact error:', error)
    return false
  }
}

/**
 * Delete Project
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    const docRef = doc(db, DATABASE.collections.projects, projectId)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Delete project error:', error)
    return false
  }
}
