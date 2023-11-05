# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /api

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the API dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./app/app.js /api

# Expose the port the API will run on
EXPOSE 3000

# Command to start the API
CMD [ "node", "app.js" ]
