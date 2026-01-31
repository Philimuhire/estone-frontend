import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { fetchMessages } from '../../services/api';

const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const messages = await fetchMessages();
        const unread = messages.filter((m) => !m.isRead).length;
        setUnreadMessages(unread);
      } catch {
        // Silently fail - sidebar will show 0
      }
    };

    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar unreadMessages={unreadMessages} />

      <div className="ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome back, {user?.name || 'Admin'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Outlet context={{ setUnreadMessages }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
