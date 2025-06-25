# Use official Windows container with Node.js
FROM mcr.microsoft.com/windows/servercore:ltsc2022

SHELL ["powershell", "-Command"]

# Install Node.js manually (replace URL if needed)
RUN Invoke-WebRequest -Uri https://nodejs.org/dist/v18.20.2/node-v18.20.2-x64.msi -OutFile node.msi ; \
    Start-Process msiexec.exe -ArgumentList '/qn /i node.msi' -Wait ; \
    Remove-Item -Force node.msi

# Set work directory
WORKDIR /app

# Copy package.json files and install deps
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . ./
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the server
CMD serve -s dist -l 3000
