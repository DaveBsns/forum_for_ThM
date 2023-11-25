


document.addEventListener("DOMContentLoaded", function() {
    // const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessageContainer = document.getElementById('error-message');
    /*
    if(loginForm){
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            
            authentication(usernameInput, passwordInput);
        });
    }
    */
    
    if(registerForm){
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const emailInput = document.getElementById('register_email').value;
            const usernameInput = document.getElementById('register_username').value;
            const passwordInput = document.getElementById('register_password').value;

            addNewUser(emailInput, usernameInput, passwordInput);
        });
    }

    if(errorMessageContainer){
        errorMessageContainer.style.display = 'none';
    }
    

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
                window.location.href = 'index.html';
                console.log("Authenticated Successfully");
                // here should a authenticated user redirected to a file called landing_page.html
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

function donate() {
    let totalBitcoinsElement = document.getElementById('total-bitcoins');
    let donationInputElement = document.getElementById('donation-input');
    // let donateButton = document.getElementById('donate-button'); // corresponding to the old version with the event listener
    let totalBitcoins = 0;

    totalBitcoins = parseInt(totalBitcoinsElement.textContent);
    
    // donateButton.addEventListener('click', function () { // old version solved without eventlistener now
    const donatedBitcoins = parseInt(donationInputElement.value, 10);

        if (!isNaN(donatedBitcoins) && donatedBitcoins > 0) {
            totalBitcoins += donatedBitcoins;
            totalBitcoinsElement.textContent = totalBitcoins;
        } else {
            alert('Please enter a valid positive integer for donation.');
        }

        // Clear the input field after donation
        donationInputElement.value = '';    
    // });
}


function login() {
    console.log("Test login");
    const loginForm = document.getElementById('login-form');
    
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    
    authentication(usernameInput, passwordInput);
}

const loginForm = document.getElementById('login-form');
if(loginForm){
    loginForm.addEventListener('submit', function (e) {
        console.log("Test");
        e.preventDefault();
    
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        
        authentication(usernameInput, passwordInput);
    });

}


