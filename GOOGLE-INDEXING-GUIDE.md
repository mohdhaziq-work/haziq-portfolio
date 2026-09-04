# Google Indexing Guide — Dono Websites

## Problem
Render wali website Google pe nahi dikh rahi, sirf Vercel wali dikh rahi hai.

## Solution — Yeh Steps Follow Karo

### Step 1: Google Search Console Setup

#### A. Render Domain Add Karo
1. Jaao → [Google Search Console](https://search.google.com/search-console)
2. "Add Property" click karo
3. "URL prefix" select karo
4. Type karo: `https://mohdhaziq-portfolio.onrender.com`
5. "Continue" click karo
6. Verification method choose karo (HTML tag recommended)
7. Meta tag copy karo

#### B. Vercel Domain Add Karo (Agar nahi hai)
1. Same process repeat karo
2. URL: `https://mohdhaziq-portfolio.vercel.app`

### Step 2: Sitemap Submit Karo

#### Render Domain Ke Liye:
1. Google Search Console mein jaao
2. Left menu mein "Sitemaps" click karo
3. URL box mein type karo: `sitemap.xml`
4. "Submit" click karo

#### Vercel Domain Ke Liye:
1. Same process
2. URL: `sitemap.xml`

### Step 3: URL Inspection Tool

#### Render Domain:
1. Google Search Console mein jaao
2. Top pe search box mein type karo: `https://mohdhaziq-portfolio.onrender.com`
3. "Enter" press karo
4. "Request Indexing" click karo
5. Repeat for important pages:
   - `/about`
   - `/services`
   - `/projects`
   - `/contact`
   - `/designs`

#### Vercel Domain:
1. Same process repeat karo
2. URL: `https://mohdhaziq-portfolio.vercel.app`

### Step 4: Google Mein Manually Request Karo

1. Jaao → [Google Search](https://www.google.com)
2. Search karo: `site:mohdhaziq-portfolio.onrender.com`
3. Agar results nahi aaye toh:
   - Jaao → [Google URL Submission](https://www.google.com/webmasters/tools/submit-url)
   - URL submit karo

### Step 5: Backlinks Banao

Dono websites ke liye backlinks banao:

#### Instagram Bio:
```
🌐 mohdhaziq-portfolio.onrender.com
```

#### GitHub Profile:
```
Portfolio: https://mohdhaziq-portfolio.onrender.com
```

#### Other Platforms:
- LinkedIn profile mein add karo
- Twitter bio mein add karo
- Facebook page mein add karo
- Any forum signatures

### Step 6: Google Business Profile (Agar hai)

1. Jaao → [Google Business](https://business.google.com)
2. Website field mein: `https://mohdhaziq-portfolio.onrender.com`
3. Save karo

### Step 7: Wait & Monitor

- Indexing mein 1-7 days lag sakte hain
- Google Search Console mein "Coverage" tab check karo
- "Performance" tab mein rankings dekho

---

## Quick Checklist

- [ ] Render domain Google Search Console mein add kiya?
- [ ] Vercel domain Google Search Console mein add kiya?
- [ ] Dono domains ka sitemap submit kiya?
- [ ] URL Inspection se important pages request kiye?
- [ ] Backlinks banaye (Instagram, GitHub, etc.)?
- [ ] 7 din wait kiya?

---

## Expected Results

### Week 1:
- Google Search Console mein data aana shuru hoga
- Sitemap processed ho jayega

### Week 2-3:
- Pages index hone shuru ho jayenge
- `site:mohdhaziq-portfolio.onrender.com` pe results dikhenge

### Week 4+:
- Rankings improve hongi
- "Mohd Haziq" search pe dono websites dikhengi

---

## Troubleshooting

### Agar Render domain phir bhi nahi dikh raha:

1. **Check robots.txt:**
   - Jaao: `https://mohdhaziq-portfolio.onrender.com/robots.txt`
   - Confirm karo ki `Allow: /` hai

2. **Check sitemap:**
   - Jaao: `https://mohdhaziq-portfolio.onrender.com/sitemap.xml`
   - Agar 404 aaye toh Render pe manually trigger karo

3. **Render Redeploy:**
   - Render dashboard mein jaao
   - "Manual Deploy" click karo
   - "Deploy latest commit" select karo

4. **Check meta tags:**
   - Jaao: `https://mohdhaziq-portfolio.onrender.com`
   - Right click → "View Page Source"
   - Search karo: `robots`
   - Confirm: `<meta name="robots" content="index, follow">`

---

## Important Notes

1. **Dono domains ko INDEX karna hai** — Google ko batana hai ki dono same website hai
2. **Canonical tag** — layout.tsx mein PRIMARY_URL set hai (Render)
3. **Sitemap** — dono domains ke URLs include hain
4. **robots.txt** — dono domains ke sitemaps listed hain

---

## Contact

Agar koi issue ho toh batao!

Mohd Haziq
mohdhaziq1962@gmail.com
