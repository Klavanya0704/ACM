# SITE ACM Student Chapter — Complete Deployment Pipeline

This document outlines the step-by-step production deployment workflow for the SITE ACM Student Chapter platform.

---

## Production Deployment Flow Diagram

```
[ GitHub Repository ]
        │
        ├─────────────────────────────┐
        ▼                             ▼
[ Supabase Database ]       [ Vercel / Netlify / Render ]
  • Run Schema Migration      • Frontend Build (npm run build)
  • Set RLS Policies          • Configure Environment Variables
  • Set up Auth               • SPA Routing Rewrites
        │                             │
        └──────────────┬──────────────┘
                       ▼
          [ Live Production Site ]
```

---

## Step-by-Step Deployment Order

### 1. Database Setup (Supabase)
1. Log into [Supabase](https://supabase.com).
2. Create project `SITE ACM Student Chapter`.
3. Execute `supabase/migrations/20260929000000_site_acm_schema.sql` in the SQL Editor.
4. Copy `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from **Project Settings -> API**.

### 2. Push Source Code to GitHub
```bash
git add .
git commit -m "feat: complete SITE ACM website and admin dashboard"
git push -u origin main
```

### 3. Deploy Frontend (Vercel / Netlify / Render)
Choose your preferred platform:
- **Vercel** (Recommended): Follow [VERCEL.md](./VERCEL.md)
- **Netlify**: Follow [NETLIFY.md](./NETLIFY.md)
- **Render**: Follow [RENDER.md](./RENDER.md)

### 4. Post-Deployment Verification Checklist
- [ ] Visit home page `/` and verify graphics, hero, and metrics load.
- [ ] Check `/events` and open `/events/prayatna-2-0`.
- [ ] Refresh `/events/prayatna-2-0` directly in browser to test SPA routing (should NOT return 404).
- [ ] Test student membership interest form at `/membership`.
- [ ] Test student event registration modal on an active event.
- [ ] Log into `/admin/login` and verify stats on `/admin`.
- [ ] Inspect `/admin/membership-requests` to review submitted student requests.
