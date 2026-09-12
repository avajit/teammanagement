# 🚀 FREE TIER Deployment Guide

This guide will deploy your Team Task Manager to **completely FREE** services.

**Total Cost: $0/month** ✅

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  Frontend: Vercel (Next.js)                 │
│  FREE: 100GB bandwidth/month                │
└──────────────┬──────────────────────────────┘
               │ API calls (HTTPS)
┌──────────────▼──────────────────────────────┐
│  Backend: Render (Node.js/Express)         │
│  FREE: 750 hours/month                      │
└──────────────┬──────────────────────────────┘
               │ SQL queries
┌──────────────▼──────────────────────────────┐
│  Database: Neon (PostgreSQL)                │
│  FREE: 3GB storage, 20 connections          │
└─────────────────────────────────────────────┘
```

---

## ⚙️ STEP 1: Set Up PostgreSQL Database (FREE)

### Go to Neon Console
1. Visit **https://console.neon.tech**
2. Sign up with GitHub (click "Sign up with GitHub")
3. Authorize Neon

### Create Database
1. Click **"New Project"**
2. Enter name: `teammanagement`
3. Select region closest to you
4. Click **"Create Project"**

### Get Connection String
1. Go to **"Connection strings"** tab
2. Copy the **PostgreSQL connection string** (looks like):
   ```
   postgresql://user:password@ep-xxxx.us-east-1.neon.tech/teammanagement?sslmode=require
   ```
3. **Save this** - you'll need it in Step 3

---

## 📧 STEP 2: Enable Gmail App Password

Your backend will send emails via Gmail SMTP (free).

### Enable 2FA on Gmail
1. Go to **https://myaccount.google.com/security**
2. Scroll to **"2-Step Verification"**
3. Follow steps to enable 2FA
4. Return to Security page

### Generate App Password
1. Go to **https://myaccount.google.com/apppasswords**
2. Select:
   - App: **Mail**
   - Device: **Windows (or your device)**
3. Google will generate a 16-character password
4. **Copy it** - You need this in Step 3
   - Email: Your Gmail address (e.g., `your-email@gmail.com`)
   - Password: The 16-char app password

---

## 🔙 STEP 3: Deploy Backend (Render)

### Create Account
1. Go to **https://render.com**
2. Click **"Sign up"** → **"Sign up with GitHub"**
3. Authorize & complete signup

### Connect Your Repository
1. Go to **https://dashboard.render.com**
2. Click **"+ New"** → **"Web Service"**
3. Select **"Connect a GitHub repository"**
4. Find & select **`avajit/teammanagement`**
5. Authorize Render to access your repo

### Configure Backend Service
1. **Name:** `teammanagement-backend`
2. **Environment:** `Node`
3. **Build Command:** 
   ```
   npm install && npx prisma generate
   ```
4. **Start Command:**
   ```
   npm start
   ```
5. **Root Directory:** `Backend`
6. **Plan:** Select **"Free"** ✅
7. Click **"Create Web Service"**

### Add Environment Variables

Wait for the service to be created, then:

1. Go to **"Environment"** tab
2. Add each variable:

| Key | Value | Source |
|-----|-------|--------|
| `NODE_ENV` | `production` | Type this |
| `PORT` | `5000` | Type this |
| `DATABASE_URL` | Paste from Neon (Step 1) | From Neon |
| `JWT_SECRET` | `your-super-secret-key-min-32-chars-long-12345` | Generate random |
| `EMAIL_USER` | Your Gmail address | Your Gmail |
| `EMAIL_PASS` | 16-char app password | From Gmail (Step 2) |
| `CLIENT_URL` | (Will update later) | Leave blank for now |

3. Click **"Save"** after adding each
4. Service will **auto-redeploy** ✅

### Get Backend URL
1. Wait ~3-5 minutes for deployment
2. You'll see a URL like: `https://teammanagement-backend-xxxx.onrender.com`
3. **Copy this URL** - You need it in Step 4
4. Test it: Visit `https://your-backend-url/api/health`
   - Should see: `{"status":"ok","message":"Backend connected to database!"}`

---

## 🎨 STEP 4: Deploy Frontend (Vercel)

### Create Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel

