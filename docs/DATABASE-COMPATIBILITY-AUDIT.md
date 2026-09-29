# SITE ACM Student Chapter — Database Compatibility & Schema Audit Report

**Audit Date**: September 29, 2026  
**Canonical Source of Truth**: `supabase/migrations/20260929000000_site_acm_schema.sql`  
**Status**: 100% Verified & Aligned  

---

## 1. Executive Summary

A comprehensive, end-to-end database integration audit was executed across the **SITE ACM Student Chapter** platform:
- **Database Schema**: 9 canonical PostgreSQL tables with Row-Level Security (RLS) policies.
- **Frontend Layer**: React + Vite services (`src/services/`), stateful components, and admin pages.
- **Backend API Layer**: Node.js + Express routes (`backend/src/routes/`), controllers, and middleware.

All discovered schema mismatches, timestamp inconsistencies, and presentation field conflicts have been resolved to strictly adhere to the database migration without altering the database schema or generating duplicate columns.

---

## 2. Table-by-Table Compatibility Matrix

| Table | Canonical DB Column | Data Type | Nullable / Default | Frontend Reference | Backend Reference | Status | Notes |
|:------|:-------------------|:----------|:-------------------|:-------------------|:------------------|:-------|:------|
| **`events`** | `id` | UUID | PK (`uuid_generate_v4()`) | `evt.id` | `req.params.id` / `id` | **MATCH** | UUID Primary Key |
| | `title` | VARCHAR(255) | NOT NULL | `evt.title` | `req.body.title` | **MATCH** | Event Title |
| | `slug` | VARCHAR(255) | UNIQUE NOT NULL | `evt.slug` | `req.body.slug` | **MATCH** | Unique URL path |
| | `category` | VARCHAR(100) | NOT NULL | `evt.category` | `req.body.category` | **MATCH** | Workshop, Hackathon, Seminar, etc. |
| | `mode` | VARCHAR(50) | DEFAULT 'On Campus' | `evt.mode` | `req.body.mode` | **MATCH** | On Campus, Online, Hybrid |
| | `event_date` | TIMESTAMPTZ | NOT NULL | `evt.event_date` | `req.body.event_date` | **MATCH** | Timestamp column (Used for `.order('event_date')`) |
| | `location` | VARCHAR(255) | NOT NULL | `evt.location` | `req.body.location` | **MATCH** | Venue name |
| | `description` | TEXT | NOT NULL | `evt.description` | `req.body.description` | **MATCH** | Full description |
| | `speaker` | VARCHAR(255) | NULL | `evt.speaker` | `req.body.speaker` | **FIXED** | Aligned from `speaker_name` |
| | `speaker_title` | VARCHAR(255) | NULL | `evt.speaker_title` | `req.body.speaker_title` | **FIXED** | Aligned from `speaker_designation` |
| | `attendance` | INTEGER | DEFAULT 0 | `evt.attendance` | `req.body.attendance` | **MATCH** | Participant count |
| | `volunteers_count`| INTEGER | DEFAULT 0 | `evt.volunteers_count` | `req.body.volunteers_count` | **FIXED** | Aligned from `volunteers` |
| | `faculty_sponsors_count` | INTEGER | DEFAULT 0 | `evt.faculty_sponsors_count` | `req.body.faculty_sponsors_count` | **MATCH** | Sponsor count |
| | `collaboration` | VARCHAR(255) | NULL | `evt.collaboration` | `req.body.collaboration` | **MATCH** | Partner chapters/colleges |
| | `topics` | TEXT[] | NULL | `evt.topics` | `req.body.topics` | **MATCH** | Text array of topics |
| | `image_url` | TEXT | NULL | `evt.image_url` | `req.body.image_url` | **MATCH** | Banner image URL |
| | `registration_status` | VARCHAR(50) | DEFAULT 'Open' | `evt.registration_status` | `req.body.registration_status` | **MATCH** | Open, Closed, Upcoming |
| | `is_featured` | BOOLEAN | DEFAULT FALSE | `evt.is_featured` | `req.body.is_featured` | **MATCH** | Showcase flag |
| | `is_upcoming` | BOOLEAN | DEFAULT FALSE | `evt.is_upcoming` | `req.body.is_upcoming` | **MATCH** | Upcoming event flag |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `evt.created_at` | `created_at` | **MATCH** | Creation timestamp |
| | `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | `evt.updated_at` | `updated_at` | **MATCH** | Last modified timestamp |
| | *`badge_day`* | *N/A* | *N/A* | `deriveEventBadge(date)` | *N/A* | **DERIVED/UI ONLY** | Derived dynamically from `event_date`; not stored in DB |
| | *`badge_month`* | *N/A* | *N/A* | `deriveEventBadge(date)` | *N/A* | **DERIVED/UI ONLY** | Derived dynamically from `event_date`; not stored in DB |
| **`event_registrations`** | `id` | UUID | PK (`uuid_generate_v4()`) | `reg.id` | `req.params.id` | **MATCH** | Primary Key |
| | `event_id` | UUID | FK -> `events(id)` | `reg.event_id` | `req.body.event_id` | **FIXED** | Validated UUID format before query |
| | `event_title` | VARCHAR(255) | NULL | `reg.event_title` | `req.body.event_title` | **MATCH** | Cached title |
| | `full_name` | VARCHAR(255) | NOT NULL | `reg.full_name` | `req.body.full_name` | **MATCH** | Student full name |
| | `email` | VARCHAR(255) | NOT NULL | `reg.email` | `req.body.email` | **MATCH** | Student email address |
| | `roll_number` | VARCHAR(100) | NULL | `reg.roll_number` | `req.body.roll_number` | **MATCH** | Student ID / Roll number |
| | `department` | VARCHAR(100) | NULL | `reg.department` | `req.body.department` | **MATCH** | Academic department |
| | `year` | VARCHAR(50) | NULL | `reg.year` | `req.body.year` | **MATCH** | Year of study (e.g. 3rd Year) |
| | `phone` | VARCHAR(50) | NULL | `reg.phone` | `req.body.phone` | **MATCH** | Contact phone |
| | `college` | VARCHAR(255) | DEFAULT 'Sasi...' | `reg.college` | `req.body.college` | **MATCH** | College name |
| | `status` | VARCHAR(50) | DEFAULT 'Registered' | `reg.status` | `req.body.status` | **MATCH** | Registered, Attended, Cancelled |
| | `registered_at` | TIMESTAMPTZ | DEFAULT NOW() | `reg.registered_at` | `registered_at` | **FIXED** | Replaced erroneous `created_at` / `updated_at` |
| **`membership_requests`** | `id` | UUID | PK (`uuid_generate_v4()`) | `req.id` | `req.params.id` | **MATCH** | Primary Key |
| | `full_name` | VARCHAR(255) | NOT NULL | `req.full_name` | `req.body.full_name` | **MATCH** | Student full name |
| | `college` | VARCHAR(255) | DEFAULT 'Sasi...' | `req.college` | `req.body.college` | **FIXED** | Aligned from `institution` |
| | `roll_number` | VARCHAR(100) | NOT NULL | `req.roll_number` | `req.body.roll_number` | **MATCH** | Roll number |
| | `email` | VARCHAR(255) | NOT NULL | `req.email` | `req.body.email` | **MATCH** | Email address |
| | `phone` | VARCHAR(50) | NULL | `req.phone` | `req.body.phone` | **MATCH** | Phone number |
| | `department` | VARCHAR(100) | NOT NULL | `req.department` | `req.body.department` | **MATCH** | Department |
| | `year_of_study` | VARCHAR(50) | NOT NULL | `req.year_of_study` | `req.body.year_of_study` | **MATCH** | 1st Year, 2nd Year, etc. |
| | `acm_status` | VARCHAR(50) | DEFAULT 'Not an...' | `req.acm_status` | `req.body.acm_status` | **FIXED** | Aligned from `acm_membership_status` |
| | `interests` | TEXT[] | NULL | `req.interests` | `req.body.interests` | **FIXED** | Aligned from `areas_of_interest` |
| | `statement` | TEXT | NULL | `req.statement` | `req.body.statement` | **FIXED** | Aligned from `interest_reason` |
| | `consent` | BOOLEAN | DEFAULT TRUE | `req.consent` | `req.body.consent` | **MATCH** | Consent checkbox |
| | `status` | VARCHAR(50) | DEFAULT 'pending' | `req.status` | `req.body.status` | **MATCH** | pending, reviewed, approved, rejected |
| | `submitted_at` | TIMESTAMPTZ | DEFAULT NOW() | `req.submitted_at` | `submitted_at` | **FIXED** | Aligned from `created_at` |
| **`members`** | `id` | UUID | PK (`uuid_generate_v4()`) | `m.id` | `req.params.id` | **MATCH** | Primary Key |
| | `name` | VARCHAR(255) | NOT NULL | `m.name` | `req.body.name` | **MATCH** | Member name |
| | `acm_member_id` | VARCHAR(100) | NULL | `m.acm_member_id` | `req.body.acm_member_id` | **FIXED** | Aligned from `acm_number` / `acmNumber` |
| | `department` | VARCHAR(100) | NOT NULL | `m.department` | `req.body.department` | **MATCH** | Academic department |
| | `year_of_study` | VARCHAR(50) | NOT NULL | `m.year_of_study` | `req.body.year_of_study` | **FIXED** | Aligned from `year` |
| | `acm_role` | VARCHAR(100) | DEFAULT 'Chapter...' | `m.acm_role` | `req.body.acm_role` | **FIXED** | Aligned from `role` |
| | `joined_date` | DATE | NULL | `m.joined_date` | `req.body.joined_date` | **MATCH** | Member join date |
| | `image_url` | TEXT | NULL | `m.image_url` | `req.body.image_url` | **FIXED** | Aligned from `photo_url` |
| | `is_active` | BOOLEAN | DEFAULT TRUE | `m.is_active` | `req.body.is_active` | **FIXED** | Aligned from `is_acm_member` |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `m.created_at` | `created_at` | **MATCH** | Creation timestamp |
| **`team_members`** | `id` | UUID | PK (`uuid_generate_v4()`) | `team.id` | N/A | **MATCH** | Primary Key |
| | `name` | VARCHAR(255) | NOT NULL | `team.name` | N/A | **MATCH** | Officer Name |
| | `role` | VARCHAR(100) | NOT NULL | `team.role` | N/A | **MATCH** | Executive Role |
| | `category` | VARCHAR(50) | NOT NULL | `team.category` | N/A | **MATCH** | Officer, Sponsor, Core Team |
| | `department` | VARCHAR(100) | DEFAULT 'CSE' | `team.department` | N/A | **MATCH** | Department |
| | `email` | VARCHAR(255) | NULL | `team.email` | N/A | **MATCH** | Email |
| | `linkedin_url` | TEXT | NULL | `team.linkedin_url` | N/A | **MATCH** | LinkedIn profile URL |
| | `github_url` | TEXT | NULL | `team.github_url` | N/A | **MATCH** | GitHub profile URL |
| | `image_url` | TEXT | NULL | `team.image_url` | N/A | **MATCH** | Photo URL |
| | `display_order` | INTEGER | DEFAULT 0 | `team.display_order` | N/A | **MATCH** | Sort order |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `team.created_at` | N/A | **MATCH** | Creation timestamp |
| **`achievements`** | `id` | UUID | PK (`uuid_generate_v4()`) | `item.id` | N/A | **MATCH** | Primary Key |
| | `title` | VARCHAR(255) | NOT NULL | `item.title` | N/A | **MATCH** | Award title |
| | `category` | VARCHAR(100) | NOT NULL | `item.category` | N/A | **MATCH** | Category |
| | `description` | TEXT | NOT NULL | `item.description` | N/A | **MATCH** | Summary |
| | `achievement_date`| DATE | NOT NULL | `item.achievement_date`| N/A | **MATCH** | Date of achievement |
| | `winners` | TEXT[] | NULL | `item.winners` | N/A | **MATCH** | Winner names array |
| | `image_url` | TEXT | NULL | `item.image_url` | N/A | **MATCH** | Banner photo |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `item.created_at` | N/A | **MATCH** | Timestamp |
| **`gallery`** | `id` | UUID | PK (`uuid_generate_v4()`) | `g.id` | N/A | **MATCH** | Primary Key |
| | `title` | VARCHAR(255) | NOT NULL | `g.title` | N/A | **MATCH** | Photo title |
| | `category` | VARCHAR(100) | NOT NULL | `g.category` | N/A | **MATCH** | Category |
| | `image_url` | TEXT | NOT NULL | `g.image_url` | N/A | **MATCH** | Image asset URL |
| | `event_id` | UUID | FK -> `events(id)` | `g.event_id` | N/A | **MATCH** | Linked event ID |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `g.created_at` | N/A | **MATCH** | Timestamp |
| **`workshops`** | `id` | UUID | PK (`uuid_generate_v4()`) | `ws.id` | N/A | **MATCH** | Primary Key |
| | `title` | VARCHAR(255) | NOT NULL | `ws.title` | N/A | **MATCH** | Workshop title |
| | `topic_category` | VARCHAR(100) | NOT NULL | `ws.topic_category` | N/A | **MATCH** | Domain category |
| | `level` | VARCHAR(50) | DEFAULT 'Intermediate' | `ws.level` | N/A | **MATCH** | Difficulty level |
| | `duration` | VARCHAR(50) | NULL | `ws.duration` | N/A | **MATCH** | Duration |
| | `description` | TEXT | NOT NULL | `ws.description` | N/A | **MATCH** | Syllabus overview |
| | `prerequisites` | TEXT | NULL | `ws.prerequisites` | N/A | **MATCH** | Prerequisites |
| | `registration_link` | TEXT | NULL | `ws.registration_link` | N/A | **MATCH** | External signup link |
| | `image_url` | TEXT | NULL | `ws.image_url` | N/A | **MATCH** | Banner image |
| | `is_active` | BOOLEAN | DEFAULT TRUE | `ws.is_active` | N/A | **MATCH** | Active status |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `ws.created_at` | N/A | **MATCH** | Timestamp |
| **`contact_messages`** | `id` | UUID | PK (`uuid_generate_v4()`) | `msg.id` | N/A | **MATCH** | Primary Key |
| | `name` | VARCHAR(255) | NOT NULL | `msg.name` | N/A | **MATCH** | Sender name |
| | `email` | VARCHAR(255) | NOT NULL | `msg.email` | N/A | **MATCH** | Sender email |
| | `subject` | VARCHAR(255) | NOT NULL | `msg.subject` | N/A | **MATCH** | Message subject |
| | `message` | TEXT | NOT NULL | `msg.message` | N/A | **MATCH** | Message body |
| | `is_read` | BOOLEAN | DEFAULT FALSE | `msg.is_read` | N/A | **MATCH** | Admin read flag |
| | `created_at` | TIMESTAMPTZ | DEFAULT NOW() | `msg.created_at` | N/A | **MATCH** | Timestamp |

---

## 3. Row-Level Security (RLS) Policy Verification

| Table | Policy Name | Command | Permitted Roles | Description |
|:------|:------------|:--------|:----------------|:------------|
| `events` | "Public Read Events" | `SELECT` | `anon`, `authenticated` | Public read access for events catalog |
| `events` | "Admin All Access Events" | `ALL` | `authenticated` | Full CRUD for verified chapter administrators |
| `event_registrations` | "Public Insert Event Registrations" | `INSERT` | `anon`, `authenticated` | Public form submissions for student signups |
| `event_registrations` | "Admin All Access Registrations" | `ALL` | `authenticated` | Full CRUD for chapter officers |
| `membership_requests` | "Public Insert Membership Requests" | `INSERT` | `anon`, `authenticated` | Public membership application submissions |
| `membership_requests` | "Admin All Access Membership Requests" | `ALL` | `authenticated` | Full review/approval access for chapter officers |
| `members` | "Public Read Members" | `SELECT` | `anon`, `authenticated` | Public access to official verified members roster |
| `members` | "Admin All Access Members" | `ALL` | `authenticated` | Full roster editing for chapter officers |
| `contact_messages` | "Public Insert Contact Messages" | `INSERT` | `anon`, `authenticated` | Public contact submissions |
| `contact_messages` | "Admin All Access Contact" | `ALL` | `authenticated` | Full contact messages access for chapter officers |
