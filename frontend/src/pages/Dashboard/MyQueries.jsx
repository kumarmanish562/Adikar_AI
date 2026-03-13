import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MyQueries = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Criminal Law', 'Family Law', 'Consumer Law', 'Cyber Law'];

  const queries = [
    {
      id: 1,
      question: 'What to do if police arrest without warrant?',
      category: 'Criminal Law',
      categoryColor: 'text-blue-600 bg-blue-50',
      date: 'Oct 24, 2024',
      status: 'Answered',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 2,
      question: 'Tenant eviction rules in India',
      category: 'Property Law',
      categoryColor: 'text-purple-600 bg-purple-50',
      date: 'Oct 22, 2024',
      status: 'Pending',
      statusColor: 'text-orange-600 bg-orange-50'
    },
    {
      id: 3,
      question: 'Procedure for filing divorce by mutual consent',
      category: 'Family Law',
      categoryColor: 'text-pink-600 bg-pink-50',
      date: 'Oct 15, 2024',
      status: 'Answered',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 4,
      question: 'Rights against defective electronic products',
      category: 'Consumer Law',
      categoryColor: 'text-orange-600 bg-orange-50',
      date: 'Oct 10, 2024',
      status: 'Answered',
      statusColor: 'text-green-600 bg-green-50'
    }
  ];

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

      {/* Queries Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-4">Question</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {queries.map((query) => (
            <div key={query.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
              {/* Question */}
              <div className="col-span-4">
                <p className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                  {query.question}
                </p>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${query.categoryColor}`}>
                  {query.category}
                </span>
              </div>

              {/* Date */}
              <div className="col-span-2">
                <p className="text-sm text-gray-600">{query.date}</p>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${query.statusColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {query.status}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                  👁️ View Answer
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                  🔖
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Showing 4 of 24 queries</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              ‹
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Knowledge Summary */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-6 text-white">
          <h3 className="text-sm font-semibold mb-2 opacity-90">Knowledge Summary</h3>
          <p className="text-5xl font-bold mb-3">65%</p>
          <p className="text-sm opacity-80">Of your queries are related to Consumer Law this month.</p>
        </div>

        {/* Legal Tip of the Day */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal Tip of the Day</h3>
          <p className="text-sm text-gray-600 italic mb-4">
            "Always request a copy of the FIR immediately after filing a complaint at a police station."
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-semibold">
            💡 Pro Bono Advice
          </div>
        </div>

        {/* New Legal Query */}
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
