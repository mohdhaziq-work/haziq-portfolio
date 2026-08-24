import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'

// Proxy route for GitHub API calls (keeps token server-side)
export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { endpoint, method = 'GET', data } = body

    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const headers: Record<string, string> = {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    }

    const options: RequestInit = {
      method,
      headers,
    }

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`https://api.github.com${endpoint}`, options)
    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.message || 'GitHub API error', details: responseData },
        { status: response.status }
      )
    }

    return NextResponse.json(responseData)
  } catch (err) {
    console.error('GitHub proxy error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
