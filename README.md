# SITE ACM Student Chapter

> **Official Website & Admin Management Platform for SITE ACM Student Chapter**  
> *Sasi Institute of Technology & Engineering, Tadepalligudem, Andhra Pradesh, India.*  
> **Chartered:** September 4, 2018 | **Chapter Sub-group:** 171408

---

## 🚀 Overview

The **SITE ACM Student Chapter** platform is a modern, high-performance web application built for showcasing student technical events, hackathons, workshops, achievements, member rosters, and handling student membership requests and event signups. It includes a protected **Admin Control Dashboard** for chapter officers to manage events, track student signups, and review membership requests in real-time.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 19, Vite 6, Tailwind CSS v3, Framer Motion 13, Lucide React
- **Routing**: React Router v7 (SPA with Vercel & Netlify rewrite support)
- **Database & Backend**: PostgreSQL via Supabase BaaS (with RLS security & fallback local storage)
- **Deployment**: Vercel, Netlify, Render ready

---

## 📁 Repository Structure

```
SITE-ACM/
├── public/                 # Static brand assets, campus imagery, robots.txt, sitemap.xml
├── src/
│   ├── components/         # Reusable UI components (Header, Footer, Hero, Modals, Cards)
│   ├── components/admin/   # Protected admin sidebar layout & route guards
│   ├── data/               # Official chapter statistics & static data
│   ├── lib/                # Centralized API helpers & Supabase client initialization
│   ├── pages/              # Public views (Home, About, Events, Members, Membership, etc.)
│   ├── pages/admin/        # Protected admin management dashboards
│   ├── services/           # Data services (Events, Members, Registrations, Requests, Auth)
│   ├── App.jsx             # Route definitions & scroll behavior
│   └── index.css           # Global Tailwind utilities & glassmorphism theme
├── supabase/               # SQL migrations, seed data, and Supabase CLI configuration
│   ├── migrations/         # Reproducible PostgreSQL schema SQL files
│   ├── config.toml         # Local Supabase environment config
│   └── README.md           # Database setup instructions
├── docs/                   # Complete developer & deployment documentation
│   ├── SETUP.md            # Zero-to-hero local environment setup
│   ├── DEVELOPMENT.md      # Development guidelines & conventions
│   ├── DEPLOYMENT.md       # End-to-end production deployment guide
│   ├── VERCEL.md           # Vercel deployment & SPA routing configuration
│   ├── NETLIFY.md          # Netlify deployment & redirect setup
│   ├── RENDER.md           # Render deployment configuration
│   ├── SUPABASE.md         # Database security & RLS policies
│   ├── ENVIRONMENT.md      # Environment variable matrix
│   ├── DATABASE.md         # PostgreSQL database dictionary
│   ├── ARCHITECTURE.md     # Technology stack & system design
│   └── TROUBLESHOOTING.md  # Common issues & instant resolutions
├── .env.example            # Environment variable template (No secrets!)
├── .gitignore              # Strict ignore rules for node_modules, build outputs, and secrets
├── vercel.json             # Vercel SPA routing rewrite rules
├── netlify.toml            # Netlify build and redirect configuration
├── render.yaml             # Render static site blueprint configuration
├── package.json            # Dependencies and scripts
└── README.md               # Root documentation
```

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v18.0.0+` (v20 LTS recommended)
- npm `v9.0.0+`

### 2. Independent Two-Terminal Startup

--------------------------------
TERMINAL 1 — BACKEND
--------------------------------

```bash
cd C:\Users\Lavanya\Downloads\ACM\backend
npm install
npm run dev
```

- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Health**: [http://localhost:5000/health](http://localhost:5000/health)

--------------------------------
TERMINAL 2 — FRONTEND
--------------------------------

```bash
cd C:\Users\Lavanya\Downloads\ACM
npm install
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🛡 Environment Variables

| Variable | Scope | Public/Private | Purpose |
|----------|-------|----------------|---------|
| `VITE_SUPABASE_URL` | Frontend | **Public** | Supabase project API URL |
| `VITE_SUPABASE_ANON_KEY` | Frontend | **Public** | Supabase public anonymous key |
| `VITE_API_BASE_URL` | Frontend | **Public** | Optional custom backend proxy URL |

---

## 🌐 Production Deployment

The project is fully pre-configured for instant deployment on:

- **Vercel**: Pre-configured with `vercel.json` SPA rewrites. See [docs/VERCEL.md](./docs/VERCEL.md).
- **Netlify**: Pre-configured with `netlify.toml` redirects. See [docs/NETLIFY.md](./docs/NETLIFY.md).
- **Render**: Pre-configured with `render.yaml` blueprint. See [docs/RENDER.md](./docs/RENDER.md).
- **Supabase**: Complete schema in `supabase/migrations/`. See [docs/SUPABASE.md](./docs/SUPABASE.md).

---

## 📜 Documentation Index

- 📘 [Setup Guide](./docs/SETUP.md)
- 💻 [Development Guide](./docs/DEVELOPMENT.md)
- 🚀 [Deployment Guide](./docs/DEPLOYMENT.md)
- 📊 [Database Schema](./docs/DATABASE.md)
- 🔒 [Environment Matrix](./docs/ENVIRONMENT.md)
- 🏗 [System Architecture](./docs/ARCHITECTURE.md)
- 🔧 [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

## 👥 Chapter Officers

- **Faculty Sponsor**: Dr. Sivakumar Perumal
- **Chair**: Manuri Susatwik
- **Vice Chair**: Durga Satya Sai Charan Kona
- **Treasurer**: Akhil Kumar Yandamuri
- **Secretary**: Kolluri Durga Sai Lavanya
- **Membership Chair**: Teja Kiran Chandu Kanuri
