#!/usr/bin/env bash
echo "========================================================"
echo "Starting BiteVote - Vote. Match. Eat."
echo "========================================================"

if [ -d "backend/venv" ]; then
    source backend/venv/bin/activate
fi

uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000} --reload
