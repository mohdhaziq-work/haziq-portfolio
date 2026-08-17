'use client'

import MutoStudioMockup from './MutoStudioMockup'
import WingsOfFireMockup from './WingsOfFireMockup'

/**
 * Renders the correct website mockup preview for a given business id.
 * Add new business mockups here as you add clients to lib/client-registry.ts.
 */
export default function MockupRenderer({ businessId }: { businessId: string }) {
  switch (businessId) {
    case 'mutos-studio':
      return <MutoStudioMockup />
    case 'wings-of-fire':
      return <WingsOfFireMockup />
    default:
      return null
  }
}
