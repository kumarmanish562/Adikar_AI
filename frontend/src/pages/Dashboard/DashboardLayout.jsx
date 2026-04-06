import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  const [userData, setUserData] = useState({
    name: 'User',
    role: 'User',
    avatar: null
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setUserData({
        name: response.data.full_name || response.data.username || 'User',
        role: response.data.role || 'User',
        avatar: response.data.avatar || null
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Keep default values if fetch fails
    }
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
