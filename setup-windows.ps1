# ========================================================
# SITE ACM STUDENT CHAPTER — WINDOWS ENVIRONMENT CHECK & SETUP
# ========================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  SITE ACM Student Chapter — Environment Setup Check   " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Node.js
try {
    $nodeVer = node --version
    Write-Host "[✓] Node.js is installed: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "[✕] Node.js is NOT installed or not on PATH!" -ForegroundColor Red
    Write-Host "    Please download and install Node.js v20 LTS from: https://nodejs.org" -ForegroundColor Yellow
    Exit 1
}

# 2. Check npm
try {
    $npmVer = npm --version
    Write-Host "[✓] npm is installed: v$npmVer" -ForegroundColor Green
} catch {
    Write-Host "[✕] npm is NOT installed!" -ForegroundColor Red
    Exit 1
}

# 3. Check Git
try {
    $gitVer = git --version
    Write-Host "[✓] Git is installed: $gitVer" -ForegroundColor Green
} catch {
    Write-Host "[✕] Git is NOT installed!" -ForegroundColor Red
    Write-Host "    Please download and install Git from: https://git-scm.com" -ForegroundColor Yellow
    Exit 1
}

Write-Host ""
Write-Host "--------------------------------------------------------" -ForegroundColor Gray
Write-Host " Installing Project Dependencies...                     " -ForegroundColor Cyan
Write-Host "--------------------------------------------------------" -ForegroundColor Gray

# 4. Install Frontend Dependencies
Write-Host "[1/2] Installing Root / Frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[✕] Frontend dependency installation failed!" -ForegroundColor Red
    Exit 1
}
Write-Host "[✓] Frontend dependencies installed successfully." -ForegroundColor Green

# 5. Install Backend Dependencies
Write-Host "[2/2] Installing Backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
Set-Location ..
if ($LASTEXITCODE -ne 0) {
    Write-Host "[✕] Backend dependency installation failed!" -ForegroundColor Red
    Exit 1
}
Write-Host "[✓] Backend dependencies installed successfully." -ForegroundColor Green

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  ✓ Environment Check & Installation Complete!         " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS TO RUN LOCALLY:" -ForegroundColor Yellow
Write-Host "1. Terminal 1: .\start-backend.ps1   (or cd backend; npm run dev)" -ForegroundColor White
Write-Host "2. Terminal 2: .\start-frontend.ps1  (or npm run dev)" -ForegroundColor White
Write-Host ""
