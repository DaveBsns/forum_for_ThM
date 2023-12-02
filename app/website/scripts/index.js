function donate() {
    const totalBitcoinsElement = document.getElementById('total-bitcoins');
    const donationInputElement = document.getElementById('donation-input');
    let totalBitcoins = 0;

    totalBitcoins = parseInt(totalBitcoinsElement.textContent);
    
    const donatedBitcoins = parseInt(donationInputElement.value, 10);

        if (!isNaN(donatedBitcoins) && donatedBitcoins > 0) {
            totalBitcoins += donatedBitcoins;
            totalBitcoinsElement.textContent = totalBitcoins;
        } else {
            alert('Please enter a valid positive integer for donation.');
        }

        // Clear the input field after donation
        donationInputElement.value = '';    

}


/*
async function login() {
    const errorMessageContainer = document.getElementById('error-message');
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    
    if(errorMessageContainer){
        errorMessageContainer.style.display = 'none';
    }

    const userData = {
        username: usernameInput,
        password: passwordInput
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
            window.location.href = '/';
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
*/

// Test Login for jwt
async function login() {
    const errorMessageContainer = document.getElementById('error-message');
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    
    if(errorMessageContainer){
        errorMessageContainer.style.display = 'none';
    }

    const userData = {
        username: usernameInput,
        password: passwordInput
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
            const data = await response.json();
            console.log("Data!!!!: "+data)
            // Store the token securely (you may want to use HTTP-only cookies for security)
            document.cookie = `token=${data.token}; path=/;`;


            //window.location.href = '/'; // uncomment later
            console.log(document.cookie);
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


async function register() {
    const errorMessageContainer = document.getElementById('error-message');
    const successMessageContainer = document.getElementById('success-message');
    const emailInput = document.getElementById('register_email').value;
    const usernameInput = document.getElementById('register_username').value;
    const passwordInput = document.getElementById('register_password').value;

    if(errorMessageContainer){
        errorMessageContainer.style.display = 'none';
    }
    if(successMessageContainer){
        successMessageContainer.style.display = 'none';
    }
        
    const userData = {
        email: emailInput,
        username: usernameInput,
        password: passwordInput
    };

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 200 || response.status === 201) {
            // Successful registration
            //window.location.href = '/';
            successMessageContainer.style.display = 'block';
            successMessageContainer.innerHTML = 'User registered successfully';
            document.getElementById('register_email').value = '';
            document.getElementById('register_username').value = '';
            document.getElementById('register_password').value = '';
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



