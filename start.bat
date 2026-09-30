@echo off
title WhatsApp Quiz Bot - One Click Launcher
color 0A
echo ====================================================
echo    WhatsApp Quiz Bot ko launch kiya ja raha hai...
echo ====================================================
echo.

:: Check karein agar dependencies install nahi hain toh automatic install kar dega
if not exist "node_modules" (
    echo [Info] Pehli baar run ho raha hai, libraries install ho rahi hain...
    call npm init -y >nul 2>&1
    call npm install whatsapp-web.js qrcode >nul 2>&1
    echo [Info] Libraries install ho chuki hain!
)

echo [Info] Bot start ho raha hai, kripya 5-10 second intezaar karein...
echo [Info] Folder mein "qr.png" naam ki image banegi, use scan karein.
echo.

node bot.js
pause