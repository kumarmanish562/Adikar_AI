"""
STEP 1: PDF Processing & Chunking
Processes all PDFs and creates text chunks for embedding
"""
import os
import sys
from pathlib import Path

# Add ml_engine to path
ml_engine_dir = Path(__file__).parent
sys.path.insert(0, str(ml_engine_dir))

from config import (
    ENGLISH_PDFS, HINDI_PDFS, CHUNKS_FILE,
    PROCESSED_DIR
)
from pdf_processor import process_pdfs, save_chunks, load_chunks
import pandas as pd


def main():
    print("=" * 80)
    print("STEP 1: PDF PROCESSING & CHUNKING")
    print("=" * 80)
    
    # Ensure processed directory exists
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    
    # List available PDFs
    print("\n📄 Available PDFs:\n")
    
    print("English PDFs:")
    if ENGLISH_PDFS.exists():
        english_files = list(ENGLISH_PDFS.glob("*.pdf"))
        for f in english_files:
            print(f"  ✓ {f.name}")
        print(f"  Total: {len(english_files)} files")
    else:
        print(f"  ❌ Directory not found: {ENGLISH_PDFS}")
    
    print("\nHindi PDFs:")
    if HINDI_PDFS.exists():
        hindi_files = list(HINDI_PDFS.glob("*.pdf"))
        for f in hindi_files:
            print(f"  ✓ {f.name}")
        print(f"  Total: {len(hindi_files)} files")
    else:
        print(f"  ❌ Directory not found: {HINDI_PDFS}")
    
    # Process PDFs
    print("\n" + "=" * 80)
    print("🔄 PROCESSING PDFs...")
    print("=" * 80)
    
    all_chunks = []
    
    # Process English PDFs
    if ENGLISH_PDFS.exists():
        print("\n📄 Processing English PDFs...")
        english_chunks = process_pdfs(ENGLISH_PDFS, "english")
        all_chunks.extend(english_chunks)
        print(f"   ✅ Created {len(english_chunks)} chunks\n")
    
    # Process Hindi PDFs
    if HINDI_PDFS.exists():
        print("📄 Processing Hindi PDFs...")
        hindi_chunks = process_pdfs(HINDI_PDFS, "hindi")
        all_chunks.extend(hindi_chunks)
        print(f"   ✅ Created {len(hindi_chunks)} chunks\n")
    
    if not all_chunks:
        print("❌ No chunks created. Please check your PDF directories.")
        return
    
    # Save chunks
    print("=" * 80)
    save_chunks(all_chunks, CHUNKS_FILE)
    
    # Analyze chunks
    print("\n📊 CHUNK ANALYSIS:")
    print("=" * 80)
    df_chunks = pd.DataFrame(all_chunks)
    
    print(f"\nTotal chunks: {len(df_chunks)}")
    
    print(f"\nBy Language:")
    print(df_chunks['language'].value_counts())
    
    print(f"\nBy Source (top 10):")
    print(df_chunks['source'].value_counts().head(10))
    
    print(f"\nChunk Size Statistics:")
    chunk_lengths = df_chunks['text'].str.len()
    print(f"  Min: {chunk_lengths.min()} chars")
    print(f"  Max: {chunk_lengths.max()} chars")
    print(f"  Mean: {chunk_lengths.mean():.1f} chars")
    print(f"  Median: {chunk_lengths.median():.1f} chars")
    
    # Display sample chunks
    print("\n📝 SAMPLE CHUNKS:")
    print("=" * 80)
    for i in range(min(3, len(all_chunks))):
        chunk = all_chunks[i]
        print(f"\nSample {i+1}:")
        print(f"  Source: {chunk['source']}")
        print(f"  Language: {chunk['language']}")
        print(f"  Text: {chunk['text'][:200]}...")
    
    print("\n" + "=" * 80)
    print("✅ STEP 1 COMPLETE!")
    print("=" * 80)
    print(f"\n📁 Output saved to: {CHUNKS_FILE}")
    print(f"\n🚀 Next step: Run 'python train_step2_embeddings.py'")
    print("=" * 80)


if __name__ == "__main__":
    main()
