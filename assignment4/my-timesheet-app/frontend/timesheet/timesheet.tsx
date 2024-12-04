import React, { useEffect, useState } from 'react';
import './timesheet.css';
const API_BASE_URL = 'http://localhost:3001';

const Timesheet = () => {
    const [timesheets, setTimesheets] = useState<any[]>([]);
    const [formData, setFormData] = useState<{ date: string; project: string; hours: number; description: string }>({ date: '', project: '', hours: 0, description: '' });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        loadTimesheets();
    }, []);

    const loadTimesheets = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/timesheet`);
            const data = await response.json();
            setTimesheets(data);
        } catch (error) {
            console.error('Error loading timesheets:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_BASE_URL}/timesheet/${editingId}` : `${API_BASE_URL}/timesheet`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ date: '', project: '', hours: 0, description: '' });
                setIsEditing(false);
                setEditingId(null);
                loadTimesheets();
            }
        } catch (error) {
            console.error('Error submitting timesheet:', error);
        }
    };

    const editEntry = (entry: any) => {
        setFormData(entry);
        setIsEditing(true);
        setEditingId(entry._id);
    };

    const deleteEntry = async (id: string) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/timesheet/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    loadTimesheets();
                }
            } catch (error) {
                console.error('Error deleting entry:', error);
            }
        }
    };

    return (
        <div>
            <h1>Timesheet</h1>
            <form onSubmit={handleSubmit}>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                <input type="text" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} required />
                <input type="number" value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })} min="0" max="8" required />
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
                <button type="submit">{isEditing ? 'Update Entry' : 'Submit Entry'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Project</th>
                        <th>Hours</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map(entry => (
                        <tr key={entry._id}>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                            <td>{entry.project}</td>
                            <td>{entry.hours}</td>
                            <td>{entry.description}</td>
                            <td>
                                <button onClick={() => editEntry(entry)}>Edit</button>
                                <button onClick={() => deleteEntry(entry._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timesheet;