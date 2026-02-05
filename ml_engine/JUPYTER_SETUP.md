# Environment Setup & Jupyter Notebook Guide

## ✅ Quick Start (Windows)

### 1️⃣ Create Virtual Environment
```bash
# Run the setup script
setup_env.bat
```

This will:
- Create a virtual environment (`rag_env`)
- Install all dependencies
- Install Jupyter/JupyterLab

### 2️⃣ Activate Environment (Future Use)
```bash
# Activate virtual environment
rag_env\Scripts\activate.bat

# Or in PowerShell
rag_env\Scripts\Activate.ps1
```

### 3️⃣ Start Jupyter Notebook
```bash
# Make sure environment is activated first
jupyter notebook
```

This opens Jupyter in your browser at `http://localhost:8888`

### 4️⃣ Open the Notebook
Navigate to: `notebook/RAG_Legal_Assistant_Pipeline.ipynb`

---

## ✅ Quick Start (Linux/Mac)

### 1️⃣ Create Virtual Environment
```bash
bash setup_env.sh
```

### 2️⃣ Activate Environment (Future Use)
```bash
source rag_env/bin/activate
```

### 3️⃣ Start Jupyter
```bash
jupyter notebook
```

### 4️⃣ Open Notebook
Navigate to: `notebook/RAG_Legal_Assistant_Pipeline.ipynb`

---

## 📓 What's in the Jupyter Notebook?

The notebook (`RAG_Legal_Assistant_Pipeline.ipynb`) contains 6 complete sections:

### 1️⃣ **Step 0: Environment Setup**
- Import all required libraries
- Set up paths and configuration

### 2️⃣ **Step 1: PDF Processing & Chunking**
- Extract text from all PDF files
- Create overlapping chunks
- Analyze chunk statistics
- Display sample chunks

### 3️⃣ **Step 2: Embedding Generation & FAISS**
- Generate embeddings for all chunks
- Create FAISS index
- Test similarity search with sample queries

### 4️⃣ **Step 3: Test Dataset Generation**
- Create 10 legal test questions
- Display questions with categories

### 5️⃣ **Step 4: RAG Testing & Evaluation**
- Initialize RAG Assistant
- Test system with all questions
- Calculate match scores
- Print comprehensive evaluation summary

### 6️⃣ **Step 5 & 6: Interactive Testing**
- Query the RAG system with your own questions
- Display retrieved context
- Show prompts ready for Claude API

---

## 🎯 Running the Notebook

### Option A: Run All Cells
Click `Cell` → `Run All` to execute the entire pipeline (takes ~5-10 minutes)

### Option B: Run Cells One by One
1. Click on a cell
2. Press `Shift+Enter` to run it
3. See output below the cell
4. Move to next cell

### Option C: Interactive Development
- Modify cells and re-run them
- Test custom queries in the final cells
- Explore results with pandas DataFrames

---

## 📊 What Gets Created

After running the notebook, you'll have:

```
data/processed/
├── chunks.json                    # All text chunks
├── embeddings.pkl                 # Vector embeddings
├── faiss_index.bin                # FAISS index
├── test_questions.json            # Test dataset
└── evaluation_results.json        # Results with scores
```

---

## 🔍 Key Features of the Notebook

✅ **Complete Pipeline in One Place**
- All 5 steps integrated
- Easy to run and understand
- No need to run separate Python scripts

✅ **Interactive Results**
- See chunk analysis and statistics
- Visualize search results
- Test custom queries live
- Display prompts ready for Claude

✅ **Evaluation Dashboard**
- Overall performance metrics
- Breakdown by difficulty
- Breakdown by category
- Per-question match scores

✅ **Educational**
- Well-commented code
- Clear explanations
- Shows data transformations
- Example outputs

---

## ⚙️ Environment Details

The virtual environment includes:

```
PyPDF2==3.0.1                    # PDF text extraction
sentence-transformers==2.2.2     # Embedding model
faiss-cpu==1.7.4                 # Vector search
numpy==1.24.3                    # Numerical computing
pandas==2.0.3                    # Data analysis
jupyter==1.0.0                   # Notebook server
jupyterlab==4.0.0                # Advanced notebook UI
ipython==8.10.0                  # Interactive Python
python-dotenv==1.0.0             # Environment variables
tqdm==4.65.0                     # Progress bars
```

---

## 🛠️ Troubleshooting

### Issue: "Permission denied" on Windows
**Solution:** Right-click PowerShell and select "Run as Administrator", then run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: "Module not found" errors
**Solution:** Make sure you're in the correct directory:
```bash
cd "m:\PROJECT 2026\Adikar_AI\ml_engine"
jupyter notebook
```

### Issue: Notebook very slow
**Solution:** This is normal for the first run. Embedding generation takes time:
- ~1-2 minutes to load embedding model
- ~5-10 minutes to generate embeddings for all chunks
- Subsequent runs will be faster (loads from cache)

### Issue: "PyPDF2" import error in notebook
**Solution:** Make sure you activated the virtual environment:
```bash
rag_env\Scripts\activate.bat
jupyter notebook
```

---

## 💡 Tips

1. **Use Markdown cells** to add notes and documentation
2. **Run cells in order** - later cells depend on earlier ones
3. **Modify parameters** in cells to experiment
4. **Save notebook** often with `Ctrl+S`
5. **Use `nb_conda`** extension for environment management (optional)

---

## 🚀 Next Steps

After running the notebook:

1. ✅ Verify FAISS index created successfully
2. ✅ Review evaluation results
3. ✅ Test custom queries
4. ✅ Integrate with Antigravity/Claude API
5. ✅ Add Hindi query translation (if needed)
6. ✅ Deploy as web service

---

## 📚 Resources

- [Jupyter Documentation](https://jupyter.org/)
- [Sentence Transformers](https://www.sbert.net/)
- [FAISS Documentation](https://github.com/facebookresearch/faiss)
- [Pandas Tutorial](https://pandas.pydata.org/docs/)

---

## Summary

✨ You now have:
- ✅ Virtual environment setup scripts (Windows & Linux/Mac)
- ✅ Complete Jupyter notebook with all 5 pipeline steps
- ✅ Interactive testing and evaluation
- ✅ Ready for production with Claude/Antigravity integration

**Next: Run `setup_env.bat` (or `.sh` on Linux/Mac) to create your environment!**
