# SITE ACM Student Chapter — Development Guide

This guide details the internal development conventions, code organization, state management, and build workflow for the SITE ACM Student Chapter web platform.

---

## 1. Project Structure Overview

```
c:\Users\Lavanya\Downloads\ACM\
├── public/                 # Static assets (images, logos, robots.txt, sitemap.xml)
├── src/
│   ├── components/         # Reusable UI components (Header, Footer, Hero, Cards, Modals)
│   ├── components/admin/   # Admin layout & protection guards
│   ├── data/               # Default static data and constants
│   ├── lib/                # Libraries and API helpers (supabase.js, api.js)
│   ├── pages/              # Public page views (Home, About, Events, Members, etc.)
│   ├── pages/admin/        # Protected admin management pages
│   ├── services/           # Data services (events, members, registrations, requests, auth)
│   ├── App.jsx             # React Router routing configuration
│   ├── main.jsx            # React root entry point
│   └── index.css           # Global Tailwind CSS styles and glassmorphism tokens
├── supabase/               # SQL migrations and configuration
├── docs/                   # Complete project documentation
├── package.json            # Node.js dependencies and build scripts
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment & routing config
├── netlify.toml            # Netlify deployment & routing config
└── render.yaml             # Render deployment config
```

---

## 2. Key Commands

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `vite` | Starts local development server on port 3000 |
| `npm run build` | `vite build` | Compiles production bundle into `dist/` |
| `npm run preview` | `vite preview` | Previews production build locally |

---

## 3. Data Service Layer Architecture

All data operations are encapsulated inside `src/services/`:

- **`eventsService.js`**: Handles event listing, detail fetching, creation, editing, and deletion.
- **`registrationsService.js`**: Handles public event registration and admin status updates.
- **`membershipRequestsService.js`**: Manages membership interest form submissions and admin reviews.
- **`membersService.js`**: Manages official chapter member records.
- **`authService.js`**: Controls admin authentication session state.

Each service follows a dual-mode pattern:
1. If Supabase keys are configured (`import.meta.env.VITE_SUPABASE_URL`), query PostgreSQL tables via `@supabase/supabase-js`.
2. If Supabase keys are missing, automatically fall back to browser local storage (`localStorage`).

---

## 4. UI & Styling Guidelines

- **Primary Colors**: ACM Blue (`#0066CC`), Deep Navy (`#051630`), Slate (`#F8FAFC`).
- **Glassmorphism**: Glass translucency, `backdrop-blur-md`, soft blue borders (`border-blue-100/50`).
- **Icons**: Lucide React icons (`import { Calendar, Users } from 'lucide-react'`).
- **Animations**: Subtle entry transitions powered by Framer Motion.
