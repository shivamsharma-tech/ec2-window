# Use Windows Server Core with LTSC 2022
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Set Node.js version
ENV NODE_VERSION=18.19.1

# Download and install Node.js silently
RUN powershell -Command `
    Invoke-WebRequest -Uri https://nodejs.org/dist/v$env:NODE_VERSION/node-v$env:NODE_VERSION-x64.msi -OutFile nodejs.msi ; `
    Start-Process msiexec.exe -Wait -ArgumentList '/qn /i nodejs.msi' ; `
    Remove-Item -Force nodejs.msi

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies and build the app
RUN npm install && npm run build

# Install serve to serve the built files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start app
CMD ["cmd", "/c", "serve -s dist -l 3000"]
