/**
 * Firebase Admin SDK — Server-side access (bypasses security rules)
 *
 * Used for DIRECT writes to Firestore (e.g. AI adds videos/photos to admin panel
 * without requiring user login).
 *
 * SETUP (one-time on Render Dashboard → Environment):
 *   FIREBASE_SERVICE_ACCOUNT = <paste entire service account JSON>
 *
 * Get the JSON from:
 *   Firebase Console → Project Settings → Service Accounts → Generate new private key
 *
 * If not configured, admin writes are skipped gracefully (site still works).
 */
import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT

let adminApp: App | null = null
let adminDb: Firestore | null = null

if (serviceAccountJson) {
  try {
    const serviceAccount = JSON.parse(serviceAccountJson)
    adminApp = getApps().length === 0 ? initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    }) : getApps()[0]
    adminDb = getFirestore(adminApp)
    console.log('[Firebase Admin] Initialized successfully')
  } catch (error) {
    console.error('[Firebase Admin] Initialization failed:', error)
  }
}

export const isAdminConfigured = Boolean(adminDb)
export { adminDb }
export default adminDb
