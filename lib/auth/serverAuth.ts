/**
 * Server-side authentication helpers for API routes.
 *
 * Uses Firebase Admin SDK to verify the caller's ID token so that protected
 * API routes (email, upload, images) cannot be abused by unauthenticated users.
 */

const ADMIN_EMAIL = 'mohdhaziq1962@gmail.com'

// Lazy-init Firebase Admin (only when a service account is configured)
let _admin: any = null
function getAdmin() {
  if (_admin) return _admin
  try {
    // dynamic import keeps this out of the client bundle
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const admin = require('firebase-admin')
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    if (serviceAccount) {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(JSON.parse(serviceAccount)),
        })
      }
      _admin = admin
      return _admin
    }
  } catch (e) {
    console.error('[serverAuth] Firebase Admin init failed:', e)
  }
  return null
}

/**
 * Extract the "Authorization: Bearer <idToken>" header value, if present.
 */
export function getBearerToken(request: Request): string | null {
  const auth = request.headers.get('authorization')
  if (!auth) return null
  const m = auth.match(/^Bearer\s+(.+)$/i)
  return m ? m[1].trim() : null
}

/**
 * Verify a Firebase ID token and return { uid, email } or null.
 */
export async function verifyIdToken(token: string | null): Promise<{ uid: string; email: string } | null> {
  if (!token) return null
  const admin = getAdmin()
  if (!admin) return null
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    return {
      uid: decoded.uid,
      email: decoded.email || '',
    }
  } catch (e) {
    console.error('[serverAuth] Token verification failed:', e)
    return null
  }
}

/**
 * Require the caller to be the site admin. Returns null if authorized,
 * otherwise an error message string.
 */
export async function requireAdmin(token: string | null): Promise<string | null> {
  const user = await verifyIdToken(token)
  if (!user) return 'Unauthorized: valid sign-in required.'
  if (user.email !== ADMIN_EMAIL) return 'Forbidden: admin access only.'
  return null
}

/**
 * Require the caller to be any authenticated user. Returns null if authorized,
 * otherwise an error message string.
 */
export async function requireAuth(token: string | null): Promise<string | null> {
  const user = await verifyIdToken(token)
  if (!user) return 'Unauthorized: valid sign-in required.'
  return null
}

/**
 * Escape a string for safe use inside HTML, preventing XSS.
 */
export function escapeHtml(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Validate an email address.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
