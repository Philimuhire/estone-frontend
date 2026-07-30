import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { fetchMessages } from '../../services/api';

export interface AdminOutletContext {
  /** Re-reads the unread message count so the sidebar badge updates immediately. */
  refreshUnreadCount: () => void;
}

export const useAdminOutletContext = (): AdminOutletContext =>
  useOutletContext<AdminOutletContext>();

const UNREAD_POLL_INTERVAL_MS = 30000;

const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    try {
      const messages = await fetchMessages();
      setUnreadMessages(messages.filter((m) => !m.isRead).length);
    } catch {
      // Silently fail - sidebar keeps its last known count
    }
  }, []);

  useEffect(() => {
    refreshUnreadCount();
    const interval = setInterval(refreshUnreadCount, UNREAD_POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [refreshUnreadCount]);

  const outletContext: AdminOutletContext = { refreshUnreadCount };

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
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
