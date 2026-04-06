@echo off
echo ========================================
echo Adikar AI Legal Assistant - Backend
echo ========================================

cd /d "%~dp0"

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo Error: Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

echo.
echo Starting backend server...
python start_backend.py

pause