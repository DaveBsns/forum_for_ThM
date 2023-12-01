document.addEventListener("DOMContentLoaded", function() {

	const cachedRoute = {}; // Create a cache object
	
	function dynamicallyAddScript(pathToScriptFromIndexHTMLPerpective) {
		/*
		// Assuming the existing script tag has an id "index-js-script"
		const existingScript = document.getElementById('dynamically-added-script');
		if (existingScript) {
			existingScript.remove(); // Remove the existing script
		}

		// Dynamically load index.js
		const script = document.createElement('script');
		script.src = pathToScriptFromIndexHTMLPerpective;
		// script.src = './scripts/index.js';
		script.id = 'dynamically-added-script';
		document.body.appendChild(script);
		*/
		
		const scriptElement = document.getElementById('dynamically-loaded-script');
		if (scriptElement) {
			scriptElement.src = pathToScriptFromIndexHTMLPerpective;
		}
	}

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
		// Fetch the HTML content for the new route
		// const response = await fetch(route.template);
		//const html = await response.text();

		// Update the cachedRoute object
		cachedRoute.description = route.description;
		cachedRoute.template = route.template; // old -> html
		cachedRoute.title = route.title;
	};
	/*
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
			// set the content of the content div to the html
			document.getElementById("content").innerHTML = html;
			// set the title of the document to the title of the route
			document.title = route.title;
			// set the description of the document to the description of the route
			document
				.querySelector('meta[name="description"]')
				.setAttribute("content", route.description);
			// dynamicallyAddScript('./scripts/index.js');

			const routeToCache = {
				description: route.description,
				template: route.template,
				title: route.title,
			};
			updateCachedRoute(routeToCache);

		}
	};
	*/


	const urlLocationHandler = async (token) => {
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
			console.log(route.template);
			const routeToCache = {}
			const html = await fetch(route.template).then((response) => response.text());

			switch(route.template){
				case "./templates/forum.html":
					console.log("test forum");
					// get the html from the template
					
					// set the content of the content div to the html
					document.getElementById("content").innerHTML = html;
					// set the title of the document to the title of the route
					document.title = route.title;
					// set the description of the document to the description of the route
					document
						.querySelector('meta[name="description"]')
						.setAttribute("content", route.description);
					// dynamicallyAddScript('./scripts/index.js');

					routeToCache = {
						description: route.description,
						template: route.template,
						title: route.title,
					};
					updateCachedRoute(routeToCache);
					break;
				case "./templates/login.html":
					console.log("test login");
					// get the html from the template
					
					// set the content of the content div to the html
					document.getElementById("content").innerHTML = html;
					// set the title of the document to the title of the route
					document.title = route.title;
					// set the description of the document to the description of the route
					document
						.querySelector('meta[name="description"]')
						.setAttribute("content", route.description);
					// dynamicallyAddScript('./scripts/index.js');

					routeToCache = {
						description: route.description,
						template: route.template,
						title: route.title,
					};
					updateCachedRoute(routeToCache);
					break;
				case "./templates/profile.html":
					console.log("test profile");
					// Test jwt
					if(token){
						fetch('/api/protected', {
							method: 'GET',
							headers: {
								'Authorization': `Bearer ${token}`,
							},
						})
						.then(response => response.json())
						.then(data => console.log(data))
						.catch(error => console.error('Error1:', error));
						// Test jwt end
						// get the html from the template
						
						// set the content of the content div to the html
						document.getElementById("content").innerHTML = html;
						// set the title of the document to the title of the route
						document.title = route.title;
						// set the description of the document to the description of the route
						document
							.querySelector('meta[name="description"]')
							.setAttribute("content", route.description);
						// dynamicallyAddScript('./scripts/index.js');

						routeToCache = {
							description: route.description,
							template: route.template,
							title: route.title,
						};
						updateCachedRoute(routeToCache);
						}else {
							console.error("Token is not defined :(.");
						}	
						break;
				case "./templates/register.html":
					break;
				case "./templates/donate.html":
					break;
			}
			

		}
	};

	// add an event listener to the window that watches for url changes
	window.onpopstate = urlLocationHandler;
	// call the urlLocationHandler function to handle the initial url
	window.route = urlRoute;
	// call the urlLocationHandler function to handle the initial url
	urlLocationHandler(token);
})






/**
 * 
 * console.log(route.template);
			// Test jwt
			// Example of using fetch with the stored token for a protected route
			if (route.template = "./templates/profile.html"){
				fetch('/api/protected', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(error => console.error('Error1:', error));
				// Test jwt end
			}
 */