import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchMessages,
  fetchProjects,
  fetchTeamMembers,
  fetchServices,
  Message,
} from '../../services/api';

interface Stats {
  totalMessages: number;
  unreadMessages: number;
  totalProjects: number;
  totalTeamMembers: number;
  totalServices: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, link, color }) => (
  <Link
    to={link}
    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </Link>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    totalTeamMembers: 0,
    totalServices: 0,
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [messages, projects, team, services] = await Promise.all([
          fetchMessages(),
          fetchProjects(),
          fetchTeamMembers(),
          fetchServices(),
        ]);

        setStats({
          totalMessages: messages.length,
          unreadMessages: messages.filter((m) => !m.isRead).length,
          totalProjects: projects.length,
          totalTeamMembers: team.length,
          totalServices: services.length,
        });

        setRecentMessages(
          messages
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your ESCOtech admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Messages"
          value={stats.totalMessages}
          link="/admin/messages"
          color="bg-blue-100 text-blue-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />

        <StatCard
          title="Projects"
          value={stats.totalProjects}
          link="/admin/projects"
          color="bg-green-100 text-green-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <StatCard
          title="Team Members"
          value={stats.totalTeamMembers}
          link="/admin/team"
          color="bg-purple-100 text-purple-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />

        <StatCard
          title="Services"
          value={stats.totalServices}
          link="/admin/services"
          color="bg-amber-100 text-amber-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {stats.unreadMessages > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800">
            You have <span className="font-bold">{stats.unreadMessages}</span> unread message
            {stats.unreadMessages !== 1 ? 's' : ''}.{' '}
            <Link to="/admin/messages" className="underline hover:no-underline">
              View messages
            </Link>
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Messages</h2>
          <Link
            to="/admin/messages"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentMessages.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No messages yet
            </div>
          ) : (
            recentMessages.map((message) => (
              <div key={message.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!message.isRead && (
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    )}
                    <div>
                      <p className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{message.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {message.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
