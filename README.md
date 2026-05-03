# Team Task Manager Fullstack App

A collaborative project management application built with **Next.js**, **Node.js (Express)**, **Prisma (PostgreSQL)**, and **Nodemailer**. Users can create/join projects, assign tasks, update statuses, and view their dashboard metrics.

---

## 📁 Project Structure

```text
├── Backend/                 # Express REST API, Prisma schema & controllers
│   ├── src/                 # Backend source code
│   ├── .env.example         # Example backend environment variables
│   └── package.json
└── Frontend/next-monorepo/  # Next.js monorepo workspaces
    ├── apps/web/            # Frontend Next.js app
    │   ├── .env.example     # Example frontend environment variables
    └── package.json         # Turborepo & NPM workspaces config
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (>= v20)
- **PostgreSQL** database (Local or Cloud instance like Railway)
- **NPM** package manager

---

### 2. Backend Setup
1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the environment variables in `.env` with your PostgreSQL database URL and Nodemailer Gmail credentials:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
5. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
6. Run the dev server:
   ```bash
   npm run dev
   ```
   The backend will be live on `http://localhost:5000`.

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the root frontend monorepo directory:
   ```bash
   cd Frontend/next-monorepo
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file inside `apps/web` based on `.env.example`:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
4. Update `NEXT_PUBLIC_API_URL` to point to the backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
5. Start the frontend in development mode:
   ```bash
   npm run dev
   ```
   The frontend will be live on `http://localhost:3001`.

---

## 💻 Working Over Local Wi-Fi
To test the app across different devices (like another laptop) on the same Wi-Fi network:

1. Update the frontend API URL in `Frontend/next-monorepo/apps/web/.env.local` to use the host's actual Wi-Fi IP address instead of `localhost`:
   ```env
   NEXT_PUBLIC_API_URL=http://<YOUR_WIFI_IP>:5000/api
   ```
2. Open the frontend from both laptops using the same Wi-Fi IP:
   👉 `http://<YOUR_WIFI_IP>:3001`

---

## 🌐 Railway Deployment
You can deploy your backend and frontend to Railway using separate services within the same project.

### 1. Backend Service
1. Add a **New Service** from your connected GitHub Repo.
2. Set the **Root Directory** to `Backend`.
3. Set your backend environment variables (`DATABASE_URL`, `JWT_SECRET`, etc.) in Railway.

### 2. Frontend Service
1. Add a **New Service** from your connected GitHub Repo.
2. Set the **Root Directory** to `Frontend/next-monorepo`.
3. Set the frontend environment variables in Railway:
   - `NEXT_PUBLIC_API_URL` = `<YOUR_LIVE_BACKEND_URL>/api`
