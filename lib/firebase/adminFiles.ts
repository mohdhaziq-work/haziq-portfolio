/**
 * Admin File Manager — Server-side storage using Firebase Admin SDK
 * Stores file metadata in Firestore, actual files in GitHub repo
 */

export interface AdminFile {
  id: string
  name: string
  originalName: string
  type: 'apk' | 'pdf' | 'image' | 'video' | 'document' | 'archive' | 'other'
  mimeType: string
  size: number
  githubPath: string // Path in GitHub repo
  downloadUrl: string // Raw GitHub URL
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

// ===== FILE OPERATIONS =====

export async function createFile(data: Omit<AdminFile, 'id' | 'uploadedAt' | 'updatedAt' | 'downloadCount' | 'isStarred' | 'isDeleted'>): Promise<string | null> {
  const db = getFirestore()
  if (!db) return null
  try {
    const id = uid()
    await db.collection('adminFiles').doc(id).set({
      ...data,
      downloadCount: 0,
      isStarred: false,
      isDeleted: false,
      uploadedAt: admin_ts(),
      updatedAt: admin_ts(),
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
  offset?: number
} = {}): Promise<AdminFile[]> {
  const db = getFirestore()
  if (!db) return []
  try {
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

    query = query.orderBy('uploadedAt', 'desc')

    if (options.limit) {
      query = query.limit(options.limit)
    }

    const snap = await query.get()
    let files = snap.docs.map((d: any) => ({
      id: d.id,
      ...d.data(),
      uploadedAt: d.data().uploadedAt?.toMillis?.() || Date.now(),
      updatedAt: d.data().updatedAt?.toMillis?.() || Date.now(),
    })) as AdminFile[]

    // Client-side search filter
    if (options.search) {
      const searchLower = options.search.toLowerCase()
      files = files.filter(f =>
        f.name.toLowerCase().includes(searchLower) ||
        f.originalName.toLowerCase().includes(searchLower) ||
        f.tags.some(t => t.toLowerCase().includes(searchLower))
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
    return {
      id: doc.id,
      ...doc.data(),
      uploadedAt: doc.data().uploadedAt?.toMillis?.() || Date.now(),
      updatedAt: doc.data().updatedAt?.toMillis?.() || Date.now(),
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
      updatedAt: admin_ts(),
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
    // Soft delete
    await db.collection('adminFiles').doc(id).update({
      isDeleted: true,
      updatedAt: admin_ts(),
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
      updatedAt: admin_ts(),
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
      updatedAt: admin_ts(),
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
    await db.collection('adminFolders').doc(id).set({
      ...data,
      fileCount: 0,
      createdAt: admin_ts(),
      updatedAt: admin_ts(),
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
    const snap = await db.collection('adminFolders').orderBy('createdAt', 'desc').get()
    return snap.docs.map((d: any) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toMillis?.() || Date.now(),
      updatedAt: d.data().updatedAt?.toMillis?.() || Date.now(),
    })) as AdminFolder[]
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
      updatedAt: admin_ts(),
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

      // By type
      if (!byType[file.type]) byType[file.type] = { count: 0, size: 0 }
      byType[file.type].count++
      byType[file.type].size += file.size || 0

      // By folder
      if (!byFolder[file.folder]) byFolder[file.folder] = { count: 0, size: 0 }
      byFolder[file.folder].count++
      byFolder[file.folder].size += file.size || 0
    }

    return {
      totalFiles: files.length,
      totalSize,
      byType,
      byFolder,
    }
  } catch (e) {
    console.error('getStorageStats error:', e)
    return { totalFiles: 0, totalSize: 0, byType: {}, byFolder: {} }
  }
}
