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
      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                className="flex-1 border-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="Search your past queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">Filter by:</span>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Queries List */}
      {filteredQueries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No queries found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'Try a different search term' : 'Start by asking your first legal question'}
          </p>
          <button
            onClick={() => navigate('/dashboard/ask-question')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Ask a Question
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div className="col-span-5">Question</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {filteredQueries.map((query) => (
              <div key={query.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
                {/* Question */}
                <div className="col-span-5">
                  <p className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer line-clamp-2">
                    {query.question}
                  </p>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(query.query_type)}`}>
                    {query.query_type}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">{formatDate(query.created_at)}</p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(query.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {query.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button 
                    onClick={() => setSelectedQuery(query)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    👁️ View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Showing {filteredQueries.length} of {queries.length} queries</p>
          </div>
        </div>
      )}

      {/* Query Detail Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedQuery(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Query Details</h2>
              <button onClick={() => setSelectedQuery(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">QUESTION</h3>
                <p className="text-base text-gray-900">{selectedQuery.question}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">ANSWER</h3>
                <p className="text-base text-gray-700 whitespace-pre-wrap">{selectedQuery.answer}</p>
              </div>

              {selectedQuery.legal_references && selectedQuery.legal_references.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">LEGAL REFERENCES</h3>
                  <ul className="space-y-2">
                    {selectedQuery.legal_references.map((ref, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        <strong>{ref.section}</strong> {ref.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedQuery.action_steps && selectedQuery.action_steps.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">ACTION STEPS</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedQuery.action_steps.map((step, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedQuery.sources && selectedQuery.sources.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">SOURCES</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuery.sources.map((source, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(selectedQuery.answer)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                📋 Copy Answer
              </button>
              <button
                onClick={() => setSelectedQuery(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-6 text-white">
          <h3 className="text-sm font-semibold mb-2 opacity-90">Total Queries</h3>
          <p className="text-5xl font-bold mb-3">{queries.length}</p>
          <p className="text-sm opacity-80">All your legal inquiries in one place</p>
        </div>

        {/* Legal Tip */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal Tip of the Day</h3>
          <p className="text-sm text-gray-600 italic mb-4">
            "Always request a copy of the FIR immediately after filing a complaint at a police station."
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-semibold">
            💡 Pro Bono Advice
          </div>
        </div>

        {/* New Query */}
        <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
          onClick={() => navigate('/dashboard/ask-question')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-3">
            ➕
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">New Legal Query</h3>
          <p className="text-sm text-gray-500">Start a fresh inquiry with our AI</p>
        </div>
      </div>
    </div>
  );
};

export default MyQueries;
