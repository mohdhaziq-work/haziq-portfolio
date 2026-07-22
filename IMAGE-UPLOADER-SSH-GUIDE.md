# IMAGE UPLOADER + SSH KEY MANAGER - SETUP GUIDE

## Kya Add Hua

Admin Dashboard mein 2 naye tabs add hue hain:
1. **images** - Image upload karo, ImgBB pe store hoti hai
2. **ssh** - SSH keys add/delete karo, Firestore mein store hoti hain

---

## PEHLE YE SETUP KARO (ZAROORI!)

### Step 1: ImgBB API Key Lein (FREE)

1. Phone pe https://api.imgbb.com/ kholo
2. "Sign up" karo (free account)
3. Login karo
4. API Key copy karo (ek long string hogi jaise: `a1b2c3d4e5f6...`)

### Step 2: ImgBB API Key Set Karo

**Option A: Site Config mein (Quick)**
1. Go to: config/site-config.ts
2. Find: `imgbbApiKey: ''`
3. Replace with your key: `imgbbApiKey: 'YOUR_API_KEY_HERE'`
4. Commit and deploy

**Option B: Render Environment Variable (More Secure)**
1. Render Dashboard kholo
2. Environment variables mein add karo:
   - Key: `NEXT_PUBLIC_IMGBB_API_KEY`
   - Value: Your ImgBB API key
3. Redeploy

---

## IMAGE UPLOADER KAISE USE KAREIN

1. Portfolio site kholo: https://mohdhaziq-portfolio.onrender.com
2. Google Sign In karo (mohdhaziq1962@gmail.com)
3. Header mein apna photo click karo
4. Admin Dashboard kholo
5. **"images"** tab pe click karo
6. Image label daalo (e.g. "my-photo", "spice-garden-screenshot")
7. Category select karo (General, Project Screenshot, Profile Photo, Logo, Hero Image)
8. "Select Image & Upload" button pe click karo
9. Phone se image select karo
10. Upload complete hone ke baad image gallery mein dikhegi
11. "Copy URL" se image ka URL copy karo
12. "Open Full" se image full size mein dekho

### Uploaded Images Kahan Use Hongi:
- Jab tu image upload karega, woh ImgBB pe store hogi
- URL copy karke kahi bhi use kar sakta hai
- Jab tu mujhe kehta hai "maine image upload ki", main Render pe jaake dekh sakta hoon
- Images Firestore mein bhi save hoti hain with URL, label, category

---

## SSH KEY MANAGER KAISE USE KAREIN

1. Admin Dashboard mein **"ssh"** tab pe click karo
2. "+ Add Key" button pe click karo
3. Form fill karo:
   - **Name**: Key ka naam (e.g. "portfolio-deploy", "github-key")
   - **Type**: Deploy Key / GitHub Key / Server Access / Other
   - **Host**: Host address (e.g. "github.com")
   - **Private Key**: Full SSH private key paste karo (-----BEGIN OPENSSH PRIVATE KEY----- se -----END OPENSSH PRIVATE KEY----- tak)
4. "Add SSH Key" button pe click karo
5. Key save ho jayegi, preview mein first 40 characters dikhegi
6. Delete karna ho toh "Delete" button pe click karo

### SSH Key Kahan Use Hogi:
- Firestore mein securely store hoti hai (base64 encoded)
- Deployment ke liye reference ke liye
- Future mein automated deployment ke liye use ho sakti hai

---

## TROUBLESHOOTING

### "Upload failed" error:
- ImgBB API key set hai ya nahi? Check karo config mein
- Image size 32MB se zyada toh nahi hai?
- Internet connection working hai?

### Images nahi dik rahi:
- Firestore mein "uploads" collection create hua hai ya nahi?
- Firebase Console kholo > Firestore > Check if "uploads" collection exists

### SSH Keys save nahi ho rahi:
- Firestore mein "sshKeys" collection check karo
- Private key format sahi hai ya nahi?

---

## FIREBASE CONSOLE SETUP (One Time)

1. https://console.firebase.google.com/ kholo
2. Project select karo: my-portfolio-d84d3
3. Firestore Database kholo
4. Ye collections create hongi automatically jab pehli entry aayegi:
   - `uploads` - Uploaded images ke URLs
   - `sshKeys` - SSH keys (base64 encoded)
5. Firestore Rules mein ye add karo:

```
match /uploads/{doc} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.token.email == 'mohdhaziq1962@gmail.com';
}

match /sshKeys/{doc} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.token.email == 'mohdhaziq1962@gmail.com';
}
```
