# 🌐 Live Deployment URLs

**Update these after deployment:**

## Frontend (Next.js on Vercel)
```
https://your-vercel-url.vercel.app
```

## Backend API (Express on Render)
```
https://your-render-url.onrender.com/api
```

## Health Check
```bash
curl https://your-render-url.onrender.com/api/health
```

**Expected response:**
```json
{"status":"ok","message":"Backend connected to database!"}
```

---

## Environment Variables Set

### Backend (Render)
- ✅ DATABASE_URL (Neon PostgreSQL)
- ✅ JWT_SECRET
- ✅ EMAIL_USER (Gmail)
- ✅ EMAIL_PASS (Gmail App Password)
- ✅ CLIENT_URL (Vercel URL)
- ✅ NODE_ENV=production
- ✅ PORT=5000

### Frontend (Vercel)
- ✅ NEXT_PUBLIC_API_URL (Backend URL)

---

## Auto-Deploy

All services auto-deploy on git push:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Changes live in 3-5 minutes! 🚀
