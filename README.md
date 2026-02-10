# 💝 Valentine's App for Eva

A romantic, interactive Valentine's Day app built with Next.js + TypeScript, ready to deploy on Vercel.

## Features

- 💌 Elegant animated card with floating hearts background
- 🏃 A "No" button that **runs away** from the cursor every time it's clicked — getting smaller each time
- 💖 A "Yes" button that grows bigger each time "No" is attempted
- 🎉 Particle burst + celebration screen when she says Yes
- ✨ Smooth entrance animations, heart bobble, and pulse effects
- 📱 Fully responsive for mobile

## Deploy to Vercel (3 steps)

### Option 1: Vercel CLI (fastest)

```bash
# 1. Install dependencies
npm install

# 2. Install Vercel CLI (if you haven't)
npm i -g vercel

# 3. Deploy!
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "💝 Valentine's app for Eva"
   git remote add origin https://github.com/YOUR_USERNAME/valentines-eva.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo

3. Vercel auto-detects Next.js — just click **Deploy** ✅

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Customization

- Edit `pages/index.tsx` to change the poem or messages
- Adjust `noMessages` array for different "No" button responses
- Swap colors in `styles/Home.module.css` (look for `#e0285a` and `#c94070`)

---

Made with 💖 for Eva
