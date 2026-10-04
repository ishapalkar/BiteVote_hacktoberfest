@echo off
echo ========================================================
echo Starting BiteVote - Vote. Match. Eat.
echo ========================================================
echo.
echo Activating virtual environment and starting FastAPI server...
.\backend\venv\Scripts\python -m uvicorn backend.main:app --port 8000 --reload
