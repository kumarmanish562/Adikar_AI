import random
import string
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models.otp import OTP

def generate_otp(length=6):
    """Generate a random OTP code"""
    return ''.join(random.choices(string.digits, k=length))

def create_otp(db: Session, email: str, purpose: str, expiry_minutes=10):
    """Create and store OTP in database"""
    # Invalidate any existing unused OTPs for this email and purpose
    db.query(OTP).filter(
        OTP.email == email,
        OTP.purpose == purpose,
        OTP.is_used == False
    ).update({"is_used": True})
    
    # Generate new OTP
    otp_code = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)
    
    # Create OTP record
    otp = OTP(
        email=email,
        otp_code=otp_code,
        purpose=purpose,
        expires_at=expires_at
    )
    db.add(otp)
    db.commit()
    db.refresh(otp)
    
    return otp_code

def verify_otp(db: Session, email: str, otp_code: str, purpose: str):
    """Verify OTP code"""
    otp = db.query(OTP).filter(
        OTP.email == email,
        OTP.otp_code == otp_code,
        OTP.purpose == purpose,
        OTP.is_used == False
    ).first()
    
    if not otp:
        return False
    
    if otp.is_expired():
        return False
    
    # Mark OTP as used
    otp.is_used = True
    db.commit()
    
    return True
