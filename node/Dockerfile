# Use a specific version of Node.js based on Alpine for a smaller image size
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
