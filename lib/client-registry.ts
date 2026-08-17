/**
 * Client Registry — maps a Client ID prefix to a business + its mockup.
 *
 * Haziq generates a Client ID for each business (e.g. MS-XXXXXX for Muto's
 * Studio, WF-XXXXXX for Wings of Fire). When a client enters their Client ID
 * on /free-mockup, we read the PREFIX to know WHICH business the mockup
 * belongs to, then show that business's specific website mockup.
 *
 * To add a new client/business:
 *   1. Add an entry below with a unique prefix.
 *   2. Give the client the Client ID via DM (prefix + random code).
 */

export interface ClientBusiness {
  prefix: string           // e.g. 'MS'
  id: string               // stable slug for the mockup route, e.g. 'mutos-studio'
  name: string
  type: string
  tagline: string
  clientIds: string[]      // the exact Client IDs you've issued (optional; prefix fallback works too)
}

export const CLIENT_BUSINESSES: ClientBusiness[] = [
  {
    prefix: 'MS',
    id: 'mutos-studio',
    name: "Muto's Studio",
    type: 'Wedding Photography',
    tagline: 'Capturing your love story, frame by frame.',
    clientIds: ['MS-N8YPRZ', 'MS-DUSAZ9'],
  },
  {
    prefix: 'WF',
    id: 'wings-of-fire',
    name: 'Wings of Fire',
    type: 'Rooftop Restaurant & Lounge',
    tagline: 'Good food. Great vibes. Rooftop evenings in Lucknow.',
    clientIds: [],
  },
]

/**
 * Resolve which business a Client ID belongs to.
 * Matches by the prefix before the dash, else falls back to exact list match.
 */
export function resolveBusinessFromClientId(clientId: string): ClientBusiness | null {
  const id = (clientId || '').trim().toUpperCase()
  if (!id) return null

  // 1) exact match
  const exact = CLIENT_BUSINESSES.find((b) =>
    b.clientIds.some((c) => c.toUpperCase() === id)
  )
  if (exact) return exact

  // 2) prefix match (PREFIX-XXXXXX)
  const prefix = id.split('-')[0].trim()
  if (prefix) {
    const byPrefix = CLIENT_BUSINESSES.find((b) => b.prefix === prefix)
    if (byPrefix) return byPrefix
  }

  return null
}
