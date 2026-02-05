"""
STEP 3: RAG System Testing & Evaluation
Tests the RAG system with predefined questions and evaluates performance
"""
import os
import sys
import json
from pathlib import Path
from typing import List, Dict, Tuple
import pandas as pd

# Add ml_engine to path
ml_engine_dir = Path(__file__).parent
sys.path.insert(0, str(ml_engine_dir))

from config import (
    CHUNKS_FILE, EMBEDDINGS_FILE, FAISS_INDEX_FILE,
    TEST_DATASET_FILE, EVALUATION_RESULTS_FILE,
    TOP_K_CHUNKS, SYSTEM_PROMPT, USER_PROMPT_TEMPLATE
)
from pdf_processor import load_chunks
from embedding_engine import RAGVectorDatabase
from test_generator import generate_test_dataset


class RAGLegalAssistant:
    """RAG-based Legal Assistant"""
    
    def __init__(self, db_instance):
        self.db = db_instance
        self.chunks = load_chunks(CHUNKS_FILE)
    
    def retrieve_context(self, query: str, k: int = TOP_K_CHUNKS) -> Tuple[List[Dict], str]:
        """Retrieve relevant legal context"""
        results = self.db.search(query, k=k)
        
        context_parts = []
        for i, result in enumerate(results, 1):
            chunk = result['chunk']
            score = result['score']
            context_parts.append(
                f"[{i}] Source: {chunk['source']} (Score: {score:.3f})\n"
                f"Language: {chunk['language']}\n"
                f"Text: {chunk['text']}\n"
            )
        
        context = "\n".join(context_parts)
        return results, context
    
    def query(self, question: str) -> Dict:
        """Process query through RAG pipeline"""
        retrieved_chunks, context = self.retrieve_context(question)
        
        prompt = USER_PROMPT_TEMPLATE.format(
            user_question=question,
            retrieved_chunks=context
        )
        
        return {
            'question': question,
            'retrieved_chunks': [r['chunk'] for r in retrieved_chunks],
            'context': context,
            'prompt': prompt,
            'system_prompt': SYSTEM_PROMPT
        }


