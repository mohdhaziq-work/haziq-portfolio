/**
 * GitHub Tool — lets HaziqBot fetch public repo info (MCP-like, server-side).
 * Uses the public GitHub API (no token needed for public repos).
 */

const OWNER = 'mohdhaziq-work'
const REPO = 'haziq-portfolio'

async function gh(path: string): Promise<any> {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    headers: { 'User-Agent': 'HaziqBot' },
  })
  if (!res.ok) return null
  return res.json()
}

/**
 * Get repo structure summary (top-level folders + file count).
 */
export async function getRepoTree(): Promise<string> {
  const tree = await gh('/git/trees/main?recursive=1')
  if (!tree?.tree) return 'Could not fetch repo tree.'
  const blobs = tree.tree.filter((t: any) => t.type === 'blob')
  const folders = new Set<string>()
  blobs.forEach((t: any) => {
    const parts = t.path.split('/')
    if (parts.length > 1) folders.add(parts[0])
  })
  return `Repo: ${OWNER}/${REPO}\nTop-level folders: ${Array.from(folders).join(', ')}\nTotal files: ${blobs.length}`
}

/**
 * Fetch a single file's raw content (text).
 */
export async function getRepoFile(path: string): Promise<string> {
  const res = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${path}`, {
    headers: { 'User-Agent': 'HaziqBot' },
  })
  if (!res.ok) return `File '${path}' not found.`
  const text = await res.text()
  return `===== ${path} =====\n${text.slice(0, 4000)}`
}

/**
 * List README / package.json as quick context.
 */
export async function getRepoContext(): Promise<string> {
  const readme = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/main/README.md`, { headers: { 'User-Agent': 'HaziqBot' } })
  const pkg = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/main/package.json`, { headers: { 'User-Agent': 'HaziqBot' } })
  const readmeText = readme.ok ? (await readme.text()).slice(0, 1500) : 'No README'
  const pkgText = pkg.ok ? (await pkg.text()).slice(0, 800) : 'No package.json'
  return `## README\n${readmeText}\n\n## package.json\n${pkgText}`
}
