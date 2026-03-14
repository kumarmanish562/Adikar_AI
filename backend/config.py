import os
from pathlib import Path
from pydantic_settings import BaseSettings
from typing import Optional

# Get absolute paths
BASE_DIR = Path(__file__).parent.parent
ML_ENGINE_DIR = BASE_DIR / "ml_engine"
PROCESSED_DIR = ML_ENGINE_DIR / "data" / "processed"

class Settings(BaseSettings):
    # Application Configuration
    APP_NAME: str = "Adikar AI"
    APP_ENV: str = "development"
    DEBUG: bool = True
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    
    # Database Configuration
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "adikar_ai"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "password"
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/adikar_ai"
    
    # JWT Configuration
    SECRET_KEY: str = "your-secret-key-change-in-production-use-openssl-rand-hex-32"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # OTP Configuration
    OTP_LENGTH: int = 6
    OTP_EXPIRE_MINUTES: int = 10
    OTP_MAX_ATTEMPTS: int = 5
    
    # File Upload Configuration
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: str = "pdf,jpg,jpeg,png"
    
    # Email Configuration (SMTP)
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: Optional[str] = None
    
    # Security
    PASSWORD_HASH_ALGORITHM: str = "bcrypt"
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/app.log"
    
    # ML Engine paths (absolute paths)
    ML_ENGINE_PATH: str = str(ML_ENGINE_DIR)
    EMBEDDINGS_PATH: str = str(PROCESSED_DIR / "embeddings.pkl")
    FAISS_INDEX_PATH: str = str(PROCESSED_DIR / "faiss_index.bin")
    CHUNKS_PATH: str = str(PROCESSED_DIR / "chunks.json")
    
    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields in .env

settings = Settings()
