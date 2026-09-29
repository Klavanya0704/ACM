# SITE ACM Student Chapter — Express Backend API

Official Express REST API backend service for the SITE ACM Student Chapter web platform.

## Features
- **Health Endpoint**: `GET /health` for Render & monitoring.
- **Events API**: Full public retrieval and protected admin CRUD (`GET /api/events`, `POST /api/admin/events`).
- **Registrations API**: Student event signups (`POST /api/events/:id/register`) and admin status tracking.
- **Membership Requests API**: Student interest submissions (`POST /api/membership-requests`) and admin review workflow.
- **Members API**: Official member directory management (`GET /api/members`, `POST /api/admin/members`).
- **Authentication & Authorization**: Supabase Auth session token validation and admin role checks.

## Quick Start (Development)

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server runs on `http://localhost:5000`.
