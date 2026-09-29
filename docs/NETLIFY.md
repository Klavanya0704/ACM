# SITE ACM Student Chapter — Netlify Deployment Guide

This guide explains how to deploy the SITE ACM website to Netlify with full SPA redirect support.

---

## Deployment Steps

1. **Log into Netlify**
   Visit [Netlify App](https://app.netlify.com) and select **Add new site -> Import an existing project**.

2. **Connect GitHub**
   Select `Klavanya0704/ACM`.

3. **Configure Build Settings**
   - **Base directory**: (Leave blank)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Set Environment Variables**
   Under **Site configuration -> Environment variables**, add:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-anon-public-key`

5. **Deploy Site**
   Click **Deploy SITE ACM**.

---

## SPA Routing Configuration (`netlify.toml`)

Netlify uses `netlify.toml` at the project root to redirect all routes to `index.html`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This guarantees that navigating directly to dynamic routes (e.g. `/events/prayatna-2-0` or `/admin`) works seamlessly after page refresh.
