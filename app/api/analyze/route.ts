import { NextResponse } from 'next/server'

const GITHUB_RAW = 'https://raw.githubusercontent.com/mohdhaziq-work/haziq-portfolio/main'
const LIVE_SITE = process.env.SITE_URL || 'https://mohdhaziq-portfolio.onrender.com'

const NIM_BASE = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'
const NIM_API_KEY = process.env.NVIDIA_API_KEY || ''
const MODEL = process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b'

// Key files to pull from the repo for analysis (config, API, auth, firebase, security-sensitive)
const KEY_FILES = [
  'package.json',
  'next.config.js',
  'render.yaml',
  'config/site-config.ts',
  'lib/firebase/config.ts',
  'lib/auth/AuthContext.tsx',
  'app/api/chat/route.ts',
  'app/api/email/welcome/route.ts',
  'app/api/upload/route.ts',
  'app/api/images/route.ts',
  'lib/firebase/firestore.ts',
  'app/layout.tsx',
  'components/layout/UserPanel.tsx',
]

async function fetchRepoFile(path: string): Promise<string> {
  try {
    const res = await fetch(`${GITHUB_RAW}/${path}`, { headers: { 'User-Agent': 'Haziq-Analyzer' } })
    if (!res.ok) return `[${path}: HTTP ${res.status}]`
    return `===== ${path} =====\n${await res.text()}`
  } catch {
    return `===== ${path}: FETCH ERROR =====`
  }
}

async function fetchLiveSite(): Promise<string> {
  try {
    const res = await fetch(LIVE_SITE, { headers: { 'User-Agent': 'Haziq-Analyzer' } })
    const html = await res.text()
    // Strip to a readable summary
    return `===== LIVE SITE (${LIVE_SITE}) HTTP ${res.status} =====\n${html.slice(0, 6000)}`
  } catch (e) {
    return `===== LIVE SITE: ERROR ${String(e)} =====`
  }
}

const ANALYZE_PROMPT = `You are a senior web developer + security auditor. A user gave you access to their portfolio website and its GitHub repo. Carefully analyze what you see and report:

1. BUGS & ISSUES: actual bugs, broken logic, errors you can spot in the code and site.
2. SECURITY: real vulnerabilities (exposed keys, insecure Firestore rules, auth issues, injection risks, exposed admin). Be specific. Note that Firebase client API keys are meant to be public.
3. PERFORMANCE: slow loads, huge bundles, missing lazy loading.
4. SEO/AEO: anything wrong or missing.
5. NEW FEATURES: 3-5 practical feature suggestions that fit a web-developer portfolio.

Be honest, specific, and actionable. If something is wrong, say "fix this: ..." clearly. If a thing is fine, don't pad. Prioritize real problems over minor style nits. Keep it well organized with short sections.`

export async function GET() {
  if (!NIM_API_KEY) {
    return NextResponse.json({
      ok: true,
      report:
        "Analyzer needs the NVIDIA_API_KEY configured. Add it in Vercel env (NVIDIA_API_KEY) and redeploy.",
    })
  }

  try {
    // Pull key repo files + live site in parallel
    const files = await Promise.all(KEY_FILES.map(fetchRepoFile))
    const site = await fetchLiveSite()

    // Build context (trim to stay within token limits)
    const context = [site, ...files].join('\n\n').slice(0, 55000)

    const payload = {
      model: MODEL,
      messages: [
        { role: 'system', content: ANALYZE_PROMPT },
        { role: 'user', content: `Here is my website HTML + key repo files. Please analyze:\n\n${context}` },
      ],
      temperature: 0.4,
      top_p: 0.9,
      max_tokens: 2000,
    }

    const response = await fetch(`${NIM_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NIM_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    const report = data?.choices?.[0]?.message?.content?.trim()
    return NextResponse.json({
      ok: true,
      report:
        report ||
        'Analysis complete but no clear output was generated. Check your NVIDIA model name.',
    })
  } catch (err) {
    console.error('Analyze error:', err)
    return NextResponse.json({
      ok: true,
      report: `Error during analysis: ${err instanceof Error ? err.message : String(err)}`,
    })
  }
}
