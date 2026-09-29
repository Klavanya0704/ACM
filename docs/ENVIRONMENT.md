# SITE ACM Student Chapter — Environment Variables Matrix

This document provides a complete matrix of all environment variables used by the SITE ACM platform across development and production environments.

---

## Environment Variable Reference Table

| Variable Name | Location | Scope | Public / Private | Required | Description & Value Example |
|---------------|----------|-------|------------------|----------|-----------------------------|
| `VITE_SUPABASE_URL` | Frontend | `.env` / Vercel / Netlify | **Public** | Yes (prod) | Supabase project URL (`https://xyz.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Frontend | `.env` / Vercel / Netlify | **Public** | Yes (prod) | Supabase anonymous API key |
| `VITE_API_BASE_URL` | Frontend | `.env` / Vercel / Netlify | **Public** | Optional | Custom backend API base URL (`http://localhost:5000`) |
| `PORT` | Backend | `.env` / Render | **Private** | Optional | Backend service listening port (Default: `5000`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend | `.env` / Render | **Private** | Optional | Supabase service-role secret key (Server-side only!) |

---

## Security Warnings

> [!CAUTION]
> **NEVER** commit files containing private credentials or API keys (such as `.env` or `.env.local`) to Git.
> Ensure `.env` is listed in `.gitignore`.
