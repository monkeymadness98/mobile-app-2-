from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LifeScore API")

# allow CORS for local dev (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with DB in production)
entries = []

class Entry(BaseModel):
    date: str
    stress: int
    happiness: int
    health: int

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/entries/", response_model=Entry)
def create_entry(entry: Entry):
    entries.append(entry.dict())
    return entry

@app.get("/entries/", response_model=List[Entry])
def list_entries():
    return entries
