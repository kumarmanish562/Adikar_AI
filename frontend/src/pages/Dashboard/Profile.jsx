import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: 'Arjun Sharma',
    email: 'arjun.sharma@example.gov.in',
    mobile: '+91 98765 43210',
    language: 'English'
  });

  const activityStats = [
    { icon: '💬', label: 'Total Queries', count: '1,284', color: 'bg-blue-50 text-blue-600' },
    { icon: '📄', label: 'Documents Scanned', count: '42', color: 'bg-orange-50 text-orange-600' },
    { icon: '🎤', label: 'Voice Queries', count: '156', color: 'bg-purple-50 text-purple-600' }
  ];

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
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                📷
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{formData.fullName}</h2>
            <p className="text-sm text-gray-500 mb-1">{formData.email}</p>
            <p className="text-sm text-gray-500 mb-6">{formData.mobile}</p>
            
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
              ✏️ Edit Profile
            </button>
            <button className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              🔒 Change Password
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
                  value={formData.fullName}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Language Preference</label>
                <select
                  value={formData.language}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Bengali</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Security & Privacy</h3>
            <p className="text-sm text-gray-500 mb-6">Enhance the safety of your Adikar AI account</p>
            
            {/* Two-factor authentication */}
            <div className="flex items-center justify-between p-5 bg-blue-50 rounded-xl mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  🛡️
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">Two-factor authentication</h4>
                  <p className="text-sm text-gray-600">Secure your account by requiring an OTP from your mobile device during login.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📱</span>
                  <h4 className="text-base font-semibold text-gray-900">Logged-in Devices</h4>
                </div>
                <p className="text-sm text-gray-600">You are currently active on 2 devices.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔒</span>
                  <h4 className="text-base font-semibold text-gray-900">Security Logs</h4>
                </div>
                <p className="text-sm text-gray-600">View your recent account activity logs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
