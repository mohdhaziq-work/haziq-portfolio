/**
 * Admin File Manager — Server-side storage using Firebase Admin SDK
 * Stores file metadata in Firestore, files in ImgBB/data URL/GitHub
 */

export interface AdminFile {
  id: string
  name: string
  originalName: string
  type: 'apk' | 'pdf' | 'image' | 'video' | 'document' | 'archive' | 'other'
  mimeType: string
  size: number
  githubPath: string
  downloadUrl: string
  folder: string
  tags: string[]
  isStarred: boolean
  isDeleted: boolean
  downloadCount: number
  uploadedAt: number
  updatedAt: number
}

export interface AdminFolder {
  id: string
  name: string
  icon: string
  color: string
  fileCount: number
  createdAt: number
  updatedAt: number
}

// Lazy firebase-admin init
let _admin: any = null
function getAdmin(): any {
  if (_admin) return _admin
  try {
    const admin = require('firebase-admin')
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    if (!serviceAccount) return null
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccount)),
      })
    }
    _admin = admin
    return _admin
  } catch (e) {
    console.error('[adminFiles] Firebase Admin init failed:', e)
    return null
  }
}

function getFirestore(): any {
  const admin = getAdmin()
  if (!admin) return null
  return admin.firestore()
}

function uid(): string {
  return (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2)
}

function admin_ts() {
  const admin = getAdmin()
  return admin ? admin.firestore.FieldValue.serverTimestamp() : Date.now()
}

// Helper to safely convert Firestore timestamp to number
function toMillis(ts: any): number {
  if (!ts) return Date.now()
  if (typeof ts === 'number') return ts
  if (ts.toMillis) return ts.toMillis()
  if (ts._seconds) return ts._seconds * 1000
  return Date.now()
}

// ===== FILE OPERATIONS =====

export async function createFile(data: Omit<AdminFile, 'id' | 'uploadedAt' | 'updatedAt' | 'downloadCount' | 'isStarred' | 'isDeleted'>): Promise<string | null> {
  const db = getFirestore()
  if (!db) return null
  try {
    const id = uid()
    const now = Date.now()
    await db.collection('adminFiles').doc(id).set({
      ...data,
      downloadCount: 0,
      isStarred: false,
      isDeleted: false,
      uploadedAt: now,
      updatedAt: now,
    })
    return id
  } catch (e) {
    console.error('createFile error:', e)
    return null
  }
}

export async function getFiles(options: {
  folder?: string
  type?: string
  starred?: boolean
  search?: string
  limit?: number
} = {}): Promise<AdminFile[]> {
  const db = getFirestore()
  if (!db) return []
  try {
    // Simple query - no orderBy (avoids composite index requirement)
    let query: any = db.collection('adminFiles').where('isDeleted', '==', false)

    if (options.folder) {
      query = query.where('folder', '==', options.folder)
    }
    if (options.type) {
      query = query.where('type', '==', options.type)
    }
    if (options.starred) {
      query = query.where('isStarred', '==', true)
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    const snap = await query.get()
    let files = snap.docs.map((d: any) => {
      const data = d.data()
      return {
        id: d.id,
        name: data.name || '',
        originalName: data.originalName || '',
        type: data.type || 'other',
        mimeType: data.mimeType || '',
        size: data.size || 0,
        githubPath: data.githubPath || '',
        downloadUrl: data.downloadUrl || '',
        folder: data.folder || 'other',
        tags: data.tags || [],
        isStarred: data.isStarred || false,
        isDeleted: data.isDeleted || false,
        downloadCount: data.downloadCount || 0,
        uploadedAt: toMillis(data.uploadedAt),
        updatedAt: toMillis(data.updatedAt),
      } as AdminFile
    })

    // Sort client-side by uploadedAt descending
    files.sort((a: AdminFile, b: AdminFile) => b.uploadedAt - a.uploadedAt)

    // Client-side search filter
    if (options.search) {
      const searchLower = options.search.toLowerCase()
      files = files.filter((f: AdminFile) =>
        f.name.toLowerCase().includes(searchLower) ||
        f.originalName.toLowerCase().includes(searchLower) ||
        f.tags.some((t: string) => t.toLowerCase().includes(searchLower))
      )
    }

    return files
  } catch (e) {
    console.error('getFiles error:', e)
    return []
  }
}

export async function getFile(id: string): Promise<AdminFile | null> {
  const db = getFirestore()
  if (!db) return null
  try {
    const doc = await db.collection('adminFiles').doc(id).get()
    if (!doc.exists) return null
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name || '',
      originalName: data.originalName || '',
      type: data.type || 'other',
      mimeType: data.mimeType || '',
      size: data.size || 0,
      githubPath: data.githubPath || '',
      downloadUrl: data.downloadUrl || '',
      folder: data.folder || 'other',
      tags: data.tags || [],
      isStarred: data.isStarred || false,
      isDeleted: data.isDeleted || false,
      downloadCount: data.downloadCount || 0,
      uploadedAt: toMillis(data.uploadedAt),
      updatedAt: toMillis(data.updatedAt),
    } as AdminFile
  } catch (e) {
    console.error('getFile error:', e)
    return null
  }
}

