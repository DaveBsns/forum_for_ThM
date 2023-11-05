-- init.sql

-- Create the 'users' table
CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR (50) UNIQUE NOT NULL,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL
);

-- Insert initial data
INSERT INTO users (email, username, password) VALUES ('admin@example.com', 'admin', 'no_sql_injection_possible');
INSERT INTO users (email, username, password) VALUES ('johndoe@example.com', 'John Doe', 'top_secret_password');
