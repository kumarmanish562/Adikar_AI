import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TopBar = ({ userName = 'User', userAvatar = null }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-[70px] bg-white border-b border-gray-200 fixed top-0 left-[280px] right-0 z-[100]">
      <div className="h-full flex items-center justify-between px-8">
        {/* Empty Left Side */}
        <div className="flex-1"></div>

        {/* Profile Picture Only - Right Side */}
        <div 
          className="w-11 h-11 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/dashboard/profile')}
        >
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-base">
              {getInitials(userName)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
