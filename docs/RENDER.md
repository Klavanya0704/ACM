# SITE ACM Student Chapter — Render Deployment Guide

This guide details how to deploy the SITE ACM project on Render as a Static Site or backend service.

---

## Deploying as a Static Site on Render

1. Log into [Render Dashboard](https://dashboard.render.com).
2. Click **New + -> Static Site**.
3. Connect repository `Klavanya0704/ACM`.
4. Configure:
   - **Name**: `site-acm-website`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-anon-public-key`
6. Click **Create Static Site**.

---

## Native `render.yaml` Blueprint

The project root includes `render.yaml` for 1-click Render blueprint deployment:
```yaml
services:
  - type: web
    name: site-acm-website
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

## Optional Backend Proxy / Health Endpoint

If deploying a custom backend API on Render (Node.js/Express):
- Configure environment variable `PORT=5000`
- Expose GET `/health` endpoint returning:
  ```json
  {
    "status": "ok",
    "service": "SITE ACM Backend"
  }
  ```
- Update frontend environment variable `VITE_API_BASE_URL` to point to `https://<your-render-service>.onrender.com`.
