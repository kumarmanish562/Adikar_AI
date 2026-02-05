"""
Test Dataset Generator for RAG Legal Assistant
Generates test questions for evaluation
"""
import json
from pathlib import Path
from typing import List, Dict
from config import TEST_DATASET_FILE


def generate_test_dataset() -> List[Dict]:
    """
    Generate test questions for evaluating the RAG system
    
    Returns:
        List of test question dictionaries
    """
    test_questions = [
        # Criminal Law
        {
            "question": "Can police arrest someone without a warrant?",
            "category": "Criminal Law",
            "difficulty": "basic",
            "expected_sections": ["Section 41 CrPC", "arrest", "warrant"]
        },
        {
            "question": "What is the punishment for theft?",
            "category": "Criminal Law",
            "difficulty": "basic",
            "expected_sections": ["Section 379 IPC", "theft", "punishment"]
        },
        {
            "question": "What are the rights of an arrested person?",
            "category": "Criminal Law",
            "difficulty": "medium",
            "expected_sections": ["Article 22", "rights", "arrested"]
        },
        
        # Property Law
        {
            "question": "Can a landlord evict a tenant without notice?",
            "category": "Property Law",
            "difficulty": "medium",
            "expected_sections": ["rent control", "eviction", "notice"]
        },
        {
            "question": "What is the process for property registration?",
            "category": "Property Law",
            "difficulty": "medium",
            "expected_sections": ["registration", "property", "document"]
        },
        
        # Consumer Rights
        {
            "question": "What are consumer rights in India?",
            "category": "Consumer Rights",
            "difficulty": "basic",
            "expected_sections": ["consumer protection", "rights"]
        },
        {
            "question": "How to file a consumer complaint?",
            "category": "Consumer Rights",
            "difficulty": "medium",
            "expected_sections": ["consumer forum", "complaint", "procedure"]
        },
        
        # Family Law
        {
            "question": "What is the procedure for divorce in India?",
            "category": "Family Law",
            "difficulty": "medium",
            "expected_sections": ["divorce", "marriage", "grounds"]
        },
        {
            "question": "What is domestic violence law?",
            "category": "Family Law",
            "difficulty": "basic",
            "expected_sections": ["domestic violence", "protection", "women"]
        },
        {
            "question": "What are child custody laws?",
            "category": "Family Law",
            "difficulty": "advanced",
            "expected_sections": ["custody", "child", "guardianship"]
        }
    ]
    
    # Save test dataset
    with open(TEST_DATASET_FILE, 'w', encoding='utf-8') as f:
        json.dump(test_questions, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generated {len(test_questions)} test questions")
    print(f"✅ Saved to {TEST_DATASET_FILE}")
    
    return test_questions


def load_test_dataset() -> List[Dict]:
    """
    Load test dataset from file
    
    Returns:
        List of test question dictionaries
    """
    with open(TEST_DATASET_FILE, 'r', encoding='utf-8') as f:
        test_questions = json.load(f)
    return test_questions
