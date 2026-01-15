FROM node:18-alpine
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy all server files, excluding the client folder (we'll handle that via .dockerignore)
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]