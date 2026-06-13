@echo off
title Agropoti Local Server Launcher
echo ====================================================
echo   Starting Agropoti Local Development Server
echo ====================================================
echo.
echo Searching for Python...
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Python found! Starting Python HTTP server on port 8080...
    echo.
    echo >>> Opening http://localhost:8080 in your browser...
    echo >>> Press Ctrl+C in this window to stop the server.
    echo.
    start "" "http://localhost:8080"
    python -m http.server 8080
) else (
    echo [WARNING] Python is not installed or not added to your system environment variables.
    echo opening index.html directly in your default browser...
    echo.
    start index.html
    echo.
    echo Done! Press any key to close this window.
    pause >nul
)
