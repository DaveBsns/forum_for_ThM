document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const errorMessageContainer = document.getElementById('error-message');


    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const users = [
            { username: 'admin', password: 'no_sql_injection_possible' },
            { username: 'John Doe', password: 'top_secret_password' }
        ];

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

        if (user) {
            window.location.href = 'landing_page.html';
        } else {
            errorMessageContainer.style.display = 'block';
            // Display an error message
            errorMessageContainer.innerHTML = 'Invalid username or password.';
        }
    });

    errorMessageContainer.style.display = 'none';
})