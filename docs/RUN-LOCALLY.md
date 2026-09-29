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

### Terminal 1: Express Backend API Server
Open Terminal 1 in VS Code or Command Prompt:

```bash
cd C:\Users\Lavanya\Downloads\ACM\backend
npm install
npm run dev
```

**Expected Output:**
```
========================================================
🚀 SITE ACM Backend Server Running on Port 5000
📡 Health Check Available at GET http://localhost:5000/health
========================================================
```

Verify backend health in browser or terminal:
[http://localhost:5000/health](http://localhost:5000/health)

---

### Terminal 2: React Vite Frontend Application
Open Terminal 2 (leave Terminal 1 running in background):

```bash
cd C:\Users\Lavanya\Downloads\ACM
npm install
npm run dev
```

**Expected Output:**
```
  VITE v6.1.0  ready in 350 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
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
