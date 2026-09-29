# SITE ACM Student Chapter — Architecture & Technology Stack

This document details the software architecture, component relationships, data flow, and deployment topology of the SITE ACM Student Chapter platform.

---

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                           │
│  React 19 + Vite 6 + Tailwind CSS + Framer Motion           │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
        HTTPS  │ Direct Public REST API       │ Admin Auth
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE (BaaS)                          │
│  - PostgreSQL Database (RLS Secured)                        │
│  - Storage Buckets (Banners, Logos)                         │
│  - GoTrue Auth Engine                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Frontend Stack
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 6 (`vite`)
- **Routing**: React Router 7 (`react-router-dom`)
- **Styling**: Tailwind CSS v3 (`tailwindcss`, `autoprefixer`, `postcss`)
- **Animations**: Framer Motion 13 (`framer-motion`)
- **Iconography**: Lucide React (`lucide-react`)
- **Database Client**: `@supabase/supabase-js` v2

### Backend & Database (BaaS)
- **Database Engine**: PostgreSQL 15 via Supabase
- **Security**: Row Level Security (RLS) policies
- **Authentication**: Supabase Auth / Local Storage Auth fallback

### Target Hosting & Deployment Infrastructure
- **Frontend Host**: Vercel / Netlify / Render (Static Site)
- **Database Host**: Supabase Cloud
- **Version Control**: Git + GitHub (`Klavanya0704/ACM`)
