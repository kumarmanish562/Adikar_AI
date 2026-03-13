import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  
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
  
  const [selectedLanguage, setSelectedLanguage] = useState(reverseLanguageMap[i18n.language] || 'English');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    legalUpdates: true,
    communityUpdates: false
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  
  // Update selected language when i18n language changes
  useEffect(() => {
    setSelectedLanguage(reverseLanguageMap[i18n.language] || 'English');
  }, [i18n.language]);
  
  // Handle language selection
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setHasChanges(true);
  };
  
  // Save settings and change language
  const handleSaveSettings = () => {
    const languageCode = languageMap[selectedLanguage];
    i18n.changeLanguage(languageCode);
    setHasChanges(false);
    setShowSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

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
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>💾</span>
              Save Changes
            </button>
          )}
        </div>
        
        {/* Success Message */}
        {showSaveSuccess && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-sm font-semibold text-green-900">Settings saved successfully!</p>
              <p className="text-xs text-green-700">Your language preference has been updated across all pages.</p>
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
                  <p className="text-xs text-gray-500">Last changed 3 months ago</p>
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
                  <h3 className="text-sm font-semibold text-gray-900">Update email</h3>
                  <p className="text-xs text-gray-500">rajesh.kumar@example.law</p>
                </div>
              </div>
              <button className="px-4 py-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                Edit
              </button>
            </div>

            {/* Update Phone Number */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Update phone number</h3>
                  <p className="text-xs text-gray-500">+91 98765 43210</p>
                </div>
              </div>
              <button className="px-4 py-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                Edit
              </button>
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
                <span className="font-semibold">💡 Tip:</span> Click "Save Changes" button to apply the new language across all pages.
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
                    onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})}
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
                    onChange={(e) => setNotifications({...notifications, legalUpdates: e.target.checked})}
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
                    onChange={(e) => setNotifications({...notifications, communityUpdates: e.target.checked})}
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
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-2xl hover:shadow-3xl flex items-center gap-3 text-lg"
          >
            <span className="text-2xl">💾</span>
            Save Changes
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
