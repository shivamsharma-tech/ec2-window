FROM mcr.microsoft.com/windows/servercore:10.0.26100.1


ENV NODE_VERSION=18.19.1

# Download and install Node.js
RUN powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v${env:NODE_VERSION}/node-v${env:NODE_VERSION}-x64.msi -OutFile nodejs.msi && Start-Process msiexec.exe -Wait -ArgumentList '/qn /i nodejs.msi' && Remove-Item -Force nodejs.msi"

WORKDIR C:/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
