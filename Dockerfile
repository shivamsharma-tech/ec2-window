# ✅ Use a Windows base image
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# ✅ Set environment variable for Node.js version
ENV NODE_VERSION=18.19.1

# ✅ Download and install Node.js manually
RUN powershell -Command `
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v${env:NODE_VERSION}/node-v${env:NODE_VERSION}-x64.msi" -OutFile "nodejs.msi" ; `
    Start-Process msiexec.exe -Wait -ArgumentList '/qn /i nodejs.msi' ; `
    Remove-Item -Force nodejs.msi

# ✅ Create app directory
WORKDIR C:/app

# ✅ Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# ✅ Copy the rest of the app
COPY . .

# ✅ Build your app (e.g., React, Vue, etc.)
RUN npm run build

# ✅ Install 'serve' globally to host the static files
RUN npm install -g serve

# ✅ Expose the port (match your frontend port)
EXPOSE 3000

# ✅ Start the stati
