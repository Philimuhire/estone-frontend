import React, { useState, useEffect } from 'react';
import {
  fetchMessages,
  updateMessageReadStatus,
  deleteMessage,
  Message,
} from '../../services/api';
import DataTable, { Column } from '../components/DataTable';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages();
      setMessages(data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (message: Message) => {
    try {
      const updated = await updateMessageReadStatus(message.id, !message.isRead);
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? updated : m))
      );
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(updated);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update message');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setIsDeleting(id);
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete message');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleViewMessage = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      try {
        const updated = await updateMessageReadStatus(message.id, true);
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? updated : m))
        );
        setSelectedMessage(updated);
      } catch {
        // Continue showing message even if update fails
      }
    }
  };

  const columns: Column<Message>[] = [
    {
      key: 'isRead',
      header: 'Status',
      render: (item) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.isRead
              ? 'bg-gray-100 text-gray-600'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {item.isRead ? 'Read' : 'Unread'}
        </span>
      ),
    },
    {
      key: 'fullName',
      header: 'Name',
      sortable: true,
      render: (item) => (
        <span className={!item.isRead ? 'font-semibold' : ''}>{item.fullName}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      header: 'Phone',
    },
    {
      key: 'createdAt',
      header: 'Date',
      sortable: true,
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-600 mt-1">
            {messages.filter((m) => !m.isRead).length} unread of {messages.length} total
          </p>
        </div>
      </div>

      <DataTable
        data={messages}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search messages..."
        searchKeys={['fullName', 'email', 'message']}
        onRowClick={handleViewMessage}
        emptyMessage="No messages yet"
        actions={(item) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleRead(item)}
              className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded"
              title={item.isRead ? 'Mark as unread' : 'Mark as read'}
            >
              {item.isRead ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={isDeleting === item.id}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
              title="Delete"
            >
              {isDeleting === item.id ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        )}
      />

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Message Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="font-medium text-gray-800">{selectedMessage.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Date</label>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium text-gray-800">
                      <a href={`mailto:${selectedMessage.email}`} className="text-amber-600 hover:underline">
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium text-gray-800">
                      {selectedMessage.phone ? (
                        <a href={`tel:${selectedMessage.phone}`} className="text-amber-600 hover:underline">
                          {selectedMessage.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Message</label>
                  <p className="mt-2 text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedMessage.message || 'No message content'}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => handleToggleRead(selectedMessage)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedMessage.id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
