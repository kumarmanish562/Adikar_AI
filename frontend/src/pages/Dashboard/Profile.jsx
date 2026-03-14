import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({ totalQueries: 0, documents: 0, voiceQueries: 0 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    preferred_language: 'en'
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch profile
      const profileRes = await axios.get('http://localhost:8000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserData(profileRes.data);
      setFormData({
        full_name: profileRes.data.full_name || '',
        email: profileRes.data.email || '',
        phone: profileRes.data.phone || '',
        preferred_language: profileRes.data.preferred_language || 'en'
      });

      // Fetch queries for stats
      const queriesRes = await axios.get('http://localhost:8000/api/queries/my-queries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const queries = queriesRes.data;
      setStats({
        totalQueries: queries.length,
        documents: queries.filter(q => q.query_type === 'document').length,
        voiceQueries: queries.filter(q => q.query_type === 'voice').length
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/profile', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
      fetchProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const activityStats = [
    { icon: '💬', label: 'Total Queries', count: stats.totalQueries, color: 'bg-blue-50 text-blue-600' },
    { icon: '📄', label: 'Documents Scanned', count: stats.documents, color: 'bg-orange-50 text-orange-600' },
    { icon: '🎤', label: 'Voice Queries', count: stats.voiceQueries, color: 'bg-purple-50 text-purple-600' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center mx-auto">
                <span className="text-4xl">👤</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{userData?.full_name || userData?.username}</h2>
            <p className="text-sm text-gray-500 mb-1">{userData?.email}</p>
            <p className="text-sm text-gray-500 mb-6">{userData?.phone || 'No phone number'}</p>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
            >
              {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
            </button>
          </div>

          {/* Activity Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              📊 Activity Summary
            </h3>
            <div className="space-y-3">
              {activityStats.map((stat, index) => (
                <div key={index} className={`flex items-center justify-between p-4 ${stat.color} rounded-xl`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-xl font-bold">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Personal Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Personal Details</h3>
            <p className="text-sm text-gray-500 mb-6">Manage your account information and preferences</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Language Preference</label>
                <select
                  value={formData.preferred_language}
                  onChange={(e) => setFormData({...formData, preferred_language: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                  disabled={!isEditing}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="bn">Bengali</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Account Information</h3>
            <p className="text-sm text-gray-500 mb-6">Your account details and status</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👤</span>
                  <h4 className="text-base font-semibold text-gray-900">Username</h4>
                </div>
                <p className="text-sm text-gray-600">{userData?.username}</p>
              </div>
              <div className="p-5 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <h4 className="text-base font-semibold text-gray-900">Account Status</h4>
                </div>
                <p className="text-sm text-gray-600">
                  {userData?.is_verified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
              <div className="p-5 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📅</span>
                  <h4 className="text-base font-semibold text-gray-900">Member Since</h4>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(userData?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="p-5 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔒</span>
                  <h4 className="text-base font-semibold text-gray-900">Security</h4>
                </div>
                <p className="text-sm text-gray-600">Password protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
