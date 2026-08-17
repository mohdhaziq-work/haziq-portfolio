'use client'

import Section from '@/components/ui/Section'
import Link from 'next/link'
import { openInstagramDM } from '@/lib/instagram'
import AnimatedText from '@/components/ui/AnimatedText'

const POSTS = [
  {
    slug: 'why-every-local-business-needs-a-website',
    title: 'Why Every Local Business in India Needs a Website in 2026',
    excerpt: 'Over 70% of customers search online before visiting a local business. If you are not online, you are losing customers every single day.',
    readTime: '4 min read',
  },
  {
    slug: 'restaurant-website-guide',
    title: 'Restaurant Website Guide: What Every Restaurant Needs',
    excerpt: 'From digital menus to online reservations — the essential features a restaurant website needs to bring more customers through the door.',
    readTime: '5 min read',
  },
  {
    slug: 'how-much-does-a-website-cost-india',
    title: 'How Much Does a Website Cost in India? (2026 Prices)',
    excerpt: 'A clear breakdown of website pricing in India — from ₹2,500 starter sites to full custom web applications.',
    readTime: '4 min read',
  },
  {
    slug: 'gym-website-features',
    title: 'Gym & Fitness Website: Features That Convert Visitors to Members',
    excerpt: 'BMI calculators, class schedules, membership pricing — what makes a gym website actually bring in new members.',
    readTime: '4 min read',
  },
  {
    slug: 'coaching-center-website',
    title: 'Coaching Center Website: Enroll More Students Online',
    excerpt: 'How a professional website helps coaching centers and tuition classes attract more students and build trust with parents.',
    readTime: '4 min read',
  },
  {
    slug: 'free-mockup-before-buying',
    title: 'Why You Should Get a Free Website Mockup Before Buying',
    excerpt: 'A free mockup lets you see your website design before paying anything. Here is why it is the smartest way to hire a developer.',
    readTime: '3 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <Section background="white" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText as="span" className="section-overline">Guides &amp; Blog</AnimatedText>
          <AnimatedText as="h1" delay={100} className="text-display-lg text-text-primary mb-6">
            Website Tips &amp; <span className="text-accent">Guides</span>
          </AnimatedText>
          <AnimatedText as="p" delay={200} className="text-body-lg text-text-secondary">
            Practical advice for local business owners who want to grow online. Simple, honest, and free.
          </AnimatedText>
        </div>
      </Section>

      <Section background="surface">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <AnimatedText as="div" key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="block elevated-card p-8 h-full hover:border-accent/40 transition-colors">
                <div className="text-caption text-accent font-semibold uppercase tracking-wide mb-3">{post.readTime}</div>
                <h3 className="text-headline text-text-primary mb-3 leading-snug">{post.title}</h3>
                <p className="text-body-sm text-text-secondary mb-5">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-accent font-semibold text-body-sm">
                  Read Guide
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </span>
              </Link>
            </AnimatedText>
          ))}
        </div>

        <div className="text-center mt-14">
          <AnimatedText as="div">
            <button onClick={() => openInstagramDM('Hi Haziq! I read your website guide and I would like to talk about my business website.')} className="btn-primary px-8 py-4 text-body-md">
              Get Your Free Mockup
            </button>
          </AnimatedText>
        </div>
      </Section>
    </div>
  )
}
