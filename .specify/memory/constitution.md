# Haziq Portfolio Constitution

## Core Principles

### I. Client-First Design
Every feature must serve the client's goal: getting more customers. Websites are business tools, not art projects. Design decisions must be justified by conversion impact, not personal preference.

### II. Mobile-First Responsive
All components must work perfectly on mobile (320px), tablet (768px), desktop (1024px), and large screens (1920px+). No overlapping elements, no broken layouts. Test on all breakpoints before shipping.

### III. Performance & SEO
Pages must load fast. Use Next.js static generation where possible. Every page needs proper meta tags, structured data (JSON-LD), and semantic HTML. Google Lighthouse score must be 90+ on all metrics.

### IV. No Emojis, SVG Only
Never use emoji characters in the UI. Use SVG icons instead. This ensures consistent rendering across all devices and browsers.

### V. Professional Code Quality
Code must be clean, well-organized, and maintainable. No duplicate code. No unused imports. Components must be reusable. TypeScript strict mode. No `any` types.

### VI. Footer-Free Design
No footer sections with "Built by" credits or bottom navigation. The portfolio focuses on content, not self-promotion at the bottom of every page.

### VII. Free Services Only
All tools, hosting, and services used must be free. No paid APIs, no premium plugins, no subscription services. Firebase free tier, Vercel/Render free hosting, GitHub free repo.

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Firebase Firestore (free tier)
- **Auth**: Firebase Authentication (Google Sign-In)
- **Hosting**: Vercel (primary), Render (secondary)
- **Icons**: SVG only (no emoji)
- **Fonts**: Google Fonts (Inter)

## Design System

- **Colors**: CSS variables in globals.css
- **Spacing**: Tailwind spacing scale
- **Typography**: Inter font family, defined scale
- **Components**: Reusable UI components in /components/ui
- **Animations**: CSS transitions, no heavy JS libraries

## Development Workflow

1. **Spec First**: Write specification before coding
2. **Plan**: Define technical approach
3. **Tasks**: Break into small, testable tasks
4. **Implement**: Code with quality checks
5. **Verify**: Test on all devices and screen sizes

## Quality Gates

- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console.log in production code
- [ ] Mobile responsive (320px - 1920px)
- [ ] All links work
- [ ] Images optimized
- [ ] SEO meta tags present
- [ ] Structured data (JSON-LD) correct

## Governance

This constitution supersedes all other practices. Any changes to core principles require documentation and justification. All code must comply with these principles before merging.

**Version**: 1.0.0 | **Ratified**: 2026-08-26 | **Last Amended**: 2026-08-26