### Import Your Project
1. After sign up, click **"Add New"** → **"Project"**
2. Search & select **`avajit/teammanagement`**
3. Click **"Import"**

### Configure Project Settings
1. **Framework Preset:** Select **"Next.js"**
2. **Root Directory:** Select **`Frontend/next-monorepo/apps/web`**
3. **Build Command:** Keep default or set to:
   ```
   npm run build
   ```
4. **Output Directory:** `.next`
5. **Install Command:** Keep default

### Add Environment Variable

Under **"Environment Variables"**:

1. Click **"Add"**
2. **Key:** `NEXT_PUBLIC_API_URL`
3. **Value:** Paste your backend URL from Step 3
   - Example: `https://teammanagement-backend-xxxx.onrender.com/api`
4. Click **"Save"**

### Deploy
1. Click **"Deploy"**
2. Wait ~5 minutes
3. You'll see a success message with your URL:
   - Example: `https://teammanagement-xxxx.vercel.app`

---

## ✅ FINAL STEPS

### Update Backend CLIENT_URL

1. Go back to **Render dashboard**
2. Select **`teammanagement-backend`** service
3. Go to **"Environment"** tab
4. Edit **`CLIENT_URL`**:
   - Value: Your Vercel frontend URL
   - Example: `https://teammanagement-xxxx.vercel.app`
5. Click **"Save"**
6. Service will **auto-redeploy**

---

## 🎉 YOU'RE LIVE!

### Your Live URLs

**Frontend (User Interface):**
```
https://teammanagement-xxxx.vercel.app
```

**Backend (API):**
```
https://teammanagement-backend-xxxx.onrender.com/api
```

**Health Check:**
```
https://teammanagement-backend-xxxx.onrender.com/api/health
```

---

## 📊 Limits & Quotas (FREE TIER)

### Vercel (Frontend)
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ SSL/TLS included
- ⚠️ Serverless functions timeout: 10 seconds

### Render (Backend)
- ✅ 750 compute hours/month (= full month for 1 service)
- ✅ Auto-deploys on git push
- ⚠️ Spins down after 15min inactivity (first request takes 30sec)
- ✅ SSL/TLS included

### Neon (Database)
- ✅ 3GB storage
- ✅ 20 concurrent connections
- ✅ 100 hours compute/month
- ⚠️ Auto-pause after 1 week inactivity

---

## 🐛 Troubleshooting

### Backend won't deploy
**Problem:** Build fails
**Solution:** 
1. Check Render logs: Dashboard → Service → Logs
2. Look for Prisma errors
3. Verify DATABASE_URL is correct
4. Try redeploying: Dashboard → "Manual Deploy" → "Deploy latest commit"

### Frontend shows error
**Problem:** "Cannot reach API"
**Solution:**
1. Check `NEXT_PUBLIC_API_URL` env var
2. Make sure backend URL is correct (no trailing `/api` in env var if already in code)
3. Redeploy frontend

### Email not sending
**Problem:** "Invalid login credentials"
**Solution:**
1. Double-check Gmail app password (16 chars, no spaces)
2. Verify 2FA is enabled
3. Try generating new app password

### Database won't connect
**Problem:** "Too many connections"
**Solution:**
1. Render backend is using multiple connections
2. Upgrade Neon to paid, or
3. Optimize connection pooling in Prisma (add `connectionLimit=5` to DATABASE_URL)

---

## 🚀 Auto-Deploy Setup

Every time you push to GitHub, your app updates automatically!

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel & Render auto-deploy!
# Check status in their dashboards
```

---

## 📈 Next Steps (Optional)

1. **Add custom domain** (Vercel → Settings → Domains)
2. **Enable analytics** (Vercel → Analytics tab)
3. **Set up monitoring** (Render → Alerts)
4. **Scale to paid** when you hit free tier limits

---

## 💰 Cost Breakdown

| Service | Free Tier | Monthly Cost |
|---------|-----------|------------------|
| Vercel | Yes | $0 |
| Render | Yes (750 hrs/month) | $0 |
| Neon | Yes (3GB) | $0 |
| Gmail SMTP | Yes | $0 |
| **TOTAL** | | **$0** ✅ |

---

**🎊 Congrats! Your fullstack app is now LIVE on the internet!**

Share your live URL with friends & family 🎉
