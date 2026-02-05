"""
Configuration file for RAG Legal Assistant Pipeline
"""
import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
PROCESSED_DIR = DATA_DIR / "processed"
RAW_PDF_DIR = DATA_DIR / "raw_pdfs"

# PDF directories
ENGLISH_PDFS = RAW_PDF_DIR / "english"
HINDI_PDFS = RAW_PDF_DIR / "hindi"

# Ensure directories exist
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

# Output files
CHUNKS_FILE = PROCESSED_DIR / "chunks.json"
EMBEDDINGS_FILE = PROCESSED_DIR / "embeddings.pkl"
FAISS_INDEX_FILE = PROCESSED_DIR / "faiss_index.bin"
TEST_DATASET_FILE = PROCESSED_DIR / "test_questions.json"
EVALUATION_RESULTS_FILE = PROCESSED_DIR / "evaluation_results.json"

# Processing parameters
CHUNK_SIZE = 500  # Characters per chunk
CHUNK_OVERLAP = 100  # Overlap between chunks
TOP_K_CHUNKS = 5  # Number of chunks to retrieve per query

# Model configuration
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"  # 384-dimensional embeddings

# Prompts for LLM
SYSTEM_PROMPT = """You are a legal assistant specializing in Indian law. 
Your role is to provide accurate, helpful information based on the retrieved legal documents.

Guidelines:
- Base your answers strictly on the provided legal text chunks
- Cite the source documents when providing information
- If the retrieved information doesn't contain the answer, say so clearly
- Use simple, clear language that non-lawyers can understand
- Provide both English and Hindi information when available
- Always remind users to consult a qualified lawyer for specific legal advice
"""

USER_PROMPT_TEMPLATE = """Based on the following retrieved legal document chunks, please answer the user's question:

USER QUESTION: {user_question}

RETRIEVED LEGAL CHUNKS:
{retrieved_chunks}

Please provide a comprehensive answer based on the above information. If the retrieved chunks don't contain sufficient information to answer the question, please state that clearly.
"""
