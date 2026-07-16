'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase/config'

// ==================== ADMIN EMAIL ====================
// Only this email can access the admin panel
const ADMIN_EMAIL = 'mohdhaziq1962@gmail.com'
// =====================================================

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    // Only run auth listener on client side
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase Auth not initialized')
    }
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string }
      if (err.code === 'auth/popup-closed-by-user') return
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signOut = async () => {
    if (!auth) return
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export { ADMIN_EMAIL }
