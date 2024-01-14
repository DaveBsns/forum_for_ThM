const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const cors = require('cors');
// const path = require('path');


const app = express();
// app.use(express.json());



const corsOpts = {
    origin: '*',

    methods: [
      'GET',
      'POST',
      'FETCH',
    ],

    allowedHeaders: [
      'Content-Type',
    ],
  };
// Use the cors middleware to enable CORS for all routes
// app.use(cors(corsOpts));
// Use the cors middleware to enable CORS for all routes
app.use(cors());



// Configure body-parser to handle JSON data
app.use(bodyParser.json());

const secretKey = '1234Test1234';

// Database connection configuration
const db = pgp({
    user: 'postgres_user',
    password: 'dbpw',
    host: 'postgres',
    port: 5432,
    database: 'postgres_docker'
});

// Define an API endpoint to retrieve user data
app.get('/api/users', (req, res) => {
    db.any('SELECT * FROM users')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Define an API endpoint to create a new user
app.post('/api/users', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the username or email is already taken
        const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

        if (existingUser) {
            res.status(400).json({ message: 'Username or email already taken.' });
        } else {
            // If the username and email are not taken, insert the new user into the database
            const newUser = await db.one(
                'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
                [email, username, password]
            );

            res.status(201).json({ message: 'User created successfully', userId: newUser.id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Enable preflight for the /api/authenticate endpoint
app.options('/api/authenticate', cors());  // Respond to OPTIONS requests

// Define an API endpoint for user authentication
app.post('/api/authenticate', cors(), async (req, res) => {
    const { username, password } = req.body;

    try {
        const sqlStatement = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`
        // console.log(sqlStatement);
        // Query the database to check if the user exists and the password is correct
        // const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); // too secure use the statement below
        try{
            const user = await db.oneOrNone(sqlStatement); // ' OR 1=1 LIMIT 1;-- // enter this in password field for authentication bypass
                                                        // ' UNION SELECT 1,CAST(2 AS varchar),CAST(3 AS varchar),CAST(4 AS varchar);-- // casting clumns as varchar also allows login -> for the initial login page
                                                        // ' UNION SELECT 1,2,CAST(3 as varchar);-- // sql injection to bypass the master password -> for the wallet page login

            if (user) {
                // User is authenticated
                // res.json({ authenticated: true });
                // Create a JWT token
                const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '3h' });
                
                // Send the token as a response
                res.header('Access-Control-Allow-Origin', '*'); // Set the appropriate origin(s)
                res.header('Access-Control-Allow-Methods', '*'); // Specify the allowed methods
                res.header('Access-Control-Allow-Headers', '*'); // Specify the allowed headers
                res.json({ token });

            } else {
                // Invalid username or password
                res.status(401).json({ authenticated: false, message: 'Invalid username or password.', query: sqlStatement, response: user });
                
            }
        } catch (error) {
            res.status(500).json({ error: error.message, query: sqlStatement });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Define an API endpoint for user authentication
app.post('/api/authmaster', async (req, res) => {
    const { password } = req.body;
    const sqlStatement = `SELECT * FROM masters WHERE master_password = '${password}' LIMIT 1`

    if(isSafe(password)) {
        try {
            
            // Query the database to check if the user exists and the password is correct
            // const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); // too secure use the statement below
            try{
                const master = await db.oneOrNone(sqlStatement); 
                if (master) {
                    // Master is authenticated
                    res.status(200).json({ authenticated: true });
                    console.log("Master is authenticated");
                } else {
                    // Invalid username or password
                    res.status(401).json({ authenticated: false, message: 'Invalid Master password.', query: sqlStatement, response: master});
                }
            } catch (error) {
                res.status(500).json({ error: error.message, query: sqlStatement});
            }                                                  
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(500).json({ authenticated: false, message: 'Invalid Master password.', query: sqlStatement, response: "Nice try"});
    }

});

// Test for jwt
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ authenticated: false, message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ authenticated: false, message: 'Failed to authenticate token.' });
        }

        req.decoded = decoded;
        next();
    });
};

// Test for jwt
// Example of using the middleware for a protected route
app.get('/profile', verifyToken, (req, res) => {
    // If the middleware passed, the user is authenticated
    res.json({ 
        text: "This is Protected",
        authenticated: true, 
        user: req.decoded });
});

// Start the API server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Regex to detect SQL injection bypass
function isSafe(input) {
    const sqlInjectionPattern = /^[^=]*$/;
    return sqlInjectionPattern.test(input);
}
