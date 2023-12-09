-- init.sql

-- Create the 'users' table
CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR (50) UNIQUE NOT NULL,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL
);

-- Insert initial data into users
INSERT INTO users (email, username, password) VALUES ('admin@example.com', 'admin', 'no_sql_injection_possible');
INSERT INTO users (email, username, password) VALUES ('johndoe@example.com', 'John Doe', 'top_secret_password');


-- Create the 'master' table
CREATE TABLE masters (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),  -- Foreign key referencing the 'id' column in 'users' table
    master_password VARCHAR (50) NOT NULL
);


-- Insert initial data into masters
INSERT INTO masters (user_id, master_password) VALUES (2, 'SfeGcbawEW63G21Xaxq');
