from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
import json
import asyncio
from database import get_db
from models.user import User
from models.query import Query
from schemas.query import QueryResponse, AskQuestionRequest, AskQuestionResponse
from utils.auth import get_current_user
from services.ml_service import ml_service

router = APIRouter()

@router.post("/ask-stream")
async def ask_question_stream(
    request: AskQuestionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Stream real-time ML responses"""
    async def generate_stream():
        try:
            # Send initial status
            yield f"data: {json.dumps({'type': 'status', 'message': 'Processing your question...'})}\n\n"
            
            # Search for relevant chunks
            yield f"data: {json.dumps({'type': 'status', 'message': 'Searching legal documents...'})}\n\n"
            relevant_chunks = ml_service.search_similar_chunks(request.question, top_k=15)
            
            if relevant_chunks:
                yield f"data: {json.dumps({'type': 'status', 'message': f'Found {len(relevant_chunks)} relevant sections'})}\n\n"
                
                # Generate answer
                yield f"data: {json.dumps({'type': 'status', 'message': 'Generating answer...'})}\n\n"
                result = ml_service.generate_answer(request.question, request.language)
                
                # Stream the complete result
                yield f"data: {json.dumps({'type': 'answer', 'data': result})}\n\n"
                
                # Save to database
                new_query = Query(
                    user_id=current_user.id,
                    question=request.question,
                    answer=result.get("answer", ""),
                    language=request.language,
                    query_type="text",
                    legal_references=result.get("legalReferences", []),
                    action_steps=result.get("actionSteps", []),
                    sources=[s.get("source", "") if isinstance(s, dict) else str(s) for s in result.get("sources", [])],
                    confidence_score=0.8,
                    status="completed"
                )
                db.add(new_query)
                db.commit()
                
                yield f"data: {json.dumps({'type': 'complete', 'query_id': new_query.id})}\n\n"
            else:
                yield f"data: {json.dumps({'type': 'error', 'message': 'No relevant information found'})}\n\n"
                
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
    
    return StreamingResponse(generate_stream(), media_type="text/plain")

@router.post("/ask", response_model=AskQuestionResponse)
async def ask_question_stream(
    request: AskQuestionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Stream real-time ML responses"""
    async def generate_stream():
        try:
            # Send initial status
            yield f"data: {json.dumps({'type': 'status', 'message': 'Processing your question...'})}\n\n"
            
            # Search for relevant chunks
            yield f"data: {json.dumps({'type': 'status', 'message': 'Searching legal documents...'})}\n\n"
            relevant_chunks = ml_service.search_similar_chunks(request.question, top_k=15)
            
            if relevant_chunks:
                yield f"data: {json.dumps({'type': 'status', 'message': f'Found {len(relevant_chunks)} relevant sections'})}\n\n"
                
                # Generate answer
                yield f"data: {json.dumps({'type': 'status', 'message': 'Generating answer...'})}\n\n"
                result = ml_service.generate_answer(request.question, request.language)
                
                # Stream the complete result
                yield f"data: {json.dumps({'type': 'answer', 'data': result})}\n\n"
                
                # Save to database
                new_query = Query(
                    user_id=current_user.id,
                    question=request.question,
                    answer=result.get("answer", ""),
                    language=request.language,
                    query_type="text",
                    legal_references=result.get("legalReferences", []),
                    action_steps=result.get("actionSteps", []),
                    sources=[s.get("source", "") if isinstance(s, dict) else str(s) for s in result.get("sources", [])],
                    confidence_score=0.8,
                    status="completed"
                )
                db.add(new_query)
                db.commit()
                
                yield f"data: {json.dumps({'type': 'complete', 'query_id': new_query.id})}\n\n"
            else:
                yield f"data: {json.dumps({'type': 'error', 'message': 'No relevant information found'})}\n\n"
                
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
    
    return StreamingResponse(generate_stream(), media_type="text/plain")

def ask_question(
    request: AskQuestionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        print(f"Received question: {request.question}")
        print(f"User: {current_user.email}")
        
        # Use ML service for real-time answers
        result = ml_service.generate_answer(request.question, request.language)
        
        print(f"Generated result: {result}")
        
        # Save query to database with all details
        new_query = Query(
            user_id=current_user.id,
            question=request.question,
            answer=result.get("answer", ""),
            language=request.language,
            query_type="text",
            legal_references=result.get("legalReferences", []),
            action_steps=result.get("actionSteps", []),
            sources=[s.get("source", "") if isinstance(s, dict) else str(s) for s in result.get("sources", [])],
            confidence_score=0.5,
            status="completed"
        )
        db.add(new_query)
        db.commit()
        db.refresh(new_query)
        
        print(f"Query saved with ID: {new_query.id}")
        
        return {
            "answer": result.get("answer", ""),
            "explanation": result.get("explanation", result.get("answer", "")),
            "legalReferences": result.get("legalReferences", []),
            "actionSteps": result.get("actionSteps", []),
            "sources": [s.get("source", "") if isinstance(s, dict) else str(s) for s in result.get("sources", [])],
            "query_id": new_query.id
        }
        
    except Exception as e:
        print(f"Error in ask_question: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        
        # Return a fallback response instead of crashing
        return {
            "answer": "I apologize, but I'm currently experiencing technical difficulties. Please try again later or contact support if the issue persists.",
            "explanation": "Service temporarily unavailable",
            "legalReferences": [],
            "actionSteps": [
                "Check your internet connection",
                "Make sure you are logged in", 
                "Try refreshing the page"
            ],
            "sources": [],
            "query_id": 0
        }

@router.get("/my-queries", response_model=List[QueryResponse])
def get_my_queries(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    queries = db.query(Query).filter(Query.user_id == current_user.id).order_by(Query.created_at.desc()).all()
    return queries

@router.get("/suggestions")
def get_query_suggestions(
    q: str,
    current_user: User = Depends(get_current_user)
):
    """Get real-time query suggestions"""
    if len(q) < 3:
        return {"suggestions": []}
    
    suggestions = ml_service.get_real_time_suggestions(q, limit=5)
    return {"suggestions": suggestions}

@router.post("/search-chunks")
def search_legal_chunks(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    """Search legal document chunks in real-time"""
    query = request.get("query", "")
    top_k = request.get("top_k", 10)
    
    if not query:
        return {"chunks": []}
    
    chunks = ml_service.search_similar_chunks(query, top_k=top_k)
    
    # Filter and format results
    formatted_chunks = []
    for chunk in chunks:
        if chunk["score"] > 0.3:  # Only return relevant chunks
            formatted_chunks.append({
                "text": chunk["text"][:300] + "..." if len(chunk["text"]) > 300 else chunk["text"],
                "source": chunk["source"].split("/")[-1].replace(".pdf", ""),
                "page": chunk["page"],
                "relevance": chunk.get("relevance", "medium"),
                "score": round(chunk["score"], 3)
            })
    
    return {
        "chunks": formatted_chunks,
        "total_found": len(chunks),
        "high_relevance": len([c for c in chunks if c["score"] > 0.7])
    }

@router.get("/{query_id}", response_model=QueryResponse)
def get_query_suggestions(
    q: str,
    current_user: User = Depends(get_current_user)
):
    """Get real-time query suggestions"""
    if len(q) < 3:
        return {"suggestions": []}
    
    suggestions = ml_service.get_real_time_suggestions(q, limit=5)
    return {"suggestions": suggestions}

@router.post("/search-chunks")
def search_legal_chunks(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    """Search legal document chunks in real-time"""
    query = request.get("query", "")
    top_k = request.get("top_k", 10)
    
    if not query:
        return {"chunks": []}
    
    chunks = ml_service.search_similar_chunks(query, top_k=top_k)
    
    # Filter and format results
    formatted_chunks = []
    for chunk in chunks:
        if chunk["score"] > 0.3:  # Only return relevant chunks
            formatted_chunks.append({
                "text": chunk["text"][:300] + "..." if len(chunk["text"]) > 300 else chunk["text"],
                "source": chunk["source"].split("/")[-1].replace(".pdf", ""),
                "page": chunk["page"],
                "relevance": chunk.get("relevance", "medium"),
                "score": round(chunk["score"], 3)
            })
    
    return {
        "chunks": formatted_chunks,
        "total_found": len(chunks),
        "high_relevance": len([c for c in chunks if c["score"] > 0.7])
    }
def get_query(
    query_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Query).filter(Query.id == query_id, Query.user_id == current_user.id).first()
    if not query:
        raise HTTPException(status_code=404, detail="Query not found")
    return query
