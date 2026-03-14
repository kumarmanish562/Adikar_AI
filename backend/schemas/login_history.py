from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LoginHistoryResponse(BaseModel):
    id: int
    user_id: int
    email: str
    login_time: datetime
    ip_address: Optional[str]
    device_type: Optional[str]
    browser: Optional[str]
    os: Optional[str]
    location: Optional[str]
    status: str
    failure_reason: Optional[str]
    logout_time: Optional[datetime]
    
    class Config:
        from_attributes = True
