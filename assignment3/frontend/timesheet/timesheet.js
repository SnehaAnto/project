const API_BASE_URL = 'http://localhost:3001';

const timesheetForm = document.getElementById('timesheetForm');
const timesheetEntries = document.getElementById('timesheetEntries');
const logoutButton = document.getElementById('logoutButton');
let isEditing = false;
let editingId = null;

document.addEventListener('DOMContentLoaded', function () {
    loadTimesheets();
});



// Read timesheet entries
async function loadTimesheets() {
    try {
        const response = await fetch(`${API_BASE_URL}/timesheet`);
        const timesheets = await response.json();

        timesheetEntries.innerHTML = timesheets.map(entry => {
            const displayDate = new Date(entry.date).toLocaleDateString();
            const rawDate = entry.date;
            
            return `
                <tr>
                    <td>${displayDate}</td>
                    <td>${entry.project}</td>
                    <td>${entry.hours}</td>
                    <td>${entry.description}</td>
                    <td>
                        <button onclick="editEntry('${entry._id}', '${rawDate}', '${entry.project}', ${entry.hours}, '${entry.description}')" 
                            class="btn btn-link text-primary btn-sm me-2" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button onclick="deleteEntry('${entry._id}')" 
                            class="btn btn-link text-danger btn-sm" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading timesheets:', error);
    }
}



// Edit timesheet entry
window.editEntry = function(id, date, project, hours, description) {
    isEditing = true;
    editingId = id;
    
    // Format date to yyyy-MM-dd
    const formattedDate = new Date(date).toISOString().split('T')[0];
    
    // Fill form with current values
    document.getElementById('date').value = formattedDate;
    document.getElementById('project').value = project;
    document.getElementById('hours').value = hours;
    document.getElementById('description').value = description;
    
    // Change button text
    document.getElementById('submitButton').textContent = 'Update Entry';
    timesheetForm.scrollIntoView({ behavior: 'smooth' });
};



// Submit/Update timesheet entry
async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        date: document.getElementById('date').value,
        project: document.getElementById('project').value,
        hours: parseFloat(document.getElementById('hours').value),
        description: document.getElementById('description').value
    };

    try {
        let url = `${API_BASE_URL}/timesheet`;
        let method = 'POST';

        if (isEditing) {
            url = `${API_BASE_URL}/timesheet/${editingId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            timesheetForm.reset();
            loadTimesheets();
            
            // Reset editing state
            isEditing = false;
            editingId = null;
            document.getElementById('submitButton').textContent = 'Submit Entry';
        }
    } catch (error) {
        console.error('Error submitting timesheet:', error);
        alert('Failed to submit timesheet');
    }
}
// Add event listeners
timesheetForm.addEventListener('submit', handleSubmit);
logoutButton.addEventListener('click', function () {
    window.location.href = '../login-page/login-page.html';
});



// Delete timesheet entry
window.deleteEntry = async function (id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/timesheet/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTimesheets();
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            alert('Failed to delete entry');
        }
    }
};