@echo off

echo ==========================
echo || GIT PUSH AND DEPLOY  ||
echo ==========================

git add .

set /p msg=Enter message: 

git commit -m "%msg%"

git push

npm run build

npm run deploy
npm run deploy

pause