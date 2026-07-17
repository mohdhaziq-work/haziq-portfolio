/**
 * Firebase Configuration
 * 
 * Firestore + Authentication (Google Sign-In)
 * Gracefully handles missing config during SSR/build
 */

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { DATABASE } from '@/config/site-config'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || DATABASE.firebase.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || DATABASE.firebase.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || DATABASE.firebase.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || DATABASE.firebase.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || DATABASE.firebase.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || DATABASE.firebase.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || DATABASE.firebase.measurementId,
}

// Check if Firebase config is valid (not empty strings)
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
)

// Initialize Firebase (prevent re-initialization)
let app = null as ReturnType<typeof initializeApp> | null
let db = null as ReturnType<typeof getFirestore> | null
let auth = null as ReturnType<typeof getAuth> | null
let googleProvider = null as GoogleAuthProvider | null

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    db = getFirestore(app)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
    // Force account chooser to always show (even if only 1 account logged in)
    googleProvider.setCustomParameters({ prompt: 'select_account' })
  } catch (error) {
    console.error('Firebase initialization error:', error)
  }
}

export { app, db, auth, googleProvider, isFirebaseConfigured }

// Initialize Analytics (only in browser, optional)
export const analytics = typeof window !== 'undefined' && isFirebaseConfigured
  ? import('firebase/analytics').then(({ isSupported, getAnalytics }) =>
      isSupported().then(yes => yes && app ? getAnalytics(app) : null)
    ).catch(() => null)
  : null

export default app
