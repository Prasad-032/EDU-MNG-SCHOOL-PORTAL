@echo off
title EduManage School — Local Server
color 1F
echo.
echo  ==========================================
echo   EduManage School Website
echo   Starting local server on port 5500...
echo  ==========================================
echo.

:: Change to the folder where this bat file lives
cd /d "%~dp0"

:: Kill anything already on port 5500
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5500 "') do (
    taskkill /PID %%a /F >nul 2>&1
)

:: Try Python 3
where python >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python found. Starting server...
    echo  Open: http://localhost:5500
    echo  Press Ctrl+C to stop.
    echo.
    start "" "http://localhost:5500"
    python -m http.server 5500
    goto :end
)

:: Try py launcher
where py >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python launcher found. Starting server...
    echo  Open: http://localhost:5500
    echo  Press Ctrl+C to stop.
    echo.
    start "" "http://localhost:5500"
    py -m http.server 5500
    goto :end
)

:: Try Node npx serve
where npx >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Node.js found. Starting server...
    echo  Open: http://localhost:5500
    echo  Press Ctrl+C to stop.
    echo.
    start "" "http://localhost:5500"
    npx --yes serve . -p 5500
    goto :end
)

:: Nothing found
echo  [ERROR] Python or Node.js not found on this machine.
echo.
echo  Please install one of the following:
echo    Python : https://python.org/downloads
echo    Node.js: https://nodejs.org
echo.
echo  After installing, run this file again.
echo.
pause

:end
