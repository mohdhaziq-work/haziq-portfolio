import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-accent">404</span>
        </div>
        <h1 className="text-display-md text-text-primary mb-3">Page Not Found</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary px-8 py-3">
          Go Home
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </div>
    </div>
  )
}
