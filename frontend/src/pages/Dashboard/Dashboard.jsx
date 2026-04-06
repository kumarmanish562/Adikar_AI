import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recentQueries, setRecentQueries] = useState([]);
  const [stats, setStats] = useState({ totalQueries: 0, documents: 0, voiceQueries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    // Also refresh when user returns to the tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDashboardData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch user profile
      const profileRes = await axios.get('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserData(profileRes.data);

      // Fetch stats and recent queries
      const statsRes = await axios.get('/api/queries/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setStats({
        totalQueries: statsRes.data.total_queries,
        documents: statsRes.data.document_queries,
        voiceQueries: statsRes.data.voice_queries
      });
      
      setRecentQueries(statsRes.data.recent_queries.slice(0, 3));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const mainFeatures = [
    {
      id: 'ask-question',
      icon: '💬',
      title: 'Ask a Legal Question',
      description: 'Conversational AI for legal queries.',
      path: '/dashboard/ask-question',
      color: 'bg-blue-500'
    },
    {
      id: 'scan-document',
      icon: '📷',
      title: 'Scan a Legal Document',
      description: 'Upload PDF or capture a photo.',
      path: '/dashboard/scan-document',
      color: 'bg-indigo-500'
    },
    {
      id: 'voice-assistant',
      icon: '🎤',
      title: 'Start Voice Assistant',
      description: 'Speak naturally in your native language.',
      path: '/dashboard/voice-assistant',
      color: 'bg-orange-500'
    }
  ];

  const quickFeatures = [
    { id: 'chat', icon: '💬', title: 'Legal Chat Assistant', description: 'Ask legal questions in simple language.', color: 'bg-blue-500' },
    { id: 'scanner', icon: '📋', title: 'Document Scanner', description: 'Upload or scan legal documents for instant explanation.', color: 'bg-orange-500' },
    { id: 'voice', icon: '👥', title: 'Voice Legal Help', description: 'Speak your question in your native language.', color: 'bg-green-500' },
    { id: 'resources', icon: '📚', title: 'Legal Resources', description: 'Explore laws like BNS, BNSS, Consumer Protection.', color: 'bg-purple-500' }
  ];

  const legalCategories = [
    { id: 'bns', icon: '⚖️', title: 'BNS 2023', color: 'text-blue-500' },
    { id: 'bnss', icon: '📋', title: 'BNSS 2023', color: 'text-indigo-500' },
    { id: 'consumer', icon: '🛒', title: 'Consumer Law', color: 'text-purple-500' },
    { id: 'family', icon: '👨‍👩‍👧', title: 'Family Law', color: 'text-pink-500' },
    { id: 'cyber', icon: '🛡️', title: 'Cyber Law', color: 'text-cyan-500' },
    { id: 'property', icon: '🏠', title: 'Property Law', color: 'text-green-500' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userData?.full_name || userData?.username || 'User'}
        </h1>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-base">⚡</span>
          Get instant legal guidance powered by Indian law.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
          <div className="text-4xl mb-2">💬</div>
          <div className="text-3xl font-bold mb-1">{stats.totalQueries}</div>
          <div className="text-sm opacity-90">Total Queries</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6">
          <div className="text-4xl mb-2">📄</div>
          <div className="text-3xl font-bold mb-1">{stats.documents}</div>
          <div className="text-sm opacity-90">Documents Scanned</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6">
          <div className="text-4xl mb-2">🎤</div>
          <div className="text-3xl font-bold mb-1">{stats.voiceQueries}</div>
          <div className="text-sm opacity-90">Voice Queries</div>
        </div>
      </div>

      {/* Main Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {mainFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`${feature.color} text-white rounded-2xl p-6 min-h-[160px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl`}
            onClick={() => navigate(feature.path)}
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm opacity-90">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Feature Explore */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-blue-500 rounded"></div>
        <h2 className="text-xl font-semibold text-gray-900">Quick Feature Explore</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {quickFeatures.map((feature) => (
          <div key={feature.id} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-xl flex items-center justify-center text-2xl mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Legal Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-orange-500 rounded"></div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <button 
              onClick={() => navigate('/dashboard/my-queries')}
              className="px-4 py-1.5 bg-transparent border-none text-blue-500 text-sm font-medium cursor-pointer hover:text-blue-600"
            >
              View All History
            </button>
          </div>

          {recentQueries.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">📝</div>
              <p className="text-gray-500">No queries yet. Start by asking a question!</p>
              <button
                onClick={() => navigate('/dashboard/ask-question')}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Ask Your First Question
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {recentQueries.map((query) => (
                <div key={query.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {query.query_type === 'voice' ? '🎤' : query.query_type === 'document' ? '📄' : '❓'}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{query.question}</h4>
                    <p className="text-xs text-gray-500">
                      {formatDate(query.created_at)} • {query.status}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-blue-500 text-[13px] font-medium cursor-pointer hover:bg-gray-50 hover:border-blue-500 flex-shrink-0">
                    View Answer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legal Categories */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-blue-500 rounded"></div>
            <h2 className="text-xl font-semibold text-gray-900">Legal Categories</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {legalCategories.map((category) => (
              <div key={category.id} className="p-5 bg-gray-50 rounded-xl text-center cursor-pointer transition-all hover:bg-gray-100 hover:-translate-y-0.5">
                <div className={`text-4xl mb-2 ${category.color}`}>{category.icon}</div>
                <p className="text-[13px] font-medium text-gray-900">{category.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
