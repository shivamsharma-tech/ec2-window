# Use matching Windows Server Core image
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Define Node.js version
ENV NODE_VERSION=18.19.1

# Install Node.js silently
SHELL ["powershell", "-NoProfile", "-Command"]
RUN Invoke-WebRequest -Uri "https://nodejs.org/dist/v$env:NODE_VERSION/node-v$env:NODE_VERSION-x64.msi" -OutFile "nodejs.msi"; \
    Start-Process msiexec.exe -ArgumentList '/quiet', '/norestart', '/i', 'nodejs.msi' -Wait; \
    Remove-Item -Force nodejs.msi

# Use PowerShell as shell
SHELL ["powershell", "-NoProfile", "-Command"]

# Set working directory
WORKDIR C:/app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy full source
COPY . .

# Build React app (assumes output is in 'build', not 'dist')
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve

# Expose port 3000 for app
EXPOSE 3000

# Start app using `serve`
CMD ["serve", "-s", "build", "-l", "3000"]
