@echo off
title Upload Portfolio to GitHub
color 0b
echo ============================================================
echo      UPLOADING CELYNE'S PORTFOLIO TO GITHUB
echo ============================================================
echo.
echo Connecting to https://github.com/JocelyneAT/portofolio.git ...
echo.
cd /d "D:\PORTOFOLIO WEBSITTE"
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    color 0a
    echo ============================================================
    echo   SUCCESS! ALL FILES HAVE BEEN UPLOADED TO GITHUB!
    echo ============================================================
    echo.
    echo Now go back to GitHub Pages and 'main' will be there!
) else (
    color 0c
    echo ============================================================
    echo   [!] Upload encountered an issue. Please see above.
    echo ============================================================
)
echo.
pause
