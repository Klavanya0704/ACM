# SITE ACM Student Chapter — Troubleshooting Guide

This guide provides instant diagnostics and resolutions for common issues encountered during local development, build execution, or deployment.

---

## 1. Vite Build Errors (`npm run build`)

### Symptom: `Module not found` or `Failed to resolve import`
**Solution**:
1. Run `npm install` to ensure all dependencies in `package.json` are installed.
2. Check import path casing. Windows is case-insensitive, but Linux build hosts (Vercel/Netlify) are strict!

---

## 2. React Router 404 Error on Direct Page Refresh

### Symptom: Navigating to `/events/prayatna-2-0` or `/admin` works when clicking links, but refreshing the page returns a 404 error on Vercel or Netlify.
**Solution**:
- **Vercel**: Ensure `vercel.json` exists in the root directory with the rewrite configuration:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Netlify**: Ensure `netlify.toml` exists with:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

---

## 3. Supabase Data Not Showing / Connection Warnings

### Symptom: Application displays warning "Connecting to local storage fallback".
**Solution**:
1. Verify `.env` contains valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Check that variable names start with `VITE_` (Vite requires `VITE_` prefix for client exposure).
3. Confirm RLS SELECT policies are enabled on the target table in Supabase.

---

## 4. CORS Errors on API Requests

### Symptom: Browser console shows CORS block when attempting to communicate with Supabase or backend API.
**Solution**:
- In Supabase Dashboard, go to **Project Settings -> API -> Additional Redirect URLs** and add your production Vercel/Netlify domain (e.g. `https://your-app.vercel.app`).

---

## 5. Admin Dashboard Layout / Content Clipping

### Symptom: Tables cut off horizontally or content overflowing on small screens.
**Solution**:
- Ensure main content containers use `min-w-0` and table containers use `w-full min-w-0 overflow-x-auto`.
