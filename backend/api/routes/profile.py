from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.user import UserResponse
from utils.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

class UpdateProfile(BaseModel):
    full_name: str = None
    phone: str = None
    preferred_language: str = None

@router.get("", response_model=UserResponse)
@router.get("/", response_model=UserResponse)
@router.get("/me", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("", response_model=UserResponse)
@router.put("/", response_model=UserResponse)
@router.put("/me", response_model=UserResponse)
def update_profile(
    profile: UpdateProfile,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if profile.full_name is not None:
        current_user.full_name = profile.full_name
    if profile.phone is not None:
        current_user.phone = profile.phone
    if profile.preferred_language is not None:
        current_user.preferred_language = profile.preferred_language
    
    db.commit()
    db.refresh(current_user)
    return current_user
