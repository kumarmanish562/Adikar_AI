import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Settings = () => {
  const { i18n } = useTranslation();
  
  // Language mapping
  const languageMap = {
    'English': 'en',
    'हिन्दी': 'hi',
    'বাংলা': 'bn',
    'తెలుగు': 'te',
    'मराठी': 'mr',
    'தமிழ்': 'ta',
    'ગુજરાતી': 'gu'
  };
  
  const reverseLanguageMap = {
    'en': 'English',
    'hi': 'हिन्दी',
    'bn': 'বাংলা',
    'te': 'తెలుగు',
    'mr': 'मराठी',
    'ta': 'தமிழ்',
    'gu': 'ગુજરાતી'
  };
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    legalUpdates: true,
    communityUpdates: false
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);
  
  // Update selected language when user data loads
  useEffect(() => {
    if (userData?.preferred_language) {
      const langName = reverseLanguageMap[userData.preferred_language] || 'English';
      setSelectedLanguage(langName);
      i18n.changeLanguage(userData.preferred_language);
    }
  }, [userData]);
  
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };
  
  // Handle language selection
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setHasChanges(true);
  };
  
  // Handle notification changes
  const handleNotificationChange = (key, value) => {
    setNotifications({...notifications, [key]: value});
    setHasChanges(true);
  };
  
  // Save settings to database
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const languageCode = languageMap[selectedLanguage];
      
      // Update user profile with new language preference
      await axios.put(
        'http://localhost:8000/api/profile',
        {
          preferred_language: languageCode,
          // Include other fields to avoid overwriting
          full_name: userData.full_name,
          phone: userData.phone
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      // Change i18n language
      i18n.changeLanguage(languageCode);
      
      // Update local state
      setUserData({...userData, preferred_language: languageCode});
      setHasChanges(false);
      setShowSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-sm text-gray-500">Manage your professional legal account and preferences</p>
          </div>
          
          {/* Save Button */}
          {hasChanges && (
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSaving ? '⏳' : '💾'}</span>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
        
        {/* Success Message */}
        {showSaveSuccess && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-sm font-semibold text-green-900">Settings saved successfully!</p>
              <p className="text-xs text-green-700">Your preferences have been updated in the database.</p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          </div>

          <div className="space-y-4">
            {/* Change Password */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Change password</h3>
                  <p className="text-xs text-gray-500">Update your account password</p>
                </div>
              </div>
              <button className="px-4 py-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                Edit
              </button>
            </div>

            {/* Update Email */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email address</h3>
                  <p className="text-xs text-gray-500">{userData?.email || 'Not set'}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">
                {userData?.is_verified ? 'Verified' : 'Not Verified'}
              </span>
            </div>

            {/* Update Phone Number */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Phone number</h3>
                  <p className="text-xs text-gray-500">{userData?.phone || 'Not set'}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                Edit
              </button>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Username</h3>
                  <p className="text-xs text-gray-500">{userData?.username || 'Not set'}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                Unique ID
              </span>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🌐</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Language Settings</h2>
          </div>

          <p className="text-sm text-gray-600 mb-2">Select your preferred interface language</p>
          
          {hasChanges && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">💡 Tip:</span> Click "Save Changes" button to save your language preference to the database.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {[
              'English',
              'हिन्दी',
              'বাংলা',
              'తెలుగు',
              'मराठी',
              'தமிழ்',
              'ગુજરાતી'
            ].map((lang) => (
              <label
                key={lang}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLanguage === lang
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  checked={selectedLanguage === lang}
                  onChange={() => handleLanguageChange(lang)}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-900">{lang}</span>
                {selectedLanguage === lang && (
                  <span className="ml-auto text-blue-600 text-xl">✓</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🔔</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Email Alerts */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.emailAlerts}
                    onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Email alerts</h3>
                  <p className="text-xs text-gray-500">Daily summaries and direct messages</p>
                </div>
              </div>
            </div>

            {/* Legal Updates */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.legalUpdates}
                    onChange={(e) => handleNotificationChange('legalUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Legal updates</h3>
                  <p className="text-xs text-gray-500">New laws and court ruling alerts</p>
                </div>
              </div>
            </div>

            {/* Community Updates */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.communityUpdates}
                    onChange={(e) => handleNotificationChange('communityUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Community updates</h3>
                  <p className="text-xs text-gray-500">Forum threads and social events</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🛡️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Data usage information</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Adikar AI uses encrypted end-to-end storage for your legal document data. 
              This data is used only to train your personal AI models and is never shared with third parties.
            </p>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Read full privacy policy
            </button>
          </div>

          {/* Account Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Account Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Member since:</strong> {new Date(userData?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              <p><strong>Account ID:</strong> {userData?.id}</p>
              <p><strong>Status:</strong> <span className={userData?.is_active ? 'text-green-600' : 'text-red-600'}>{userData?.is_active ? 'Active' : 'Inactive'}</span></p>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-base font-bold text-red-600 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="w-full px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              Delete account
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Save Button (appears at bottom when changes detected) */}
      {hasChanges && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-2xl hover:shadow-3xl flex items-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-2xl">{isSaving ? '⏳' : '💾'}</span>
            {isSaving ? 'Saving...' : 'Save Changes'}
            {!isSaving && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
