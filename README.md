# Mohd Haziq — Web Developer Portfolio

> **I build websites that bring customers to your door.** 🚪💻

A modern, multi-page portfolio for **Mohd Haziq**, a 16-year-old professional web developer serving local businesses — restaurants, gyms, coaching centers, and custom web applications. Fast, mobile-first, and conversion-focused, with website development **starting at ₹2,500**.

**Live site:** [mohdhaziq-portfolio.onrender.com](https://mohdhaziq-portfolio.onrender.com)

---

## ✨ Features

- 🎨 **Google Labs light theme** — clean, minimal, professional
- 📱 **Multi-page** — Home, About, Projects, Services, Contact, Tutorials
- 🖼 **Live project showcase** with real screenshots + source links
- 💰 **Pricing plans** — Starter ₹2,500 · Business ₹6,000 · Premium ₹12,000
- 📞 **Instagram DM integration** for instant client contact
- 📄 **Free mockup CTA** — no commitment, no risk
- 🔐 **User / Admin panel** (Google sign-in) with client upload system
- 🛠 **Client File Upload** — clients upload images, admin views/downloads (Firestore)
- 🎛 **Admin tools** — image enhancer, image text editor (OCR + inpainting)
- 📧 **Email system** via Gmail SMTP (Nodemailer)
- 🚀 **SEO optimized** — sitemap, meta tags, Open Graph
- 🧭 **Interactive onboarding tours** for new visitors

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database/Auth | Firebase (Firestore + Auth + Admin) |
| Email | Nodemailer (Gmail SMTP) |
| OCR/Image | Tesseract.js, OpenCV.js, Fabric.js |
| Image Hosting | ImgBB API |
| Deployment | Render (free tier) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18.17+** (see `.nvmrc` / `.node-version`)
- npm

### 1. Install
```bash
git clone https://github.com/mohdhaziq-work/haziq-portfolio.git
cd haziq-portfolio
npm install
```

### 2. Environment variables
Create a `.env.local` file:

```bash
# Firebase (client)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# ImgBB (image uploads)
IMGBB_API_KEY=...
NEXT_PUBLIC_IMGBB_API_KEY=...

# Email (Gmail SMTP)
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
```

### 3. Run
```bash
npm run dev       # development → http://localhost:3000
npm run build     # production build
npm start         # run production build
```

---

## 📁 Project Structure

```
app/            # Pages & API routes (App Router)
  about/        # About page
  admin/        # Admin dashboard
  api/          # email, upload, images, videos endpoints
  contact/      # Contact page
  projects/     # Projects page
  services/     # Services page
  tutorials/    # Interactive guides
components/     # Reusable UI (home, layout, ui, auth, admin)
config/         # Site config (site-config.ts — edit here!)
lib/            # Constants, helpers, services
public/         # Static assets (logo, images, tools)
firestore.rules # Firestore security rules
render.yaml     # Render deployment config
```

> ⚠️ **Note:** `lib/constants.ts` is auto-generated from `config/site-config.ts`. Edit your site content (pricing, socials, personal info, photos) in **`config/site-config.ts`** — it will be read by the app.

---

## 🎨 Customization

| What | Where |
|------|-------|
| Personal info (name, city, age) | `config/site-config.ts` → `PERSONAL` |
| Social links (Instagram, GitHub, email) | `config/site-config.ts` → `SOCIAL_LINKS` |
| Pricing / plans | `config/site-config.ts` → `PRICING` |
| Profile & hero photos | drop in `public/` → set in `config/site-config.ts` → `IMAGES` |
| Stats shown on home | `lib/constants.ts` → `STATS` |
| Colors / theme | `tailwind.config.ts` + `app/globals.css` |

---

## 📦 Deploying to Render

1. Push this repo to GitHub.
2. In Render, **New → Web Service** → connect the repo.
3. Use the `render.yaml` blueprint (or set manually):
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Plan: free
4. Add the required environment variables (see above).
5. Deploy. 🎉

---

## 📄 Docs in this repo
- [EMAIL-SETUP-GUIDE.md](./EMAIL-SETUP-GUIDE.md) — Gmail SMTP setup
- [INSTAGRAM-SETUP-GUIDE.md](./INSTAGRAM-SETUP-GUIDE.md) — Instagram DM + highlights
- [INSTAGRAM-VIRAL-STRATEGY.md](./INSTAGRAM-VIRAL-STRATEGY.md) — posting strategy
- [IMAGE-UPLOADER-SSH-GUIDE.md](./IMAGE-UPLOADER-SSH-GUIDE.md) — image uploader setup

---

## 📬 Contact

- 🌐 Portfolio: [mohdhaziq-portfolio.onrender.com](https://mohdhaziq-portfolio.onrender.com)
- 💬 Instagram: **DM me** via the site
- 🐙 GitHub: [github.com/mohdhaziq-work](https://github.com/mohdhaziq-work)

---

## ⚠️ Security note
`render.yaml` currently contains a public Firebase client API key. That's **normal** for client-side Firebase config (the key is exposed in the browser anyway), but **make sure Firestore security rules are locked down** — don't rely on the key for server-side protection. Keep `SMTP_PASS` and `IMGBB_API_KEY` as **server-only** secrets and never commit them.

---

Built with ❤️ by **Mohd Haziq** · Next.js 14 + TypeScript + Tailwind CSS
