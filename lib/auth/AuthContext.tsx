'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase/config'

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

  useEffect(() => {
    // If Firebase is not configured, skip auth
    if (!auth || !isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

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
