# SITE ACM Student Chapter — Render & Backend Deployment Architecture

## Architecture Notice

> [!NOTE]
> **Render is NOT required** for the default SITE ACM application architecture.
> 
> The application uses **Supabase** directly as its Serverless Backend-as-a-Service (BaaS) for PostgreSQL database management, Row Level Security (RLS), Supabase Authentication, and Storage.
> 
> The recommended production deployment stack is:
> - **Vercel** or **Netlify** → Frontend Single Page Application (SPA)
> - **Supabase** → Backend / Database / Authentication / Storage

---

## Optional Render Deployment Options

If you still wish to host the static frontend on Render, or deploy a custom Node.js backend proxy in the future, follow the instructions below.

### Option A: Deploying Frontend as a Static Site on Render

1. Log into [Render Dashboard](https://dashboard.render.com).
2. Click **New + -> Static Site**.
3. Connect your GitHub repository `Klavanya0704/ACM`.
4. Configure settings:
   - **Name**: `site-acm-website`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
6. Configure Rewrite Rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`

The repository root includes `render.yaml` for this static deployment setup.

### Option B: Optional Custom Backend Web Service

If you build a custom Node.js server in the future:
- Expose a `GET /health` endpoint returning:
  ```json
  {
    "status": "ok",
    "service": "SITE ACM Backend"
  }
  ```
- Store `SUPABASE_SERVICE_ROLE_KEY` in Render environment variables (Server-side ONLY).
