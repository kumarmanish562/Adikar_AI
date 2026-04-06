from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any

class QueryCreate(BaseModel):
    question: str
    language: Optional[str] = "en"

class QueryResponse(BaseModel):
    id: int
    question: str
    answer: Optional[str]
    language: str
    query_type: Optional[str] = "text"
    legal_references: Optional[List[Dict[str, Any]]] = []
    action_steps: Optional[List[str]] = []
    sources: Optional[List[str]] = []
    confidence_score: Optional[float] = None
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class AskQuestionRequest(BaseModel):
    question: str
    language: Optional[str] = "en"
    query_type: Optional[str] = "text"

class AskQuestionResponse(BaseModel):
    answer: str
    explanation: Optional[str] = None
    legalReferences: Optional[List[Dict[str, str]]] = []
    actionSteps: Optional[List[str]] = []
    sources: Optional[List[str]] = []
    query_id: int
