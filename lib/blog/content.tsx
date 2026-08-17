import { ReactNode } from 'react'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  readTime: string
  sections: { heading: string; body: string[] }[]
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  'why-every-local-business-needs-a-website': {
    slug: 'why-every-local-business-needs-a-website',
    title: 'Why Every Local Business in India Needs a Website in 2026',
    readTime: '4 min read',
    excerpt: 'Over 70% of customers search online before visiting a local business. If you are not online, you are losing customers every single day.',
    sections: [
      {
        heading: 'Customers search before they visit',
        body: [
          'Think about the last time you wanted to try a new restaurant or find a gym. You probably pulled out your phone and searched "best restaurant near me" or "gym near me". Most customers today do the same before they visit any local business.',
          'If your business does not show up in those results, the customer simply moves on to a competitor who does. It is that simple.',
        ],
      },
      {
        heading: 'A website builds trust instantly',
        body: [
          'A clean, professional website tells customers you are real, reliable, and established. Businesses without a website can look outdated or even untrustworthy to modern customers.',
          'Your website is your 24/7 salesperson. It works while you sleep, while you are busy serving customers, and while you are closed.',
        ],
      },
      {
        heading: 'It is more affordable than you think',
        body: [
          'Many small business owners think websites are expensive. In reality, a professional website can start from as little as ₹2,500 in India. It is one of the best investments a local business can make.',
        ],
      },
    ],
  },
  'restaurant-website-guide': {
    slug: 'restaurant-website-guide',
    title: 'Restaurant Website Guide: What Every Restaurant Needs',
    readTime: '5 min read',
    excerpt: 'From digital menus to online reservations — the essential features a restaurant website needs to bring more customers through the door.',
    sections: [
      {
        heading: 'Show your menu online',
        body: [
          'Customers want to see your menu before they visit. A clear, appetising digital menu is one of the most important parts of a restaurant website.',
          'Make sure it is mobile-friendly, since most people check menus on their phones.',
        ],
      },
      {
        heading: 'Let customers book or order',
        body: [
          'A simple reservation button or order link makes it easy for customers to choose you. The easier it is to book, the more likely they will book.',
        ],
      },
      {
        heading: 'Use beautiful photos',
        body: [
          'Food photography is powerful. Showcase your best dishes and your restaurant ambience. Good photos make people hungry — and hungry people book tables.',
        ],
      },
    ],
  },
  'how-much-does-a-website-cost-india': {
    slug: 'how-much-does-a-website-cost-india',
    title: 'How Much Does a Website Cost in India? (2026 Prices)',
    readTime: '4 min read',
    excerpt: 'A clear breakdown of website pricing in India — from ₹2,500 starter sites to full custom web applications.',
    sections: [
      {
        heading: 'Starter websites: ₹2,500 – ₹5,000',
        body: [
          'A single-page landing website is perfect for small businesses that just need to be online. It includes mobile-responsive design, basic SEO, and your contact details.',
        ],
      },
      {
        heading: 'Business websites: ₹6,000 – ₹12,000',
        body: [
          'A multi-page business website (5 pages) with SEO, contact forms, and professional animations. Ideal for restaurants, gyms, and coaching centres that want a stronger online presence.',
        ],
      },
      {
        heading: 'Custom web applications: ₹12,000+',
        body: [
          'For businesses that need dashboards, databases, admin panels, and custom tools. These are fully tailored to your needs.',
        ],
      },
    ],
  },
  'gym-website-features': {
    slug: 'gym-website-features',
    title: 'Gym & Fitness Website: Features That Convert Visitors to Members',
    readTime: '4 min read',
    excerpt: 'BMI calculators, class schedules, membership pricing — what makes a gym website actually bring in new members.',
    sections: [
      {
        heading: 'Show membership pricing clearly',
        body: [
          'People want to know what a gym membership costs before visiting. Clear, transparent pricing builds trust and gets more enquiries.',
        ],
      },
      {
        heading: 'Add useful tools',
        body: [
          'A BMI calculator or class schedule makes your website genuinely useful. People are more likely to stay and enquire when a site gives them value.',
        ],
      },
      {
        heading: 'Show results and trainers',
        body: [
          'Photos of your gym, trainers, and member transformations build credibility. Social proof is everything in fitness.',
        ],
      },
    ],
  },
  'coaching-center-website': {
    slug: 'coaching-center-website',
    title: 'Coaching Center Website: Enroll More Students Online',
    readTime: '4 min read',
    excerpt: 'How a professional website helps coaching centers and tuition classes attract more students and build trust with parents.',
    sections: [
      {
        heading: 'Build trust with parents',
        body: [
          'Parents research coaching centres carefully. A professional website with courses, faculty, and results helps them trust you.',
        ],
      },
      {
        heading: 'Make enrollment easy',
        body: [
          'A simple admission or enquiry form lets parents contact you easily. The less friction, the more enrollments.',
        ],
      },
      {
        heading: 'Show your results',
        body: [
          'Share student success, testimonials, and course details. Proof of results is the strongest way to attract new students.',
        ],
      },
    ],
  },
  'free-mockup-before-buying': {
    slug: 'free-mockup-before-buying',
    title: 'Why You Should Get a Free Website Mockup Before Buying',
    readTime: '3 min read',
    excerpt: 'A free mockup lets you see your website design before paying anything. Here is why it is the smartest way to hire a developer.',
    sections: [
      {
        heading: 'See before you pay',
        body: [
          'A free mockup is a design preview of your homepage. You see exactly what your website will look like before you spend any money.',
          'It removes all the guesswork and risk from hiring a developer.',
        ],
      },
      {
        heading: 'No commitment, no pressure',
        body: [
          'The best developers offer a free mockup with zero commitment. If you love the design, you work together. If not, you walk away with no cost.',
        ],
      },
      {
        heading: 'It shows confidence',
        body: [
          'A developer who offers a free mockup is confident in their work. It is a sign of a professional who stands behind their quality.',
        ],
      },
    ],
  },
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS[slug]
}
