# Hackable Forum for a ThM Room


## Running the App

1. Run `docker compose build` to build the image for the nodejs-api.

2. Run `docker compose up -d` to run the containers for the postgresql database and the app.

3. Enter `localhost:80` to open the login page.

4. Have Fun!


## PostgreSQL Database

The Database is running on `localhost:5432` in Docker container.

To view the tables, open `localhost:5432` in pgadmin.^


## NodeJS Api

The NodeJS Api is running on `localhost:3000` in a Docker container.