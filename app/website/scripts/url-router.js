document.addEventListener("DOMContentLoaded", function() {


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
		
		const scriptElement = document.getElementById('added-script');
		if (scriptElement) {
			console.log("dynamic test 1122");
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


	const cachedRoute = {}; // Create a cache object
	

	// Function to update the cached page
	const updateCachedRoute = async (route) => {
		// Fetch the HTML content for the new route
		// const response = await fetch(route.template);
		//const html = await response.text();

		// Update the cachedRoute object
		cachedRoute.description = route.description;
		cachedRoute.template = route.template; // old -> html
		cachedRoute.title = route.title;
		console.log("description: "+cachedRoute.description + " title: "+ cachedRoute.title, " template: "+cachedRoute.template);
	};

	const urlLocationHandler = async () => {
		const location = window.location.pathname; // get the url path
		// if the path length is 0, set it to primary page route
		if (location.length == 0) {
			location = "/";
		}
		// get the route object from the urlRoutes object
		const route = urlRoutes[location] || urlRoutes["404"];
		
		if(route.template == cachedRoute.template){
			return;
		}else {
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
			console.log("loading script...");
			dynamicallyAddScript('./scripts/index.js');

			const routeToCache = {
				description: route.description,
				template: route.template,
				title: route.title,
			};
			updateCachedRoute(routeToCache);
		}
		
	};

	// add an event listener to the window that watches for url changes
	window.onpopstate = urlLocationHandler;
	// call the urlLocationHandler function to handle the initial url
	window.route = urlRoute;
	// call the urlLocationHandler function to handle the initial url
	urlLocationHandler();
})