# Use official lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Install serve globally to serve the built files
RUN npm install -g serve

# Expose the desired port
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]
