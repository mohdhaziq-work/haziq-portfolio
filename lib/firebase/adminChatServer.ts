/**
 * Server-side Admin Chat storage using Firebase Admin SDK.
 * Unlike the client SDK, firebase-admin bypasses security rules, so sessions
 * and messages save reliably even before Firestore rules are published.
 */

export interface ChatAttachment {
  type: 'image' | 'file'
  url: string
  name: string
  size?: number
  mime?: string
}

export interface ChatMsg {
  id: string
  chatId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  attachments?: ChatAttachment[]
  createdAt: number
}

export interface ChatSession {
  id: string
  title: string
  isPinned: boolean
  isArchived: boolean
  createdAt: number
  updatedAt: number
}

// Shared lazy firebase-admin init (reuse same pattern as serverAuth)
let _admin: any = null
function getAdmin(): any {
  if (_admin) return _admin
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
    console.error('[adminChatServer] Firebase Admin init failed:', e)
    return null
  }
}

function getFirestore(): any {
  const admin = getAdmin()
  if (!admin) return null
  return admin.firestore()
}

function uid(): string {
  return (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2)
}

// ===== SESSIONS =====
export async function createSession(title = 'New Conversation'): Promise<string | null> {
  const db = getFirestore()
  if (!db) return null
  try {
    const id = uid()
    await db.collection('adminChats').doc(id).set({
      title,
      isPinned: false,
      isArchived: false,
      createdAt: admin_ts(),
      updatedAt: admin_ts(),
    })
    return id
  } catch (e) {
    console.error('createSession error:', e)
    return null
  }
}

function admin_ts() {
  const admin = getAdmin()
  return admin ? admin.firestore.FieldValue.serverTimestamp() : Date.now()
}

export async function getSessions(): Promise<ChatSession[]> {
  const db = getFirestore()
  if (!db) return []
  try {
    const snap = await db.collection('adminChats').where('isArchived', '==', false).orderBy('updatedAt', 'desc').get()
    return snap.docs.map((d: any) => ({
      id: d.id,
      title: d.data().title || 'New Conversation',
      isPinned: !!d.data().isPinned,
      isArchived: !!d.data().isArchived,
      createdAt: d.data().createdAt?.toMillis?.() || Date.now(),
      updatedAt: d.data().updatedAt?.toMillis?.() || Date.now(),
    }))
  } catch (e) {
    console.error('getSessions error:', e)
    // fallback without orderBy (in case index missing)
    try {
      const snap = await db.collection('adminChats').get()
      return snap.docs.map((d: any) => ({ id: d.id, title: d.data().title || 'New Conversation', isPinned: !!d.data().isPinned, isArchived: !!d.data().isArchived, createdAt: d.data().createdAt?.toMillis?.() || Date.now(), updatedAt: d.data().updatedAt?.toMillis?.() || Date.now() }))
    } catch {
      return []
    }
  }
}

export async function updateSession(
  id: string,
  data: { title?: string; isPinned?: boolean; isArchived?: boolean }
): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminChats').doc(id).update({ ...data, updatedAt: admin_ts() })
    return true
  } catch (e) {
    console.error('updateSession error:', e)
    return false
  }
}

export async function deleteSession(id: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    const msgs = await db.collection('adminMessages').where('chatId', '==', id).get()
    await Promise.all(msgs.docs.map((d: any) => d.ref.delete()))
    await db.collection('adminChats').doc(id).delete()
    return true
  } catch (e) {
    console.error('deleteSession error:', e)
    return false
  }
}

// ===== MESSAGES =====
export async function getMessages(chatId: string): Promise<ChatMsg[]> {
  const db = getFirestore()
  if (!db) return []
  const map = (d: any): ChatMsg => ({
    id: d.id,
    chatId,
    role: d.data().role,
    content: d.data().content || '',
    attachments: d.data().attachments || undefined,
    createdAt: d.data().createdAt?.toMillis?.() || Date.now(),
  })
  try {
    const snap = await db.collection('adminMessages').where('chatId', '==', chatId).orderBy('createdAt', 'asc').get()
    return snap.docs.map(map)
  } catch (e) {
    console.error('getMessages error:', e)
    try {
      const snap = await db.collection('adminMessages').where('chatId', '==', chatId).get()
      return snap.docs.map(map)
    } catch {
      return []
    }
  }
}

export async function addMessage(chatId: string, role: string, content: string, attachments?: ChatAttachment[]): Promise<string | null> {
  const db = getFirestore()
  if (!db) return null
  try {
    const ref = db.collection('adminMessages').doc()
    const data: any = { chatId, role, content, createdAt: admin_ts() }
    if (attachments && attachments.length) data.attachments = attachments
    await ref.set(data)
    await db.collection('adminChats').doc(chatId).update({ updatedAt: admin_ts() })
    return ref.id
  } catch (e) {
    console.error('addMessage error:', e)
    return null
  }
}

export async function updateMessage(messageId: string, content: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminMessages').doc(messageId).update({ content })
    return true
  } catch (e) {
    console.error('updateMessage error:', e)
    return false
  }
}

export async function deleteMessage(messageId: string): Promise<boolean> {
  const db = getFirestore()
  if (!db) return false
  try {
    await db.collection('adminMessages').doc(messageId).delete()
    return true
  } catch (e) {
    console.error('deleteMessage error:', e)
    return false
  }
}
