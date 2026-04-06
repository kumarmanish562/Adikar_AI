#!/usr/bin/env python3
"""
Backend startup script for Adikar AI Legal Assistant
"""
import os
import sys
import subprocess
import time
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Error: Python 3.8 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version.split()[0]}")
    return True

def check_virtual_env():
    """Check if virtual environment is activated"""
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print(f"✅ Virtual environment: {sys.prefix}")
        return True
    else:
        print("⚠️  Warning: No virtual environment detected")
        print("Recommended: Create and activate a virtual environment")
        return True  # Continue anyway

def install_dependencies():
    """Install required dependencies"""
    print("\n📦 Installing dependencies...")
    
    # Install core backend dependencies
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Core dependencies installed")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install core dependencies: {e}")
        return False
    
    # Install ML dependencies
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements-ml.txt"])
        print("✅ ML dependencies installed")
    except subprocess.CalledProcessError as e:
        print(f"⚠️  ML dependencies failed (will continue without ML): {e}")
    
    return True

def check_env_file():
    """Check if .env file exists"""
    env_file = Path(".env")
    if env_file.exists():
        print("✅ Environment file found")
        return True
    else:
        print("⚠️  .env file not found, copying from .env.example")
        try:
            import shutil
            shutil.copy(".env.example", ".env")
            print("✅ Created .env file from example")
            print("📝 Please edit .env file with your database credentials")
            return True
        except Exception as e:
            print(f"❌ Failed to create .env file: {e}")
            return False

def test_ml_service():
    """Test if ML service is working"""
    try:
        from services.ml_service import ml_service
        chunks = ml_service.search_similar_chunks("test query", 1)
        print(f"✅ ML service working ({len(chunks)} chunks loaded)")
        return True
    except Exception as e:
        print(f"⚠️  ML service not working: {e}")
        print("Backend will run without ML functionality")
        return False

def start_server():
    """Start the FastAPI server"""
    print("\n🚀 Starting Adikar AI Backend Server...")
    print("=" * 50)
    
    try:
        # Import uvicorn here to ensure it's installed
        import uvicorn
        
        print("Server starting on: http://localhost:8000")
        print("API Documentation: http://localhost:8000/docs")
        print("Health Check: http://localhost:8000/health")
        print("\nPress Ctrl+C to stop the server")
        print("=" * 50)
        
        # Start the server
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
        
    except ImportError:
        print("❌ uvicorn not installed. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "uvicorn[standard]"])
        import uvicorn
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Server failed to start: {e}")
        return False
    
    return True

def main():
    """Main startup function"""
    print("🏛️  Adikar AI Legal Assistant - Backend Startup")
    print("=" * 50)
    
    # Change to backend directory
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)
    print(f"📁 Working directory: {backend_dir}")
    
    # Run checks
    if not check_python_version():
        return False
    
    check_virtual_env()
    
    if not check_env_file():
        return False
    
    if not install_dependencies():
        return False
    
    # Test ML service (optional)
    test_ml_service()
    
    # Start server
    return start_server()

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)