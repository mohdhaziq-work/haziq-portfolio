'use client'

import { auth } from '@/lib/firebase/config'

/**
 * Get the current user's Firebase ID token for authenticated API calls.
 * Returns null if no user is signed in.
 */
export async function getAuthToken(): Promise<string | null> {
  if (!auth) return null
  const user = auth.currentUser
  if (!user) return null
  try {
    return await user.getIdToken(true)
  } catch {
    try {
      return await user.getIdToken()
    } catch {
      return null
    }
  }
}
