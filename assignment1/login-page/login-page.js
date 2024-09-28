document.addEventListener('DOMContentLoaded', function() {
    const loginMethod = document.getElementById('loginMethod');
    const usernameField = document.getElementById('usernameField');
    const emailField = document.getElementById('emailField');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

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

    const loginForm = document.getElementById('loginForm');

    // Add an event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the form from submitting the usual way

        // Simulate a login success and redirect to the timesheet page
        window.location.href = '../timesheet/timesheet.html';  // Redirect to the timesheet page
    });

});