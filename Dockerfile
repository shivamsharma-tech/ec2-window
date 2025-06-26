# Use a Windows base image with Node.js pre-installed
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Download Node.js (manually, if needed)
# OR pre-install in image, or use a custom image with Node

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN powershell -Command "npm install"

# Build the app
RUN powershell -Command "npm run build"

# Expose port
EXPOSE 3000

# Start the app using `serve`
CMD ["cmd.exe", "/c", "npx serve -s dist -l 3000"]
