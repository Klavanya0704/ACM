# SITE ACM Student Chapter — Workshop Presentation Guide

This guide provides simple, beginner-friendly explanations and diagrams to teach the SITE ACM full-stack architecture in a classroom or workshop setting.

---

## 1. What is the SITE ACM Platform?

The **SITE ACM Student Chapter Platform** is a 3-tier full-stack application designed for students and chapter administrators at Sasi Institute of Technology & Engineering.

It handles:
- Public event discovery and technical hackathons showcase.
- Student event signups and automatic seat registration.
- Student membership interest form applications.
- Protected admin management for event creation, registration auditing, and member onboarding.

---

## 2. The 3-Layer Architecture

```
                    USERS (Browser)
                          │
                          ▼
             ┌────────────────────────┐
             │       LAYER 1          │
             │   React 19 + Vite 6    │  <-- Presentation / UI (Vercel / Netlify)
             │   SITE ACM Frontend    │
             └───────────┬────────────┘
                         │
                    HTTPS REST API
                         │
                         ▼
             ┌────────────────────────┐
             │       LAYER 2          │
             │   Node.js + Express    │  <-- Business Logic & Security (Render)
             │     Backend API        │
             └───────────┬────────────┘
                         │
                    Secure DB Access
                         │
                         ▼
             ┌────────────────────────┐
             │       LAYER 3          │
             │   Supabase Cloud BaaS  │  <-- Database / Auth / Storage
             │ (PostgreSQL Database)  │
             └────────────────────────┘
```

---

## 3. Data Workflows Made Simple

### Workflow A: Admin Event Creation
```
Admin Officer -> Adds "Code to Cloud" on Admin Panel
             -> POST /api/admin/events (Express Backend)
             -> Backend validates & inserts into Supabase "events" table
             -> Public /events page automatically displays "Code to Cloud"!
```

### Workflow B: Student Event Registration
```
Student -> Opens /events/prayatna-2-0 and clicks "Register"
        -> Fills Full Name, Email, Roll Number & Department
        -> POST /api/events/:id/register (Express Backend)
        -> Backend validates data & inserts into Supabase "event_registrations"
        -> Admin Dashboard immediately sees student in Registration List!
```

### Workflow C: Student Membership Request
```
Student -> Fills Membership Interest Form on /membership
        -> POST /api/membership-requests (Express Backend)
        -> Saved in Supabase "membership_requests" table with status "pending"
        -> Admin reviews and marks request as "reviewed" or "approved".
```

---

## 4. Multi-Cloud Deployment Mapping

- **React Frontend**: Deployed on **Vercel** & **Netlify**
- **Node.js Express API**: Deployed on **Render**
- **Database & Auth**: Managed by **Supabase**

---

## 5. Live Demonstration Commands (Two-Terminal Workflow)

--------------------------------
TERMINAL 1 — BACKEND
--------------------------------

```bash
cd C:\Users\Lavanya\Downloads\ACM\backend
npm install
npm run dev
```

- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Health**: [http://localhost:5000/health](http://localhost:5000/health)


--------------------------------
TERMINAL 2 — FRONTEND
--------------------------------

```bash
cd C:\Users\Lavanya\Downloads\ACM
npm install
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

