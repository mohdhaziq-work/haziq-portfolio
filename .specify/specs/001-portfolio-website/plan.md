# Haziq Portfolio — Technical Plan

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT BROWSER                         │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 (App Router)                                    │
│  ├── React 18 + TypeScript                                  │
│  ├── Tailwind CSS                                           │
│  └── Client Components                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                        │
├─────────────────────────────────────────────────────────────┤
│  /api/chat          → NVIDIA NIM (AI)                       │
│  /api/email/*       → Firebase Functions (Email)            │
│  /api/upload        → ImgBB (Images)                        │
│  /api/images        → Firestore (Database)                  │
│  /api/admin/chat/*  → Firestore (Admin Chat)                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
├─────────────────────────────────────────────────────────────┤
│  Firebase                                                   │
│  ├── Authentication (Google Sign-In)                        │
│  ├── Firestore (Database)                                   │
│  └── Functions (Email)                                      │
│                                                             │
│  Vercel / Render (Hosting)                                  │
│  GitHub (Repository)                                        │
│  ImgBB (Image Hosting)                                      │
│  NVIDIA NIM (AI)                                            │
│  Google Analytics (Tracking)                                │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
haziq-portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (meta, schemas, providers)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + Tailwind
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── not-found.tsx             # Custom 404
│   │
│   ├── about/                    # About page
│   ├── projects/                 # Projects page
│   ├── services/                 # Services page
│   ├── designs/                  # Design showcase (29 designs)
│   ├── free-mockup/              # Mockup request
│   ├── blog/                     # Blog (dynamic)
│   ├── tutorials/                # Interactive tutorials
│   ├── contact/                  # Contact form
│   ├── privacy-policy/           # Legal
│   ├── terms-of-service/         # Legal
│   │
│   ├── admin/                    # Admin pages
│   │   └── chat/                 # AI chat
│   │
│   ├── api/                      # API routes
│   │   ├── chat/                 # Public AI chat
│   │   ├── email/                # Email endpoints
│   │   ├── images/               # Image listing
│   │   ├── upload/               # Image upload
│   │   └── admin/                # Admin endpoints
│   │
│   └── [design]/                 # 29 design pages
│       ├── page.tsx
│       ├── about/page.tsx
│       ├── gallery/page.tsx
│       ├── services/page.tsx
│       └── contact/page.tsx
│
├── components/                   # React components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LayoutShell.tsx
│   │   └── UserPanel.tsx
│   │
│   ├── home/                     # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── ProjectShowcase.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Process.tsx
│   │   ├── TutorialsPreview.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTA.tsx
│   │
│   ├── auth/                     # Authentication
│   │   └── LoginPopup.tsx
│   │
│   ├── admin/                    # Admin components
│   │   └── chat/
│   │       └── AdminChat.tsx
│   │
│   ├── ui/                       # Reusable UI
│   │   ├── AnimatedText.tsx
│   │   ├── Section.tsx
│   │   └── ScrollProgress.tsx
│   │
│   ├── GoogleAnalytics.tsx       # Analytics
│   ├── CookieConsent.tsx         # Cookie banner
│   ├── BugReport.tsx             # Bug report modal
│   └── AIAssistant.tsx           # Public AI chat
│
├── lib/                          # Utilities & logic
│   ├── auth/                     # Auth utilities
│   │   ├── AuthContext.tsx
│   │   └── serverAuth.ts
│   │
│   ├── firebase/                 # Firebase config & utils
│   │   ├── config.ts
│   │   └── firestore.ts
│   │
│   ├── tutorial/                 # Tutorial system
│   │   ├── TutorialContext.tsx
│   │   ├── TourOverlay.tsx
│   │   └── data.ts
│   │
│   ├── ai/                       # AI utilities
│   │   ├── nim.ts
│   │   └── githubTool.ts
│   │
│   ├── hooks/                    # Custom hooks
│   │   └── useDeviceDetection.ts
│   │
│   ├── email/                    # Email service
│   │   └── service.ts
│   │
│   ├── constants.ts              # Site constants
│   ├── utils.ts                  # Utility functions
│   ├── instagram.ts              # Instagram DM helper
│   ├── rateLimit.ts              # Rate limiting
│   └── client-id.ts              # Client ID generator
│
├── config/                       # Configuration
│   └── site-config.ts            # Master config file
│
├── public/                       # Static assets
│   ├── favicon.png
│   ├── favicon.svg
│   ├── logo-haziq.svg
│   ├── robots.txt
│   └── projects/                 # Project screenshots
│
├── .specify/                     # Spec Kit
│   ├── memory/constitution.md
│   ├── templates/
│   └── workflows/
│
└── .claude/                      # Claude Code skills
    └── skills/
```

---

## Data Flow

### 1. Authentication Flow
```
User clicks "Sign In"
    ↓
LoginPopup opens
    ↓
User clicks "Sign in with Google"
    ↓
Firebase signInWithPopup()
    ↓
Google OAuth consent screen
    ↓
User grants permission
    ↓
Firebase returns User object
    ↓
AuthContext updates state
    ↓
Check if new user → Send welcome email
    ↓
User Panel available
```

### 2. Contact Form Flow
```
User fills contact form
    ↓
Clicks "Send Message"
    ↓
Check if signed in (requireLogin)
    ↓
If not signed in → Show LoginPopup
    ↓
If signed in → Submit form
    ↓
Save to Firestore (contacts collection)
    ↓
Create project entry (projects collection)
    ↓
Show success message
    ↓
Redirect to Instagram DM
```

### 3. Project Tracking Flow
```
User signs in
    ↓
Clicks profile icon → User Panel opens
    ↓
Fetch projects from Firestore (where clientEmail = user.email)
    ↓
Display project list with:
    - Business name
    - Plan type
    - Status (color-coded)
    - Progress percentage
    - Developer notes
    - Expected delivery date
```

### 4. Image Upload Flow
```
Admin selects image
    ↓
Clicks upload
    ↓
Check auth (admin only)
    ↓
Validate file type + size
    ↓
Convert to base64
    ↓
Send to ImgBB API
    ↓
Get URL back
    ↓
Save to Firestore (uploads collection)
    ↓
Return URL to frontend
```

---

## Database Schema (Firestore)

### Collections

#### `users`
```json
{
  "uid": "string",
  "email": "string",
  "name": "string",
  "photoURL": "string",
  "createdAt": "timestamp",
  "welcomeEmailSent": "boolean"
}
```

#### `contacts`
```json
{
  "id": "string",
  "fullName": "string",
  "businessName": "string",
  "instagramHandle": "string",
  "service": "string",
  "message": "string",
  "clientEmail": "string",
  "createdAt": "timestamp",
  "status": "string"
}
```

#### `projects`
```json
{
  "id": "string",
  "clientId": "string",
  "clientName": "string",
  "clientEmail": "string",
  "businessName": "string",
  "projectType": "string",
  "status": "string",
  "progress": "number",
  "developerNotes": "string",
  "expectedDelivery": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### `uploads`
```json
{
  "id": "string",
  "url": "string",
  "thumb": "string",
  "label": "string",
  "category": "string",
  "originalName": "string",
  "uploadedBy": "string",
  "createdAt": "timestamp"
}
```

#### `adminChats`
```json
{
  "id": "string",
  "title": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### `adminMessages`
```json
{
  "id": "string",
  "sessionId": "string",
  "role": "string",
  "content": "string",
  "attachments": "array",
  "createdAt": "timestamp"
}
```

---

## Component Dependencies

```
LayoutShell
├── AuthProvider
│   └── TutorialProvider
│       ├── Header
│       ├── {children}
│       ├── Footer
│       ├── UserPanel
│       ├── LoginPopup
│       └── TourOverlay
├── GoogleAnalytics
├── AIAssistant
├── CookieConsent
└── BugReport
```

---

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Largest Contentful Paint | < 2.5s | ~2.0s |
| Cumulative Layout Shift | < 0.1 | ~0.05 |
| First Input Delay | < 100ms | ~50ms |
| Total Bundle Size | < 200KB | ~180KB |

---

## Security Checklist

- [x] Google OAuth 2.0 (no passwords)
- [x] Server-side auth verification
- [x] Rate limiting on all API routes
- [x] Input validation
- [x] File type restrictions
- [x] Size limits (10 MB)
- [x] HTTPS only
- [x] No secrets in frontend
- [x] Firebase security rules
- [x] CORS headers
- [x] CSP headers

---

**Plan Version:** 1.0.0 | **Created:** 2026-08-27
