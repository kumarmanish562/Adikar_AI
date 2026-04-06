# 🚀 Adikar AI Backend - Quick Start Guide

## Method 1: Automatic Startup (Recommended)

### Windows:
```bash
# Double-click or run:
start_backend.bat
```

### Python (Any OS):
```bash
cd backend
python start_backend.py
```

## Method 2: Manual Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
pip install -r requirements-ml.txt
```

### 2. Setup Environment
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# Especially: DB_PASSWORD=your_postgres_password
```

### 3. Start Server
```bash
# Option A: Using the main file
python main.py

# Option B: Using uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 🔍 Verify Installation

### Check Server Status:
- **Health Check**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs
- **ML Test**: http://localhost:8000/api/test-ml-full

### Test ML Service:
```bash
curl http://localhost:8000/api/test-ml-full
```

### Test Query (No Auth):
```bash
curl -X POST http://localhost:8000/api/queries/ask-no-auth \
  -H "Content-Type: application/json" \
  -d '{"question": "What are my rights if arrested?", "language": "en"}'
```

## 📋 Requirements

- **Python**: 3.8+
- **PostgreSQL**: Running on localhost:5432
- **Database**: `adikar_ai` created
- **Memory**: 4GB+ RAM (for ML models)

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check PostgreSQL is running
   - Verify credentials in `.env` file
   - Ensure `adikar_ai` database exists

2. **ML Service Error**:
   - Backend will run without ML if models fail
   - Check `ml_engine/data/processed/` has model files
   - Ensure sufficient RAM (4GB+)

3. **Port Already in Use**:
   - Change port in `.env`: `PORT=8001`
   - Or kill existing process on port 8000

### Get Help:
- Check logs in console output
- Visit http://localhost:8000/docs for API documentation
- Ensure all files in `backend/` directory are present

## 🎯 Success Indicators

✅ Server starts without errors
✅ Health check returns `{"status": "healthy"}`
✅ ML test shows working status
✅ API docs accessible at /docs

Your backend is ready when you see:
```
🏛️  Starting Adikar AI Legal Assistant Backend
📍 Server: http://localhost:8000
📚 Docs: http://localhost:8000/docs
❤️  Health: http://localhost:8000/health
```