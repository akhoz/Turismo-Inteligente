@echo off
echo Arrancando Uvicorn...
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause

