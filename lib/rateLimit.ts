/**
 * Rate Limiting Middleware
 * Protects all API routes from spam and abuse
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 30 // max requests per IP per window
const hits = new Map<string, { count: number; resetAt: number }>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  hits.forEach((rec, ip) => {
    if (now > rec.resetAt) {
      hits.delete(ip)
    }
  })
}, 5 * 60 * 1000)

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

export function rateLimit(ip: string, maxRequests = RATE_LIMIT_MAX): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const rec = hits.get(ip)
  
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: maxRequests - 1 }
  }
  
  rec.count += 1
  return { 
    allowed: rec.count <= maxRequests, 
    remaining: Math.max(0, maxRequests - rec.count) 
  }
}

export function rateLimitResponse(ip: string, maxRequests = RATE_LIMIT_MAX) {
  const result = rateLimit(ip, maxRequests)
  
  if (!result.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { 
        status: 429, 
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Limit': String(maxRequests),
          'X-RateLimit-Remaining': '0',
        } 
      }
    )
  }
  
  return null // allowed
}
