from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from datetime import timedelta
from typing import List
import traceback
import uuid
from database import get_db
from models.user import User
from schemas.user import UserCreate, UserLogin, UserResponse, Token
from schemas.login_history import LoginHistoryResponse
from utils.auth import get_password_hash, verify_password, create_access_token
from utils.otp import create_otp, verify_otp
from utils.email import send_otp_email
from utils.login_tracker import log_login_attempt, get_failed_login_attempts, get_user_login_history
from utils.password_reset import (
    create_password_reset_request, 
    verify_password_reset_otp, 
    store_new_password, 
    complete_password_reset,
    get_active_reset_request
)
from config import settings

router = APIRouter()

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

@router.post("/register", status_code=status.HTTP_200_OK)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Store user data temporarily (you might want to use a temporary table or cache)
    # For now, we'll generate OTP and send it, then create user after verification
    
    # Generate and send OTP for registration
    otp_code = create_otp(db, user.email, "registration", settings.OTP_EXPIRE_MINUTES)
    
    # Send OTP via email
    email_sent = send_otp_email(user.email, otp_code, "registration")
    
    if not email_sent:
        raise HTTPException(status_code=500, detail="Failed to send OTP email")
    
    # Store user data in session or temporary storage
    # For now, we'll return success and expect frontend to show OTP verification
    return {
        "message": "OTP sent to email successfully", 
        "email": user.email,
        "requires_otp": True
    }

@router.post("/verify-registration-otp", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def verify_registration_otp(request: dict, db: Session = Depends(get_db)):
    email = request.get("email")
    otp = request.get("otp")
    user_data = request.get("user_data")
    
    if not email or not otp or not user_data:
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    # Verify OTP
    is_valid = verify_otp(db, email, otp, "registration")
    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # Create user after OTP verification
    hashed_password = get_password_hash(user_data["password"])
    
    new_user = User(
        email=email,
        hashed_password=hashed_password,
        full_name=user_data.get("full_name"),
        phone=user_data.get("phone"),
        is_verified=True  # Mark as verified since OTP was confirmed
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(user: UserLogin, request: Request, db: Session = Depends(get_db)):
    # Get client info
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    # Check for too many failed attempts
    failed_attempts = get_failed_login_attempts(db, user.email, minutes=15)
    if failed_attempts >= 5:
        log_login_attempt(
            db=db,
            user_id=None,
            email=user.email,
            ip_address=ip_address,
            user_agent=user_agent,
            status="blocked",
            failure_reason="Too many failed login attempts"
        )
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many failed login attempts. Please try again later."
        )
    
    # Find user
    db_user = db.query(User).filter(User.email == user.email).first()
    
    # Check credentials
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        # Log failed attempt
        log_login_attempt(
            db=db,
            user_id=db_user.id if db_user else None,
            email=user.email,
            ip_address=ip_address,
            user_agent=user_agent,
            status="failed",
            failure_reason="Invalid email or password"
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Generate session ID
    session_id = str(uuid.uuid4())
    
    # Log successful login
    log_login_attempt(
        db=db,
        user_id=db_user.id,
        email=db_user.email,
        ip_address=ip_address,
        user_agent=user_agent,
        status="success",
        session_id=session_id
    )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email, "session_id": session_id}, 
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Send OTP to user's email for password reset"""
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create password reset request and get OTP
    otp_code = create_password_reset_request(db, user.id, request.email, settings.OTP_EXPIRE_MINUTES)
    
    # Send OTP via email
    email_sent = send_otp_email(request.email, otp_code, "password_reset")
    
    if not email_sent:
        raise HTTPException(status_code=500, detail="Failed to send OTP email")
    
    return {"message": "OTP sent to email successfully"}

@router.post("/verify-otp")
def verify_otp_endpoint(request: VerifyOTPRequest, db: Session = Depends(get_db)):
    """Verify OTP code for password reset"""
    reset_request = verify_password_reset_otp(db, request.email, request.otp)
    
    if not reset_request:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    return {"message": "OTP verified successfully"}

@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password after OTP verification"""
    
    # Check if there's an active reset request
    reset_request = get_active_reset_request(db, request.email)
    if not reset_request:
        raise HTTPException(status_code=400, detail="No active password reset request found")
    
    # Validate password length
    if len(request.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long")
    
    # Store new password in reset request
    if not store_new_password(db, request.email, request.new_password):
        raise HTTPException(status_code=400, detail="Failed to store new password")
    
    # Complete the password reset
    if not complete_password_reset(db, request.email):
        raise HTTPException(status_code=400, detail="Failed to complete password reset")
    
    return {"message": "Password reset successfully"}


@router.get("/login-history/{user_id}", response_model=List[LoginHistoryResponse])
def get_login_history(user_id: int, limit: int = 10, db: Session = Depends(get_db)):
    """Get login history for a user"""
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get login history
    history = get_user_login_history(db, user_id, limit)
    return history
