document.addEventListener("DOMContentLoaded", function() {
    loggedOutLinks();


	const cachedRoute = {}; // Create a cache object

	// create document click that watches the nav links only
	document.addEventListener("click", (e) => {
		const { target } = e;
		/* 
		if (!target.matches("nav a")) {  // Just use this if you want the single page navigation only between a navbar.
			return;
		}
		*/
		e.preventDefault();
		urlRoute();
	});

	// create an object that maps the url to the template, title, and description
	const urlRoutes = {
		"/": {
			template: "./templates/forum.html",
			title: "Forum Page",
			description: "This is the forum page",
		},
		"/login": {
			template: "./templates/login.html",
			title: "Login Page",
			description: "This is the login page",
		},
		"/profile": {
			template: "./templates/profile.html",
			title: "Profile Page",
			description: "This is the profile page",
		},
		"/register": {
			template: "./templates/registration.html",
			title: "Registration Page",
			description: "This is the registration page",
		},
		"/donate": {
			template: "./templates/donation.html",
			title: "Bitcoin Donation Page",
			description: "This is the bitcoin donation page",
		},
        "/wallet": {
			template: "./templates/wallet_login.html",
			title: "Bitcoin Wallet Management Page Login",
			description: "This is the login to the bitcoin wallet management page",
		},
        "/flag": {
			template: "./templates/wallet_flag.html",
			title: "Bitcoin Wallet Management Page",
			description: "Success!!",
		},
        "/logout": {
			template: "./templates/logout.html",
			title: "Logout",
			description: "This is the logout page",
		},
	};

	// create a function that watches the url and calls the urlLocationHandler
	const urlRoute = (event) => {
		event = event || window.event; // get window.event if event argument not provided
		event.preventDefault();
		// window.history.pushState(state, unused, target link);
		window.history.pushState({}, "", event.target.href);
		urlLocationHandler();
	};
	
	// Function to update the cached page
	const updateCachedRoute = async (route) => {
		// Update the cachedRoute object
		cachedRoute.description = route.description;
		cachedRoute.template = route.template; // old -> html
		cachedRoute.title = route.title;
	};


	const urlLocationHandler = async () => {
		const location = window.location.pathname; // get the url path
		// if the path length is 0, set it to primary page route
		if (location.length == 0) {
			location = "/";
		}
		// get the route object from the urlRoutes object
		const route = urlRoutes[location] || urlRoutes["/"];
		
		if(route.template == cachedRoute.template){
			return;

		}else{
            // get the html from the template
            const html = await fetch(route.template).then((response) => response.text());

            // defining the protected routes
            switch(route.template){
                case "./templates/profile.html":
                    if(document.cookie){
                        // set the content of the content div to the html
                        document.getElementById("content").innerHTML = html;
                        // set the title of the document to the title of the route
                        document.title = route.title;
                        // set the description of the document to the description of the route
                        document
                            .querySelector('meta[name="description"]')
                            .setAttribute("content", route.description);
                        routeToCache = {
                            description: route.description,
                            template: route.template,
                            title: route.title,
                        };
                        updateCachedRoute(routeToCache);
                    }
                    break;

                case "./templates/donation.html":
                    if(document.cookie){
                        // set the content of the content div to the html
                        document.getElementById("content").innerHTML = html;
                        // set the title of the document to the title of the route
                        document.title = route.title;
                        // set the description of the document to the description of the route
                        document
                            .querySelector('meta[name="description"]')
                            .setAttribute("content", route.description);
                        routeToCache = {
                            description: route.description,
                            template: route.template,
                            title: route.title,
                        };
                        updateCachedRoute(routeToCache);
                    }
                    break;
                case "./templates/wallet_login.html":
                    if(document.cookie){
                        // set the content of the content div to the html
                        document.getElementById("content").innerHTML = html;
                        // set the title of the document to the title of the route
                        document.title = route.title;
                        // set the description of the document to the description of the route
                        document
                            .querySelector('meta[name="description"]')
                            .setAttribute("content", route.description);
                        routeToCache = {
                            description: route.description,
                            template: route.template,
                            title: route.title,
                        };
                        updateCachedRoute(routeToCache);
                    }
                    break;
                case "./templates/wallet_flag.html":
                    if(document.cookie){
                        // set the content of the content div to the html
                        document.getElementById("content").innerHTML = html;
                        // set the title of the document to the title of the route
                        document.title = route.title;
                        // set the description of the document to the description of the route
                        document
                            .querySelector('meta[name="description"]')
                            .setAttribute("content", route.description);
                        routeToCache = {
                            description: route.description,
                            template: route.template,
                            title: route.title,
                        };
                        updateCachedRoute(routeToCache);
                    }
                    break;
                default:
                    // set the content of the content div to the html
                    document.getElementById("content").innerHTML = html;
                    // set the title of the document to the title of the route
                    document.title = route.title;
                    // set the description of the document to the description of the route
                    document
                        .querySelector('meta[name="description"]')
                        .setAttribute("content", route.description);
                    routeToCache = {
                        description: route.description,
                        template: route.template,
                        title: route.title,
                    };
                    updateCachedRoute(routeToCache);
                    break;
            }
		}
	};

	// add an event listener to the window that watches for url changes
	window.onpopstate = urlLocationHandler;
	// call the urlLocationHandler function to handle the initial url
	window.route = urlRoute;
	// call the urlLocationHandler function to handle the initial url
	urlLocationHandler();
})




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
            // Store the token securely (you may want to use HTTP-only cookies for security)
            document.cookie = `token=${data.token}; path=/;`;

            loggedInLinks();


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

// Test Login for jwt
async function loginMaster() {
    const errorMessageContainer = document.getElementById('error-message');
    const passwordMasterInput = document.getElementById('password-master').value;
    
    if(errorMessageContainer){
        errorMessageContainer.style.display = 'none';
    }

    const userData = {
        password: passwordMasterInput
    };

    try {
        const response = await fetch('http://localhost:3000/api/authmaster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 200) {
            // Successful authentication
            const data = await response.json();
            console.log("Successfully logged in to bitcoin wallet!")

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

async function logout() {
    // Set the token cookie's expiration to a past date
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    loggedOutLinks();
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


function loggedInLinks() {
    document.getElementById("forum-link").style.display = "block";
    document.getElementById("profile-link").style.display = "block";
    document.getElementById("login-link").style.display = "none";
    document.getElementById("logout-link").style.display = "block";

}

function loggedOutLinks() {
    document.getElementById("forum-link").style.display = "block";
    document.getElementById("profile-link").style.display = "none";
    document.getElementById("login-link").style.display = "block";
    document.getElementById("logout-link").style.display = "none";
}



