from __future__ import annotations

import json
import os
from typing import List, Optional

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from .database import get_connection, init_db
from .models import ConsultationCreate, ConsultationOut

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY")

DEFAULT_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
]
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGIN", "").split(",")
    if origin.strip()
] or DEFAULT_ORIGINS

app = FastAPI(
    title="Pars Fanavar API",
    description="Backend API for the Pars Fanavar corporate site — consultation intake.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


def require_admin(x_admin_key: Optional[str] = Header(default=None)) -> None:
    if not ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Admin access is not configured on this server.",
        )
    if x_admin_key != ADMIN_API_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin key.")


@app.post("/api/consultations", response_model=ConsultationOut, status_code=status.HTTP_201_CREATED)
def create_consultation(payload: ConsultationCreate) -> ConsultationOut:
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO consultations (name, company, email, phone, interests, message, language)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                payload.name,
                payload.company,
                payload.email,
                payload.phone,
                json.dumps(payload.interests, ensure_ascii=False),
                payload.message,
                payload.language,
            ),
        )
        conn.commit()
        row = conn.execute(
            "SELECT * FROM consultations WHERE id = ?", (cursor.lastrowid,)
        ).fetchone()

    return _row_to_out(row)


@app.get(
    "/api/consultations",
    response_model=List[ConsultationOut],
    dependencies=[Depends(require_admin)],
)
def list_consultations() -> List[ConsultationOut]:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM consultations ORDER BY id DESC").fetchall()
    return [_row_to_out(row) for row in rows]


def _row_to_out(row) -> ConsultationOut:
    return ConsultationOut(
        id=row["id"],
        name=row["name"],
        company=row["company"],
        email=row["email"],
        phone=row["phone"],
        interests=json.loads(row["interests"]),
        message=row["message"],
        language=row["language"],
        created_at=row["created_at"],
    )
