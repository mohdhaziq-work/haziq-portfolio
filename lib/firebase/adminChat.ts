/**
 * Admin Chat persistence (Firestore).
 * Sessions + messages for the full-screen Claude-style admin chat.
 */
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'
import { DATABASE } from '@/config/site-config'

export interface AdminChatMessage {
  id: string
  chatId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: Timestamp | null
}

export interface AdminChatSession {
  id: string
  title: string
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
  isPinned: boolean
  isArchived: boolean
}

function chatsCol() {
  if (!db) throw new Error('Firestore not initialized')
  return collection(db, DATABASE.collections.adminChats)
}
function msgsCol() {
  if (!db) throw new Error('Firestore not initialized')
  return collection(db, DATABASE.collections.adminMessages)
}

// ===== SESSIONS =====
export async function createChatSession(title = 'New Conversation'): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null
  try {
    const ref = await addDoc(chatsCol(), {
      title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPinned: false,
      isArchived: false,
    })
    return ref.id
  } catch (e) {
    console.error('createChatSession error:', e)
    return null
  }
}

export async function getChatSessions(): Promise<AdminChatSession[]> {
  if (!isFirebaseConfigured || !db) return []
  try {
    const q = query(
      chatsCol(),
      where('isArchived', '==', false),
      orderBy('updatedAt', 'desc')
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as AdminChatSession)
  } catch (e) {
    console.error('getChatSessions error:', e)
    // fallback: order by createdAt if updatedAt missing
    try {
      const q2 = query(chatsCol(), where('isArchived', '==', false))
      const snap = await getDocs(q2)
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as AdminChatSession)
    } catch {
      return []
    }
  }
}

export async function updateChatSession(
  id: string,
  data: { title?: string; isPinned?: boolean; isArchived?: boolean }
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    await updateDoc(doc(chatsCol(), id), {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (e) {
    console.error('updateChatSession error:', e)
    return false
  }
}

export async function deleteChatSession(id: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false
  try {
    // delete messages then session
    const q = query(msgsCol(), where('chatId', '==', id))
    const snap = await getDocs(q)
    await Promise.all(snap.docs.map((d) => deleteDoc(doc(msgsCol(), d.id))))
    await deleteDoc(doc(chatsCol(), id))
    return true
  } catch (e) {
    console.error('deleteChatSession error:', e)
    return false
  }
}

// ===== MESSAGES =====
export async function getChatMessages(chatId: string): Promise<AdminChatMessage[]> {
  if (!isFirebaseConfigured || !db) return []
  try {
    const q = query(msgsCol(), where('chatId', '==', chatId), orderBy('createdAt', 'asc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as AdminChatMessage)
  } catch (e) {
    console.error('getChatMessages error:', e)
    return []
  }
}

export async function addChatMessage(
  chatId: string,
  role: 'user' | 'assistant' | 'system',
  content: string
): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null
  try {
    const ref = await addDoc(msgsCol(), {
      chatId,
      role,
      content,
      createdAt: serverTimestamp(),
    })
    // touch session updatedAt
    await updateDoc(doc(chatsCol(), chatId), { updatedAt: serverTimestamp() })
    return ref.id
  } catch (e) {
    console.error('addChatMessage error:', e)
    return null
  }
}
