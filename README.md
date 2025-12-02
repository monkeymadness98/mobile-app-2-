# LifeScore — Mobile + Backend (GitHub-ready)

This repo contains:
- `mobile-app/` — Expo React Native app (JavaScript)
- `backend/` — FastAPI backend (Python)

## Quick run (dev)

### 1) Backend (FastAPI)
```bash
cd backend
python -m venv venv        # optional but recommended
# macOS / Linux
source venv/bin/activate
# Windows (PowerShell)
venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
