"""
Embedding Engine for RAG Legal Assistant
Handles embedding generation and FAISS vector database
"""
import pickle
import numpy as np
from typing import List, Dict, Tuple
from sentence_transformers import SentenceTransformer
import faiss
from tqdm import tqdm
from config import EMBEDDING_MODEL


class RAGVectorDatabase:
    """
    Vector database for RAG system using FAISS
    """
    
    def __init__(self, model_name: str = EMBEDDING_MODEL):
        """
        Initialize the vector database
        
        Args:
            model_name: Name of the sentence-transformer model
        """
        print(f"Loading embedding model: {model_name}")
        self.model = SentenceTransformer(model_name)
        self.embeddings = None
        self.chunks = None
        self.index = None
        self.dimension = self.model.get_sentence_embedding_dimension()
        print(f"✅ Model loaded (embedding dimension: {self.dimension})")
    
    def create_embeddings(self, chunks: List[Dict], batch_size: int = 32):
        """
        Create embeddings for all chunks
        
        Args:
            chunks: List of chunk dictionaries
            batch_size: Batch size for encoding
        """
        self.chunks = chunks
        texts = [chunk['text'] for chunk in chunks]
        
        print(f"Generating embeddings for {len(texts)} chunks...")
        self.embeddings = self.model.encode(
            texts, 
            batch_size=batch_size,
            show_progress_bar=True,
            convert_to_numpy=True
        )
        
        print(f"✅ Generated embeddings with shape: {self.embeddings.shape}")
    
    def create_faiss_index(self):
        """
        Create FAISS index for fast similarity search
        """
        if self.embeddings is None:
            raise ValueError("Embeddings not created yet. Call create_embeddings() first.")
        
        # Normalize embeddings for cosine similarity
        faiss.normalize_L2(self.embeddings)
        
        # Create FAISS index (using Inner Product for normalized vectors = cosine similarity)
        self.index = faiss.IndexFlatIP(self.dimension)
        self.index.add(self.embeddings)
        
        print(f"✅ FAISS index created with {self.index.ntotal} vectors")
    
    def search(self, query: str, k: int = 5) -> List[Dict]:
        """
        Search for most similar chunks
        
        Args:
            query: Search query
            k: Number of results to return
            
        Returns:
            List of dictionaries containing chunks and similarity scores
        """
        if self.index is None:
            raise ValueError("FAISS index not created. Call create_faiss_index() first.")
        
        # Encode query
        query_embedding = self.model.encode([query], convert_to_numpy=True)
        faiss.normalize_L2(query_embedding)
        
        # Search
        scores, indices = self.index.search(query_embedding, k)
        
        # Prepare results
        results = []
        for score, idx in zip(scores[0], indices[0]):
            results.append({
                'chunk': self.chunks[idx],
                'score': float(score),
                'index': int(idx)
            })
        
        return results
    
    def save(self, embeddings_file: str, index_file: str):
        """
        Save embeddings and FAISS index to disk
        
        Args:
            embeddings_file: Path to save embeddings pickle file
            index_file: Path to save FAISS index
        """
        # Save embeddings and chunks
        with open(embeddings_file, 'wb') as f:
            pickle.dump({
                'embeddings': self.embeddings,
                'chunks': self.chunks
            }, f)
        
        # Save FAISS index
        faiss.write_index(self.index, str(index_file))
        
        print(f"✅ Saved embeddings to {embeddings_file}")
        print(f"✅ Saved FAISS index to {index_file}")
    
    def load(self, embeddings_file: str, index_file: str):
        """
        Load embeddings and FAISS index from disk
        
        Args:
            embeddings_file: Path to embeddings pickle file
            index_file: Path to FAISS index file
        """
        # Load embeddings and chunks
        with open(embeddings_file, 'rb') as f:
            data = pickle.load(f)
            self.embeddings = data['embeddings']
            self.chunks = data['chunks']
        
        # Load FAISS index
        self.index = faiss.read_index(str(index_file))
        
        print(f"✅ Loaded {len(self.chunks)} chunks from {embeddings_file}")
        print(f"✅ Loaded FAISS index with {self.index.ntotal} vectors from {index_file}")
