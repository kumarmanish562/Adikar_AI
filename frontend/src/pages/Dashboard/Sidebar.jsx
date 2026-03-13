import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'dashboard.Dashboard', path: '/dashboard' },
    { id: 'ask-question', icon: '❓', label: 'dashboard.Ask Question', path: '/dashboard/ask-question' },
    { id: 'scan-document', icon: '📄', label: 'dashboard.Scan Document', path: '/dashboard/scan-document' },
    { id: 'voice-assistant', icon: '🎤', label: 'dashboard.Voice Assistant', path: '/dashboard/voice-assistant' },
    { id: 'my-queries', icon: '🕐', label: 'dashboard.My Queries', path: '/dashboard/my-queries' },
    { id: 'resources', icon: '📚', label: 'dashboard.Resources', path: '/dashboard/resources' },
    { id: 'help-center', icon: '💬', label: 'dashboard.Help Center', path: '/dashboard/help-center' },
  ];

  const bottomMenuItems = [
    { id: 'profile', icon: '👤', label: 'dashboard.Profile', path: '/dashboard/profile' },
    { id: 'settings', icon: '⚙️', label: 'dashboard.Settings', path: '/dashboard/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="w-[280px] h-screen bg-gray-50 flex flex-col py-5 fixed left-0 top-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="px-5 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-3xl">
            ⚖️
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 m-0">Adikar AI</h2>
            <p className="text-[11px] text-gray-400 m-0 tracking-wide">Access your legal assistant</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-left w-full border-none ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600'
                : 'bg-transparent text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`text-[15px] font-medium ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
              {t(item.label)}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom Menu Items */}
      <div className="p-3 mt-auto border-t border-gray-200 space-y-1">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-left w-full border-none ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600'
                : 'bg-transparent text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`text-[15px] font-medium ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
              {t(item.label)}
            </span>
          </button>
        ))}
        
        {/* Logout Button */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-left w-full border-none bg-transparent text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <span className="text-xl">🚪</span>
          <span className="text-[15px] font-medium">
            {t('dashboard.Logout')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
