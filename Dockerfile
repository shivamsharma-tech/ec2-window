# Use matching Windows Server Core image
FROM mcr.microsoft.com/windows/servercore:10.0.26100.1

ENV NODE_VERSION=18.19.1

# Install Node.js silently
SHELL ["powershell", "-NoProfile", "-Command"]
RUN Invoke-WebRequest -Uri "https://nodejs.org/dist/v$env:NODE_VERSION/node-v$env:NODE_VERSION-x64.msi" -OutFile nodejs.msi; \
    Start-Process msiexec.exe -ArgumentList '/qn','/i','nodejs.msi' -Wait; \
    Remove-Item nodejs.msi

# Move to PowerShell for app commands
SHELL ["powershell", "-NoProfile", "-Command"]

WORKDIR C:\app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install 'serve' to run static build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
