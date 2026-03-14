from sqlalchemy.orm import Session
from models.login_history import LoginHistory
from models.user import User
from datetime import datetime
from typing import Optional
import re

def parse_user_agent(user_agent: str) -> dict:
    """Parse user agent string to extract device info"""
    if not user_agent:
        return {
            "device_type": "unknown",
            "browser": "unknown",
            "os": "unknown"
        }
    
    user_agent_lower = user_agent.lower()
    
    # Detect device type
    if "mobile" in user_agent_lower or "android" in user_agent_lower:
        device_type = "mobile"
    elif "tablet" in user_agent_lower or "ipad" in user_agent_lower:
        device_type = "tablet"
    else:
        device_type = "web"
    
    # Detect browser
    if "chrome" in user_agent_lower and "edg" not in user_agent_lower:
        browser = "Chrome"
    elif "firefox" in user_agent_lower:
        browser = "Firefox"
    elif "safari" in user_agent_lower and "chrome" not in user_agent_lower:
        browser = "Safari"
    elif "edg" in user_agent_lower:
        browser = "Edge"
    elif "opera" in user_agent_lower or "opr" in user_agent_lower:
        browser = "Opera"
    else:
        browser = "Other"
    
    # Detect OS
    if "windows" in user_agent_lower:
        os = "Windows"
    elif "mac" in user_agent_lower:
        os = "macOS"
    elif "linux" in user_agent_lower:
        os = "Linux"
    elif "android" in user_agent_lower:
        os = "Android"
    elif "ios" in user_agent_lower or "iphone" in user_agent_lower or "ipad" in user_agent_lower:
        os = "iOS"
    else:
        os = "Other"
    
    return {
        "device_type": device_type,
        "browser": browser,
        "os": os
    }

def log_login_attempt(
    db: Session,
    user_id: Optional[int],
    email: str,
    ip_address: Optional[str],
    user_agent: Optional[str],
    status: str = "success",
    failure_reason: Optional[str] = None,
    session_id: Optional[str] = None
):
    """Log a login attempt to the database"""
    
    # Skip logging if user_id is None and status is failed (to avoid constraint error)
    # This is a temporary fix until we can update the database schema
    if user_id is None and status == "failed":
        print(f"Skipping login history for failed attempt: {email}")
        return None
    
    # Parse user agent
    device_info = parse_user_agent(user_agent or "")
    
    # Create login history record
    login_record = LoginHistory(
        user_id=user_id,
        email=email,
        login_time=datetime.utcnow(),
        ip_address=ip_address,
        user_agent=user_agent,
        device_type=device_info["device_type"],
        browser=device_info["browser"],
        os=device_info["os"],
        status=status,
        failure_reason=failure_reason,
        session_id=session_id
    )
    
    db.add(login_record)
    db.commit()
    db.refresh(login_record)
    
    # Update last_login in users table if successful
    if status == "success" and user_id:
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.last_login = datetime.utcnow()
            db.commit()
    
    return login_record

def log_logout(db: Session, session_id: str):
    """Log user logout"""
    login_record = db.query(LoginHistory).filter(
        LoginHistory.session_id == session_id,
        LoginHistory.logout_time == None
    ).first()
    
    if login_record:
        login_record.logout_time = datetime.utcnow()
        db.commit()

def get_user_login_history(db: Session, user_id: int, limit: int = 10):
    """Get recent login history for a user"""
    return db.query(LoginHistory).filter(
        LoginHistory.user_id == user_id
    ).order_by(LoginHistory.login_time.desc()).limit(limit).all()

def get_failed_login_attempts(db: Session, email: str, minutes: int = 15):
    """Get failed login attempts in last X minutes"""
    from datetime import timedelta
    cutoff_time = datetime.utcnow() - timedelta(minutes=minutes)
    
    return db.query(LoginHistory).filter(
        LoginHistory.email == email,
        LoginHistory.status == "failed",
        LoginHistory.login_time >= cutoff_time
    ).count()
