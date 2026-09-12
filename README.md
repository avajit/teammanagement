# Team Task Manager Fullstack App

A collaborative project management application built with **Next.js**, **Node.js (Express)**, **Prisma (PostgreSQL)**, and **Nodemailer**. Users can create/join projects, assign tasks, update status, and get email notifications.

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🌐 Live Demo 

> **Coming Soon!** Deploy using the guide below

- **Frontend:** Your deployed Vercel URL
- **Backend API:** Your deployed Render URL
- **Health Check:** `{backend-url}/api/health`

---

## 📁 Project Structure

```text
├── Backend/                 # Express REST API, Prisma schema & controllers
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, error handling
│   │   ├── dtos/            # Data transfer objects
│   │   ├── validators/      # Input validation
│   │   └── lib/             # Utilities (Prisma client, JWT)
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── .env.example         # Environment variables template
│   ├── index.js             # Server entry point
│   └── package.json
│
└── Frontend/next-monorepo/  # Next.js monorepo workspaces
    ├── apps/web/            # Frontend Next.js app
    │   ├── app/             # Next.js App Router pages
    │   │   ├── (auth)/      # Login, signup pages
    │   │   └── (dashboard)/ # Main app pages
    │   ├── components/      # React components
    │   ├── hooks/           # Custom React hooks
    │   ├── services/        # API call utilities
    │   ├── context/         # React context
    │   ├── constants/       # App constants
    │   └── .env.example
    ├── packages/
    │   ├── ui/              # Shared UI components (shadcn/ui)
    │   ├── eslint-config/   # Shared ESLint config
    │   └── typescript-config/
    └── package.json         # Monorepo configuration
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** (>= v20)
- **PostgreSQL** database (local or cloud)
- **NPM** package manager

### Backend Setup

```bash
# Navigate to Backend
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your values:
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname
# JWT_SECRET=your_secret_key
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to Frontend
cd Frontend/next-monorepo

# Install dependencies
npm install

# Create .env.local
cp apps/web/.env.example apps/web/.env.local

# Update .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3001`

---

## 💻 Testing Over Local Wi-Fi

To access the app from another device on the same network:

1. Find your machine's Wi-Fi IP:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Update `Frontend/next-monorepo/apps/web/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://<YOUR_WIFI_IP>:5000/api
   ```

3. Access from any device:
   ```
   http://<YOUR_WIFI_IP>:3001
   ```

---

## 🎯 Features

✅ User authentication (Signup, Login, Password reset via OTP)  
✅ Create and manage projects  
✅ Add team members to projects  
✅ Assign tasks with priority levels  
✅ Track task status (TODO, IN_PROGRESS, DONE)  
✅ Email notifications (Nodemailer + Gmail SMTP)  
✅ JWT-based authorization  
✅ PostgreSQL database with Prisma ORM  
✅ Next.js monorepo with Turbo  
✅ Tailwind CSS + shadcn/ui components  

---

# 🚀 FREE TIER DEPLOYMENT GUIDE

Deploy your app **completely FREE** to the internet in **30 minutes!**

**Cost: $0/month** ✅

---

## Architecture

```
┌──────────────────────────────────────────┐
│  Frontend: Vercel (Next.js)              │
│  FREE: 100GB bandwidth/month             │
└──────────────────────────┬───────────────┘
                           │ API calls (HTTPS)
┌──────────────────────────▼───────────────┐
│  Backend: Render (Node.js/Express)       │
│  FREE: 750 hours/month                   │
└──────────────────────────┬───────────────┘
                           │ SQL queries
