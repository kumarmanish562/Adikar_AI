import sys
import os
import json
import pickle
import faiss
import numpy as np
from typing import List, Dict
from sentence_transformers import SentenceTransformer
from config import settings

# Add ML engine to path
sys.path.append(settings.ML_ENGINE_PATH)

class MLService:
    def __init__(self):
        self.model = None
        self.index = None
        self.chunks = None
        self.load_resources()
    
    def load_resources(self):
        """Load embeddings model, FAISS index, and chunks"""
        try:
            # Load sentence transformer model
            self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
            
            # Load chunks first
            if os.path.exists(settings.CHUNKS_PATH):
                with open(settings.CHUNKS_PATH, 'r', encoding='utf-8') as f:
                    self.chunks = json.load(f)
                print(f"Loaded {len(self.chunks)} chunks")
            
            # Load FAISS index and check dimensions
            if os.path.exists(settings.FAISS_INDEX_PATH):
                self.index = faiss.read_index(settings.FAISS_INDEX_PATH)
                model_dim = self.model.get_sentence_embedding_dimension()
                index_dim = self.index.d
                
                print(f"Model dimension: {model_dim}, Index dimension: {index_dim}")
                
                if model_dim != index_dim:
                    print(f"Dimension mismatch! Rebuilding index...")
                    self._rebuild_index()
                else:
                    print("FAISS index loaded successfully")
            else:
                print("FAISS index not found, will rebuild if needed")
                
        except Exception as e:
            print(f"Error loading ML resources: {e}")
            # Try to rebuild index if there's an error
            if self.chunks:
                self._rebuild_index()
    
    def _rebuild_index(self):
        """Rebuild FAISS index with correct dimensions"""
        if not self.chunks or not self.model:
            print("Cannot rebuild index: missing chunks or model")
            return
        
        try:
            print("Rebuilding FAISS index...")
            
            # Get model dimension
            model_dim = self.model.get_sentence_embedding_dimension()
            
            # Create new index
            self.index = faiss.IndexFlatIP(model_dim)  # Inner product for cosine similarity
            
            # Generate embeddings for all chunks
            texts = [chunk.get("text", "") for chunk in self.chunks]
            print(f"Generating embeddings for {len(texts)} chunks...")
            
            # Process in batches to avoid memory issues
            batch_size = 100
            all_embeddings = []
            
            for i in range(0, len(texts), batch_size):
                batch_texts = texts[i:i+batch_size]
                batch_embeddings = self.model.encode(batch_texts)
                all_embeddings.extend(batch_embeddings)
                print(f"Processed {min(i+batch_size, len(texts))}/{len(texts)} chunks")
            
            # Convert to numpy array and normalize
            embeddings_array = np.array(all_embeddings).astype('float32')
            faiss.normalize_L2(embeddings_array)
            
            # Add to index
            self.index.add(embeddings_array)
            
            # Save the rebuilt index
            faiss.write_index(self.index, settings.FAISS_INDEX_PATH)
            print(f"Index rebuilt and saved with {self.index.ntotal} vectors")
            
        except Exception as e:
            print(f"Error rebuilding index: {e}")
            self.index = None
    
    def search_similar_chunks(self, query: str, top_k: int = 15) -> List[Dict]:
        """Search for similar chunks using FAISS with improved scoring"""
        if not self.model or not self.index or not self.chunks:
            return []
        
        # Generate query embedding
        query_embedding = self.model.encode([query])
        query_embedding = np.array(query_embedding).astype('float32')
        faiss.normalize_L2(query_embedding)
        
        # Search in FAISS index
        distances, indices = self.index.search(query_embedding, top_k)
        
        # Get relevant chunks with improved scoring
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx < len(self.chunks):
                chunk = self.chunks[idx]
                # Convert distance to similarity score (higher is better)
                similarity_score = max(0, 1 - distance)
                results.append({
                    "text": chunk.get("text", ""),
                    "source": chunk.get("source", ""),
                    "page": chunk.get("page", 0),
                    "language": chunk.get("language", "en"),
                    "score": float(similarity_score),
                    "relevance": "high" if similarity_score > 0.7 else "medium" if similarity_score > 0.4 else "low"
                })
        
        # Sort by score (highest first)
        results.sort(key=lambda x: x["score"], reverse=True)
        return results
    
    def get_real_time_suggestions(self, partial_query: str, limit: int = 5) -> List[str]:
        """Get real-time query suggestions based on partial input"""
        if len(partial_query) < 3:
            return []
        
        # Search for relevant chunks
        chunks = self.search_similar_chunks(partial_query, top_k=10)
        
        # Extract common legal terms and phrases
        suggestions = []
        query_lower = partial_query.lower()
        
        # Common legal query patterns
        patterns = [
            f"{partial_query} rights and remedies",
            f"{partial_query} legal procedure",
            f"{partial_query} under Indian law",
            f"What are the {partial_query} provisions",
            f"How to file {partial_query} complaint"
        ]
        
        # Add context-based suggestions from chunks
        for chunk in chunks[:3]:
            text = chunk["text"].lower()
            if query_lower in text:
                # Extract sentences containing the query
                sentences = text.split('.')
                for sentence in sentences:
                    if query_lower in sentence and len(sentence.strip()) > 10:
                        suggestion = sentence.strip()[:100] + "..."
                        if suggestion not in suggestions:
                            suggestions.append(suggestion)
        
        # Combine and limit suggestions
        all_suggestions = patterns + suggestions
        return all_suggestions[:limit]
    
    def generate_answer(self, query: str, language: str = "en") -> Dict:
        """Generate answer using RAG pipeline with improved real-time processing"""
        # Search for relevant chunks (increased to 15 for better context)
        relevant_chunks = self.search_similar_chunks(query, top_k=15)
        
        if not relevant_chunks:
            return {
                "answer": "I couldn't find relevant information in the legal documents for your query.",
                "sources": [],
                "explanation": "No relevant legal information found in the database.",
                "legalReferences": [],
                "actionSteps": ["Consult with a qualified lawyer", "Provide more specific details about your legal issue"]
            }
        
        # Filter high-quality chunks (score > 0.3)
        high_quality_chunks = [c for c in relevant_chunks if c["score"] > 0.3]
        if not high_quality_chunks:
            high_quality_chunks = relevant_chunks[:5]
        
        # Generate comprehensive answer based on retrieved context
        answer = self._generate_comprehensive_answer(query, high_quality_chunks, language)
        
        # Extract unique sources
        sources = []
        seen_sources = set()
        for chunk in high_quality_chunks:
            source_key = f"{chunk['source']}"
            if source_key not in seen_sources:
                sources.append({
                    "source": chunk["source"],
                    "page": chunk.get("page", 0)
                })
                seen_sources.add(source_key)
        
        return {
            "answer": answer,
            "sources": sources[:5],
            "explanation": self._generate_explanation(high_quality_chunks),
            "legalReferences": self._extract_legal_refs(high_quality_chunks),
            "actionSteps": self._generate_action_steps(query, high_quality_chunks)
        }
    
    def _generate_comprehensive_answer(self, query: str, chunks: List[Dict], language: str) -> str:
        """Generate a comprehensive answer based on retrieved chunks"""
        if not chunks:
            return "I couldn't find relevant information for your query."
        
        # Combine context from top chunks
        context_parts = []
        for i, chunk in enumerate(chunks[:5]):
            source_name = chunk['source'].split('/')[-1].replace('.pdf', '')
            context_parts.append(f"**From {source_name}:**\n{chunk['text'][:400]}...")
        
        combined_context = "\n\n".join(context_parts)
        
        # Generate structured answer
        answer = f"Based on Indian legal documents, here's what I found regarding your query:\n\n{combined_context}"
        
        # Add language-specific note
        if language == "hi":
            answer += "\n\n**नोट:** कृपया विशिष्ट कानूनी सलाह के लिए योग्य वकील से सलाह लें।"
        else:
            answer += "\n\n**Note:** Please consult with a qualified lawyer for specific legal advice."
        
        return answer
    
    def _generate_explanation(self, chunks: List[Dict]) -> str:
        """Generate explanation based on retrieved chunks"""
        if not chunks:
            return "No relevant legal information found."
        
        explanation = f"Found {len(chunks)} relevant sections from Indian legal documents. "
        explanation += f"The information comes from sources like {', '.join(set([c['source'].split('/')[-1].replace('.pdf', '') for c in chunks[:3]]))}."
        
        return explanation
    
    def _extract_legal_refs(self, chunks: List[Dict]) -> List[Dict]:
        """Extract legal references from chunks"""
        refs = []
        for chunk in chunks[:3]:
            refs.append({
                "section": chunk["source"].split("/")[-1].replace(".pdf", ""),
                "description": chunk["text"][:100] + "..."
            })
        return refs
    
    def _generate_action_steps(self, query: str, chunks: List[Dict] = None) -> List[str]:
        """Generate contextual action steps based on query and retrieved content"""
        steps = []
        query_lower = query.lower()
        
        # Analyze query for specific legal areas
        if any(word in query_lower for word in ["arrest", "police", "custody", "bail"]):
            steps = [
                "Ask for the grounds of your arrest and see the Arrest Memo",
                "Inform a family member or lawyer immediately",
                "Request medical examination if injured",
                "Do not sign any document without legal advice",
                "Apply for bail through a lawyer if applicable"
            ]
        elif any(word in query_lower for word in ["consumer", "complaint", "defective", "refund"]):
            steps = [
                "Gather all purchase receipts, warranty cards, and correspondence",
                "Send a legal notice to the seller/manufacturer",
                "File complaint with appropriate Consumer Forum",
                "Keep copies of all documents and communications",
                "Consider mediation before formal proceedings"
            ]
        elif any(word in query_lower for word in ["tenant", "rent", "landlord", "eviction"]):
            steps = [
                "Review your rental agreement and local rent control laws",
                "Document all communications with landlord",
                "Pay rent through traceable methods (bank transfer/cheque)",
                "Consult local rent control authority",
                "Seek legal advice before any major decisions"
            ]
        elif any(word in query_lower for word in ["marriage", "divorce", "dowry", "domestic"]):
            steps = [
                "Document all incidents with dates and evidence",
                "Consult a family law specialist",
                "Consider counseling or mediation if appropriate",
                "Know your rights under personal laws",
                "Contact women's helpline if facing violence (1091)"
            ]
        elif any(word in query_lower for word in ["property", "land", "title", "registration"]):
            steps = [
                "Verify property documents and title deeds",
                "Check for encumbrances and legal disputes",
                "Ensure proper registration and stamp duty payment",
                "Get legal opinion on property title",
                "Consider title insurance for protection"
            ]
        else:
            # Generic steps based on retrieved content
            if chunks and len(chunks) > 0:
                # Try to extract specific steps from the legal content
                steps = [
                    "Review the relevant legal provisions mentioned above",
                    "Gather all supporting documents and evidence",
                    "Consult with a qualified lawyer specializing in this area",
                    "Understand the time limitations for legal action",
                    "Consider alternative dispute resolution methods"
                ]
            else:
                steps = [
                    "Consult with a qualified lawyer for specific advice",
                    "Gather all relevant documents and evidence",
                    "Research applicable laws and regulations",
                    "Document all facts and communications",
                    "Consider the urgency and time limits involved"
                ]
        
        return steps

# Singleton instance
ml_service = MLService()
