# SITE ACM Student Chapter — Complete Student Setup Guide

This guide takes you step-by-step from zero to running the complete SITE ACM full-stack application on a fresh Windows computer.

---

## Step 1: Install Required Software

### A. Install Node.js
1. Visit [https://nodejs.org](https://nodejs.org).
2. Download and install **Node.js v20 LTS**.
3. During setup, check **"Automatically install the necessary tools"**.

### B. Verify Node.js & npm Installation
Open PowerShell or Command Prompt and run:
```bash
node --version
npm --version
```
Expected Output: Node `v20.x.x` and npm `v10.x.x`.

### C. Install Git
1. Visit [https://git-scm.com](https://git-scm.com).
2. Download and install Git for Windows with default settings.
3. Verify installation:
   ```bash
   git --version
   ```

---

## Step 2: Clone & Open Project

```bash
git clone https://github.com/Klavanya0704/ACM.git
cd ACM
```
Open the folder in **VS Code**:
```bash
code .
```

---

## Step 3: Automated One-Click Setup (Windows)

In VS Code terminal (PowerShell), run:
```powershell
.\setup-windows.ps1
```
This script will check your environment and install all dependencies for both Frontend and Backend automatically!

---

## Step 4: Configure Environment Variables

1. **Frontend Environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Backend Environment**:
   Copy `backend/.env.example` to `backend/.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```

---

## Step 5: Start Local Application (Two-Terminal Workflow)

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

---

## Step 6: Test Application Features

1. Open [http://localhost:3000](http://localhost:3000) and browse Homepage, About, and Events.
2. Go to `/membership` and submit a student membership request.
3. Log into Admin Panel at `/admin/login` using `admin@siteacm.org` / `admin123`.
4. Open `/admin/membership-requests` to inspect your submission.
