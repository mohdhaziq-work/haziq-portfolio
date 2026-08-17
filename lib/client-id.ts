/**
 * Client ID Generator for the Free Mockup system.
 *
 * How Haziq uses it:
 * 1. Call generateClientId(prefix) to make a new ID for a client.
 * 2. DM that Client ID to the client.
 * 3. Client enters it on /free-mockup (after Google sign-in) to claim their free mockup.
 *
 * Format: PREFIX-XXXXXX  (e.g. MS-482913)
 * Prefix is usually the business initials (e.g. "MS" for Muto's Studio).
 */

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // no confusing chars (0,1,O,I)

function randomSegment(length: number): string {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return out
}

/**
 * Generate a unique-ish Client ID.
 * @param prefix Business initials, max ~6 chars, uppercased. Defaults to "C".
 */
export function generateClientId(prefix = 'C'): string {
  const clean = prefix.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6) || 'C'
  return `${clean}-${randomSegment(6)}`
}

/**
 * Normalize a Client ID the client typed (uppercase + trim).
 */
export function normalizeClientId(input: string): string {
  return input.trim().toUpperCase()
}

/**
 * Quick CLI: run `npx tsx -e "import {generateClientId} from './lib/client-id'; console.log(generateClientId('MS'))"`
 */
