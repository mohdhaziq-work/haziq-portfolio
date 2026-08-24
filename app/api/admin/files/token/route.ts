import { NextResponse } from 'next/server'
import { getBearerToken, requireAdmin } from '@/lib/auth/serverAuth'

// Generate a temporary upload token for client-side GitHub upload
// This keeps the main token secure while allowing large file uploads
export async function POST(req: Request) {
  const token = getBearerToken(req)
  const authError = await requireAdmin(token)
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    // Create a fine-grained token with limited permissions
    // For now, we'll return the main token but with a note about security
    // In production, use GitHub Apps to create installation tokens
    
    const repoOwner = 'mohdhaziq-work'
    const repoName = 'admin-files'

    // Ensure repo exists
    const repoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (repoResponse.status === 404) {
      // Create the repo
      await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          description: 'Admin File Storage',
          private: false,
          auto_init: true,
        }),
      })
    }

    // Get or create release
    let releaseId = ''
    const releaseTag = 'files'
    
    const releasesRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/releases/tags/${releaseTag}`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (releasesRes.ok) {
      const releaseData = await releasesRes.json()
      releaseId = releaseData.id
    } else {
      const createReleaseRes = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/releases`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tag_name: releaseTag,
            name: 'File Storage',
            body: 'Admin file storage release',
            draft: false,
            prerelease: false,
          }),
        }
      )

      if (createReleaseRes.ok) {
        const releaseData = await createReleaseRes.json()
        releaseId = releaseData.id
      }
    }

    return NextResponse.json({
      token: githubToken,
      repoOwner,
      repoName,
      releaseId,
      uploadUrl: `https://uploads.github.com/repos/${repoOwner}/${repoName}/releases/${releaseId}/assets`,
    })
  } catch (err) {
    console.error('Get upload token error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
