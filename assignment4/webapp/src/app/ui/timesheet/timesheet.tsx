'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDebounce } from '../../hooks/useDebounce';

interface TimesheetEntry {
  _id: string;
  date: string;
  project: string;
  hours: number;
  description: string;
}

interface Task {
  _id: string;
  title: string;
}

export default function Timesheet() {
  const router = useRouter();
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [formData, setFormData] = useState({
    date: '',
    project: '',
    hours: '',
    description: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    // Get user role from JWT token
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role);
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    loadTimesheets(currentPage);
  }, [currentPage]);

  const loadTimesheets = async (page: number = 1) => {
    if (page < 1) page = 1;
    try {
      const token = localStorage.getItem('accessToken');
      const userId = JSON.parse(localStorage.getItem('userData')||'{}').username;
      const response = await fetch(`${process.env.API_BASE_URL}/timesheet/${userId}/entries?page=${page}&limit=5`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setEntries(data.data || []);
      setTotalPages(Math.max(1, data.lastPage));
      setCurrentPage(Math.min(page, data.lastPage));
    } catch (error) {
      console.error('Error loading timesheets:', error);
      setEntries([]);
      setCurrentPage(0);
      setTotalPages(1);
    }
  };

  const fetchTasks = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userData')||'{}').username;
      const response = await fetch(`${process.env.API_BASE_URL}/timesheet/${userId}/tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load projects');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };


  const debouncedSubmit = useDebounce(async (formData: {
    date: string;
    project: string;
    hours: string;
    description: string;
  }) => {
    //console.log('Debounced submit called at:', new Date().toISOString());
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.API_BASE_URL}/timesheet`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          hours: Number(formData.hours),
          userId: JSON.parse(localStorage.getItem('userData')||'{}').username
        }),
      });
  
      if (response.ok) {
        setFormData({ date: '', project: '', hours: '', description: '' });
        await loadTimesheets();
        setToast({ show: true, message: 'Entry added successfully!', type: 'success' });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      } else {
        const errorData = await response.json();
        setToast({ show: true, message: errorData.message || 'Failed to add entry', type: 'error' });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      }
    } catch (error) {
      console.error('Error submitting timesheet:', error);
      setToast({ show: true, message: 'Failed to add entry. Please try again.', type: 'error' });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    }
  }, 500); // 500ms delay
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  //  console.log('Submit clicked at:', new Date().toISOString());
    debouncedSubmit(formData);
  };
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('accessToken');
  //     const response = await fetch('${process.env.API_BASE_URL}/timesheet', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...formData,
  //         hours: Number(formData.hours),
  //         userId: JSON.parse(localStorage.getItem('userData')||'{}').username
  //       }),
  //     });

  //     if (response.ok) {
  //       setFormData({ date: '', project: '', hours: '', description: '' });
  //       await loadTimesheets();
  //       setToast({ show: true, message: 'Entry added successfully!', type: 'success' });
  //       setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  //     } else {
  //       const errorData = await response.json();
  //       setToast({ show: true, message: errorData.message || 'Failed to add entry', type: 'error' });
  //       setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting timesheet:', error);
  //     setToast({ show: true, message: 'Failed to add entry. Please try again.', type: 'error' });
  //     setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/login');
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.API_BASE_URL}/timesheet/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await loadTimesheets();
        setToast({ show: true, message: 'Entry deleted successfully', type: 'success' });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      } else {
        const errorData = await response.json();
        setToast({ show: true, message: errorData.message || 'Failed to delete entry', type: 'error' });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      setToast({ show: true, message: 'Failed to delete entry. Please try again.', type: 'error' });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    }
    setShowDeleteConfirm(false);
  };

  const confirmDelete = (id: string) => {
    setSelectedEntryId(id);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/timesheet-bg.jpg"
        alt="Timesheet Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />

      <div className="relative z-10">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-bold text-white mb-6">Timesheet</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm shadow-sm rounded-lg p-6 h-[380px]">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                      Project
                    </label>
                    <select
                      id="project"
                      name="project"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      required
                    >
                      <option key="option_0" value="">Select a project</option>
                      {tasks.map((task) => (
                        <option key={task._id + task.title} value={task.title}>
                          {task.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                      Hours
                    </label>
                    <input
                      type="number"
                      id="hours"
                      value={formData.hours}
                      onChange={(e) => setFormData({...formData, hours: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      min="0"
                      max="8"
                      step="0.5"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="bg-white/90 backdrop-blur-sm shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Entries</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {entries && entries.length > 0 ? (
                        entries.map((entry) => (
                          <tr key={entry._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.project}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.hours}</td>
                            <td className="px-6 py-4">{entry.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => confirmDelete(entry._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                            No timesheet entries found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl relative z-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-4">Are you sure you want to delete this entry?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedEntryId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div 
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white transition-opacity duration-300 z-50`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
} 