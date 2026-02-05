"""
STEP 2: Embedding Generation & FAISS Index Creation
Generates embeddings for all chunks and creates FAISS index
"""
import os
import sys
from pathlib import Path

# Add ml_engine to path
ml_engine_dir = Path(__file__).parent
sys.path.insert(0, str(ml_engine_dir))

from config import (
    CHUNKS_FILE, EMBEDDINGS_FILE, FAISS_INDEX_FILE,
    EMBEDDING_MODEL
)
from pdf_processor import load_chunks
from embedding_engine import RAGVectorDatabase


def main():
    print("=" * 80)
    print("STEP 2: EMBEDDING GENERATION & FAISS INDEX CREATION")
    print("=" * 80)
    
    # Check if chunks file exists
    if not CHUNKS_FILE.exists():
        print(f"\n❌ ERROR: Chunks file not found: {CHUNKS_FILE}")
        print("Please run 'python train_step1_process_pdfs.py' first!")
        return
    
    # Load chunks
    print(f"\n📂 Loading chunks from {CHUNKS_FILE}...")
    all_chunks = load_chunks(CHUNKS_FILE)
    print(f"✅ Loaded {len(all_chunks)} chunks")
    
    # Initialize vector database
    print("\n" + "=" * 80)
    print("🤖 INITIALIZING EMBEDDING MODEL")
    print("=" * 80)
    print(f"Model: {EMBEDDING_MODEL}")
    db = RAGVectorDatabase()
    
    # Create embeddings
    print("\n" + "=" * 80)
    print("🔄 GENERATING EMBEDDINGS")
    print("=" * 80)
    print("⏳ This may take a few minutes depending on the number of chunks...\n")
    
    db.create_embeddings(all_chunks)
    
    # Create FAISS index
    print("\n" + "=" * 80)
    print("🔄 CREATING FAISS INDEX")
    print("=" * 80)
    
    db.create_faiss_index()
    
    # Save to disk
    print("\n" + "=" * 80)
    print("💾 SAVING TO DISK")
    print("=" * 80)
    
    db.save(EMBEDDINGS_FILE, FAISS_INDEX_FILE)
    
    # Test search functionality
    print("\n" + "=" * 80)
    print("🔍 TESTING SEARCH FUNCTIONALITY")
    print("=" * 80)
    
    test_queries = [
        "Can police arrest without warrant?",
        "What is punishment for theft?",
        "What are consumer rights?"
    ]
    
    for query in test_queries:
        print(f"\n❓ Query: {query}")
        results = db.search(query, k=3)
        
        for i, result in enumerate(results, 1):
            chunk = result['chunk']
            score = result['score']
            print(f"  [{i}] Score: {score:.3f} | Source: {chunk['source']}")
            print(f"      {chunk['text'][:100]}...")
    
    print("\n" + "=" * 80)
    print("✅ STEP 2 COMPLETE!")
    print("=" * 80)
    print(f"\n📁 Outputs saved:")
    print(f"  - Embeddings: {EMBEDDINGS_FILE}")
    print(f"  - FAISS Index: {FAISS_INDEX_FILE}")
    print(f"\n🚀 Next step: Run 'python test_rag_system.py'")
    print("=" * 80)


if __name__ == "__main__":
    main()
