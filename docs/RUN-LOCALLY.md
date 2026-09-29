# SITE ACM Student Chapter — Local Execution Guide

This document provides exact, beginner-friendly instructions to start and run both the Express Backend API server and the React Vite Frontend application on your local machine.

---

## Quick Start via Automated Script (Windows)

If using Windows PowerShell, open PowerShell in the project directory and run:
```powershell
.\setup-windows.ps1
```
This script will verify Node.js, npm, and Git, install dependencies, and prepare the project.

---

## Manual Execution (Two-Terminal Workflow)

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

**Expected Output:**
```
========================================================
🚀 SITE ACM Backend Server Running on Port 5000
📡 Health Check Available at GET http://localhost:5000/health
========================================================
```

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

**Expected Output:**
```
  VITE v6.4.3  ready in 164 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
  ➜  press h + enter to show help
```

---

## Testing URLs Reference

| Application / Service | URL | Purpose |
|-----------------------|-----|---------|
| **Public Website** | [http://localhost:3000](http://localhost:3000) | Public chapter website |
| **Admin Login** | [http://localhost:3000/admin/login](http://localhost:3000/admin/login) | Admin authentication page |
| **Admin Control Panel** | [http://localhost:3000/admin](http://localhost:3000/admin) | Chapter administration panel |
| **Backend Health Endpoint** | [http://localhost:5000/health](http://localhost:5000/health) | Render health check endpoint |
| **Backend Events API** | [http://localhost:5000/api/events](http://localhost:5000/api/events) | Public events REST endpoint |
