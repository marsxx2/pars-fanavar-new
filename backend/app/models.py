from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class ConsultationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    company: str = Field(min_length=1, max_length=160)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    interests: List[str] = Field(min_length=1, max_length=10)
    message: Optional[str] = Field(default=None, max_length=2000)
    language: str = Field(default="fa", pattern="^(fa|en)$")

    @field_validator("phone")
    @classmethod
    def phone_looks_like_a_phone(cls, value: str) -> str:
        cleaned = value.strip()
        digits = sum(ch.isdigit() for ch in cleaned)
        if digits < 8:
            raise ValueError("phone must contain at least 8 digits")
        return cleaned

    @field_validator("name", "company")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()


class ConsultationOut(ConsultationCreate):
    id: int
    created_at: datetime
