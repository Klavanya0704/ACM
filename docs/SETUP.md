# SITE ACM Student Chapter — Initial Setup Guide

Welcome to the **SITE ACM Student Chapter** official web platform. This document guides developers, maintainers, and students through setting up the application locally from scratch.

---

## 1. Prerequisites

Before starting, ensure the following software is installed on your machine:

- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x LTS`)
- **npm**: `v9.0.0` or higher
- **Git**: `v2.30.0` or higher
- **Web Browser**: Chrome, Firefox, Edge, or Safari
- **Code Editor**: VS Code (recommended) with Tailwind CSS IntelliSense extension

---

## 2. Installation Steps

### Step 1: Clone the Repository
```bash
git clone https://github.com/Klavanya0704/ACM.git
cd ACM
```

### Step 2: Install Project Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the template `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Edit `.env` and fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

*Note: If Supabase credentials are left empty, the application will automatically run in local fallback mode using browser storage (`localStorage`), allowing complete offline testing!*

### Step 4: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the URL output in your terminal) in your browser.

---

## 3. Account Requirements for Production

For deploying to production, you will need free accounts on the following platforms:

1. **GitHub**: [github.com](https://github.com)
2. **Supabase**: [supabase.com](https://supabase.com)
3. **Vercel**: [vercel.com](https://vercel.com) *(Option A - Frontend)*
4. **Netlify**: [netlify.com](https://netlify.com) *(Option B - Frontend)*
5. **Render**: [render.com](https://render.com) *(Option C - Static / Backend Hosting)*