def main():
    print("=" * 80)
    print("STEP 3: RAG SYSTEM TESTING & EVALUATION")
    print("=" * 80)
    
    # Check if required files exist
    required_files = [
        (CHUNKS_FILE, "Chunks file"),
        (EMBEDDINGS_FILE, "Embeddings file"),
        (FAISS_INDEX_FILE, "FAISS index file")
    ]
    
    missing_files = []
    for file_path, file_name in required_files:
        if not file_path.exists():
            missing_files.append(file_name)
    
    if missing_files:
        print(f"\n❌ ERROR: Missing required files:")
        for name in missing_files:
            print(f"  - {name}")
        print("\nPlease run the previous steps first:")
        print("  1. python train_step1_process_pdfs.py")
        print("  2. python train_step2_embeddings.py")
        return
    
    # Load vector database
    print(f"\n📂 Loading vector database...")
    db = RAGVectorDatabase()
    db.load(EMBEDDINGS_FILE, FAISS_INDEX_FILE)
    
    # Initialize RAG Assistant
    print("\n🤖 Initializing RAG Legal Assistant...")
    rag = RAGLegalAssistant(db)
    print("✅ RAG Legal Assistant initialized")
    
    # Generate test dataset
    print("\n" + "=" * 80)
    print("📋 GENERATING TEST DATASET")
    print("=" * 80)
    
    test_questions = generate_test_dataset()
    
    print("\n📚 Test Questions:")
    for i, q in enumerate(test_questions, 1):
        print(f"{i}. {q['question']}")
        print(f"   Category: {q['category']} | Difficulty: {q['difficulty']}")
    
    # Test RAG system
    print("\n" + "=" * 80)
    print("🧪 RAG SYSTEM TESTING")
    print("=" * 80)
    
    evaluation_results = []
    
    for idx, test_q in enumerate(test_questions, 1):
        question = test_q['question']
        expected_sections = test_q['expected_sections']
        category = test_q['category']
        difficulty = test_q['difficulty']
        
        # Query RAG system
        result = rag.query(question)
        
        # Check if expected sections found
        context_lower = result['context'].lower()
        found_sections = [
            section for section in expected_sections
            if section.lower() in context_lower
        ]
        
        match_score = len(found_sections) / len(expected_sections) if expected_sections else 0
        
        print(f"\n[{idx}/{len(test_questions)}] {category} ({difficulty})")
        print(f"Question: {question}")
        print(f"Expected: {', '.join(expected_sections)}")
        print(f"Found: {', '.join(found_sections) if found_sections else 'None'}")
        print(f"Match Score: {match_score*100:.0f}%")
        
        # Show retrieved chunks
        print(f"Retrieved Chunks:")
        for i, chunk in enumerate(result['retrieved_chunks'][:3], 1):
            print(f"  [{i}] {chunk['source']} ({chunk['language']})")
            print(f"      {chunk['text'][:100]}...")
        
        evaluation_results.append({
            'question': question,
            'category': category,
            'difficulty': difficulty,
            'expected_sections': expected_sections,
            'found_sections': found_sections,
            'match_score': match_score,
            'retrieved_chunks': len(result['retrieved_chunks'])
        })
    
    # Save evaluation results
    print("\n" + "=" * 80)
    print("💾 SAVING EVALUATION RESULTS")
    print("=" * 80)
    
    with open(EVALUATION_RESULTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(evaluation_results, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Saved to {EVALUATION_RESULTS_FILE}")
    
    # Evaluation Summary
    print("\n" + "=" * 80)
    print("📊 EVALUATION SUMMARY")
    print("=" * 80)
    
    df_results = pd.DataFrame(evaluation_results)
    
    print(f"\n📈 Overall Metrics:")
    print(f"  Total Questions: {len(df_results)}")
    print(f"  Average Match Score: {df_results['match_score'].mean()*100:.1f}%")
    print(f"  Min Match Score: {df_results['match_score'].min()*100:.1f}%")
    print(f"  Max Match Score: {df_results['match_score'].max()*100:.1f}%")
    
    print(f"\n📊 By Difficulty:")
    for diff in ['basic', 'medium', 'advanced']:
        subset = df_results[df_results['difficulty'] == diff]
        if len(subset) > 0:
            avg_score = subset['match_score'].mean() * 100
            print(f"  {diff.capitalize()}: {len(subset)} questions, {avg_score:.1f}% avg match")
    
    print(f"\n📂 By Category:")
    for cat in sorted(df_results['category'].unique()):
        subset = df_results[df_results['category'] == cat]
        avg_score = subset['match_score'].mean() * 100
        print(f"  {cat}: {len(subset)} questions, {avg_score:.1f}% avg match")
    
    # Example query demonstration
    print("\n" + "=" * 80)
    print("🔍 EXAMPLE QUERY DEMONSTRATION")
    print("=" * 80)
    
    example_query = "Can police arrest someone without a warrant?"
    print(f"\nQuery: {example_query}\n")
    
    result = rag.query(example_query)
    
    print("Retrieved Context:")
    print("-" * 80)
    for i, chunk in enumerate(result['retrieved_chunks'], 1):
        print(f"[{i}] {chunk['source']} ({chunk['language']})")
        print(f"    {chunk['text'][:150]}...\n")
    
    print("\n" + "=" * 80)
    print("✅ STEP 3 COMPLETE!")
    print("=" * 80)
    print(f"\n📁 Output saved to: {EVALUATION_RESULTS_FILE}")
    print(f"\n✨ RAG Legal Assistant is ready to use!")
    print("\nYou can now:")
    print("  1. Use the RAG system in your application")
    print("  2. Run custom queries")
    print("  3. Integrate with LLM APIs (Claude, Gemini, etc.)")
    print("=" * 80)


if __name__ == "__main__":
    main()
