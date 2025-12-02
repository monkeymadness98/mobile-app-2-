# placeholder for future backend trading routes
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
def ping():
    return {"ping": "pong"}
