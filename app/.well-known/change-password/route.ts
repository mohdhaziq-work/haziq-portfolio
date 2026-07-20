// Google uses /.well-known/change-password to verify site identity
// This helps Google recognize the correct site name
// Also helps with Google Search Console site name verification
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ changePassword: '/contact' })
}
