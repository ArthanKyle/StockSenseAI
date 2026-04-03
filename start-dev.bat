@echo off
echo 🚀 Starting StockSenseAI Development Environment
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker first.
    exit /b 1
)

REM Start databases
echo 📦 Starting PostgreSQL and Redis...
docker compose up -d

REM Wait for databases to be ready
echo ⏳ Waiting for databases to be ready...
timeout /t 5 /nobreak >nul

REM Check if API dependencies are installed
if not exist "apps\api\node_modules" (
    echo 📥 Installing API dependencies...
    cd apps\api
    call npm install
    cd ..\..
)

REM Check if Prisma is set up
if not exist "apps\api\node_modules\.prisma" (
    echo 🔧 Setting up Prisma...
    cd apps\api
    call npx prisma generate
    call npx prisma migrate dev --name init
    cd ..\..
)

REM Check if frontend dependencies are installed
if not exist "apps\dashboard\node_modules" (
    echo 📥 Installing frontend dependencies...
    cd apps\dashboard
    call npm install
    cd ..\..
)

echo.
echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo    Open 4 terminal windows and run:
echo.
echo    Terminal 1: cd apps\api ^&^& npm run dev
echo    Terminal 2: cd apps\ml-service ^&^& uvicorn main:app --reload --port 8000
echo    Terminal 3: cd apps\dashboard ^&^& npm run dev
echo    Terminal 4: cd apps\api ^&^& npm run worker
echo.
echo 🌐 URLs:
echo    Frontend:  http://localhost:5173
echo    API:       http://localhost:5000
echo    ML:        http://localhost:8000
echo.
pause
