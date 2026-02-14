# RAG Legal Assistant - Training & Testing Guide

## 🎯 Overview
This RAG (Retrieval-Augmented Generation) Legal Assistant processes Indian legal documents and enables semantic search and question-answering.

**Note**: This is **NOT** a traditional ML training process. We use **pre-trained embeddings** (no model training required).

## 📋 Prerequisites

1. **Activate the virtual environment**:
   ```powershell
   cd "m:\PROJECT 2026\Adikar_AI"
   .\rag_env\Scripts\Activate.ps1
   ```

2. **Install dependencies**:
   ```powershell
   cd ml_engine
   pip install -r requirements.txt
   ```

## 🚀 Training Process (3 Steps)

### Step 1: PDF Processing & Chunking
**Purpose**: Extract text from PDFs and create chunks for embedding

```powershell
python train_step1_process_pdfs.py
```

**What it does**:
- ✅ Reads all PDFs from `data/raw_pdfs/english` and `data/raw_pdfs/hindi`
- ✅ Extracts text using PyPDF2
- ✅ Cleans and chunks text (500 chars per chunk, 100 char overlap)
- ✅ Saves chunks to `data/processed/chunks.json`

**Output**: `data/processed/chunks.json`

---

### Step 2: Embedding Generation & FAISS Index
**Purpose**: Convert text chunks to vectors and create search index

```powershell
python train_step2_embeddings.py
```

**What it does**:
- ✅ Loads chunks from Step 1
- ✅ Generates embeddings using sentence-transformers (384-dimensional)
- ✅ Creates FAISS index for fast similarity search
- ✅ Tests basic search functionality
- ✅ Saves embeddings and index to disk

**Output**: 
- `data/processed/embeddings.pkl`
- `data/processed/faiss_index.bin`

⏱️ **Time**: 5-15 minutes (depends on number of PDFs)

---

### Step 3: Testing & Evaluation
**Purpose**: Test the RAG system and evaluate performance

```powershell
python test_rag_system.py
```

**What it does**:
- ✅ Loads the trained vector database
- ✅ Generates test questions (10 legal queries)
- ✅ Tests retrieval accuracy
- ✅ Calculates match scores
- ✅ Demonstrates example queries

**Output**: `data/processed/evaluation_results.json`

---

## 📊 Expected Results

After running all 3 steps, you should have:
- ✅ Processed chunks from ~15 legal PDFs
- ✅ 5000+ text chunks indexed
- ✅ FAISS search index ready
- ✅ ~70-90% average match score on test questions

## 🔍 Testing the System

After completing all steps, you can query the RAG system:

```python
from embedding_engine import RAGVectorDatabase
from config import EMBEDDINGS_FILE, FAISS_INDEX_FILE

# Load the database
db = RAGVectorDatabase()
db.load(EMBEDDINGS_FILE, FAISS_INDEX_FILE)

# Search for relevant chunks
results = db.search("Can police arrest without warrant?", k=5)

for result in results:
    print(f"Score: {result['score']:.3f}")
    print(f"Source: {result['chunk']['source']}")
    print(f"Text: {result['chunk']['text'][:200]}...\n")
```

## 📁 Directory Structure

```
ml_engine/
├── data/
│   ├── raw_pdfs/
│   │   ├── english/     # English legal PDFs (8 files)
│   │   └── hindi/       # Hindi legal PDFs (7 files)
│   └── processed/       # Generated outputs
│       ├── chunks.json
│       ├── embeddings.pkl
│       ├── faiss_index.bin
│       ├── test_questions.json
│       └── evaluation_results.json
├── config.py            # Configuration
├── pdf_processor.py     # PDF processing module
├── embedding_engine.py  # Embedding & FAISS module
├── test_generator.py    # Test dataset generator
├── train_step1_process_pdfs.py    # Step 1 script
├── train_step2_embeddings.py      # Step 2 script
├── test_rag_system.py             # Step 3 script
└── requirements.txt
```

## ⚠️ Troubleshooting

### Error: "No module named 'config'"
- Make sure you're in the `ml_engine` directory
- The script automatically adds the directory to Python path

### Error: "Chunks file not found"
- Run Step 1 first: `python train_step1_process_pdfs.py`

### Error: "No PDF files found"
- Check if PDFs exist in `data/raw_pdfs/english` and `data/raw_pdfs/hindi`

### Error: "FAISS index not found"
- Run Step 2 first: `python train_step2_embeddings.py`

## 🔗 Next Steps

1. **Integrate with LLM**: Use Claude, Gemini, or Antigravity API to generate answers
2. **Deploy as API**: Create a Flask/FastAPI service
3. **Add Hindi support**: Implement Hindi query translation
4. **Fine-tune parameters**: Adjust chunk size, overlap, and TOP_K

## 📝 Notes

- **No traditional training**: This RAG system uses pre-trained sentence-transformers
- **GPU not required**: CPU processing works fine (just slower)
- **Incremental updates**: You can re-run Step 1 if you add more PDFs
- **Fast inference**: FAISS enables sub-second searches on thousands of ch
