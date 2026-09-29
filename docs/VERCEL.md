# SITE ACM Student Chapter — Vercel Deployment Guide

This document details how to deploy the SITE ACM website to Vercel with single-page application (SPA) routing.

---

## Deployment Steps

1. **Log in to Vercel**
   Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.

2. **Import GitHub Repository**
   Select `Klavanya0704/ACM` from your connected GitHub repositories.

3. **Configure Project Settings**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**
   Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-anon-public-key`

5. **Deploy**
   Click **Deploy**. Vercel will build and publish your project.

---

## SPA Routing Verification

The repository includes `vercel.json` with standard SPA rewrite rules:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Route Testing
After deployment succeeds, test direct URL refresh for:
- `https://<your-vercel-domain>.vercel.app/`
- `https://<your-vercel-domain>.vercel.app/about`
- `https://<your-vercel-domain>.vercel.app/events/prayatna-2-0`
- `https://<your-vercel-domain>.vercel.app/membership`
- `https://<your-vercel-domain>.vercel.app/admin`

All direct refreshes must return HTTP 200 and load the React Router page without 404 errors.
