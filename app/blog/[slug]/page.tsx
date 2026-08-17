import { notFound } from 'next/navigation'
import Section from '@/components/ui/Section'
import Link from 'next/link'
import { getBlogPost } from '@/lib/blog/content'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-24 pb-16">
      <Section background="white" padding="small">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-accent text-body-sm font-semibold mb-6">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            All Guides
          </Link>
          <div className="text-caption text-accent font-semibold uppercase tracking-wide mb-3">{post.readTime}</div>
          <h1 className="text-display-lg text-text-primary mb-6 leading-tight">{post.title}</h1>
          <p className="text-body-lg text-text-secondary mb-10">{post.excerpt}</p>
        </div>
      </Section>

      <Section background="surface">
        <div className="max-w-3xl mx-auto space-y-8">
          {post.sections.map((sec) => (
            <div key={sec.heading} className="elevated-card p-8">
              <h2 className="text-headline text-text-primary mb-4">{sec.heading}</h2>
              {sec.body.map((p, i) => (
                <p key={i} className="text-body-md text-text-secondary leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="elevated-card p-8 text-center border-2 border-accent/20 bg-accent-light/20">
            <h3 className="text-headline text-text-primary mb-3">Ready to get started?</h3>
            <p className="text-body-md text-text-secondary mb-6">
              Get a free mockup of your website — no cost, no commitment.
            </p>
            <Link href="/free-mockup" className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-body-md">
              Get Your Free Mockup
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
