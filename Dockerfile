FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Install Node.js and 'serve'
RUN powershell -Command " \
    Invoke-WebRequest -Uri https://nodejs.org/dist/v18.20.2/node-v18.20.2-x64.msi -OutFile node.msi ; \
    Start-Process msiexec.exe -ArgumentList '/qn /i node.msi' -Wait ; \
    Remove-Item node.msi ; \
    npm install -g serve \
"

# Set working directory
WORKDIR /app

# Copy and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve build from port 3000
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
