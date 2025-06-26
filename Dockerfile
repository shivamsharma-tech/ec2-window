# Use the correct base image for your Windows Server version
FROM mcr.microsoft.com/windows/servercore:10.0.26100.1

# Set Node.js version
ENV NODE_VERSION=18.19.1

# Download and install Node.js manually
RUN powershell -Command `
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v$env:NODE_VERSION/node-v$env:NODE_VERSION-x64.msi" -OutFile "nodejs.msi" ; `
    Start-Process msiexec.exe -Wait -ArgumentList '/qn /i nodejs.msi' ; `
    Remove-Item -Force nodejs.msi

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build the app (optional)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
