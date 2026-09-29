# SITE ACM Student Chapter — Database Dictionary

This document details the PostgreSQL database schema dictionary for the SITE ACM Student Chapter project.

---

## Tables & Column Definitions

### 1. `events`
Stores technical sessions, hackathons, outreach, and workshops.
- `id` (UUID, PK): Unique event identifier.
- `title` (VARCHAR(255)): Event title.
- `slug` (VARCHAR(255), UNIQUE): URL-friendly slug (e.g. `prayatna-2-0`).
- `category` (VARCHAR(100)): Category (Workshop, Hackathon, Seminar, Outreach).
- `mode` (VARCHAR(50)): Mode of delivery (On Campus, Online, Hybrid).
- `event_date` (TIMESTAMPTZ): Date and start time.
- `location` (VARCHAR(255)): Venue location.
- `description` (TEXT): Detailed event description.
- `speaker` (VARCHAR(255)): Main speaker or instructor.
- `speaker_title` (VARCHAR(255)): Speaker designation.
- `attendance` (INTEGER): Total student participants.
- `volunteers_count` (INTEGER): Volunteer count.
- `collaboration` (VARCHAR(255)): Collaborating chapters or organizations.
- `topics` (TEXT[]): List of topic badges.
- `image_url` (TEXT): Banner image URI.
- `registration_status` (VARCHAR(50)): Registration status (Open, Closed, Upcoming).
- `is_featured` (BOOLEAN): Show on homepage showcase.
- `is_upcoming` (BOOLEAN): Listed under upcoming events.

---

### 2. `event_registrations`
Tracks student signups for events.
- `id` (UUID, PK): Unique registration record ID.
- `event_id` (UUID, FK -> `events.id`): Associated event.
- `event_title` (VARCHAR(255)): Cached event title.
- `full_name` (VARCHAR(255)): Student's full name.
- `email` (VARCHAR(255)): Student email address.
- `roll_number` (VARCHAR(100)): College roll number / ID.
- `department` (VARCHAR(100)): Department (CSE, IT, ECE, etc.).
- `year` (VARCHAR(50)): Year of study (1st Year, 2nd Year, 3rd Year, 4th Year).
- `phone` (VARCHAR(50)): Contact number.
- `college` (VARCHAR(255)): College name.
- `status` (VARCHAR(50)): Status (Registered, Attended, Cancelled).
- `registered_at` (TIMESTAMPTZ): Timestamp of registration.

---

### 3. `membership_requests`
Stores student interest form submissions before officer review.
- `id` (UUID, PK): Unique submission ID.
- `full_name` (VARCHAR(255)): Student full name.
- `college` (VARCHAR(255)): College name (Default: Sasi Institute of Technology & Engineering).
- `roll_number` (VARCHAR(100)): Student roll number / ID.
- `email` (VARCHAR(255)): Student email address.
- `phone` (VARCHAR(50)): Contact number.
- `department` (VARCHAR(100)): Academic department.
- `year_of_study` (VARCHAR(50)): Year of study.
- `acm_status` (VARCHAR(50)): Current ACM international status.
- `interests` (TEXT[]): Selected technical domain interests.
- `statement` (TEXT): Optional statement of interest.
- `consent` (BOOLEAN): Student confirmation check.
- `status` (VARCHAR(50)): Request status (`pending`, `reviewed`, `approved`, `rejected`).
- `submitted_at` (TIMESTAMPTZ): Submission timestamp.

---

### 4. `members`
Official verified SITE ACM Student Chapter directory.
- `id` (UUID, PK): Member ID.
- `name` (VARCHAR(255)): Member full name.
- `acm_member_id` (VARCHAR(100)): ACM international member number.
- `department` (VARCHAR(100)): Department.
- `year_of_study` (VARCHAR(50)): Year of study.
- `acm_role` (VARCHAR(100)): Role (Chapter Member, International Member).
- `is_active` (BOOLEAN): Active member flag.

---

### 5. `team_members`
Faculty Sponsor and Chapter Executive Officers.
- `id` (UUID, PK): Team member ID.
- `name` (VARCHAR(255)): Officer name.
- `role` (VARCHAR(100)): Executive position (Faculty Sponsor, Chair, Vice Chair, Treasurer, Secretary, Membership Chair).
- `category` (VARCHAR(50)): Category (Officer, Sponsor, Core Team).
- `department` (VARCHAR(100)): Department.
- `email` (VARCHAR(255)): Official contact email.
- `display_order` (INTEGER): Sort priority order.
