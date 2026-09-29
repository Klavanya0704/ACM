# SITE ACM Student Chapter — REST API Specification

This document provides complete documentation for the Express REST API backend service (`backend/`).

---

## 1. System Health Check

### GET `/health`
- **Description**: Returns backend health status for monitoring & Render checks.
- **Authentication**: None (Public)
- **Response** (`200 OK`):
  ```json
  {
    "status": "ok",
    "service": "SITE ACM Backend",
    "timestamp": "2026-09-29T12:00:00.000Z"
  }
  ```

---

## 2. Authentication API

### POST `/api/auth/login`
- **Description**: Authenticate chapter administrators.
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "admin@siteacm.org",
    "password": "your-password"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "user": { "id": "uuid", "email": "admin@siteacm.org" },
    "access_token": "bearer-token-string"
  }
  ```

---

## 3. Events API

### GET `/api/events`
- **Description**: List all chapter events.
- **Authentication**: None (Public)
- **Response** (`200 OK`): Array of event objects.

### GET `/api/events/:slug`
- **Description**: Fetch event details by slug or UUID.
- **Authentication**: None (Public)
- **Response** (`200 OK`): Single event object.

### POST `/api/admin/events`
- **Description**: Create a new chapter event.
- **Authentication**: Required (`Authorization: Bearer <token>`)
- **Request Body**:
  ```json
  {
    "title": "Code to Cloud",
    "slug": "code-to-cloud",
    "category": "Workshop",
    "location": "SASI Campus",
    "description": "Cloud computing workshop...",
    "event_date": "2026-10-15T10:00:00Z"
  }
  ```
- **Response** (`201 Created`): Created event object.

### PUT `/api/admin/events/:id`
- **Description**: Update an existing event by ID.
- **Authentication**: Required (`Authorization: Bearer <token>`)

### DELETE `/api/admin/events/:id`
- **Description**: Delete an event by ID.
- **Authentication**: Required (`Authorization: Bearer <token>`)

---

## 4. Student Registrations API

### POST `/api/events/:eventId/register`
- **Description**: Register a student for a specific event.
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "full_name": "Student Name",
    "email": "student@sasi.ac.in",
    "roll_number": "22A81A0501",
    "department": "Computer Science & Engineering",
    "year": "3rd Year",
    "phone": "9876543210"
  }
  ```
- **Response** (`201 Created`): Registration record.

### GET `/api/admin/registrations`
- **Description**: Fetch all student registrations across events.
- **Authentication**: Required (`Authorization: Bearer <token>`)

### PATCH `/api/admin/registrations/:id/status`
- **Description**: Update student attendance status (`Registered`, `Attended`, `Cancelled`).
- **Authentication**: Required (`Authorization: Bearer <token>`)

---

## 5. Membership Requests API

### POST `/api/membership-requests`
- **Description**: Submit student membership interest form.
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "full_name": "Student Name",
    "college": "Sasi Institute of Technology & Engineering",
    "roll_number": "22A81A0502",
    "email": "student@sasi.ac.in",
    "department": "Computer Science & Engineering",
    "year_of_study": "3rd Year",
    "acm_status": "Not an ACM Member",
    "interests": ["Web Development", "AI/ML"]
  }
  ```
- **Response** (`201 Created`): Submitted request object.

### GET `/api/admin/membership-requests`
- **Description**: Retrieve all student membership requests.
- **Authentication**: Required (`Authorization: Bearer <token>`)

### PATCH `/api/admin/membership-requests/:id/status`
- **Description**: Update request status (`pending`, `reviewed`, `approved`, `rejected`).
- **Authentication**: Required (`Authorization: Bearer <token>`)

---

## 6. Official Members API

### GET `/api/members`
- **Description**: Retrieve public official chapter roster.
- **Authentication**: None (Public)

### POST `/api/admin/members`
- **Description**: Add verified member to chapter directory.
- **Authentication**: Required (`Authorization: Bearer <token>`)

### DELETE `/api/admin/members/:id`
- **Description**: Delete member record.
- **Authentication**: Required (`Authorization: Bearer <token>`)
