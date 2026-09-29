# SITE ACM Student Chapter — Full-Stack Architecture

This document details the software architecture, component relationships, data flow, and deployment topology of the SITE ACM Student Chapter platform.

---

## 1. High-Level System Architecture Flow

```
                    USERS
                      │
                      ▼
              React + Vite
                 FRONTEND
             (Vercel / Netlify)
                      │
                 HTTPS REST API
                      │
                      ▼
             Node.js + Express
                 BACKEND
                (Render)
                      │
             Secure DB access
                      │
                      ▼
                 SUPABASE
        ┌─────────────┼─────────────┐
        │             │             │
    PostgreSQL      Auth         Storage
        │
        ▼
   Events / Members /
   Registrations /
   Membership Requests
```

---

## 2. Technology Stack & Multi-Tier Topology

### Tier 1: Frontend Single Page Application (SPA)
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 6 (`vite`)
- **Routing**: React Router 7 (`react-router-dom`)
- **Styling**: Tailwind CSS v3 (`tailwindcss`, `autoprefixer`, `postcss`)
- **Animations**: Framer Motion 13 (`framer-motion`)
- **Icons**: Lucide React (`lucide-react`)
- **Hosting Targets**: **Vercel** & **Netlify**

### Tier 2: Backend REST API Service
- **Runtime Environment**: Node.js `v18+` / `v20+`
- **Framework**: Express (`express`)
- **Middleware**: `cors`, `helmet`, `morgan`, `express-validator`
- **Hosting Target**: **Render** (Web Service with `/health` check monitoring)

### Tier 3: Database, Auth & Storage (BaaS)
- **Database Engine**: PostgreSQL 15 via **Supabase**
- **Security**: Row Level Security (RLS) policies
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage Buckets (`event-images`, `member-photos`)

---

## 3. Deployment Mapping

| Layer | Technology | Hosting Provider | Deployment Config |
|-------|------------|------------------|-------------------|
| **Frontend** | React + Vite | **Vercel** / **Netlify** | `vercel.json` / `netlify.toml` |
| **Backend API** | Node.js + Express | **Render** | `render.yaml` |
| **Database/Auth** | PostgreSQL | **Supabase** | `supabase/migrations/` |