┌──────────────────────────▼───────────────┐
│  Database: Neon (PostgreSQL)             │
│  FREE: 3GB storage, 20 connections       │
└──────────────────────────────────────────┘
```

---

## ⚡ Step-by-Step Deployment (30 minutes)

### STEP 1️⃣: Create Database (5 min)

1. Go to: **https://console.neon.tech**
2. Click **"Sign up with GitHub"**
3. Click **"New Project"**
4. Name: `teammanagement`
5. Click **"Create Project"**
6. Go to **"Connection strings"** tab
7. **COPY** the PostgreSQL connection string:
   ```
   postgresql://user:password@ep-xxxx.us-east-1.neon.tech/databasename?sslmode=require
   ```
8. **SAVE THIS** - you'll paste it in Step 3

✅ **Database is ready!**

---

### STEP 2️⃣: Set Up Gmail App Password (5 min)

Your app will send emails from your Gmail account (free).

1. Go to: **https://myaccount.google.com/security**
2. Find **"2-Step Verification"** - Turn it ON (if not already)
3. Go to: **https://myaccount.google.com/apppasswords**
4. Choose:
   - App: **Mail**
   - Device: **Your device type**
5. Google gives you a **16-character password**
6. **COPY IT** - you'll need it in Step 3

✅ **Email is ready!**

---

### STEP 3️⃣: Deploy Backend on Render (10 min)

1. Go to: **https://render.com**
2. Click **"Sign up"** → **"Sign up with GitHub"**
3. Authorize & complete signup
4. Click **"+ New"** → **"Web Service"**
5. Click **"Connect a GitHub repository"**
6. Search for: **`teammanagement`** and click it
7. Click **"Connect"**

**Configure:**
- **Name:** `teammanagement-backend`
- **Environment:** `Node`
- **Build Command:** `npm install && npx prisma generate`
- **Start Command:** `npm start`
- **Root Directory:** `Backend`
- **Plan:** Select **"Free"** ✅
- Click **"Create Web Service"**

⏳ **Wait 2-3 minutes while it deploys...**

**Add Environment Variables:**

Click **"Environment"** tab and add each variable:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DATABASE_URL` | Paste from Step 1 |
| `JWT_SECRET` | `ThisIsATestKey12345678901234567890` |
| `EMAIL_USER` | Your Gmail (e.g., `your@gmail.com`) |
| `EMAIL_PASS` | The 16-char password from Step 2 |
| `CLIENT_URL` | Leave empty for now |

After each one, click **"Save"**

⏳ **Auto-deploys** (1-2 min)

**Get Backend URL:**
1. You'll see a URL like: `https://teammanagement-backend-xxxx.onrender.com`
2. **COPY THIS URL** - you need it for Step 4
3. Test it: Open `https://your-backend-url/api/health` in browser
   - Should show: `{"status":"ok","message":"Backend connected to database!"}`

✅ **Backend is LIVE!**

---

### STEP 4️⃣: Deploy Frontend on Vercel (10 min)

1. Go to: **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel with your GitHub
4. Click **"Add New"** → **"Project"**
5. Search for: **`teammanagement`** and click it
6. Click **"Import"**

**Configure:**
- **Framework:** `Next.js` ✅
- **Root Directory:** `Frontend/next-monorepo/apps/web`
- Leave other settings as default

**Add Environment Variable:**
- **Key:** `NEXT_PUBLIC_API_URL`
- **Value:** Your backend URL from Step 3
  - Example: `https://teammanagement-backend-xxxx.onrender.com/api`

Click **"Deploy"**

⏳ **Wait 3-5 minutes...**

You'll see:
```
✅ Deployment complete!
Your site is live at: https://teammanagement-xxxx.vercel.app
```

✅ **Frontend is LIVE!**

---

### STEP 5️⃣: Connect Backend & Frontend (2 min)

1. Go back to **Render dashboard**
2. Click **`teammanagement-backend`** service
3. Click **"Environment"** tab
4. Find **`CLIENT_URL`**
5. Click edit (pencil icon)
6. **Paste** your Vercel frontend URL from Step 4
   - Example: `https://teammanagement-xxxx.vercel.app`
7. Click **"Save"**

⏳ Auto-redeploys (1-2 min)

✅ **Everything is connected!**

---

## 🎉 YOU'RE LIVE!

### Your Live URLs

```
🌐 Frontend (User Interface):
https://teammanagement-xxxx.vercel.app

⚙️ Backend API:
https://teammanagement-backend-xxxx.onrender.com/api

✅ Health Check:
https://teammanagement-backend-xxxx.onrender.com/api/health
```

### Test Your App

