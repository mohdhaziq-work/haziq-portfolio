# Haziq Portfolio Website — Complete Specification

## Overview
Professional web development portfolio for Mohd Haziq — a 16-year-old web developer from Lucknow, India. The website showcases services, projects, and design capabilities to attract local business clients.

**Live URLs:**
- Primary: https://mohdhaziq-portfolio.onrender.com
- Secondary: https://mohdhaziq-portfolio.vercel.app

---

## 1. WEBSITE STRUCTURE

### 1.1 Main Pages (9 pages)
| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page with hero, projects, services, testimonials |
| About | `/about` | Developer bio, skills, experience |
| Projects | `/projects` | 3 live demo projects (restaurant, coaching, gym) |
| Services | `/services` | 3 pricing plans (Starter ₹2,500, Business ₹6,000, Premium ₹12,000) |
| Designs | `/designs` | 29 unique design style showcase |
| Free Mockup | `/free-mockup` | Request a free website mockup |
| Blog | `/blog` | Blog posts (dynamic) |
| Tutorials | `/tutorials` | Interactive walkthrough guides |
| Contact | `/contact` | Contact form + Instagram DM |

### 1.2 Legal Pages (2 pages)
| Page | URL | Purpose |
|------|-----|---------|
| Privacy Policy | `/privacy-policy` | Data collection, usage, rights |
| Terms of Service | `/terms-of-service` | Service terms, payment, delivery |

### 1.3 Design Showcase Pages (29 designs × 5 pages = 145 pages)
Each design has:
- Home page
- About page
- Gallery page
- Services page
- Contact page

**Designs:** Skeuomorphism, Neumorphism, Pixel Art, Glassmorphism, Brutalism, Cyberpunk, Minimalism, Retro, Gradient Mesh, Dark Mode, Flat Design, Material Design, Aurora, Isometric, Typography, Illustration, Parallax, Split Screen, Monochrome, Organic, Futuristic, Handwritten, Geometric, Cinematic, Watercolor, Neon Glow, Abstract, Wabi-Sabi, Conceptual Sketch

### 1.4 Admin Pages (2 pages)
| Page | URL | Purpose |
|------|-----|---------|
| Admin Redirect | `/admin` | Redirects to home |
| AI Chat | `/admin/chat` | Admin-only AI assistant |

