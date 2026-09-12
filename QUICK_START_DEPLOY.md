# ⚡ QUICK START: Deploy in 30 Minutes

> Follow these exact steps. Estimated time: **30 minutes**

---

## 📋 Prerequisites

Have these ready:
- [ ] Your GitHub account (already logged in)
- [ ] Gmail account with 2FA enabled
- [ ] This README open in another tab

---

## Step 1️⃣: Database (5 min)

**Action:** Create FREE PostgreSQL database

```
1. Open: https://console.neon.tech
2. Click: "Sign up with GitHub"
3. Click: "New Project"
4. Name: teammanagement
5. Click: "Create Project"
6. Copy: Connection string (you'll paste it later)
```

✅ Database ready!

---

## Step 2️⃣: Gmail App Password (5 min)

**Action:** Get password for email sending

```
1. Open: https://myaccount.google.com/security
2. Find: "2-Step Verification" → Turn ON (if not already)
3. Open: https://myaccount.google.com/apppasswords
4. Select: Mail + Your Device
5. Google gives you 16-char password
6. Copy it (you'll use it later)
```

✅ Email ready!

---

## Step 3️⃣: Backend (10 min)

**Action:** Deploy backend on Render

```
1. Open: https://render.com
2. Click: "Sign up with GitHub"
3. Click: "+ New" → "Web Service"
4. Click: "Connect a GitHub repository"
5. Search: "teammanagement"
6. Click: "Connect"
```

**Configure:**
```
Name: teammanagement-backend
Environment: Node
Build Command: npm install && npx prisma generate
Start Command: npm start
Root Directory: Backend
Plan: Free ✅
```

**Click:** "Create Web Service"

**Add Environment Variables** (click in Environment tab):

| Key | Paste/Type |
|-----|-----|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DATABASE_URL` | Paste from Step 1 |
| `JWT_SECRET` | `your-super-secret-random-key-12345678` |
| `EMAIL_USER` | Your Gmail |
| `EMAIL_PASS` | 16-char from Step 2 |
| `CLIENT_URL` | (leave empty for now) |

⏳ Wait 3-5 minutes for deployment

✅ Backend live! Copy your URL (looks like `https://teammanagement-backend-xxxx.onrender.com`)

---

## Step 4️⃣: Frontend (10 min)

**Action:** Deploy frontend on Vercel

```
1. Open: https://vercel.com
2. Click: "Sign Up" → "Continue with GitHub"
3. Click: "Add New" → "Project"
4. Search: "teammanagement"
5. Click: "Import"
```

**Configure:**
```
Framework: Next.js ✅
Root Directory: Frontend/next-monorepo/apps/web
```

**Add Environment Variable:**
```
Key: NEXT_PUBLIC_API_URL
Value: https://your-backend-url-from-step3/api
```

**Click:** "Deploy"

⏳ Wait 3-5 minutes

✅ Frontend live! You'll get URL (looks like `https://teammanagement-xxxx.vercel.app`)

---

## Step 5️⃣: Connect Backend ↔ Frontend (2 min)

**Action:** Tell backend about frontend

```
1. Go back to Render dashboard
2. Click: teammanagement-backend
3. Click: "Environment" tab
4. Find: CLIENT_URL
5. Paste: Your Vercel URL (from Step 4)
6. Click: "Save"
```

⏳ Auto-redeploys (1-2 min)

---

## 🎉 Done! You're LIVE!

### Your Live App

**Frontend:**
```
https://teammanagement-xxxx.vercel.app
```

**Backend API:**
```
https://teammanagement-backend-xxxx.onrender.com/api
```

### Test It

1. Open your frontend URL in browser
2. Try signing up
3. Create a project
4. Invite someone
5. Assign a task

✅ Everything should work!

---

## 💡 Tips

- **Update code?** Just push to GitHub → auto-deploys ✅
- **Check errors?** Go to service dashboard → "Logs" tab
- **Forgot URL?** Check your deployment service dashboard

---

## 🆘 Issues?

See **DEPLOYMENT_GUIDE.md** for troubleshooting!
