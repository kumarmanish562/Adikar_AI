from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import os
import shutil
from database import get_db
from models.user import User
from utils.auth import get_current_user

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/scan")
async def scan_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, f"{current_user.id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # TODO: Process document with ML engine
    
    return {
        "message": "Document uploaded successfully",
        "filename": file.filename,
        "status": "processing"
    }

@router.get("/list")
def list_documents(current_user: User = Depends(get_current_user)):
    # TODO: Implement document listing from database
    return {"documents": []}
