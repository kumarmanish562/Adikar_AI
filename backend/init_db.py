"""
Database Initialization Script
Creates all tables in PostgreSQL database
"""
from database import Base, engine
from models.user import User
from models.query import Query
from models.otp import OTP
from models.document import Document
from models.login_history import LoginHistory

def init_database():
    """Create all database tables"""
    print("Creating database tables...")
    
    # Drop all tables (use with caution in production!)
    # Base.metadata.drop_all(bind=engine)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("✅ Database tables created successfully!")
    print("\nCreated tables:")
    print("  - users")
    print("  - login_history")
    print("  - queries")
    print("  - otps")
    print("  - documents")

if __name__ == "__main__":
    init_database()
