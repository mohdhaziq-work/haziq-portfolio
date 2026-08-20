'use client'

import { useState } from 'react'

export default function WebsiteAnalyzer() {
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    setReport('')
    try {
      const res = await fetch('/api/analyze')
      const data = await res.json()
      setReport(data.report || 'No report returned.')
    } catch {
      setReport('Error running analyzer. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Website &amp; Repo Analyzer</h3>
        <button
          onClick={run}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>Run Full Analysis</>
          )}
        </button>
      </div>

      <p className="text-[10px] text-text-tertiary leading-relaxed">
        Your AI fetches your GitHub repo + live site and checks for bugs, security issues, performance,
        SEO/AEO, and suggests new features. Uses your NVIDIA API key.
      </p>

      {report && (
        <div className="bg-white border border-border rounded-xl p-4 max-h-[480px] overflow-y-auto">
          <div className="text-[10px] text-accent uppercase font-semibold mb-2">AI Report</div>
          <pre className="text-xs text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
            {report}
          </pre>
        </div>
      )}
    </div>
  )
}
