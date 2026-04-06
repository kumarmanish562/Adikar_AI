from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.routes import auth, queries, documents, voice, profile
from database import engine, Base
import traceback

app = FastAPI(title="Legal Assistant API")

# Add exception handler for debugging
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Global exception handler caught: {type(exc).__name__}: {str(exc)}")
    print(f"Traceback: {traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"}
    )

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(queries.router, prefix="/api/queries", tags=["Queries"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])

@app.get("/")
def root():
    return {"message": "Legal Assistant API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/queries/ask-no-auth")
def ask_question_no_auth(request: dict):
    """Test endpoint without authentication"""
    try:
        from services.ml_service import ml_service
        
        question = request.get("question", "")
        language = request.get("language", "en")
        
        print(f"Received question: {question}")
        
        # Use ML service for real-time answers
        result = ml_service.generate_answer(question, language)
        
        print(f"Generated result keys: {list(result.keys())}")
        print(f"Answer length: {len(result.get('answer', ''))}")
        
        return {
            "answer": result.get("answer", ""),
            "explanation": result.get("explanation", result.get("answer", "")),
            "legalReferences": result.get("legalReferences", []),
            "actionSteps": result.get("actionSteps", []),
            "sources": [s.get("source", "") if isinstance(s, dict) else str(s) for s in result.get("sources", [])],
            "query_id": 999
        }
        
    except Exception as e:
        print(f"Error in ask_question_no_auth: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        
        return {
            "answer": f"Error: {str(e)}",
            "explanation": "Service error",
            "legalReferences": [],
            "actionSteps": [],
            "sources": [],
            "query_id": 0
        }

@app.get("/api/test-ml-full")
def test_ml_full():
    """Test full ML pipeline without authentication"""
    try:
        from services.ml_service import ml_service
        result = ml_service.generate_answer("What are my rights during police arrest?", "en")
        return {
            "status": "working",
            "answer_length": len(result.get("answer", "")),
            "explanation_length": len(result.get("explanation", "")),
            "sources_count": len(result.get("sources", [])),
            "action_steps_count": len(result.get("actionSteps", [])),
            "legal_refs_count": len(result.get("legalReferences", [])),
            "sample_answer": result.get("answer", "")[:200] + "...",
            "full_result": result
        }
    except Exception as e:
        import traceback
        return {
            "status": "error", 
            "error": str(e),
            "traceback": traceback.format_exc()
        }

if __name__ == "__main__":
    import uvicorn
    print("🏛️  Starting Adikar AI Legal Assistant Backend")
    print("📍 Server: http://localhost:8000")
    print("📚 Docs: http://localhost:8000/docs")
    print("❤️  Health: http://localhost:8000/health")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
