'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  _id?: string;
  email: string;
  username: string;
  role: string;
}

interface DeletedTimesheet {
  id: string;
  _id?: string;
  date: string;
  hours: number;
  description: string;
  project: string;
  userId: string;
  deletedAt: string;
}

export default function HRDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [deletedEntries, setDeletedEntries] = useState<DeletedTimesheet[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
    loadDeletedEntries();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3001/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to load users:', await response.json());
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadDeletedEntries = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3001/timesheet/deleted', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const responseData = await response.json();
      console.log('Response:', response.status, responseData);

      if (response.ok) {
        const { data } = responseData;
        setDeletedEntries(data || []);
      } else {
        console.error('Failed to load deleted entries:', responseData.message);
      }
    } catch (error) {
      console.error('Error loading deleted entries:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'hr' | 'employee') => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3001/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      if (response.ok) {
        loadUsers();
        alert('User role updated successfully');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">HR Dashboard</h1>
      
      {/* Users Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Username</th>
                <th className="px-6 py-3 border-b">Role</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id || user._id}>
                  <td className="px-6 py-4 border-b">{user.email}</td>
                  <td className="px-6 py-4 border-b">{user.username}</td>
                  <td className="px-6 py-4 border-b">{user.role}</td>
                  <td className="px-6 py-4 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => {
                        const userId = user.id || user._id;
                        if (userId) updateUserRole(userId, e.target.value as 'hr' | 'employee');
                      }}
                      className="rounded border p-1"
                    >
                      <option value="employee">Employee</option>
                      <option value="hr">HR</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deleted Entries Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Deleted Timesheet Entries</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">Date</th>
                <th className="px-6 py-3 border-b">Project</th>
                <th className="px-6 py-3 border-b">Hours</th>
                <th className="px-6 py-3 border-b">Description</th>
                <th className="px-6 py-3 border-b">Deleted At</th>
              </tr>
            </thead>
            <tbody>
              {deletedEntries.map(entry => (
                <tr key={entry.id || entry._id}>
                  <td className="px-6 py-4 border-b">{entry.date}</td>
                  <td className="px-6 py-4 border-b">{entry.project}</td>
                  <td className="px-6 py-4 border-b">{entry.hours}</td>
                  <td className="px-6 py-4 border-b">{entry.description}</td>
                  <td className="px-6 py-4 border-b">
                    {new Date(entry.deletedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 