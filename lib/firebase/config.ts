/**
 * Firebase Configuration
 * 
 * ⚠️ IS FILE MEIN SIRF FIREBASE CONFIG HAI
 * ⚠️ API KEYS SAFE HAIN KYUNKI YE CLIENT-SIDE HAI
 * ⚠️ SECURITY RULES FIRESTORE CONSOLE SE SET HOTE HAIN
 */

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'
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

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null

export default app
