document.addEventListener('DOMContentLoaded', function() {
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Redirect to the login page
        window.location.href = '../login-page/login-page.html';
    });
});