const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const cors = require('cors');
const app = express();

// Use the cors middleware to enable CORS for all routes
app.use(cors());

// Configure body-parser to handle JSON data
app.use(bodyParser.json());

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

// Define an API endpoint for user authentication
app.post('/api/authenticate', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database to check if the user exists and the password is correct
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

        if (user) {
            // User is authenticated
            res.json({ authenticated: true });
        } else {
            // Invalid username or password
            res.status(401).json({ authenticated: false, message: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the API server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
