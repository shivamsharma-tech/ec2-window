# Stage 1: Build using Node.js on Windows
FROM mcr.microsoft.com/windows/servercore:ltsc2022 AS build

SHELL ["powershell", "-Command"]

# Install Node.js
RUN Invoke-WebRequest -Uri https://nodejs.org/dist/v18.20.2/node-v18.20.2-x64.msi -OutFile node.msi ; \
    Start-Process msiexec.exe -ArgumentList '/qn /i node.msi' -Wait ; \
    Remove-Item node.msi

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production stage with 'serve'
FROM mcr.microsoft.com/windows/servercore:ltsc2022

SHELL ["powershell", "-Command"]

# Install Node.js and serve
RUN Invoke-WebRequest -Uri https://nodejs.org/dist/v18.20.2/node-v18.20.2-x64.msi -OutFile node.msi ; \
    Start-Process msiexec.exe -ArgumentList '/qn /i node.msi' -Wait ; \
    Remove-Item node.msi ; \
    npm install -g serve

WORKDIR /app
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["cmd", "/c", "serve -s dist -l 3000"]
