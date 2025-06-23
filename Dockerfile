# Step 1: Build stage
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Production image
FROM node:18

RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./dist

EXPOSE 4000 5000

CMD ["sh", "-c", "serve -s dist -l 4000 & serve -s dist -l 5000 && wait"]