1. Open your **Frontend URL** in browser
2. **Sign Up** with an email
3. **Create a Project**
4. **Add Team Members**
5. **Create & Assign Tasks**

✅ Everything should work!

---

## 🔄 Auto-Deploy

Every time you push to GitHub, your app updates automatically!

```bash
# Make changes
git add .
git commit -m "Your feature"
git push origin main

# Changes live in 3-5 minutes! 🚀
```

---

## 📊 Free Tier Limits

| Service | Limit | Monthly Cost |
|---------|-------|---|
| **Vercel** | 100GB bandwidth/month | $0 |
| **Render** | 750 compute hours/month | $0 |
| **Neon** | 3GB storage | $0 |
| **Gmail** | Unlimited | $0 |
| **TOTAL** | | **$0** ✅ |

---

## ⚠️ Troubleshooting

### Backend won't deploy
1. Go to Render dashboard → Service → Logs
2. Look for error messages
3. Check if DATABASE_URL is copied correctly (no extra spaces)

### Frontend shows error
1. Make sure `NEXT_PUBLIC_API_URL` is correct
2. No trailing `/api` in the env var (code already has it)
3. Redeploy frontend from Vercel dashboard

### Emails not sending
1. Double-check Gmail app password (16 chars, exact copy)
2. Make sure 2FA is enabled on Gmail account

### Slow on first request
1. Render's free tier sleeps after 15 minutes
2. First request takes 30 seconds to wake up (normal)

---

## 📚 Additional Resources

- **Detailed Deployment Guide:** See `DEPLOYMENT_GUIDE.md`
- **Quick Reference:** See `QUICK_START_DEPLOY.md`
- **Live URLs Reference:** See `README_DEPLOYMENT.md`

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

### Backend
- **Node.js 20** - Runtime
- **Express 5** - Web framework
- **Prisma 7.8** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **express-validator** - Input validation
- **CORS** - Cross-origin requests

### DevOps
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Neon** - Database hosting
- **GitHub Actions** - CI/CD ready

---

## 📝 Environment Variables

### Backend (.env)
```dotenv
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-url.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
BCRYPT_SALT_ROUNDS=10
```

### Frontend (.env.local)
```dotenv
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

---

## 📄 Database Schema

### User
- `id` - Unique identifier (CUID)
- `name` - User full name
- `email` - Unique email
- `password` - Hashed password
- `resetOtp` - OTP for password reset
- `resetOtpExpiry` - OTP expiration time

### Project
- `id` - Unique identifier
- `name` - Project name
- `description` - Project details
- `createdBy` - Creator (User)
- `members` - Project members (ProjectMember[])
- `tasks` - Project tasks (Task[])

### ProjectMember
- `id` - Unique identifier
- `project` - Associated project
- `user` - Associated user
- `role` - ADMIN or MEMBER

### Task
- `id` - Unique identifier
- `title` - Task title
- `description` - Task details
- `priority` - LOW, MEDIUM, HIGH
- `status` - TODO, IN_PROGRESS, DONE
- `dueDate` - Task deadline
- `project` - Associated project
- `assignedTo` - Assigned user
- `createdBy` - Creator

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

---

## 📜 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💻 Author

Created by **Avajit Kumar Kewrat**

- GitHub: [@avajit](https://github.com/avajit)
- Email: [your-email@gmail.com](mailto:your-email@gmail.com)

---

## 🎯 Roadmap

- [ ] User profile customization
- [ ] Task comments & updates
- [ ] File attachments
- [ ] Calendar view
- [ ] Activity logs
- [ ] Real-time notifications (WebSocket)
- [ ] Mobile app (React Native)
- [ ] Dark mode UI
- [ ] Analytics dashboard

---

## 💡 Support

If you encounter any issues:

1. Check `DEPLOYMENT_GUIDE.md` for troubleshooting
2. Review service logs:
   - Vercel: Dashboard → Deployments → Logs
   - Render: Dashboard → Service → Logs
   - Neon: Console → Query Editor
3. Verify all environment variables are set correctly
4. Ensure GitHub repo is connected to deployment services

---

**Happy coding! 🚀**

Made with ❤️ using Next.js, Express, and PostgreSQL
