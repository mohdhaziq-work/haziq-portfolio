'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase/config'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

// ==================== ADMIN EMAIL ====================
// Only this email can access the admin panel
const ADMIN_EMAIL = 'mohdhaziq1962@gmail.com'
// =====================================================

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  isClient: boolean
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  // Login Popup
  showLoginPopup: boolean
  setShowLoginPopup: (show: boolean) => void
  requireLogin: (callback?: () => void) => boolean
  // User Panel
  isUserPanelOpen: boolean
  setUserPanelOpen: (open: boolean) => void
  toggleUserPanel: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isClient: false,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  showLoginPopup: false,
  setShowLoginPopup: () => {},
  requireLogin: () => false,
  isUserPanelOpen: false,
  setUserPanelOpen: () => {},
  toggleUserPanel: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [isUserPanelOpen, setUserPanelOpen] = useState(false)
  const [afterLoginCallback, setAfterLoginCallback] = useState<(() => void) | null>(null)

  const isAdmin = !!user && user.email === ADMIN_EMAIL
  const isClient = !!user && user.email !== ADMIN_EMAIL

  // Send welcome email on first login
  const sendWelcomeIfNeeded = useCallback(async (firebaseUser: User) => {
    // Don't send welcome email to admin
    if (firebaseUser.email === ADMIN_EMAIL) return

    // Skip if Firestore is not initialized
    if (!db) return

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        // First time user - save record and send welcome email
        const displayName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'there'

        await setDoc(userDocRef, {
          email: firebaseUser.email,
          name: displayName,
          photoURL: firebaseUser.photoURL || '',
          createdAt: serverTimestamp(),
          welcomeEmailSent: true,
        })

        // Send welcome email via API
        try {
          await fetch('/api/email/welcome', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: firebaseUser.email,
              name: displayName,
            }),
          })
          console.log('[Auth] Welcome email triggered for:', firebaseUser.email)
        } catch (emailErr) {
          console.error('[Auth] Welcome email API call failed:', emailErr)
          // Don't block login if email fails
        }
      }
    } catch (err) {
      console.error('[Auth] Error checking/saving user record:', err)
      // Don't block login if Firestore check fails
    }
  }, [])

  useEffect(() => {
    // If Firebase is not configured, skip auth
    if (!auth || !isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)

      // Send welcome email on first login (non-blocking)
      if (firebaseUser) {
        sendWelcomeIfNeeded(firebaseUser)
      }
    })

    return () => unsubscribe()
  }, [sendWelcomeIfNeeded])

  // After login, execute pending callback
  useEffect(() => {
    if (user && afterLoginCallback) {
      afterLoginCallback()
      setAfterLoginCallback(null)
    }
  }, [user, afterLoginCallback])

  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase Auth not initialized. Please configure Firebase environment variables.')
    }
    try {
      await signInWithPopup(auth, googleProvider)
      // Popup will close automatically after successful sign-in
      setShowLoginPopup(false)
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string }
      if (err.code === 'auth/popup-closed-by-user') return
      console.error('Sign in error:', error)
      throw error
    }
  }, [])

  const signOut = useCallback(async () => {
    if (!auth) return
    try {
      await firebaseSignOut(auth)
      setUserPanelOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }, [])

  // requireLogin: Shows login popup if not logged in, returns true if already logged in
  // Optional callback will be executed after successful login
  const requireLogin = useCallback((callback?: () => void): boolean => {
    if (user) {
      if (callback) callback()
      return true
    }
    if (callback) setAfterLoginCallback(() => callback)
    setShowLoginPopup(true)
    return false
  }, [user])

  const toggleUserPanel = useCallback(() => {
    setUserPanelOpen(prev => !prev)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      isClient,
      loading,
      signInWithGoogle,
      signOut,
      showLoginPopup,
      setShowLoginPopup,
      requireLogin,
      isUserPanelOpen,
      setUserPanelOpen,
      toggleUserPanel,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export { ADMIN_EMAIL }
