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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <Sidebar
        unreadMessages={unreadMessages}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden relative p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {unreadMessages > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </button>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                Welcome back, {user?.name || 'Admin'}
              </h2>
            </div>
            <span className="hidden md:block text-sm text-gray-500 truncate">{user?.email}</span>
          </div>
        </header>

        <main className="p-4 sm:p-8">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
