import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  const userData = {
    name: 'Manish Kumar',
    role: 'Verified Professional',
    avatar: null
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-[280px]">
        <TopBar 
          userName={userData.name}
          userRole={userData.role}
          userAvatar={userData.avatar}
        />
        <div className="mt-[70px] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
