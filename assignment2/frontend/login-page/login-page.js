const API_BASE_URL = 'http://localhost:3001';     

document.addEventListener('DOMContentLoaded', function() {
    const loginMethod = document.getElementById('loginMethod');
    const usernameField = document.getElementById('usernameField');
    const emailField = document.getElementById('emailField');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const loginForm = document.getElementById('loginForm');

    // Toggle fields based on login method
    loginMethod.addEventListener('change', function() {
        if (this.value === 'username') {
            usernameField.style.display = 'block';
            emailField.style.display = 'none';
            emailInput.removeAttribute('required');
            usernameInput.setAttribute('required', '');
        } else {
            usernameField.style.display = 'none';
            emailField.style.display = 'block';
            usernameInput.removeAttribute('required');
            emailInput.setAttribute('required', '');
        }
    });

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const identifier = loginMethod.value === 'username' ? 
            usernameInput.value : emailInput.value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password })
            });

            if (response.ok) {
                const userData = await response.json();
                // Store user data in localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
                window.location.href = '../timesheet/timesheet.html';
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    });
});