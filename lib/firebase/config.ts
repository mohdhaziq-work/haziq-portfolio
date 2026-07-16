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

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Analytics (only in browser, optional)
export const analytics = typeof window !== 'undefined'
  ? import('firebase/analytics').then(({ isSupported, getAnalytics }) =>
      isSupported().then(yes => yes ? getAnalytics(app) : null)
    ).catch(() => null)
  : null

export default app
