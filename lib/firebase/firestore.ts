/**
 * Firestore Service — Contact Form & Admin Dashboard
 * 
 * Ye file handle karti hai:
 * 1. Contact form submissions save karna
 * 2. Admin dashboard ke liye data fetch karna
 * 3. Contact status update karna (new → read → replied)
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
import { db } from './config'
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

export interface ProjectInquiry {
  id?: string
  contactId: string
  clientName: string
  businessName: string
  projectType: string
  budget: string
  deadline: string
  status: 'inquiry' | 'discussion' | 'confirmed' | 'in-progress' | 'delivered' | 'cancelled'
  notes: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ==================== COLLECTION REFERENCES ====================

const contactsCollection = collection(db, DATABASE.collections.contacts)
const projectsCollection = collection(db, DATABASE.collections.projects)

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
  try {
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
  try {
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
  try {
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
  try {
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

// ==================== ADMIN: UPDATE OPERATIONS ====================

/**
 * Update Contact Status
 */
export async function updateContactStatus(
  contactId: string,
  status: ContactStatus
): Promise<boolean> {
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
 * Add Project Inquiry
 */
export async function addProjectInquiry(data: Omit<ProjectInquiry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
  try {
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
 * Update Project Status
 */
export async function updateProjectStatus(
  projectId: string,
  status: ProjectInquiry['status'],
  notes?: string
): Promise<boolean> {
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
 * Delete Contact
 */
export async function deleteContact(contactId: string): Promise<boolean> {
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
  try {
    const docRef = doc(db, DATABASE.collections.projects, projectId)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Delete project error:', error)
    return false
  }
}
