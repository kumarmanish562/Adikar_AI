import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyQueries = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filters = ['All', 'text', 'voice', 'document'];

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    filterQueries();
  }, [queries, selectedFilter, searchQuery]);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/queries/my-queries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setQueries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching queries:', error);
      setLoading(false);
    }
  };

  const filterQueries = () => {
    let filtered = queries;

    // Filter by type
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(q => q.query_type === selectedFilter);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQueries(filtered);
  };

  const handleDeleteQuery = async (queryId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/queries/${queryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Remove from local state
      setQueries(queries.filter(q => q.id !== queryId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting query:', error);
      alert('Failed to delete query. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryColor = (type) => {
    const colors = {
      text: 'text-blue-600 bg-blue-50',
      voice: 'text-purple-600 bg-purple-50',
      document: 'text-orange-600 bg-orange-50'
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600 bg-green-50',
      pending: 'text-orange-600 bg-orange-50',
      failed: 'text-red-600 bg-red-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Loading your queries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Legal Queries</h1>
        <p className="text-sm text-gray-500">Review, manage, and track your legal inquiries and AI-assisted responses.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search Input */}
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-blue-500 text-xl">🔍</span>
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-blue-200 rounded-xl text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Search your legal queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-700">Filter:</span>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter === 'All' ? '📋 All' :
                 filter === 'text' ? '💬 Text' :
                 filter === 'voice' ? '🎤 Voice' :
                 '📄 Document'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredQueries.length}</span> of <span className="font-semibold">{queries.length}</span> queries
          </span>
          <span className="text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Queries List */}
      {filteredQueries.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-16 border-2 border-dashed border-gray-300 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery ? 'No matching queries' : 'No queries yet'}
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {searchQuery 
                ? 'Try adjusting your search terms or filters to find what you\'re looking for' 
                : 'Start your legal journey by asking your first question to our AI assistant'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard/ask-question')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-200"
              >
                <span className="mr-2">💬</span>
                Ask a Question
              </button>
              {searchQuery && (
                <button
                  onClick={() => {setSearchQuery(''); setSelectedFilter('All');}}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  <span className="mr-2">🔄</span>
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <div key={query.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    query.query_type === 'text' ? 'bg-blue-100 text-blue-600' :
                    query.query_type === 'voice' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {query.query_type === 'text' ? '💬' : 
                     query.query_type === 'voice' ? '🎤' : '📄'}
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(query.query_type)}`}>
                      {query.query_type.toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(query.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {query.status}
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-relaxed">
                  {query.question}
                </h3>
                {query.answer && (
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {query.answer.substring(0, 200)}...
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>⚖️</span>
                    {query.legal_references?.length || 0} References
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📋</span>
                    {query.action_steps?.length || 0} Steps
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📚</span>
                    {query.sources?.length || 0} Sources
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedQuery(query)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    <span>👁️</span>
                    View Details
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm(query)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-all duration-200 border border-red-200 hover:border-red-300"
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Query Detail Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm" onClick={() => setSelectedQuery(null)}>
          <div className="bg-white rounded-3xl p-0 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Query Details</h2>
                  <p className="text-blue-100 text-sm">
                    {new Date(selectedQuery.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedQuery(null)} 
                  className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl transition-all"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-8">
                {/* Question */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">❓</span>
                    <h3 className="text-lg font-bold text-gray-900">Question</h3>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <p className="text-gray-900 text-lg leading-relaxed">{selectedQuery.question}</p>
                  </div>
                </div>

                {/* Answer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">💡</span>
                    <h3 className="text-lg font-bold text-gray-900">AI Answer</h3>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedQuery.answer}</p>
                  </div>
                </div>

                {/* Legal References */}
                {selectedQuery.legal_references && selectedQuery.legal_references.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">⚖️</span>
                      <h3 className="text-lg font-bold text-gray-900">Legal References</h3>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                      <ul className="space-y-3">
                        {selectedQuery.legal_references.map((ref, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-bold text-orange-800 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <strong className="text-orange-900">{ref.section}</strong>
                              <p className="text-gray-700 mt-1">{ref.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Action Steps */}
                {selectedQuery.action_steps && selectedQuery.action_steps.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📋</span>
                      <h3 className="text-lg font-bold text-gray-900">Action Steps</h3>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                      <ol className="space-y-3">
                        {selectedQuery.action_steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold text-green-800 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-gray-700">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}

                {/* Sources */}
                {selectedQuery.sources && selectedQuery.sources.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📚</span>
                      <h3 className="text-lg font-bold text-gray-900">Sources</h3>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                      <div className="flex flex-wrap gap-3">
                        {selectedQuery.sources.map((source, idx) => (
                          <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-xl text-sm font-medium border border-purple-200">
                            📄 {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <div className="flex gap-4">
                <button
                  onClick={() => navigator.clipboard.writeText(selectedQuery.answer)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200"
                >
                  <span>📋</span>
                  Copy Answer
                </button>
                <button
                  onClick={() => setDeleteConfirm(selectedQuery)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 border border-red-200"
                >
                  <span>🗑️</span>
                  Delete Query
                </button>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 ml-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-0 max-w-lg w-full shadow-2xl transform transition-all overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <h2 className="text-xl font-bold">Delete Query</h2>
                  <p className="text-red-100 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Are you sure you want to permanently delete this query and all its associated data?
              </p>
              
              {/* Query Preview */}
              <div className="bg-red-50 rounded-2xl p-6 mb-8 border-2 border-red-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center text-sm">
                    ❓
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900 mb-1">Question to be deleted:</p>
                    <p className="text-red-800 leading-relaxed line-clamp-3">
                      "{deleteConfirm.question}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteQuery(deleteConfirm.id)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-200"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Stats Card */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">Total Queries</h3>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-5xl font-bold mb-4">{queries.length}</p>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <span>📈 Growing knowledge base</span>
            </div>
          </div>
        </div>

        {/* Legal Tip */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              💡
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Legal Tip</h3>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            "Always request a copy of the FIR immediately after filing a complaint at a police station. This is your legal right under the Criminal Procedure Code."
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-xl text-sm font-semibold border border-orange-200">
            <span>⚖️</span>
            Pro Legal Advice
          </div>
        </div>

        {/* New Query */}
        <div 
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-dashed border-green-300 flex flex-col items-center justify-center text-center hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => navigate('/dashboard/ask-question')}
        >
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
            ➕
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ask New Question</h3>
          <p className="text-gray-600 mb-4">Get instant legal guidance from our AI assistant</p>
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <span>Start Now</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQueries;