export async function updateFile(id: string, data: Partial<AdminFile>): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminFiles').doc(id).update({
      ...data,
      updatedAt: Date.now(),
    })
    return true
  } catch (e) {
    console.error('updateFile error:', e)
    return false
  }
}

export async function deleteFile(id: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminFiles').doc(id).update({
      isDeleted: true,
      updatedAt: Date.now(),
    })
    return true
  } catch (e) {
    console.error('deleteFile error:', e)
    return false
  }
}

export async function incrementDownload(id: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    const adminInstance = getAdmin()
    await db.collection('adminFiles').doc(id).update({
      downloadCount: adminInstance.firestore.FieldValue.increment(1),
      updatedAt: Date.now(),
    })
    return true
  } catch (e) {
    console.error('incrementDownload error:', e)
    return false
  }
}

export async function toggleStar(id: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    const doc = await db.collection('adminFiles').doc(id).get()
    if (!doc.exists) return false
    const current = doc.data().isStarred || false
    await db.collection('adminFiles').doc(id).update({
      isStarred: !current,
      updatedAt: Date.now(),
    })
    return true
  } catch (e) {
    console.error('toggleStar error:', e)
    return false
  }
}

// ===== FOLDER OPERATIONS =====

export async function createFolder(data: Omit<AdminFolder, 'id' | 'createdAt' | 'updatedAt' | 'fileCount'>): Promise<string | null> {
  const db = getFirestore()
  if (!db) return null
  try {
    const id = uid()
    const now = Date.now()
    await db.collection('adminFolders').doc(id).set({
      ...data,
      fileCount: 0,
      createdAt: now,
      updatedAt: now,
    })
    return id
  } catch (e) {
    console.error('createFolder error:', e)
    return null
  }
}

export async function getFolders(): Promise<AdminFolder[]> {
  const db = getFirestore()
  if (!db) return []
  try {
    // Simple query - no orderBy
    const snap = await db.collection('adminFolders').get()
    const folders = snap.docs.map((d: any) => {
      const data = d.data()
      return {
        id: d.id,
        name: data.name || '',
        icon: data.icon || 'other',
        color: data.color || '#6b7280',
        fileCount: data.fileCount || 0,
        createdAt: toMillis(data.createdAt),
        updatedAt: toMillis(data.updatedAt),
      } as AdminFolder
    })
    // Sort client-side
    folders.sort((a: AdminFolder, b: AdminFolder) => b.createdAt - a.createdAt)
    return folders
  } catch (e) {
    console.error('getFolders error:', e)
    return []
  }
}

export async function updateFolder(id: string, data: Partial<AdminFolder>): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminFolders').doc(id).update({
      ...data,
      updatedAt: Date.now(),
    })
    return true
  } catch (e) {
    console.error('updateFolder error:', e)
    return false
  }
}

export async function deleteFolder(id: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminFolders').doc(id).delete()
    return true
  } catch (e) {
    console.error('deleteFolder error:', e)
    return false
  }
}

// ===== STORAGE STATS =====

export async function getStorageStats(): Promise<{
  totalFiles: number
  totalSize: number
  byType: Record<string, { count: number; size: number }>
  byFolder: Record<string, { count: number; size: number }>
}> {
  const db = getFirestore()
  if (!db) return { totalFiles: 0, totalSize: 0, byType: {}, byFolder: {} }
  try {
    const snap = await db.collection('adminFiles').where('isDeleted', '==', false).get()
    const files = snap.docs.map((d: any) => d.data()) as AdminFile[]

    const byType: Record<string, { count: number; size: number }> = {}
    const byFolder: Record<string, { count: number; size: number }> = {}
    let totalSize = 0

    for (const file of files) {
      totalSize += file.size || 0

      if (!byType[file.type]) byType[file.type] = { count: 0, size: 0 }
      byType[file.type].count++
      byType[file.type].size += file.size || 0

      if (!byFolder[file.folder]) byFolder[file.folder] = { count: 0, size: 0 }
      byFolder[file.folder].count++
      byFolder[file.folder].size += file.size || 0
    }

    return { totalFiles: files.length, totalSize, byType, byFolder }
  } catch (e) {
    console.error('getStorageStats error:', e)
    return { totalFiles: 0, totalSize: 0, byType: {}, byFolder: {} }
  }
}
