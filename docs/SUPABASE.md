# SITE ACM Student Chapter — Supabase Database & Security Guide

This document covers Supabase setup, PostgreSQL table schema, Row Level Security (RLS) policies, and security best practices.

---

## 1. Public vs. Private Credentials

| Variable | Type | Scope | Description |
|----------|------|-------|-------------|
| `VITE_SUPABASE_URL` | **Public** | Frontend / Client | Your project API endpoint URL |
| `VITE_SUPABASE_ANON_KEY` | **Public** | Frontend / Client | Public anonymous API key (subject to RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Private** | Server-Side ONLY | Secret key bypassing RLS. **NEVER expose on client!** |

---

## 2. Table Schemas & Relationships

1. **`events`**: Technical workshops, hackathons, outreach, seminars.
2. **`event_registrations`**: Student event registration signups linked to `events(id)`.
3. **`membership_requests`**: Student membership interest submissions reviewed by chapter officers.
4. **`members`**: Verified official SITE ACM student chapter directory.
5. **`team_members`**: Faculty sponsor and chapter officers (Chair, Vice Chair, Treasurer, Secretary, Membership Chair).
6. **`achievements`**: Awards, hackathon wins, and chapter milestones.
7. **`gallery`**: Photo archives categorized by events.
8. **`workshops`**: Technical learning tracks and curriculum topics.
9. **`contact_messages`**: Public contact form messages sent to officers.

---

## 3. RLS Security Policies

All tables have RLS enabled:
- **Public Read Access**: Enabled for `events`, `members`, `team_members`, `achievements`, `gallery`, `workshops`.
- **Public Insert Access**: Enabled for `event_registrations`, `membership_requests`, `contact_messages`.
- **Admin Access**: Authenticated sessions have full `ALL` CRUD operations on all tables.
