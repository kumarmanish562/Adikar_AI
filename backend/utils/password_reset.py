from sqlalchemy.orm import Session
from models.password_reset import PasswordReset
from models.user import User
from utils.otp import generate_otp
from utils.auth import get_password_hash
from datetime import datetime, timedelta
from typing import Optional

def create_password_reset_request(db: Session, user_id: int, email: str, expiry_minutes: int = 30) -> str:
    """Create a new password reset request"""
    
    # Invalidate any existing active password reset requests for this user
    db.query(PasswordReset).filter(
        PasswordReset.user_id == user_id,
        PasswordReset.is_completed == False
    ).update({"is_completed": True, "completed_at": datetime.utcnow()})
    
    # Generate OTP
    otp_code = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)
    
    # Create password reset request
    reset_request = PasswordReset(
        user_id=user_id,
        email=email,
        otp_code=otp_code,
        expires_at=expires_at
    )
    
    db.add(reset_request)
    db.commit()
    db.refresh(reset_request)
    
    return otp_code

def verify_password_reset_otp(db: Session, email: str, otp_code: str) -> Optional[PasswordReset]:
    """Verify OTP for password reset and mark as verified"""
    
    reset_request = db.query(PasswordReset).filter(
        PasswordReset.email == email,
        PasswordReset.otp_code == otp_code,
        PasswordReset.is_otp_verified == False,
        PasswordReset.is_completed == False
    ).first()
    
    if not reset_request or reset_request.is_expired():
        return None
    
    # Mark OTP as verified
    reset_request.is_otp_verified = True
    db.commit()
    
    return reset_request

def store_new_password(db: Session, email: str, new_password: str) -> bool:
    """Store new password hash in the reset request"""
    
    reset_request = db.query(PasswordReset).filter(
        PasswordReset.email == email,
        PasswordReset.is_otp_verified == True,
        PasswordReset.is_completed == False
    ).first()
    
    if not reset_request or reset_request.is_expired():
        return False
    
    # Hash and store the new password
    reset_request.new_password_hash = get_password_hash(new_password)
    db.commit()
    
    return True

def complete_password_reset(db: Session, email: str) -> bool:
    """Complete the password reset by updating user's password"""
    
    reset_request = db.query(PasswordReset).filter(
        PasswordReset.email == email,
        PasswordReset.is_otp_verified == True,
        PasswordReset.is_completed == False,
        PasswordReset.new_password_hash.isnot(None)
    ).first()
    
    if not reset_request or reset_request.is_expired():
        return False
    
    # Update user's password
    user = db.query(User).filter(User.id == reset_request.user_id).first()
    if not user:
        return False
    
    user.hashed_password = reset_request.new_password_hash
    
    # Mark reset request as completed
    reset_request.is_completed = True
    reset_request.completed_at = datetime.utcnow()
    
    db.commit()
    
    return True

def get_active_reset_request(db: Session, email: str) -> Optional[PasswordReset]:
    """Get active password reset request for email"""
    
    return db.query(PasswordReset).filter(
        PasswordReset.email == email,
        PasswordReset.is_otp_verified == True,
        PasswordReset.is_completed == False
    ).first()