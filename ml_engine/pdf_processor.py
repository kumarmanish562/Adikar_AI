"""
PDF Processing module for RAG Legal Assistant
Handles PDF extraction, text cleaning, and chunking
"""
import os
import json
from pathlib import Path
from typing import List, Dict
import PyPDF2
from tqdm import tqdm
from config import CHUNK_SIZE, CHUNK_OVERLAP


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        Extracted text as a string
    """
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""


def clean_text(text: str) -> str:
    """
    Clean extracted text
    
    Args:
        text: Raw text from PDF
        
    Returns:
        Cleaned text
    """
    # Remove excessive whitespace
    text = ' '.join(text.split())
    
    # Remove special characters but keep basic punctuation
    # text = re.sub(r'[^\w\s\.,;:?!()\-\'\"।]', '', text)
    
    return text


def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, 
               overlap: int = CHUNK_OVERLAP) -> List[str]:
    """
    Split text into overlapping chunks
    
    Args:
        text: Text to chunk
        chunk_size: Size of each chunk in characters
        overlap: Overlap between chunks in characters
        
    Returns:
        List of text chunks
    """
    chunks = []
    start = 0
    text_length = len(text)
    
    while start < text_length:
        end = start + chunk_size
        chunk = text[start:end]
        
        # Only add non-empty chunks
        if chunk.strip():
            chunks.append(chunk.strip())
        
        start += chunk_size - overlap
    
    return chunks


def process_pdfs(pdf_directory: Path, language: str) -> List[Dict]:
    """
    Process all PDFs in a directory
    
    Args:
        pdf_directory: Path to directory containing PDFs
        language: Language label ('english' or 'hindi')
        
    Returns:
        List of chunk dictionaries
    """
    all_chunks = []
    
    if not pdf_directory.exists():
        print(f"⚠️  Directory not found: {pdf_directory}")
        return all_chunks
    
    pdf_files = list(pdf_directory.glob("*.pdf"))
    
    if not pdf_files:
        print(f"⚠️  No PDF files found in {pdf_directory}")
        return all_chunks
    
    print(f"Processing {len(pdf_files)} PDFs from {pdf_directory}")
    
    for pdf_file in tqdm(pdf_files, desc=f"Processing {language} PDFs"):
        # Extract text
        text = extract_text_from_pdf(pdf_file)
        
        if not text:
            continue
        
        # Clean text
        cleaned_text = clean_text(text)
        
        # Create chunks
        chunks = chunk_text(cleaned_text)
        
        # Add metadata to each chunk
        for chunk in chunks:
            all_chunks.append({
                'text': chunk,
                'source': pdf_file.name,
                'language': language,
                'chunk_size': len(chunk)
            })
    
    return all_chunks


def save_chunks(chunks: List[Dict], output_file: Path):
    """
    Save chunks to JSON file
    
    Args:
        chunks: List of chunk dictionaries
        output_file: Path to output JSON file
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
    print(f"✅ Saved {len(chunks)} chunks to {output_file}")


def load_chunks(chunks_file: Path) -> List[Dict]:
    """
    Load chunks from JSON file
    
    Args:
        chunks_file: Path to chunks JSON file
        
    Returns:
        List of chunk dictionaries
    """
    with open(chunks_file, 'r', encoding='utf-8') as f:
        chunks = json.load(f)
    return chunks