### 1.5 API Routes (10 routes)
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/chat` | POST | Public AI chat (NVIDIA NIM) |
| `/api/email/welcome` | POST | Send welcome email |
| `/api/email/welcome-back` | POST | Send welcome-back email |
| `/api/email/mockup` | POST | Send mockup email |
| `/api/email/order-confirmed` | POST | Send order confirmation |
| `/api/email/update` | POST | Send project update |
| `/api/email/test` | POST | Test email sending |
| `/api/images` | GET | Get uploaded images |
| `/api/upload` | POST | Upload images (ImgBB) |
| `/api/admin/chat/*` | Various | Admin chat CRUD |

---

## 2. FEATURES

### 2.1 Authentication (Google Sign-In)
- **Provider:** Firebase Authentication
- **Method:** Google OAuth 2.0
- **Scopes:** Email, Name, Profile Photo (basic only)
- **Features:**
  - Sign in with Google button
  - Auto-detect admin vs client
  - Session persistence
  - Sign out functionality
  - Login popup with privacy info

### 2.2 User Roles
| Role | Email | Access |
|------|-------|--------|
| Admin | mohdhaziq1962@gmail.com | Full access, AI chat, project management |
| Client | Any other email | View projects, submit forms |
| Guest | Not signed in | Browse website, view content |

### 2.3 Client Portal (User Panel)
- **Location:** Right sidebar (slides in)
- **Features:**
  - My Projects tab — list of submitted projects
  - Project status tracking (Inquiry → Discussion → Confirmed → In Progress → Review → Delivered)
  - Progress bar with percentage
  - Developer notes
  - Expected delivery date
  - Profile info display

### 2.4 Contact System
- **Contact Form Fields:**
  - Full Name (required)
  - Business Name (optional)
  - Instagram Handle (required)
  - Service Plan (dropdown)
  - Message (required)
- **Flow:**
  1. User fills form
  2. Must sign in with Google first
  3. Form data saved to Firebase Firestore
  4. Project entry created automatically
  5. Redirect to Instagram DM
  6. Welcome email sent

### 2.5 Free Mockup System
- **Flow:**
  1. User clicks "Request Free Mockup"
  2. Fills business details form
  3. Submits request
  4. Admin receives notification
  5. Admin creates mockup
  6. Mockup shared with client

### 2.6 Email System
- **Provider:** Firebase Functions + Nodemailer
- **Email Types:**
  - Welcome email (first login)
  - Welcome-back email (returning login)
  - Mockup request confirmation
  - Order confirmation
  - Project update notification
  - Test email (admin)

### 2.7 AI Assistant (Public)
- **Location:** Floating button (bottom-right)
- **Provider:** NVIDIA NIM API
- **Features:**
  - Answer questions about services
  - Help with pricing
  - Explain process
  - Rate limited (20 req/min)

### 2.8 Admin AI Chat
- **Location:** `/admin/chat`
- **Features:**
  - Full chat interface
  - Session management
  - Message history
  - Code assistance
  - Content generation

### 2.9 Image Upload
- **Provider:** ImgBB API (free)
- **Fallback:** Base64 data URL
- **Allowed Types:** JPEG, PNG, GIF, WebP, SVG, AVIF, BMP, PDF
- **Max Size:** 10 MB
- **Auth:** Required (signed-in users only)

### 2.10 Tutorial System
- **7 Interactive Tutorials:**
  1. Website Tour
  2. How to Get FREE Mockup
  3. How to Contact & Hire
  4. Which Plan is Right for You?
  5. Website Delivery Process
  6. 29 Design Styles
  7. Track Your Project
- **Features:**
  - Spotlight highlighting
  - Step-by-step navigation
  - Language support (English, Hindi, Hinglish)
  - Device-aware (mobile, tablet, desktop)
  - Progress tracking
  - Keyboard shortcuts

---

## 3. TECH STACK

### 3.1 Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.21 | React framework (App Router) |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Utility-first CSS |
| Inter Font | - | Typography |

### 3.2 Backend
| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Serverless functions |
| Firebase Firestore | Database |
| Firebase Authentication | User auth |
| Firebase Functions | Email sending |

### 3.3 External Services
| Service | Purpose | Cost |
|---------|---------|------|
| Firebase | Database + Auth | Free tier |
| Vercel | Primary hosting | Free |
| Render | Secondary hosting | Free |
| ImgBB | Image hosting | Free |
| NVIDIA NIM | AI chat | Free tier |
| GitHub | Code repository | Free |

### 3.4 SEO & Analytics
| Tool | Purpose |
|------|---------|
| Google Search Console | Indexing |
| Google Analytics | Traffic tracking |
| JSON-LD Schema | Structured data |
| Sitemap | Page discovery |
| Robots.txt | Crawler control |

---

## 4. USER FLOWS

### 4.1 New Client Flow
```
1. Visit homepage
2. Browse projects/services
3. Click "Get Free Mockup" or "DM Me"
4. Sign in with Google (popup)
5. Fill contact form
6. Submit → Redirect to Instagram DM
7. Receive welcome email
8. Track project in User Panel
```

### 4.2 Returning Client Flow
```
1. Visit homepage
2. Click profile icon → User Panel opens
3. View project status
4. Read developer notes
5. Check delivery date
6. Contact via Instagram DM
```

### 4.3 Admin Flow
```
1. Sign in with admin email
2. Access Admin Dashboard
3. Use AI Chat for assistance
4. Manage projects in Firebase Console
5. Send updates to clients
6. Upload images/mockups
```

---

## 5. DESIGN SYSTEM

### 5.1 Colors (CSS Variables)
```css
--background: #ffffff
--surface: #f8f9fa
--surface-2: #f1f3f4
--border: #e8eaed
--text-primary: #202124
--text-secondary: #5f6368
--text-tertiary: #80868b
--accent: #1a73e8
--accent-hover: #1557b0
--accent-light: #e8f0fe
```

### 5.2 Typography
- **Font:** Inter (Google Fonts)
- **Scale:** Display LG → Display MD → Display SM → Headline → Body LG → Body MD → Body SM → Caption

### 5.3 Components
- **Cards:** surface-card, elevated-card
- **Buttons:** btn-primary, btn-secondary, btn-outline
- **Chips:** chip, chip-active
- **Sections:** Section component with background/padding props

### 5.4 Animations
- **Scroll animations:** AnimatedText component
- **Hover effects:** Scale, shadow, color transitions
- **Page transitions:** Fade in/out
- **Tour animations:** Spotlight pulse, tooltip slide

---

## 6. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Device |
|------------|-------|--------|
| Mobile | < 768px | Phones |
| Tablet | 768px - 1024px | iPads, tablets |
| Desktop | 1024px - 1920px | Laptops, monitors |
| Large | > 1920px | TVs, ultrawide |

---

## 7. SECURITY

### 7.1 Authentication
- Google OAuth 2.0 only
- No password storage
- Server-side token verification
- Admin email whitelist

### 7.2 API Security
- Rate limiting on all routes (30 req/min)
- Auth required for sensitive endpoints
- Input validation
- File type restrictions
- Size limits (10 MB)

### 7.3 Data Protection
- Firebase security rules
- HTTPS only
- No sensitive data in frontend
- Environment variables for secrets

---

## 8. SEO CONFIGURATION

### 8.1 Meta Tags
- Title: "Mohd Haziq - Web Developer | Professional Website Designer India"
- Description: Full description with keywords
- Keywords: 50+ targeted keywords
- Canonical URL: https://mohdhaziq-portfolio.onrender.com

### 8.2 Structured Data (JSON-LD)
- Person schema (Knowledge Panel)
- WebSite schema (Sitelinks)
- ProfessionalService schema (Local Business)
- FAQPage schema (Rich Results)
- Organization schema
- BreadcrumbList schema
- HowTo schema

### 8.3 Sitemap
- Both domains included
- All 171+ pages listed
- Priority and frequency set

---

## 9. DEPLOYMENT

### 9.1 Git Workflow
```
Repository: github.com/mohdhaziq-work/haziq-portfolio
Branch: main
SSH Key: ~/.ssh/haziq_github
```

### 9.2 Build Process
```bash
npm install
npm run build
```

### 9.3 Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_GA_ID
IMGBB_API_KEY
NVIDIA_API_KEY
```

---

## 10. FUTURE ENHANCEMENTS

- [ ] Blog CMS integration
- [ ] Payment gateway (Razorpay)
- [ ] Client dashboard with file sharing
- [ ] Automated invoicing
- [ ] Multi-language support (full i18n)
- [ ] PWA support
- [ ] Push notifications
- [ ] Live chat widget
- [ ] Portfolio video showcase
- [ ] Client testimonials submission form

---

**Version:** 1.0.0 | **Last Updated:** 2026-08-27 | **Author:** Mohd Haziq
