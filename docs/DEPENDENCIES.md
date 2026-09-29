# SITE ACM Student Chapter — Project Dependencies & Versions

This document details all required software, environment runtimes, and exact package versions used by the SITE ACM platform.

---

## 1. System Requirements & Global Runtime

| Component | Required Version | Purpose | Global Package Required? |
|-----------|------------------|---------|--------------------------|
| **Node.js** | `v18.0.0` – `v20.x LTS` (Tested on Node 20) | JavaScript Runtime | Yes (Installed on System) |
| **npm** | `v9.0.0+` | Package Manager | Yes (Included with Node) |
| **Git** | `v2.30.0+` | Version Control System | Yes (Installed on System) |

> [!NOTE]
> **No global npm package is required.** All build utilities, CLI tools, and servers run locally via project `package.json` scripts.

---

## 2. Frontend Dependencies (`package.json`)

### Core Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^19.0.0` | UI component library |
| `react-dom` | `^19.0.0` | React DOM rendering engine |
| `react-router-dom` | `^7.1.5` | Client-side SPA routing |
| `framer-motion` | `^13.4.4` | UI entrance animations & transitions |
| `lucide-react` | `^0.475.0` | SVG icons library |
| `@supabase/supabase-js` | `^2.49.1` | Supabase database & Auth SDK |
| `clsx` | `^2.1.1` | Class name composition utility |
| `tailwind-merge` | `^3.0.1` | Tailwind CSS class merging utility |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | `^6.1.0` | Frontend dev server & production bundler |
| `@vitejs/plugin-react` | `^4.3.4` | React Fast Refresh plugin for Vite |
| `tailwindcss` | `^3.4.17` | Utility-first CSS framework |
| `postcss` | `^8.5.1` | CSS processor for Tailwind |
| `autoprefixer` | `^10.4.20` | CSS vendor prefixer |

---

## 3. Backend Dependencies (`backend/package.json`)

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `express` | `^4.21.2` | Web framework for Node.js REST API |
| `@supabase/supabase-js` | `^2.49.1` | Server-side Supabase admin client |
| `cors` | `^2.8.5` | Cross-Origin Resource Sharing middleware |
| `dotenv` | `^16.4.7` | Environment variable loader |
| `helmet` | `^8.0.0` | HTTP security headers middleware |
| `morgan` | `^1.10.0` | HTTP request logger |
| `express-validator` | `^7.2.1` | Request body validation middleware |

---

## 4. Installation Verification

To verify dependency integrity locally:
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```
Both commands must complete with **exit code 0** and zero vulnerabilities.
