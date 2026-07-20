# Email System Setup Guide - Mohd Haziq Portfolio
## RESEND API Key Setup (Free - 100 emails/day)

---

## KYA BANA HAI:

1. **Welcome Email** — Jab client pehli baar login kare, automatically welcome email aayega
   - Professional HTML email with Mohd Haziq logo
   - "What you can do now" section
   - Portfolio link + Instagram DM button
   
2. **Project Update Email** — Jab admin project status/progress change kare
   - Client ko email aayega with progress bar
   - Status + percentage shown
   - Admin notes included

3. **Project Delivered Email** — Jab admin "Delivered" mark kare
   - Green themed celebration email
   - "Your Website is Ready!" heading
   - Website link (if available)

4. **Google "Render" Name Fix** — 
   - poweredByHeader: false (X-Powered-By header removed)
   - Extra meta tags for site name
   - /.well-known/change-password route added

---

## SETUP STEPS (ZAROORI - BINA ISKE EMAIL NAHI JAYEGA):

### Step 1: Resend Account Banao (FREE)
1. Go to https://resend.com
2. Click "Sign Up" 
3. Sign up with Google (same email: mohdhaziq1962@gmail.com)
4. Verify your email

### Step 2: API Key Banao
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name: "Portfolio Website"
4. Permission: Full access
5. Copy the API key (starts with "re_")

### Step 3: Render Dashboard Mein Add Karo
1. Go to https://dashboard.render.com
2. Select your portfolio service
3. Click "Environment" on the left
4. Add new variable:
   - Key: RESEND_API_KEY
   - Value: (paste your API key from Step 2)
5. Click "Save Changes"
6. Render will automatically redeploy

### Step 4: Test Karo
1. Open your portfolio website
2. Sign in with a test Google account (NOT your admin email)
3. Check the inbox of that test account
4. You should see a welcome email with Mohd Haziq logo!

---

## HOW IT WORKS:

### Welcome Email Flow:
```
Client clicks "Sign In with Google" 
  → Firebase Auth creates account
  → AuthContext checks Firestore "users" collection
  → If user doc doesn't exist = FIRST LOGIN
  → Saves user doc to Firestore
  → Calls /api/email/welcome
  → Resend sends welcome email to client
```

### Project Update Email Flow:
```
Admin changes project status/progress in Dashboard
  → UserPanel calls updateProjectDetails()
  → Also calls /api/email/update
  → Resend sends update email to client
```

### Project Delivered Email Flow:
```
Admin marks project as "Delivered"
  → Progress auto-sets to 100%
  → Calls /api/email/update with status "delivered"
  → Resend sends green "Your Website is Ready!" email
```

---

## IMPORTANT NOTES:

- **Resend free tier = 100 emails/day** — more than enough for now
- **onboarding@resend.dev** is the default sender — works for testing
- Later you can add your own domain (e.g., haziq.dev) for professional sending
- Admin (mohdhaziq1962@gmail.com) does NOT receive welcome email — only clients
- If RESEND_API_KEY is not set, emails silently skip (no errors, no crash)
- Email HTML has Mohd Haziq logo, gradient header, Instagram button — fully branded

---

## FILES CREATED/MODIFIED:

| File | What It Does |
|---|---|
| `lib/email/service.ts` | Email templates + Resend send functions |
| `app/api/email/welcome/route.ts` | API route for welcome email |
| `app/api/email/update/route.ts` | API route for project update/delivered email |
| `lib/auth/AuthContext.tsx` | Added welcome email trigger on first login |
| `components/layout/UserPanel.tsx` | Added email triggers on admin project updates |
| `next.config.js` | poweredByHeader: false + X-Site-Name header |
| `app/layout.tsx` | Extra meta tags for Google site name |
| `app/.well-known/change-password/route.ts` | Google site identity verification |

---

## RENDER ENVIRONMENT VARIABLES (Complete List):

| Variable | Value | Status |
|---|---|---|
| NODE_VERSION | 18 | Must be set |
| PORT | 3000 | Must be set |
| NEXT_PUBLIC_FIREBASE_API_KEY | AIzaSyBWaZ4dFCJJ0CW-3lLlf0EP9Ihk5AOl6wI | Must be set |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | mohdhaziq-portfolio.onrender.com | Must be set |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | my-portfolio-d84d3 | Must be set |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | my-portfolio-d84d3.firebasestorage.app | Must be set |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | 497943029240 | Must be set |
| NEXT_PUBLIC_FIREBASE_APP_ID | 1:497943029240:web:699bbdf7ce77bcdce6a20d | Must be set |
| **RESEND_API_KEY** | **re_xxxxxxxxxx** | **NEW - Must be set after creating Resend account** |
