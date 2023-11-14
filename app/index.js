document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessageContainer = document.getElementById('error-message');


    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        authentication(usernameInput, passwordInput);
    });

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const emailInput = document.getElementById('register_email').value;
        const usernameInput = document.getElementById('register_username').value;
        const passwordInput = document.getElementById('register_password').value;

        addNewUser(emailInput, usernameInput, passwordInput);
    });

    errorMessageContainer.style.display = 'none';

    async function authentication(username, password) {

        const userData = {
            username: username,
            password: password
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (response.status === 200) {
                // Successful authentication
                window.location.href = 'landing_page.html';
            } else {
                const data = await response.json();
                errorMessageContainer.style.display = 'block';
                errorMessageContainer.innerHTML = data.message || 'Invalid username or password.';
            }
        } catch (error) {
            errorMessageContainer.style.display = 'block';
            errorMessageContainer.innerHTML = 'An error occurred while authenticating.';
            console.error(error);
        }
    
    }

    async function addNewUser(email, username, password) {

        const userData = {
            email: email,
            username: username,
            password: password
        };
        console.log(userData);
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (response.status === 200) {
                // Successful authentication
                window.location.href = 'index.html';
            } else {
                const data = await response.json();
                errorMessageContainer.style.display = 'block';
                errorMessageContainer.innerHTML = data.message || 'Invalid username or password.';
            }
        } catch (error) {
            errorMessageContainer.style.display = 'block';
            errorMessageContainer.innerHTML = 'An error occurred while authenticating.';
            console.error(error);
        }
    
    }
})


