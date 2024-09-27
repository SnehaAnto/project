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
});